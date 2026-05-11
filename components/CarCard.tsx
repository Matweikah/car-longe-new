import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Car } from '@/data/cars';

export function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#ece7df]">
        <Image
          src={car.image}
          alt={car.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/88 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink backdrop-blur">
          {car.badge}
        </span>
      </div>
      <div className="p-5">
        <h3 className="min-h-[52px] text-lg font-semibold uppercase leading-snug tracking-[0.04em] text-ink">
          {car.title}
        </h3>
        <p className="mt-3 text-sm text-muted">{car.meta}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="text-2xl font-semibold tracking-tight text-ink">{car.price}</p>
          <a href="#contacts" aria-label={`Подробнее о ${car.title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-champagne hover:text-ink">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
