'use client';

import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { inventorySlides } from '@/data/cars';
import { CarCard } from './CarCard';
import { CarouselControls } from './CarouselControls';

export function InventorySection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section id="inventory" className="bg-ivory py-16 sm:py-20" aria-labelledby="inventory-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">В наличии</p>
            <h2 id="inventory-title" className="mt-2 text-3xl font-semibold uppercase tracking-[0.08em] text-ink sm:text-4xl">
              Автомобили в наличии <span className="text-base font-medium text-muted">22 авто</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a href="/avtomobili-v-nalichii" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink hover:text-bronze">
              Смотреть все авто
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <CarouselControls targetRef={carouselRef} className="hidden sm:flex" ariaLabel="Прокрутка автомобилей" />
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Карусель автомобилей в наличии"
        >
          {inventorySlides.map((car) => (
            <div key={car.id} data-carousel-card className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
