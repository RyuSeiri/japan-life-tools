import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://ryuseiri.github.io/japan-life-tools/sitemap.xml" };
}
