"use client";

import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql";
import "codemirror/theme/material-palenight.css";
import { Button } from "@nextui-org/react";
import { webdbmsAPI } from "@/api/webdbmsAPI";
import { QueryResult } from "@/api/responseTypes";
import QueryResultTable from "./QueryResultTable";

const SQLEditor = () => {
  const textAreaRef = useRef(null);
  const [value, setValue] = useState<string>();
  const [runResult, setRunResult] = useState<QueryResult>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      const result = await webdbmsAPI.runQuery(value);
      console.log(result);
      setRunResult(result);
    }
  };

  useEffect(() => {
    let editor: CodeMirror.EditorFromTextArea;
    if (textAreaRef.current) {
      editor = CodeMirror.fromTextArea(textAreaRef.current, {
        mode: "text/x-sql",
        theme: "material-palenight",
        lineNumbers: true,
      });

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
      {runResult && <QueryResultTable tableData={runResult} />}
    </form>
  );
};

export default SQLEditor;
