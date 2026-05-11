# Font test: Montserrat

Версия проекта с заменой основного шрифта на бесплатный Google Font **Montserrat**.

Что изменено:

- Next.js: `app/layout.tsx` теперь использует `Montserrat` из `next/font/google`.
- Tailwind: `fontFamily.sans` привязан к CSS variable `--font-montserrat`.
- Static HTML: `index.html` и `inventory.html` подключают Montserrat через Google Fonts.
- CSS fallback сохранен: Montserrat → Inter → system sans-serif.

Сетка, SEO, компоненты, маршруты и контент не менялись.
