import Image from 'next/image';
import { ArrowRight, BadgeCheck, ChevronDown, Sparkles } from 'lucide-react';

type SelectFieldProps = {
  label: string;
  value: string;
};

const fields: SelectFieldProps[] = [
  { label: 'Марка', value: 'Любая' },
  { label: 'Модель', value: 'Любая' },
  { label: 'Год от', value: '2020' },
  { label: 'Цена до', value: '25 млн ₽' }
];

function SelectField({ label, value }: SelectFieldProps) {
  return (
    <button className="flex h-14 items-center justify-between rounded-2xl border border-line bg-white px-4 text-left transition hover:border-champagne/70" type="button">
      <span>
        <span className="block text-[11px] uppercase tracking-[0.16em] text-muted">{label}</span>
        <span className="mt-0.5 block text-sm font-medium text-ink">{value}</span>
      </span>
      <ChevronDown className="h-4 w-4 text-champagne" aria-hidden="true" />
    </button>
  );
}

export function HeroSearch() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-lounge.svg"
          alt="Премиальный автомобиль на фоне города"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(217,164,95,0.25),transparent_28%),linear-gradient(90deg,rgba(32,35,39,0.96),rgba(32,35,39,0.72)_46%,rgba(32,35,39,0.5))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-champagne backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Новые поступления каждую неделю
            </div>
            <h1 id="hero-title" className="text-balance text-4xl font-semibold uppercase leading-[1.06] tracking-[0.05em] sm:text-5xl lg:text-[56px]">
              Автомобили в наличии и под заказ
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              Подбор премиальных авто из Южной Кореи, Китая, США и Европы. Компактный поиск, понятные условия и быстрый переход к заявке.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/75">
              {['32 авто в наличии', '204 318 авто под заказ', 'поставка от 14 дней'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-2">
                  <BadgeCheck className="h-4 w-4 text-champagne" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <form className="rounded-[28px] border border-white/10 bg-ivory p-4 text-ink shadow-soft sm:p-5" aria-label="Поиск автомобиля">
            <div className="mb-4 flex rounded-2xl bg-white p-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {['Корея', 'Китай', 'В наличии'].map((tab, index) => (
                <button key={tab} type="button" className={`flex-1 rounded-xl px-3 py-3 transition ${index === 0 ? 'bg-ink text-white shadow-card' : 'hover:text-ink'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((field) => (
                <SelectField key={field.label} {...field} />
              ))}
            </div>
            <button type="submit" className="mt-4 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-ink px-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-graphite">
              Найти авто
              <ArrowRight className="h-4 w-4 text-champagne" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
