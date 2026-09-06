import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fauzantaslim.my.id';

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
