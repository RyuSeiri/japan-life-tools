import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools/registry";

export const metadata: Metadata = { title: "無料ツール一覧", description: "Japan Life Toolsの無料オンライン計算・開発ツール一覧。" };

export default function ToolsPage() {
  return <main className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-3xl font-black">無料ツール一覧</h1><p className="mt-3 text-muted">日常生活や仕事で使える便利なツールをまとめています。</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{tools.map(t=><ToolCard key={t.slug} tool={t}/>)}</div></main>;
}
