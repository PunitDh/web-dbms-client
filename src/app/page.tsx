import { SearchParams } from "@/types";
import dynamic from "next/dynamic";

type Props = {
  searchParams: SearchParams;
};

const SqlEditor = dynamic(() => import("../components/SQLEditor"), {
  ssr: false,
});

export default function Home({ searchParams }: Props) {
  return (
    <main className="flex min-h-screen flex-col justify-between px-8">
      <SqlEditor searchParams={searchParams} />
    </main>
  );
}
