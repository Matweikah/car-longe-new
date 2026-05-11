# YouTube Shorts

Источник карточек взят из присланного HTML-файла: блок `#youtube` с `i.ytimg.com` thumbnails.

В проекте обновлены:
- `index.html` — использует прямые URL `https://i.ytimg.com/.../oar2.jpg` из HTML.
- `data/youtube-shorts.ts` — те же URL для Next.js.
- `next.config.js` — добавлен remote pattern для `i.ytimg.com`, чтобы `next/image` мог оптимизировать превью на стороне Next.js.

Карточки сужены и приведены к `aspect-ratio: 9 / 16`, чтобы thumbnails не растягивались и не появлялись боковые поля.
