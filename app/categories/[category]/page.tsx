import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { categories, tools } from "@/lib/tools/registry";

export function generateStaticParams() { return categories.map((c) => ({ category: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  return cat ? { title: `${cat.name}の計算ツール`, description: cat.description } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();
  const list = tools.filter((t) => t.category === category);
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-white p-8 md:p-12">
        <p className="text-sm font-bold text-blue-600">CATEGORY</p><h1 className="mt-2 text-4xl font-black">{cat.name}</h1><p className="mt-4 max-w-2xl leading-7 text-slate-600">{cat.description}</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
    </main>
  );
}
