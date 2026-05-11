import { BadgeCheck, Globe2, Handshake, Route } from 'lucide-react';

const advantages = [
  {
    icon: Globe2,
    title: 'Экспертиза в премиум-сегменте',
    text: 'Два десятилетия работы с премиальными автомобилями помогают нам точно понимать рынок, продукт и реальные преимущества каждой комплектации.',
  },
  {
    icon: Route,
    title: 'Мировые автосалоны и аукционы',
    text: 'Регулярно посещаем международные автосалоны и аукционы, поэтому видим тенденции рынка и находим сильные предложения раньше других.',
  },
  {
    icon: Handshake,
    title: 'Прямые контракты с поставщиками',
    text: 'Работаем с проверенными партнерами напрямую, контролируем происхождение автомобиля и прозрачность сделки на каждом этапе.',
  },
  {
    icon: BadgeCheck,
    title: 'Безопасная логистика до РФ',
    text: 'Знаем все этапы международной поставки: от проверки и покупки до документов, маршрута, таможни и передачи автомобиля клиенту.',
  },
];

export function AdvantagesSection() {
  return (
    <section id="about" className="bg-ivory py-16 sm:py-20" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] bg-ink p-7 text-white shadow-soft sm:p-9">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-champagne">
              Преимущества
            </p>
            <h2 id="about-title" className="max-w-xl text-3xl font-bold uppercase leading-tight tracking-[0.08em] text-white sm:text-4xl">
              Почему клиенты доверяют нам?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
              Наш фундамент — глубокие экспертные знания и связи, наработанные за два десятилетия в премиум-сегменте.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
              Мы не просто посредники, а специалисты, которые помогают найти лучший вариант, обеспечить безопасность сделки и оперативно доставить автомобиль в РФ.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {advantages.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-ivory text-champagne ring-1 ring-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-extrabold uppercase leading-snug tracking-[0.1em] text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
