import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { StockCar } from '@/data/stock-cars';


export function StockCarCard({ car, priority = false }: { car: StockCar; priority?: boolean }) {
  const detailHref = `/avtomobili-v-nalichii/${car.id}`;
  const facts = [
    { label: 'Объем', value: car.engine ?? '—' },
    { label: 'Мощность', value: car.powerHp ? `${car.powerHp} л.с.` : '—' },
    { label: 'Топливо', value: car.fuel ?? '—' },
  ];

  const previewTags = [car.trim, car.gearbox, car.drive, car.wheel ? `Руль ${car.wheel.toLowerCase()}` : null, ...(car.features ?? [])].filter(Boolean) as string[];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <a href={detailHref} className="block" aria-label={`Подробнее о ${car.title}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ece7df]">
          <Image
            src={car.image}
            alt={car.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/88 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink backdrop-blur">
            {car.badge}
          </span>
        </div>
      </a>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex min-h-[78px] items-start justify-between gap-4">
          <h3 className="min-h-[58px] max-h-[58px] overflow-hidden text-[17px] font-semibold uppercase leading-[1.16] tracking-[0.04em] text-ink [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {car.title}
          </h3>
          <a
            href={detailHref}
            aria-label={`Открыть ${car.title}`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-champagne hover:text-ink"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <dl className="mt-2 grid min-h-[50px] grid-cols-3 gap-2 text-xs">
          {facts.map(({ label, value }) => (
            <div key={label} className="flex h-[50px] min-w-0 flex-col justify-center rounded-[16px] bg-ink px-3 text-champagne">
              <dt className="mb-1 truncate text-[9px] uppercase leading-none tracking-[0.16em] text-champagne/65">{label}</dt>
              <dd className="min-w-0 truncate text-[14px] font-semibold leading-tight text-champagne">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 flex min-h-[86px] max-h-[86px] flex-wrap content-start gap-2 overflow-hidden text-[12px] text-muted">
          {previewTags.slice(0, 5).map((feature) => (
            <span key={feature} className="max-w-full truncate rounded-full border border-line px-3 py-1">{feature}</span>
          ))}
        </div>

        <div className="mt-auto flex h-[76px] min-h-[76px] items-start border-t border-line pt-5">
          <p className="min-w-0 text-2xl font-semibold leading-tight tracking-tight text-ink">{car.price}</p>
        </div>
      </div>
    </article>
  );
}
