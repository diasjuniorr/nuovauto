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
    note: "",
  };
});

export const CAR_PARTS_CANVAS_COORDINATES = {
  "Parafango-ad": { x: 330, y: 155 },
  "Porta-ad": { x: 510, y: 155 },
  "Porta-pd": { x: 689, y: 155 },
  "Parafango-pd": { x: 860, y: 155 },
  Cofano: { x: 220, y: 410 },
  Tetto: { x: 660, y: 410 },
  "Pianzone-d": { x: 800, y: 300 },
  "Pianzone-s": { x: 800, y: 505 },
  "Sportello-s": { x: 960, y: 410 },
  "Sportello-i": { x: 1070, y: 410 },
  "Parafango-as": { x: 330, y: 665 },
  "Porta-as": { x: 510, y: 655 },
  "Porta-ps": { x: 689, y: 655 },
  "Parafango-ps": { x: 860, y: 655 },
};
