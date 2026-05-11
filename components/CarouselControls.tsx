'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { RefObject } from 'react';

type CarouselControlsProps = {
  targetRef: RefObject<HTMLElement>;
  className?: string;
  ariaLabel?: string;
};

export function CarouselControls({ targetRef, className = '', ariaLabel = 'Прокрутка карусели' }: CarouselControlsProps) {
  const scroll = (direction: 'prev' | 'next') => {
    const target = targetRef.current;
    if (!target) return;

    const card = target.querySelector<HTMLElement>('[data-carousel-card]');
    const styles = window.getComputedStyle(target);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '20') || 20;
    const step = card ? card.getBoundingClientRect().width + gap : Math.round(target.clientWidth * 0.85);
    const nextLeft = direction === 'next' ? target.scrollLeft + step : target.scrollLeft - step;

    target.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: 'smooth'
    });
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-label={ariaLabel}>
      <button
        type="button"
        onClick={() => scroll('prev')}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-champagne hover:text-bronze"
        aria-label="Прокрутить назад"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scroll('next')}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-champagne hover:text-bronze"
        aria-label="Прокрутить вперед"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
