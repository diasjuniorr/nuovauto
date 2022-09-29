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
