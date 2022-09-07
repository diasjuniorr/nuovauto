import { Pericia } from "../../shared/interfaces/pericia.interface";

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

export const periciaToInsertObject = (pericia: Pericia) => {
  const { cardID, costumerID, carParts, pricePerHour, date, finished } =
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
    id_car: cardID,
    id_costumer: costumerID,
    price_per_working_hour: pricePerHour,
    finished,
    date,
    cofano: carPartsMap["Cofano"],
    tetto: carPartsMap["Tetto"],
    parafango_ad: carPartsMap["Parafango-ad"],
    porta_ad: carPartsMap["Porta-ad"],
    porta_pd: carPartsMap["Porta-pd"],
    parafango_pd: carPartsMap["Parafango-pd"],
    piantone_d: carPartsMap["Piantone-d"],
    piantone_s: carPartsMap["Piantone-s"],
    sportello_s: carPartsMap["Sportello-s"],
    sportello_i: carPartsMap["Sportello-s"],
    parafango_as: carPartsMap["Parafango-as"],
    porta_as: carPartsMap["Porta-as"],
    porta_ps: carPartsMap["Porta-ps"],
    parafango_ps: carPartsMap["Parafango-ps"],
  };
};
