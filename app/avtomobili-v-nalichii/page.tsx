import type { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Truck, SearchCheck, BadgeCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StockCatalogClient } from '@/components/stock/StockCatalogClient';
import { stockBrands, stockCars, stockFuels, stockPriceMax, stockPriceMin, stockYears } from '@/data/stock-cars';

export const metadata: Metadata = {
  title: 'Автомобили в наличии — Car Lounge',
  description: 'Премиальные автомобили в наличии в Car Lounge: актуальные цены, фото, комплектации, проверка сделки и доставка по РФ.',
  openGraph: {
    title: 'Автомобили в наличии — Car Lounge',
    description: 'Каталог премиальных авто в наличии: фото, цены, характеристики, комплектации и сопровождение сделки Car Lounge.',
    type: 'website'
  },
  alternates: {
    canonical: '/avtomobili-v-nalichii'
  },
  metadataBase: new URL('https://car-lounge.ru'),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true }
  }
};

const trustItems = [
  { icon: ShieldCheck, title: 'Проверяем автомобиль', text: 'Сверяем состояние, документы, комплектацию и историю до оплаты.' },
  { icon: SearchCheck, title: 'Даем понятный расчет', text: 'Показываем стоимость, этапы сделки и возможные расходы без скрытых условий.' },
  { icon: Truck, title: 'Ведем логистику', text: 'Сопровождаем доставку, таможню и передачу автомобиля клиенту.' },
  { icon: BadgeCheck, title: 'Работаем по договору', text: 'Фиксируем условия и ответственность на каждом этапе покупки.' }
];


const siteUrl = 'https://car-lounge.ru';
const pageUrl = `${siteUrl}/avtomobili-v-nalichii`;

function getCatalogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Автомобили в наличии', item: pageUrl },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Автомобили в наличии Car Lounge',
        description: 'Каталог премиальных автомобилей в наличии с актуальными ценами, фото и характеристиками.',
        url: pageUrl,
        numberOfItems: stockCars.length,
        itemListElement: stockCars.map((car, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${pageUrl}/${car.id}`,
          item: {
            '@type': 'Product',
            name: car.title,
            brand: { '@type': 'Brand', name: car.brand },
            image: car.image,
            description: `${car.title}: ${car.engine ?? 'характеристики уточняются'}, ${car.powerHp ? `${car.powerHp} л.с.` : 'мощность уточняется'}, ${car.fuel ?? 'тип топлива уточняется'}.`,
            url: `${pageUrl}/${car.id}`,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'RUB',
              price: car.priceValue,
              availability: 'https://schema.org/InStock',
              url: `${pageUrl}/${car.id}`,
            },
          },
        })),
      },
    ],
  };
}

export default function StockCarsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCatalogJsonLd()) }}
      />
      <Header />
      <main>
        <section
          className="relative overflow-hidden bg-ink py-9 text-white sm:py-11"
          aria-labelledby="stock-title"
          style={{ backgroundImage: "url('/images/hero-lounge.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,35,39,0.92),rgba(32,35,39,0.72)_48%,rgba(32,35,39,0.42))]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(217,164,95,0.18),transparent_34%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Хлебные крошки">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                <li>
                  <a href="/" className="inline-flex items-center gap-2 transition hover:text-champagne">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Главная
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-champagne">Автомобили в наличии</li>
              </ol>
            </nav>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Автомобили в наличии</p>
                <h1 id="stock-title" className="mt-3 max-w-3xl text-3xl font-semibold uppercase leading-tight tracking-[0.08em] sm:text-4xl lg:text-[42px]">
                  Автомобили в наличии
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/72 sm:text-[15px]">
                  Премиальные авто в наличии в Car Lounge: актуальные фото, цены, характеристики и комплектации. Подберем автомобиль под бюджет, проверим документы и сопроводим покупку с доставкой по России.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/[0.07] p-3">
                    <p className="text-2xl font-semibold text-champagne">{stockCars.length}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">авто</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.07] p-3">
                    <p className="text-2xl font-semibold text-champagne">{stockBrands.length}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">марок</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.07] p-3">
                    <p className="text-2xl font-semibold text-champagne">0</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">км</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <StockCatalogClient
          cars={stockCars}
          brands={stockBrands}
          years={stockYears}
          fuels={stockFuels}
          minPrice={stockPriceMin}
          maxPrice={stockPriceMax}
        />

        <section className="bg-white py-14 sm:py-16" aria-labelledby="stock-trust-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">Сопровождение</p>
                <h2 id="stock-trust-title" className="mt-2 text-3xl font-semibold uppercase tracking-[0.08em] text-ink sm:text-4xl">Что входит в покупку</h2>
                <p className="mt-4 text-base leading-7 text-muted">Мы не просто показываем карточку автомобиля, а сопровождаем выбор, проверку, документы и логистику до передачи ключей.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="rounded-[26px] border border-line bg-ivory p-5">
                      <Icon className="h-6 w-6 text-champagne" aria-hidden="true" />
                      <h3 className="mt-4 text-base font-semibold uppercase tracking-[0.08em] text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
