import { createClient } from "@supabase/supabase-js";
import { CarPart } from "../../shared/interfaces/car-part.interface";

const supabaseUrl = process.env.REACT_APP_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export interface Costumer {
  id: string;
  name: string;
}

export const getCostumers = async () => {
  const { data, error } = await supabase.from("costumers").select("*");
  if (error) {
    console.log(error);
    return [];
  }

  return data as Costumer[];
};

export interface Car {
  id: string;
  plate: string;
  brand: string;
  model: string;
}

export const insertCar = async (car: Car) => {
  try {
    const { data, error } = await supabase.from<Car>("cars").insert(car);
    if (error) {
      throw error;
    }

    return data[0];
  } catch (err) {
    console.log(err);
  }
};

interface Pericia {
  costumerID: string;
  cardID: string;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
}

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

export const insertPericia = async (pericia: Pericia) => {
  const { cardID, costumerID, carParts, pricePerHour, date, finished } =
    pericia;

  const carPartsMap = carParts.reduce((acc, carPart) => {
    const { name, ...rest } = carPart;
    acc[name] = rest;
    return acc;
  }, {} as CarPartsMap);

  const periciaToInsert = {
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

  console.log("debug", periciaToInsert);
  try {
    const { data, error } = await supabase
      .from<Pericia>("pericias")
      .insert(periciaToInsert);
    if (error) {
      throw error;
    }

    return data[0];
  } catch (err) {
    console.log(err);
  }
};
