import Link from "next/link";
import type { Tool } from "@/lib/tools/registry";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}/`} className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
          {tool.category === "work" ? "💰" : tool.category === "date" ? "📅" : tool.category === "money" ? "🧾" : tool.category === "life" ? "🏠" : "🧑‍💻"}
        </div>
        {tool.popular && <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">人気</span>}
      </div>
      <div className="mt-4">
        <span className="text-xs font-semibold text-blue-600">{tool.categoryName}</span>
        <h2 className="mt-1 text-lg font-extrabold text-slate-900">{tool.name}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{tool.description}</p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-blue-600">
        <span>無料で計算</span><span className="transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
