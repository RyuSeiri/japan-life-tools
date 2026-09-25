import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools/registry";

export default function Home() {
  return <main><section className="bg-white"><div className="mx-auto max-w-6xl px-5 py-20"><p className="mb-4 text-sm font-bold text-brand">JAPAN LIFE TOOLS</p><h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">日本の生活に役立つ、<br />シンプルな無料ツール。</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">税金、日付、生活費、交通、開発など、毎日の「ちょっと計算したい」をブラウザですぐ解決。</p><Link href="/tools/" className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">ツールを見る →</Link></div></section><section className="mx-auto max-w-6xl px-5 py-14"><div className="mb-7 flex items-end justify-between"><div><h2 className="text-2xl font-bold">おすすめツール</h2><p className="mt-1 text-sm text-muted">まずは10個からスタート</p></div><Link href="/tools/" className="text-sm font-semibold text-brand">すべて見る</Link></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{tools.map(t=><ToolCard key={t.slug} tool={t}/>)}</div></section></main>;
}
