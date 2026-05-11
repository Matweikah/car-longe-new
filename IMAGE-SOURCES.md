# Источники изображений автомобилей

Изменения из пользовательского `index.html` сохранены и перенесены в Next.js-данные `data/cars.ts`.

| Авто | URL изображения |
| --- | --- |
| Land Rover Range Rover P360 MHEV Long | `https://car-lounge.ru/classes/thumb.php?src=/uploads/car/f3/f300ad71c46b75bd.jpeg&w=620&h=440&q=85` |
| Lexus LX 500D | `https://car-lounge.ru/classes/thumb.php?src=/uploads/car/7f/7f6459138f85ea00.jpeg&w=620&h=440&q=85` |
| Mercedes-Benz V300 Extra Long | `https://car-lounge.ru/classes/thumb.php?src=/uploads/car/68/68604e37af4b0c76.jpeg&w=620&h=440&q=85` |
| BMW X5 xDrive40i M Sport | `https://car-lounge.ru/classes/thumb.php?src=/uploads/car/97/97c06bae1a1a1a98.jpeg&w=620&h=440&q=85` |

Для статичного `index.html` добавлены `width="620"`, `height="440"`, `loading="lazy"`, `decoding="async"` и `preconnect` к `https://car-lounge.ru`.

Для Next.js добавлен `next.config.js`, чтобы `next/image` мог оптимизировать внешние изображения с домена `car-lounge.ru`.
