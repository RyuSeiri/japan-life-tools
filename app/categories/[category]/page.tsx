import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { categories, tools } from "@/lib/tools/registry";

export function generateStaticParams() { return categories.map(c=>({category:c.slug})); }

export default async function CategoryPage({ params }: { params: Promise<{category:string}> }) {
  const {category}=await params; const cat=categories.find(c=>c.slug===category); if(!cat) notFound();
  const list=tools.filter(t=>t.category===category);
  return <main className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-3xl font-black">{cat.name}</h1><p className="mt-3 text-muted">{cat.name}に関する無料ツール。</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map(t=><ToolCard key={t.slug} tool={t}/>)}</div></main>;
}
