import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ryuseiri.github.io/japan-life-tools";
  return [
    { url: base, lastModified: new Date() },
    { url: base + "/tools/", lastModified: new Date() },
    ...categories.map(c=>({url: base+`/categories/${c.slug}/`, lastModified:new Date()})),
    ...tools.map(t=>({url: base+`/tools/${t.slug}/`, lastModified:new Date()}))
  ];
}
