import Image from 'next/image';
import { SlidersHorizontal, TriangleAlert } from 'lucide-react';
import { Brand, chinaBrands, koreaBrands } from '@/data/cars';

type BrandMarketProps = {
  id: string;
  titleId: string;
  kicker: string;
  title: string;
  count: string;
  ctaLabel: string;
  brands: Brand[];
  compactTop?: boolean;
};

function BrandMarket({ id, titleId, kicker, title, count, ctaLabel, brands, compactTop = false }: BrandMarketProps) {
  return (
    <section id={id} className={`bg-white ${compactTop ? 'pb-16 pt-0 sm:pb-20' : 'py-16 sm:py-20'}`} aria-labelledby={titleId}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">{kicker}</p>
            <h2 id={titleId} className="mt-2 text-3xl font-semibold uppercase tracking-[0.08em] text-ink sm:text-4xl">
              {title} <span className="text-base font-medium normal-case tracking-normal text-muted">{count}</span>
            </h2>
          </div>
          <a href="#about" className="inline-flex items-center gap-3 rounded-2xl border border-ink px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white">
            <TriangleAlert className="h-4 w-4" aria-hidden="true" />
            Как проходит покупка
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-[28px] border border-line bg-ivory p-3 sm:grid-cols-3 sm:gap-3 sm:p-5 lg:grid-cols-6">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              className="group flex min-h-[58px] items-center gap-3 rounded-2xl border border-transparent bg-white/55 px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-ink transition hover:-translate-y-0.5 hover:border-champagne/50 hover:bg-white hover:text-bronze hover:shadow-card sm:text-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white shadow-sm sm:h-10 sm:w-10">
                <Image
                  src={brand.icon}
                  alt={`Логотип ${brand.name}`}
                  width={32}
                  height={32}
                  loading="lazy"
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="truncate">{brand.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a href="#top" className="inline-flex h-12 items-center gap-3 rounded-2xl bg-graphite px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-ink">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

export function BrandsSection() {
  return (
    <>
      <BrandMarket
        id="brands-korea"
        titleId="brands-korea-title"
        kicker="Под заказ"
        title="Из Южной Кореи"
        count="204 318 авто"
        ctaLabel="Расширенный поиск по Корее"
        brands={koreaBrands}
      />
      <BrandMarket
        id="brands-china"
        titleId="brands-china-title"
        kicker="Китайский рынок"
        title="Из Китая"
        count="под заказ"
        ctaLabel="Расширенный поиск по Китаю"
        brands={chinaBrands}
        compactTop
      />
    </>
  );
}
