export function YandexReviewsSection() {
  return (
    <section id="reviews" className="bg-ivory py-16 sm:py-20" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">Отзывы и карта</p>
            <h2 id="reviews-title" className="mt-2 text-3xl font-semibold uppercase tracking-[0.08em] text-ink sm:text-4xl">
              Нас рекомендуют <span className="text-base font-medium normal-case tracking-normal text-muted">на Яндекс Картах</span>
            </h2>
          </div>
          <a
            className="inline-flex min-h-[52px] items-center justify-center rounded-[18px] border border-ink px-6 text-[13px] font-extrabold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white"
            href="https://yandex.com/maps/org/car_lounge/126476667101/"
            target="_blank"
            rel="noreferrer"
          >
            Открыть в Яндекс Картах
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-stretch">
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
            <div className="border-b border-line px-5 py-4 sm:px-6">
              <p className="m-0 text-sm font-extrabold uppercase tracking-[0.16em] text-ink">Отзывы клиентов</p>
              <p className="mt-1 text-sm leading-6 text-muted">Живой виджет с отзывами о Car Lounge.</p>
            </div>
            <div className="h-[620px] overflow-hidden sm:h-[700px] lg:h-[800px]">
              <iframe
                className="h-full w-full border-0"
                src="https://yandex.ru/maps-reviews-widget/126476667101?comments"
                title="Отзывы Car Lounge на Яндекс Картах"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[28px] border border-line bg-white p-5 shadow-card sm:p-6">
              <p className="m-0 text-sm font-extrabold uppercase tracking-[0.16em] text-ink">Car Lounge</p>
              <p className="mt-2 text-sm leading-6 text-muted">Санкт-Петербург. Постройте маршрут или посмотрите карточку компании на карте.</p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-white shadow-card sm:min-h-[430px] lg:min-h-[624px]">
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src="https://yandex.com/map-widget/v1/?ll=30.579715%2C59.828916&mode=search&oid=126476667101&ol=biz&z=10.37"
                title="Car Lounge на карте Санкт-Петербурга"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
