'use client';

import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { youtubeShorts, type YouTubeShort } from '@/data/youtube-shorts';
import { CarouselControls } from './CarouselControls';

function getEmbedUrl(short: YouTubeShort) {
  return `https://www.youtube.com/embed/${short.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export function YoutubeShortsSection() {
  const [activeShort, setActiveShort] = useState<YouTubeShort | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section id="youtube" className="bg-white py-16 sm:py-20" aria-labelledby="youtube-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne">Видео</p>
            <h2 id="youtube-title" className="mt-2 text-3xl font-semibold uppercase tracking-[0.08em] text-ink sm:text-4xl">
              Мы в YouTube <span className="text-base font-medium normal-case tracking-normal text-muted">@carlounge_life</span>
            </h2>
          </div>
          <CarouselControls targetRef={carouselRef} className="hidden sm:flex" ariaLabel="Прокрутка YouTube Shorts" />
        </div>

        <div
          ref={carouselRef}
          className="flex snap-x gap-5 overflow-x-auto px-0.5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Карусель YouTube Shorts"
        >
          {youtubeShorts.map((short) => (
            <button
              key={short.id}
              type="button"
              data-carousel-card
              onClick={() => setActiveShort(short)}
              className="group relative aspect-[9/16] w-[205px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-ink text-left shadow-card transition hover:-translate-y-1 hover:shadow-soft sm:w-[225px] lg:w-[245px]"
              aria-label={`Открыть shorts: ${short.title}`}
            >
              <Image
                src={short.thumbnail}
                alt={short.alt}
                fill
                sizes="(max-width: 640px) 205px, (max-width: 1024px) 225px, 245px"
                className="object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#ff0000] text-white shadow-soft transition group-hover:scale-105">
                <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-[15px]">
                <span className="mb-2 inline-flex rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">Shorts</span>
                <span className="block text-[13px] font-semibold uppercase leading-5 tracking-[0.075em] text-white">{short.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeShort ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Просмотр shorts: ${activeShort.title}`}>
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] bg-ink shadow-soft">
            <button
              type="button"
              onClick={() => setActiveShort(null)}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition hover:bg-champagne"
              aria-label="Закрыть видео"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="aspect-[9/16] w-full">
              <iframe
                className="h-full w-full"
                src={getEmbedUrl(activeShort)}
                title={activeShort.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
