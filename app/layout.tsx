import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://car-lounge.ru'),
  title: 'Car Lounge — автомобили в наличии и под заказ',
  description: 'Премиальные автомобили в наличии, а также подбор и поставка авто из Кореи, Китая, США и Европы.',
  openGraph: {
    title: 'Car Lounge — автомобили в наличии и под заказ',
    description: 'Компактный каталог премиальных автомобилей с быстрым поиском и SEO-friendly структурой.',
    type: 'website'
  },
  icons: {
    icon: '/images/logo.svg'
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1
    }
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
