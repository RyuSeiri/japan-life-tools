import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { categories, tools } from "@/lib/tools/registry";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  return cat
    ? { title: `${cat.name}の計算ツール`, description: cat.description }
    : {};
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();
  const list = tools.filter((t) => t.category === category);
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="border-l-4 border-blue-600 bg-slate-50 p-8 md:p-12">
        <p className="text-sm font-bold text-blue-600">{list.length} FREE TOOLS</p>
        <h1 className="mt-2 text-4xl font-black">{cat.name}の計算ツール</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          日本での生活に役立つ{cat.name}関連の無料計算ツールです。{cat.description}
        </p>
      </div>
      <p className="mt-8 text-sm leading-7 text-slate-600">目的に合うツールを選び、必要な金額や日付を入力すると結果をすぐに確認できます。入力内容はブラウザ上でのみ計算されます。</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </main>
  );
}
