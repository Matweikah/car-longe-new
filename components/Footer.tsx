import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contacts" className="bg-ink py-10 text-white" aria-labelledby="contacts-title">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <h2 id="contacts-title" className="inline-flex">
            <Image
              src="/images/logo.svg"
              alt="Car Lounge"
              width={158}
              height={64}
              className="h-12 w-auto opacity-95"
            />
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
            Подбор, проверка и поставка премиальных автомобилей из Южной Кореи, Китая, Европы и США. Работаем прозрачно, сопровождаем сделку и логистику до передачи автомобиля клиенту.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/75">
          <a href="tel:+78122407788" className="flex items-center gap-3 hover:text-champagne">
            <Phone className="h-4 w-4" aria-hidden="true" />
            8 (812) 240-77-88
          </a>
          <p className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-champagne" aria-hidden="true" />
            Санкт-Петербург
          </p>
        </div>
      </div>
    </footer>
  );
}
