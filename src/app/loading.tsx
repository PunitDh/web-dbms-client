import { Spinner } from "@nextui-org/react";
import React from "react";

const LoadingPage = () => {
  return (
    <main className="flex flex-col justify-between px-8 gap-4 pt-4">
      <Spinner />
    </main>
  );
};

export default LoadingPage;
