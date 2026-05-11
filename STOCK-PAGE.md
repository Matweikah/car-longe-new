# Страница автомобилей в наличии

Источник данных для текущей версии: загруженный XML `yandex.xml`.

В каталог перенесены все офферы из XML: 23 авто. В карточках используются названия, бренды, цены, описания, ссылки и изображения из XML-фида.

Изображения подключены по оригинальным URL из `car-lounge.ru/uploads/...`; для Next.js добавлен remote pattern `car-lounge.ru/uploads/**`, чтобы `next/image` оптимизировал их на стороне приложения.

Дальше можно добавить обогащение характеристик с детальных страниц `/ru/cars/...` или `/avtomobili_v_nalichii_msk_spb/...`, когда будет доступен стабильный парсер/endpoint.


## ver14 filter update
- Цена переведена на интерактивный range-ползунок по реальному min/max из XML.
- Фильтрация по марке, году, топливу и цене применяется сразу без кнопки поиска.
- Кнопка поиска заменена на «Сбросить фильтр».
- Для Next.js добавлен клиентский компонент `components/stock/StockCatalogClient.tsx`, остальная страница остается серверной.


## Ver15 SEO / UX filter notes
- Filters on `/avtomobili-v-nalichii` work client-side and do not create indexable filtered URLs.
- `app/robots.ts` blocks possible query-based filtered URLs (`/avtomobili-v-nalichii?*`) from robots if they appear later.
- The catalog page has a canonical URL pointing to `/avtomobili-v-nalichii`.
- Price output in cards uses a fixed-height price row so card layout does not jump.
- The filter controls were compacted for better usability while preserving the Car Lounge design system.
