import { createClient } from "@supabase/supabase-js";
import {
  Car,
  Costumer,
  PericiaToInsert,
} from "../../shared/interfaces/pericia.interface";
import { periciaToInsertObject } from "../pericia/pericia.utils";

const supabaseUrl = process.env.REACT_APP_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const getCostumers = async () => {
  const { data, error } = await supabase
    .from<Costumer>("costumers")
    .select("*");
  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export const insertCar = async (car: Car) => {
  try {
    const { data, error } = await supabase.from<Car>("cars").insert(car);
    if (error) {
      throw error;
    }

    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const insertPericia = async (pericia: PericiaToInsert) => {
  const periciaToInsert = periciaToInsertObject(pericia);

  try {
    const { data, error } = await supabase
      .from("pericias")
      .insert(periciaToInsert);
    if (error) {
      throw error;
    }

    return data[0].id;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export interface PericiaByID {
  id: string;
  id_car: string;
  id_costumer: string;
  price_per_working_hour: number;
  date: Date;
  finished: boolean;
  cars: Car;
  costumers: Costumer;
  cofano: PericiaByIDCarPart;
  tetto: PericiaByIDCarPart;
  parafango_ad: PericiaByIDCarPart;
  parafango_as: PericiaByIDCarPart;
  parafango_pd: PericiaByIDCarPart;
  parafango_ps: PericiaByIDCarPart;
  piantone_d: PericiaByIDCarPart;
  piantone_s: PericiaByIDCarPart;
  porta_ad: PericiaByIDCarPart;
  porta_as: PericiaByIDCarPart;
  porta_pd: PericiaByIDCarPart;
  porta_ps: PericiaByIDCarPart;
  sportello_i: PericiaByIDCarPart;
  sportello_s: PericiaByIDCarPart;
}

interface PericiaByIDCarPart {
  isAluminum: boolean;
  shouldPaint: boolean;
  shouldReplace: boolean;
  shouldGlue: boolean;
  smallSmash: number | string;
  smallSmashWorkingHours: number;
  smash: number | string;
  smashWorkingHours: number;
  price: number;
  note: "string";
}

export const getPericiaById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from<PericiaByID>("pericias")
      .select(getPericiaByIdSelect)
      .eq("id", id);
    if (error) {
      console.log(error);
      return null;
    }

    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPericiaByIdSelect = `id,finished, price_per_working_hour, date, cofano, tetto, parafango_ad, parafango_as, parafango_pd, 
  parafango_ps, piantone_d, piantone_s, porta_ad, porta_as, porta_pd, porta_ps, sportello_i, sportello_s, cars (id, brand, model, plate), costumers (id, name)`;

interface CostumerToInsert {
  name: string;
  phone: string;
  phone2: string;
  email: string;
  address: string;
}

export const createCostumer = async (costumer: CostumerToInsert) => {
  try {
    const { data, error } = await supabase
      .from<CostumerToInsert>("costumers")
      .insert(costumer);
    if (error) {
      throw error;
    }

    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export interface PericiaWithCarAndCostumer {
  id: string;
  cars: Car;
  costumers: Costumer;
  done: boolean;
  finished: boolean;
}

export const getPericias = async () => {
  try {
    const { data, error } = await supabase
      .from<PericiaWithCarAndCostumer>("pericias")
      .select(getPericiasSelect);
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPericiasSelect = `id, done, finished, cars (id, brand, model, plate), costumers (id, name)`;
