import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools/registry";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://github.com/japan-tools/japan-life-tools";

  return [
    { url: base + "/", lastModified: new Date() },
    { url: base + "/tools/", lastModified: new Date() },
    { url: base + "/about/", lastModified: new Date() },
    { url: base + "/contact/", lastModified: new Date() },
    { url: base + "/privacy-policy/", lastModified: new Date() },
    { url: base + "/terms/", lastModified: new Date() },
    { url: base + "/disclaimer/", lastModified: new Date() },
    ...categories.map((c) => ({
      url: base + `/categories/${c.slug}/`,
      lastModified: new Date(),
    })),
    ...tools.map((t) => ({
      url: base + `/tools/${t.slug}/`,
      lastModified: new Date(),
    })),
  ];
}
