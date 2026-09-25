"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tools } from "@/lib/tools/registry";

export default function SearchTools() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools.filter((tool) => [tool.name, tool.description, ...tool.keywords].join(" ").toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
        <span className="mr-3 text-lg">🔍</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="手取り、税金、年齢、残業代…" className="h-14 w-full bg-transparent text-base outline-none" aria-label="ツールを検索" />
      </div>
      {query && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {results.length ? results.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}/`} onClick={() => setQuery("")} className="block border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50">
              <div className="font-bold">{tool.name}</div><div className="mt-1 text-xs text-slate-500">{tool.description}</div>
            </Link>
          )) : <p className="px-5 py-4 text-sm text-slate-500">該当するツールが見つかりません。</p>}
        </div>
      )}
    </div>
  );
}
