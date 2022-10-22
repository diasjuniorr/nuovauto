import { CarPart, Pericia } from "../../shared/interfaces/pericia.interface";
import {
  PericiaByID,
  PericiaToInsert,
  PericiaToUpsert,
} from "../supabase/supabase.utils";

interface CarPartsMap {
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
  const {
    car,
    costumer,
    carParts,
    pricePerHour,
    date,
    finished,
    shouldUnmount,
    unmountPrice,
  } = pericia;

  const carPartsMap = mapCarParts(carParts);

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
    unmount: shouldUnmount,
    unmount_price: unmountPrice,
  };
};
export const periciaToUpsertObject = (pericia: PericiaToUpsert) => {
  const {
    id,
    car,
    costumer,
    carParts,
    pricePerHour,
    date,
    finished,
    shouldUnmount,
    unmountPrice,
  } = pericia;

  const carPartsMap = mapCarParts(carParts);

  return {
    id,
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
    unmount: shouldUnmount,
    unmount_price: unmountPrice,
  };
};

export const periciaToUpdateObject = (pericia: PericiaByID) => {
  const {
    id,
    id_car,
    id_costumer,
    finished,
    done,
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
      note: { smashes: "", details: "" },
    };
  });

  return {
    id,
    done,
    finished,
    car: cars,
    carParts,
    date: new Date(date),
    pricePerHour: price_per_working_hour,
    costumer: costumers,
    shouldUnmount: unmount,
    unmountPrice: unmount_price,
  };
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const mapCarParts = (carParts: CarPart[]) => {
  return carParts
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
};
