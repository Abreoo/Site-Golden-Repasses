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
}

export const mockCars: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "320i M Sport",
    year: 2022,
    price: 265000,
    fipePrice: 285900,
    mileage: 24000,
    image: "/src/assets/images/hero-car.jpg",
    transmission: "Automático",
    fuel: "Gasolina",
    status: 'available'
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla XEI",
    year: 2021,
    price: 125000,
    fipePrice: 142300,
    mileage: 45000,
    image: "/src/assets/images/car-1.jpg",
    transmission: "Automático",
    fuel: "Flex",
    status: 'available'
  },
  {
    id: "3",
    brand: "Jeep",
    model: "Compass Longitude",
    year: 2022,
    price: 148000,
    fipePrice: 165000,
    mileage: 32000,
    image: "/src/assets/images/car-2.jpg",
    transmission: "Automático",
    fuel: "Flex",
    status: 'available'
  },
  {
    id: "4",
    brand: "Audi",
    model: "Q3 Performance",
    year: 2020,
    price: 185000,
    fipePrice: 210000,
    mileage: 38000,
    image: "/src/assets/images/car-3.jpg",
    transmission: "Automático",
    fuel: "Gasolina",
    status: 'available'
  }
];
