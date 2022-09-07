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
  workingHours: number;
  price: number;
}
