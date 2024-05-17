import dynamic from "next/dynamic";

const SqlEditor = dynamic(() => import("../components/SQLEditor"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between px-8">
      <SqlEditor />
    </main>
  );
}
