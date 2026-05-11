import { BrandsSection } from '@/components/BrandsSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSearch } from '@/components/HeroSearch';
import { InventorySection } from '@/components/InventorySection';
import { YoutubeShortsSection } from '@/components/YoutubeShortsSection';
import { YandexReviewsSection } from '@/components/YandexReviewsSection';
import { AdvantagesSection } from '@/components/AdvantagesSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSearch />
        <InventorySection />
        <BrandsSection />
        <YoutubeShortsSection />
        <YandexReviewsSection />
        <AdvantagesSection />
      </main>
      <Footer />
    </>
  );
}
