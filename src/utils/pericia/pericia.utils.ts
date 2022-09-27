import { PericiaToInsert } from "../../shared/interfaces/pericia.interface";
import { PericiaByID } from "../supabase/supabase.utils";

export interface CarPartsMap {
  [key: string]: {
    isAluminum: boolean;
    shouldPaint: boolean;
    shouldReplace: boolean;
    shouldGlue: boolean;
    smallSmash: number | string;
    smallSmashWorkingHours: number;
    smash: number | string;
    smashWorkingHours: number;
    price: number;
  };
}

export const periciaToInsertObject = (pericia: PericiaToInsert) => {
  const { car, costumer, carParts, pricePerHour, date, finished, unmount } =
    pericia;

  const carPartsMap = carParts
    .map((carPart) => {
      const {
        name,
        isAluminum,
        shouldPaint,
        shouldReplace,
        shouldGlue,
        smallSmash,
        smallSmashWorkingHours,
        smash,
        smashWorkingHours,
        price,
      } = carPart;

      return {
        name,
        isAluminum,
        shouldPaint,
        shouldReplace,
        shouldGlue,
        smallSmash,
        smallSmashWorkingHours,
        smash,
        smashWorkingHours,
        price,
      };
    })
    .reduce((acc, carPart) => {
      const { name, ...rest } = carPart;
      acc[name] = rest;
      return acc;
    }, {} as CarPartsMap);

  return {
    id_car: car.id,
    id_costumer: costumer.id,
    price_per_working_hour: pricePerHour,
    finished,
    date,
    cofano: carPartsMap["Cofano"],
    tetto: carPartsMap["Tetto"],
    parafango_ad: carPartsMap["Parafango_ad"],
    porta_ad: carPartsMap["Porta_ad"],
    porta_pd: carPartsMap["Porta_pd"],
    parafango_pd: carPartsMap["Parafango_pd"],
    piantone_d: carPartsMap["Piantone_d"],
    piantone_s: carPartsMap["Piantone_s"],
    sportello_s: carPartsMap["Sportello_s"],
    sportello_i: carPartsMap["Sportello_i"],
    parafango_as: carPartsMap["Parafango_as"],
    porta_as: carPartsMap["Porta_as"],
    porta_ps: carPartsMap["Porta_ps"],
    parafango_ps: carPartsMap["Parafango_ps"],
    unmount: unmount.shouldUnmount,
    unmount_pirce: unmount.price,
  };
};

export const periciaToUpdateObject = (pericia: PericiaByID) => {
  const {
    id,
    id_car,
    id_costumer,
    finished,
    price_per_working_hour,
    date,
    cars,
    costumers,
    unmount,
    unmount_price,
    ...rest
  } = pericia;

  const carParts = Object.entries(rest).map(([key, value]) => {
    return {
      name: capitalizeFirstLetter(key),
      ...value,
      workingHours: 0,
    };
  });

  return {
    id,
    car: cars,
    date: new Date(date),
    pricePerHour: price_per_working_hour,
    finished,
    carParts,
    costumer: costumers,
    unmount: unmount,
    unmountPrice: unmount_price,
  };
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export interface Unmount {
  shouldUnmount: boolean;
  price: number;
}
