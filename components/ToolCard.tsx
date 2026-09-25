import Link from "next/link";
import type { Tool } from "@/lib/tools/registry";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}/`} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand">{tool.categoryName}</span>
        <span className="text-muted transition group-hover:text-brand">→</span>
      </div>
      <h2 className="text-lg font-bold">{tool.name}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
    </Link>
  );
}
