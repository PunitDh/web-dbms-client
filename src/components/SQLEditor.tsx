"use client";

import React, { useEffect, useRef, useState } from "react";
import CodeMirror, { EditorConfiguration } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql";
import "codemirror/theme/material-palenight.css";
import { Button } from "@nextui-org/react";
import { webdbmsAPI } from "@/api/webdbmsAPI";
import { QueryResult, SearchParams } from "@/types";
import QueryResultTable from "./QueryResultTable";
import "./sqleditor.css";

type Props = {
  searchParams: SearchParams;
}

const SQLEditor = ({ searchParams }: Props) => {
  const textAreaRef = useRef(null);
  const [value, setValue] = useState<string>();
  const [runResult, setRunResult] = useState<QueryResult>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      const result = await webdbmsAPI.runQuery(value);
      setRunResult(result);
    }
  };

  useEffect(() => {
    let editor: CodeMirror.EditorFromTextArea;
    if (textAreaRef.current) {
      const editorConfiguration: EditorConfiguration = {
        mode: "text/x-sql",
        theme: "material-palenight",
        lineNumbers: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
      };

      editor = CodeMirror.fromTextArea(
        textAreaRef.current,
        editorConfiguration
      );

      editor.on("change", (editor) => {
        setValue(editor.getValue());
      });
    }

    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <textarea ref={textAreaRef} defaultValue={""} />
      <Button
        type="submit"
        className="self-end px-4 py-2 shadow-md bg-blue-600 hover:bg-blue-400 active:translate-y-0.5 rounded-lg text-white"
      >
        Run Query
      </Button>
      {runResult && <QueryResultTable tableData={runResult} searchParams={searchParams} />}
    </form>
  );
};

export default SQLEditor;
