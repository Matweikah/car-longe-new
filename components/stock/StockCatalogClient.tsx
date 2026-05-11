"use client";

import { useEffect, useMemo, useState } from 'react';
import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { StockCarCard } from '@/components/stock/StockCarCard';
import type { StockCar } from '@/data/stock-cars';

type StockCatalogClientProps = {
  cars: StockCar[];
  brands: string[];
  years: number[];
  fuels: string[];
  minPrice: number;
  maxPrice: number;
};

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

export function StockCatalogClient({ cars, brands, years, fuels, minPrice, maxPrice }: StockCatalogClientProps) {
  const [brand, setBrand] = useState('all');
  const [yearFrom, setYearFrom] = useState('all');
  const [fuel, setFuel] = useState('all');
  const [priceTo, setPriceTo] = useState(maxPrice);

  useEffect(() => {
    setPriceTo(maxPrice);
  }, [maxPrice]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const isBrandMatched = brand === 'all' || car.brand === brand;
      const isYearMatched = yearFrom === 'all' || car.year >= Number(yearFrom);
      const isFuelMatched = fuel === 'all' || car.fuel === fuel;
      const isPriceMatched = car.priceValue <= priceTo;
      return isBrandMatched && isYearMatched && isFuelMatched && isPriceMatched;
    });
  }, [brand, cars, fuel, priceTo, yearFrom]);

  const resetFilters = () => {
    setBrand('all');
    setYearFrom('all');
    setFuel('all');
    setPriceTo(maxPrice);
  };

  return (
    <>
      <section className="bg-ivory py-6 sm:py-8" aria-label="Фильтр автомобилей в наличии">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[22px] border border-line bg-white p-3 shadow-card">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                <Filter className="h-4 w-4 text-champagne" aria-hidden="true" />
                Фильтр каталога
              </div>
              <p className="text-sm text-muted" aria-live="polite">
                Найдено: <strong className="font-semibold text-ink">{filteredCars.length}</strong> из {cars.length}
              </p>
            </div>

            <div className="grid gap-2.5 lg:grid-cols-[0.9fr_0.85fr_0.9fr_1.8fr_auto]" role="search" aria-label="Фильтр каталога автомобилей">
              <label className="min-h-[42px] rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-muted">
                <span className="block text-[9px] uppercase leading-none tracking-[0.14em] text-muted/75">Марка</span>
                <select value={brand} onChange={(event) => setBrand(event.target.value)} className="mt-0.5 w-full bg-transparent text-[13px] font-semibold leading-tight text-ink outline-none" aria-label="Марка автомобиля">
                  <option value="all">Любая</option>
                  {brands.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <label className="min-h-[42px] rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-muted">
                <span className="block text-[9px] uppercase leading-none tracking-[0.14em] text-muted/75">Год от</span>
                <select value={yearFrom} onChange={(event) => setYearFrom(event.target.value)} className="mt-0.5 w-full bg-transparent text-[13px] font-semibold leading-tight text-ink outline-none" aria-label="Год выпуска от">
                  <option value="all">Любой</option>
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </label>

              <label className="min-h-[42px] rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-muted">
                <span className="block text-[9px] uppercase leading-none tracking-[0.14em] text-muted/75">Топливо</span>
                <select value={fuel} onChange={(event) => setFuel(event.target.value)} className="mt-0.5 w-full bg-transparent text-[13px] font-semibold leading-tight text-ink outline-none" aria-label="Тип топлива">
                  <option value="all">Любое</option>
                  {fuels.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <div className="min-h-[42px] rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-muted">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] uppercase leading-none tracking-[0.14em] text-muted/75">Цена до</span>
                  <strong className="whitespace-nowrap text-xs font-semibold text-ink">{formatPrice(priceTo)}</strong>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="1"
                  value={priceTo}
                  onChange={(event) => setPriceTo(Number(event.target.value))}
                  className="mt-1 w-full accent-[#d9a45f]"
                  aria-label="Максимальная цена автомобиля"
                />
                <div className="hidden">
                  <span>{formatPrice(minPrice)}</span>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
              </div>

              <button type="button" onClick={resetFilters} className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-ink transition hover:border-champagne hover:bg-champagne/10">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-16 sm:pb-20" aria-labelledby="stock-grid-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">Каталог</p>
              <h2 id="stock-grid-title" className="mt-2 text-3xl font-semibold uppercase tracking-[0.08em] text-ink sm:text-4xl">
                Автомобили в наличии <span className="text-base font-medium text-muted">{filteredCars.length} авто</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">Премиальные автомобили в наличии в Санкт-Петербурге: внедорожники, седаны, купе и минивэны с актуальными фото, ценами, комплектациями и проверенными документами. Выберите марку, бюджет и тип двигателя, чтобы быстро найти подходящий автомобиль в Car Lounge.</p>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {filteredCars.map((car, index) => (
                <StockCarCard key={car.id} car={car} priority={index < 2} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-line bg-white p-8 text-center shadow-card">
              <SlidersHorizontal className="mx-auto h-8 w-8 text-champagne" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold uppercase tracking-[0.08em] text-ink">Автомобили не найдены</h3>
              <p className="mt-2 text-sm text-muted">Измените параметры фильтра или сбросьте их.</p>
              <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-champagne hover:text-ink">Сбросить фильтр</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
