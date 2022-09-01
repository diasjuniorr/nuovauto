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
  note: string;
  pricePerHour: number;
  workingHours: number;
  price: number;
}
