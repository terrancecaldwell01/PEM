import type { MetadataRoute } from "next";
import { SITE } from "./layout";
import { BRANDS, SHOWN } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = [
    "",
    ...BRANDS.filter((b) => b.status === "listed").map((b) => `/${b.slug}`),
    ...SHOWN.map((c) => `/${c.slug}`),
    "/list-your-company",
  ];
  return slugs.map((s) => ({ url: `${SITE}${s}`, changeFrequency: "weekly", priority: s === "" ? 1 : 0.7 }));
}
