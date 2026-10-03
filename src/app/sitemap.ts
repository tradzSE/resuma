import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resuma.ranierteraldico.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/builder", "/about", "/privacy", "/terms"];
  return routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/builder" ? 0.9 : 0.5 }));
}
