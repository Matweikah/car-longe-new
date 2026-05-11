import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/avtomobili-v-nalichii?*',
          '/inventory.html',
          '/inventory.html?*',
          '/index.html',
          '/index.html?*',
          '/avtomobili-v-nalichii/*?*'
        ]
      }
    ],
    sitemap: 'https://car-lounge.ru/sitemap.xml'
  };
}
