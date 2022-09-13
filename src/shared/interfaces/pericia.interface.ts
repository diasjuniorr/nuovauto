import { CarPart } from "./car-part.interface";

export interface Pericia {
  id?: string;
  car?: Car;
  costumer?: Costumer;
  cardID?: string;
  carParts: CarPart[];
  totalHours?: number;
  totalPrice?: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  done?: boolean;
}

export interface Costumer {
  id: string;
  name: string;
  phone?: string;
  phone2?: string;
  email?: string;
  address?: string;
}

export interface Car {
  id: string;
  plate: string;
  brand: string;
  model: string;
}
