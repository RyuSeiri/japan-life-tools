import type { Metadata } from "next";
import Link from "next/link";
import { getTool, tools } from "@/lib/tools/registry";
import ToolClient from "@/components/ToolClient";

export function generateStaticParams() { return tools.map(t=>({slug:t.slug})); }

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params; const tool=getTool(slug);
  return { title: tool?.name ?? "ツール", description: tool?.description };
}

export default async function ToolPage({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const tool=getTool(slug);
  if (!tool) return <main className="mx-auto max-w-4xl px-5 py-16"><h1 className="text-3xl font-bold">ツールが見つかりません</h1></main>;
  return <main className="mx-auto max-w-4xl px-5 py-10"><Link href="/tools/" className="text-sm text-brand">← ツール一覧</Link><div className="mt-6"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand">{tool.categoryName}</span><h1 className="mt-4 text-3xl font-black md:text-4xl">{tool.name}</h1><p className="mt-3 leading-7 text-muted">{tool.description}</p></div><div className="mt-8"><ToolClient slug={slug}/></div><section className="mt-10 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">このツールについて</h2><p className="mt-3 text-sm leading-7 text-muted">入力したデータはこのページ上で計算され、サーバーへ送信されません。計算結果は目安としてご利用ください。</p><h2 className="mt-7 text-xl font-bold">よくある質問</h2><h3 className="mt-4 font-bold">無料で使えますか？</h3><p className="mt-2 text-sm leading-6 text-muted">はい。現在公開しているツールは無料で利用できます。</p></section></main>;
}
