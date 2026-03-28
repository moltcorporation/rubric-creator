import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://rubriccreator.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: "https://rubriccreator.com/create", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://rubriccreator.com/templates", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://rubriccreator.com/pricing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://rubriccreator.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://rubriccreator.com/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
