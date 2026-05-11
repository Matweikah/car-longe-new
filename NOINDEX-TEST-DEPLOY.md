# Тестовый деплой закрыт от индексации

Для тестового домена проект закрыт от поисковых систем на нескольких уровнях:

- `app/robots.ts`: `Disallow: /` для всех роботов;
- `app/layout.tsx`: глобальный `robots: { index: false, follow: false }`;
- `next.config.js`: HTTP-заголовок `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`;
- `vercel.json`: дублирующий `X-Robots-Tag` для Vercel;
- `index.html` и `inventory.html`: meta `robots` со значением `noindex,nofollow,noarchive,noimageindex`;
- `app/sitemap.ts`: возвращает пустой sitemap.

Перед переносом на боевой домен эти настройки нужно вернуть: открыть `robots`, включить `index/follow`, вернуть sitemap и убрать `X-Robots-Tag`.
