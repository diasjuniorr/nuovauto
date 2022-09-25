import { Unmount } from "../../utils/pericia/pericia.utils";
import { CarPart } from "./car-part.interface";

export interface Pericia {
  id: string;
  car: Car;
  costumer?: Costumer;
  cardID?: string;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  done: boolean;
}

export interface PericiaToUpdate {
  id: string;
  costumer: Costumer;
  car: Car;
  carParts: CarPart[];
  pricePerHour: number;
  date: Date;
  finished: boolean;
}

export interface PericiaToInsert {
  costumer: Costumer;
  carParts: CarPart[];
  car: Car;
  unmount: Unmount;
  finished: boolean;
  pricePerHour: number;
  date: Date;
  totalHours: number;
  totalPrice: number;
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
