import type { MetadataRoute } from 'next';
import { stockBrands, stockCars } from '@/data/stock-cars';

const baseUrl = 'https://car-lounge.ru';

function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-+|-+$/g, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/avtomobili-v-nalichii`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...stockBrands.map((brand) => ({
      url: `${baseUrl}/avtomobili-v-nalichii/${brandSlug(brand)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.72,
    })),
    ...stockCars.map((car) => ({
      url: `${baseUrl}/avtomobili-v-nalichii/${car.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.64,
    })),
  ];
}
