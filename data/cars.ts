export type Car = {
  id: number;
  title: string;
  meta: string;
  badge: string;
  price: string;
  image: string;
  alt: string;
};

export type Brand = {
  name: string;
  icon: string;
  href: string;
};

export const cars: Car[] = [
  {
    id: 1,
    title: 'Land Rover Range Rover P360 MHEV Long',
    meta: '2026 г.в., 0 км, 360 л.с.',
    badge: 'до 1000 км',
    price: '24 709 700 ₽',
    image: 'https://car-lounge.ru/classes/thumb.php?src=/uploads/car/f3/f300ad71c46b75bd.jpeg&w=620&h=440&q=85',
    alt: 'Land Rover Range Rover P360 MHEV Long черного цвета'
  },
  {
    id: 2,
    title: 'Lexus LX 500D',
    meta: '2025 г.в., 0 км, 299 л.с.',
    badge: 'в наличии',
    price: '20 177 700 ₽',
    image: 'https://car-lounge.ru/classes/thumb.php?src=/uploads/car/7f/7f6459138f85ea00.jpeg&w=620&h=440&q=85',
    alt: 'Lexus LX 500D черного цвета'
  },
  {
    id: 3,
    title: 'Mercedes-Benz V300 Extra Long',
    meta: '2024 г.в., 0 км, 237 л.с.',
    badge: 'до 1000 км',
    price: '17 499 700 ₽',
    image: 'https://car-lounge.ru/classes/thumb.php?src=/uploads/car/68/68604e37af4b0c76.jpeg&w=620&h=440&q=85',
    alt: 'Mercedes-Benz V300 Extra Long черного цвета'
  },
  {
    id: 4,
    title: 'BMW X5 xDrive40i M Sport',
    meta: '2026 г.в., 0 км, 381 л.с.',
    badge: 'новое поступление',
    price: '15 954 700 ₽',
    image: 'https://car-lounge.ru/classes/thumb.php?src=/uploads/car/97/97c06bae1a1a1a98.jpeg&w=620&h=440&q=85',
    alt: 'BMW X5 xDrive40i M Sport черного цвета'
  }
];

export const koreaBrands: Brand[] = [
  { name: "Aston Martin", icon: '/images/brands/aston-martin.svg', href: '#inventory' },
  { name: "Audi", icon: '/images/brands/audi.svg', href: '#inventory' },
  { name: "Bentley", icon: '/images/brands/bentley.svg', href: '#inventory' },
  { name: "BMW", icon: '/images/brands/bmw.svg', href: '#inventory' },
  { name: "Cadillac", icon: '/images/brands/cadillac.svg', href: '#inventory' },
  { name: "Chevrolet", icon: '/images/brands/chevrolet.svg', href: '#inventory' },
  { name: "Genesis", icon: '/images/brands/genesis.svg', href: '#inventory' },
  { name: "Honda", icon: '/images/brands/honda.svg', href: '#inventory' },
  { name: "Hyundai", icon: '/images/brands/hyundai.svg', href: '#inventory' },
  { name: "Infiniti", icon: '/images/brands/infiniti.svg', href: '#inventory' },
  { name: "Jaguar", icon: '/images/brands/jaguar.svg', href: '#inventory' },
  { name: "Jeep", icon: '/images/brands/jeep.svg', href: '#inventory' },
  { name: "Kia", icon: '/images/brands/kia.svg', href: '#inventory' },
  { name: "Land Rover", icon: '/images/brands/land-rover.svg', href: '#inventory' },
  { name: "Lexus", icon: '/images/brands/lexus.svg', href: '#inventory' },
  { name: "Maserati", icon: '/images/brands/maserati.svg', href: '#inventory' },
  { name: "Mercedes-Benz", icon: '/images/brands/mercedes-benz.svg', href: '#inventory' },
  { name: "Mini", icon: '/images/brands/mini.svg', href: '#inventory' },
  { name: "Nissan", icon: '/images/brands/nissan.svg', href: '#inventory' },
  { name: "Porsche", icon: '/images/brands/porsche.svg', href: '#inventory' },
  { name: "Rolls-Royce", icon: '/images/brands/rolls-royce.svg', href: '#inventory' },
  { name: "Tesla", icon: '/images/brands/tesla.svg', href: '#inventory' },
  { name: "Toyota", icon: '/images/brands/toyota.svg', href: '#inventory' },
  { name: "Volvo", icon: '/images/brands/volvo.svg', href: '#inventory' },
];

export const chinaBrands: Brand[] = [
  { name: "Avatr", icon: '/images/brands/avatr.svg', href: '#inventory' },
  { name: "Aito", icon: '/images/brands/aito.svg', href: '#inventory' },
  { name: "BAIC", icon: '/images/brands/baic.svg', href: '#inventory' },
  { name: "BYD", icon: '/images/brands/byd.svg', href: '#inventory' },
  { name: "Changan", icon: '/images/brands/changan.svg', href: '#inventory' },
  { name: "Chery", icon: '/images/brands/chery.svg', href: '#inventory' },
  { name: "Denza", icon: '/images/brands/denza.svg', href: '#inventory' },
  { name: "Dongfeng", icon: '/images/brands/dongfeng.svg', href: '#inventory' },
  { name: "Exeed", icon: '/images/brands/exeed.svg', href: '#inventory' },
  { name: "GAC", icon: '/images/brands/gac.svg', href: '#inventory' },
  { name: "Geely", icon: '/images/brands/geely.svg', href: '#inventory' },
  { name: "Great Wall", icon: '/images/brands/great-wall.svg', href: '#inventory' },
  { name: "Haval", icon: '/images/brands/haval.svg', href: '#inventory' },
  { name: "Hongqi", icon: '/images/brands/hongqi.svg', href: '#inventory' },
  { name: "JAC", icon: '/images/brands/jac.svg', href: '#inventory' },
  { name: "Jetour", icon: '/images/brands/jetour.svg', href: '#inventory' },
  { name: "Li Auto", icon: '/images/brands/li-auto.svg', href: '#inventory' },
  { name: "Lynk & Co", icon: '/images/brands/lynk-co.svg', href: '#inventory' },
  { name: "MG", icon: '/images/brands/mg.svg', href: '#inventory' },
  { name: "Nio", icon: '/images/brands/nio.svg', href: '#inventory' },
  { name: "Omoda", icon: '/images/brands/omoda.svg', href: '#inventory' },
  { name: "Tank", icon: '/images/brands/tank.svg', href: '#inventory' },
  { name: "Voyah", icon: '/images/brands/voyah.svg', href: '#inventory' },
  { name: "Zeekr", icon: '/images/brands/zeekr.svg', href: '#inventory' },
];

// Backward-compatible export for older code paths.
export const brands = koreaBrands.map((brand) => brand.name);


export const inventorySlides: Car[] = [
  ...cars,
  ...cars.map((car) => ({ ...car, id: car.id + 100 })),
  ...cars.map((car) => ({ ...car, id: car.id + 200 }))
];
