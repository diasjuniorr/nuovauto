import { CarPart } from "../interfaces/car-part.interface";

export const CAR_PARTS = {
  PARAFANGO_AD: "Parafango-ad",
  PORTA_AD: "Porta-ad",
  PORTA_PD: "Porta-pd",
  PARAFANGO_PD: "Parafango-pd",
  COFANO: "Cofano",
  TETTO: "Tetto",
  PIAZONE_D: "Pianzone-d",
  PIAZONE_S: "Pianzone-s",
  SPORTELLO_S: "Sportello-s",
  SPORTELLO_I: "Sportello-i",
  PARAFANGO_AS: "Parafango-as",
  PORTA_AS: "Porta-as",
  PORTA_PS: "Porta-ps",
  PARAFANGO_PS: "Parafango-ps",
};

export const CAR_PARTS_LIST: CarPart[] = Object.keys(CAR_PARTS).map((key) => {
  return {
    name: CAR_PARTS[key as keyof typeof CAR_PARTS],
    isAluminum: false,
    shouldPaint: false,
    shouldReplace: false,
    shouldGlue: false,
    smallSmash: "",
    smash: "",
    note: "0",
  };
});
