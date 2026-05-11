import Image from 'next/image';
import { Menu, Phone } from 'lucide-react';

const navItems = [
  { label: 'Авто в наличии', href: '/avtomobili-v-nalichii' },
  { label: 'Авто из Кореи', href: '/#brands-korea' },
  { label: 'Авто из Китая', href: '/#brands-china' },
  { label: 'О нас', href: '/#about' },
  { label: 'Контакты', href: '/#contacts' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <a href="/" className="group inline-flex items-center" aria-label="Car Lounge — на главную">
          <Image
            src="/images/logo.svg"
            alt="Car Lounge"
            width={148}
            height={60}
            priority
            className="h-8 w-auto opacity-95 transition group-hover:opacity-100 sm:h-9"
          />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.15em] text-white/78 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-champagne">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="tel:+78122407788" className="hidden items-center gap-2 text-[13px] font-medium tracking-[0.08em] text-champagne md:flex">
          <Phone className="h-4 w-4" aria-hidden="true" />
          8 (812) 240-77-88
        </a>

        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden" aria-label="Открыть меню">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
