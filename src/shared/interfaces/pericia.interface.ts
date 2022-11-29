export type PericiaToUpdate = Omit<Pericia, "totalHours" | "totalPrice">;
export interface Pericia {
  id: string;
  car: Car;
  costumer: Costumer;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  done: boolean;
  shouldUnmount: boolean;
  unmountPrice: number;
  insuranceHours: number;
  costumerPrice: number;
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
  insurance_name?: string;
  color: string;
}

export interface CarPart {
  name: string;
  isAluminum: boolean;
  shouldPaint: boolean;
  shouldReplace: boolean;
  shouldGlue: boolean;
  smallSmash: number | string;
  smallSmashWorkingHours: number;
  smash: number | string;
  smashWorkingHours: number;
  note: CarPartNote;
  workingHours: number;
  price: number;
}

interface CarPartNote {
  smashes: string;
  details: string;
}

// export type PericiaToUpdate = {
//   id: string;
//   costumer: Costumer;
//   car: Car;
//   carParts: PericiaToUpdateCarPart[];
//   pricePerHour: number;
//   date: Date;
//   finished: boolean;
//   shouldUnmount: boolean;
//   unmountPrice: number;
// };

// type PericiaToUpdateCarPart = Omit<CarPart, "note">;
