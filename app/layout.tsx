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
  title: 'Car Lounge — автомобили в наличии и под заказ',
  description: 'Премиальные автомобили в наличии, а также подбор и поставка авто из Кореи, Китая, США и Европы.',
  openGraph: {
    title: 'Car Lounge — автомобили в наличии и под заказ',
    description: 'Компактный каталог премиальных автомобилей с быстрым поиском и SEO-friendly структурой.',
    type: 'website'
  },
  icons: {
    icon: '/images/logo.svg'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
