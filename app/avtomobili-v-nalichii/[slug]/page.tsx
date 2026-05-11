import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StockCarCard } from '@/components/stock/StockCarCard';
import { stockBrands, stockCars } from '@/data/stock-cars';

const siteUrl = 'https://car-lounge.ru';
const catalogUrl = `${siteUrl}/avtomobili-v-nalichii`;

function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-+|-+$/g, '');
}

function findBrandBySlug(slug: string) {
  return stockBrands.find((brand) => brandSlug(brand) === slug);
}

export function generateStaticParams() {
  return [
    ...stockCars.map((car) => ({ slug: car.id })),
    ...stockBrands.map((brand) => ({ slug: brandSlug(brand) })),
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const car = stockCars.find((item) => item.id === params.slug);
  const brand = findBrandBySlug(params.slug);

  if (car) {
    return {
      title: `${car.title} — автомобиль в наличии | Car Lounge`,
      description: `${car.title} в наличии в Car Lounge. Цена ${car.price}, фото, характеристики, комплектация и сопровождение сделки.`,
      alternates: { canonical: `/avtomobili-v-nalichii/${car.id}` },
      openGraph: {
        title: `${car.title} — Car Lounge`,
        description: `${car.title}: ${car.engine ?? 'характеристики уточняются'}, ${car.powerHp ? `${car.powerHp} л.с.` : 'мощность уточняется'}, ${car.fuel ?? 'тип топлива уточняется'}.`,
        images: [{ url: car.image }],
        type: 'website',
      },
    };
  }

  if (brand) {
    return {
      title: `${brand} в наличии — Car Lounge`,
      description: `${brand} в наличии в Car Lounge: актуальные автомобили, цены, фото, характеристики, комплектации и сопровождение покупки.`,
      alternates: { canonical: `/avtomobili-v-nalichii/${params.slug}` },
      openGraph: {
        title: `${brand} в наличии — Car Lounge`,
        description: `Каталог ${brand} в наличии: премиальные автомобили с актуальными ценами, фото и характеристиками.`,
        type: 'website',
      },
    };
  }

  return { title: 'Автомобиль не найден — Car Lounge' };
}

function CarJsonLd({ car }: { car: (typeof stockCars)[number] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Автомобили в наличии', item: catalogUrl },
          { '@type': 'ListItem', position: 3, name: car.title, item: `${catalogUrl}/${car.id}` },
        ],
      },
      {
        '@type': 'Product',
        name: car.title,
        brand: { '@type': 'Brand', name: car.brand },
        image: car.image,
        description: `${car.title}: ${car.engine ?? 'характеристики уточняются'}, ${car.powerHp ? `${car.powerHp} л.с.` : 'мощность уточняется'}, ${car.fuel ?? 'тип топлива уточняется'}.`,
        url: `${catalogUrl}/${car.id}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'RUB',
          price: car.priceValue,
          availability: 'https://schema.org/InStock',
          url: `${catalogUrl}/${car.id}`,
        },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function BrandJsonLd({ brand, slug, count }: { brand: string; slug: string; count: number }) {
  const brandUrl = `${catalogUrl}/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Автомобили в наличии', item: catalogUrl },
          { '@type': 'ListItem', position: 3, name: brand, item: brandUrl },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${brand} в наличии Car Lounge`,
        url: brandUrl,
        numberOfItems: count,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        <li><a href="/" className="transition hover:text-champagne">Главная</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/avtomobili-v-nalichii" className="transition hover:text-champagne">Автомобили в наличии</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-champagne">{current}</li>
      </ol>
    </nav>
  );
}

export default function StockSlugPage({ params }: { params: { slug: string } }) {
  const car = stockCars.find((item) => item.id === params.slug);
  const brand = findBrandBySlug(params.slug);

  if (!car && !brand) notFound();

  if (brand) {
    const cars = stockCars.filter((item) => item.brand === brand);
    return (
      <>
        <BrandJsonLd brand={brand} slug={params.slug} count={cars.length} />
        <Header />
        <main>
          <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-16" aria-labelledby="brand-stock-title">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(217,164,95,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" aria-hidden="true" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Breadcrumbs current={brand} />
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Автомобили в наличии</p>
              <h1 id="brand-stock-title" className="mt-3 max-w-4xl text-4xl font-semibold uppercase leading-tight tracking-[0.08em] sm:text-5xl">{brand} в наличии</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">Актуальные автомобили {brand} в наличии в Car Lounge: фото, цены, характеристики, комплектации и сопровождение покупки с доставкой по России.</p>
            </div>
          </section>
          <section className="bg-ivory py-14 sm:py-16" aria-labelledby="brand-grid-title">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 id="brand-grid-title" className="text-3xl font-semibold uppercase tracking-[0.08em] text-ink">Доступные автомобили <span className="text-base font-medium text-muted">{cars.length} авто</span></h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {cars.map((item, index) => <StockCarCard key={item.id} car={item} priority={index < 2} />)}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!car) notFound();

  const characteristics = [
    ['Год выпуска', String(car.year)],
    ['Кузов', car.body ?? 'Уточняется'],
    ['Объем', car.engine ?? 'Уточняется'],
    ['Мощность', car.powerHp ? `${car.powerHp} л.с.` : 'Уточняется'],
    ['Топливо', car.fuel ?? 'Уточняется'],
    ['Комплектация', car.trim ?? 'Уточняется'],
    ['Коробка', car.gearbox ?? 'Уточняется'],
    ['Привод', car.drive ?? 'Уточняется'],
    ['Руль', car.wheel ?? 'Уточняется'],
  ];

  return (
    <>
      <CarJsonLd car={car} />
      <Header />
      <main>
        <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-16" aria-labelledby="car-title">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(217,164,95,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs current={car.title} />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Автомобиль в наличии</p>
            <h1 id="car-title" className="mt-3 max-w-4xl text-4xl font-semibold uppercase leading-tight tracking-[0.08em] sm:text-5xl">{car.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">{car.title} в наличии в Car Lounge. Актуальная цена, фото, характеристики, комплектация и сопровождение сделки.</p>
          </div>
        </section>

        <section className="bg-ivory py-14 sm:py-16" aria-label={`Карточка ${car.title}`}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.image} alt={car.alt} className="h-full min-h-[360px] w-full object-cover" />
            </div>
            <article className="rounded-[28px] border border-line bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">Цена</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-ink">{car.price}</p>
              <dl className="mt-6 grid gap-3">
                {characteristics.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0">
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="text-right text-base font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <a href={car.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-champagne hover:text-ink">
                Открыть исходную карточку
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
