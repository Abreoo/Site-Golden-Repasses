export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fipePrice: number;
  mileage: number;
  image: string;
  transmission: string;
  fuel: string;
  status: 'available' | 'reserved' | 'sold';
  history: 'clean' | 'auction' | 'accident';
}

export interface Seller {
  id: string;
  name: string;
  phone: string;
}

export const sellers: Seller[] = [
  {
    id: "1",
    name: "Matheus",
    phone: "555195898889"
  },
  {
    id: "2",
    name: "Eric",
    phone: "555197394408"
  },
  {
    id: "3",
    name: "Ezequiel",
    phone: "555195611247"
  },
  {
    id: "4",
    name: "Luiz André",
    phone: "555197598587"
  }
];

export const mockCars: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "320i M Sport",
    year: 2022,
    price: 265000,
    fipePrice: 285900,
    mileage: 24000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
    transmission: "Automático",
    fuel: "Gasolina",
    status: 'available',
    history: 'clean'
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla XEI",
    year: 2021,
    price: 125000,
    fipePrice: 142300,
    mileage: 45000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80",
    transmission: "Automático",
    fuel: "Flex",
    status: 'available',
    history: 'auction'
  },
  {
    id: "3",
    brand: "Jeep",
    model: "Compass Longitude",
    year: 2022,
    price: 148000,
    fipePrice: 165000,
    mileage: 32000,
    image: "https://images.unsplash.com/photo-1625217527288-93919c99650a?auto=format&fit=crop&q=80",
    transmission: "Automático",
    fuel: "Flex",
    status: 'available',
    history: 'clean'
  },
  {
    id: "4",
    brand: "Audi",
    model: "Q3 Performance",
    year: 2020,
    price: 185000,
    fipePrice: 210000,
    mileage: 38000,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
    transmission: "Automático",
    fuel: "Gasolina",
    status: 'available',
    history: 'accident'
  }
];
