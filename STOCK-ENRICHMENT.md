# Stock card characteristics enrichment

In ver17 the visible card preview no longer shows `brand` or `mileage`. The preview uses compact public-facing facts: year, fuel type, and inferred body type.

Primary stock data still comes from the uploaded `yandex.xml`: title, vendor, price, picture, description, and URL. The XML includes limited characteristics, so the card tags continue to use the best short options available from XML descriptions.

For future enrichment, parse detail pages under `/avtomobili_v_nalichii_msk_spb/` or the corresponding `/ru/cars/...` pages and map fields into `engine`, `powerHp`, `drive`, `body`, `gearbox`, and `fuel` in `data/stock-cars.ts`. The component already supports these fields without layout changes.
