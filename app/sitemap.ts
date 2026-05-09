import type { MetadataRoute } from "next";
import { SITE } from "./lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${SITE.url}/ko`,
          en: `${SITE.url}/en`,
          zh: `${SITE.url}/zh`,
          ja: `${SITE.url}/ja`,
        },
      },
    },
  ];
}
