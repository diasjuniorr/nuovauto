import { CarPart } from "./car-part.interface";

export interface Pericia {
  costumerID: string;
  cardID: string;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
}
