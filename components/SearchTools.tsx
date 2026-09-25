"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { tools } from "@/lib/tools/registry";

export default function SearchTools() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter((tool) =>
        [tool.name, tool.description, ...tool.keywords]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 8);
  }, [query]);

  const openResult = (index: number) => {
    const tool = results[index];
    if (!tool) return;
    setQuery("");
    setActiveIndex(-1);
    router.push(`/tools/${tool.slug}/`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length ? (index + 1) % results.length : -1,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length ? (index - 1 + results.length) % results.length : -1,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      openResult(activeIndex >= 0 ? activeIndex : 0);
    } else if (event.key === "Escape") {
      setQuery("");
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
        <span className="mr-3 text-lg">🔍</span>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="手取り、税金、年齢、残業代…"
          className="h-14 w-full bg-transparent text-base outline-none"
          aria-label="ツールを検索"
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
          }
          aria-controls="search-results"
          aria-expanded={Boolean(query)}
          role="combobox"
          autoComplete="off"
        />
      </div>
      {query && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          {results.length ? (
            results.map((tool) => (
              <Link
                key={tool.slug}
                id={`search-result-${results.indexOf(tool)}`}
                href={`/tools/${tool.slug}/`}
                role="option"
                aria-selected={results.indexOf(tool) === activeIndex}
                onMouseEnter={() => setActiveIndex(results.indexOf(tool))}
                onClick={() => {
                  setQuery("");
                  setActiveIndex(-1);
                }}
                className={`block border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50 ${results.indexOf(tool) === activeIndex ? "bg-slate-50" : ""}`}
              >
                <div className="font-bold">{tool.name}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {tool.description}
                </div>
              </Link>
            ))
          ) : (
            <p className="px-5 py-4 text-sm text-slate-500">
              該当するツールが見つかりません。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
