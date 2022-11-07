import { createClient } from "@supabase/supabase-js";
import {
  Car,
  Costumer,
  Pericia,
} from "../../shared/interfaces/pericia.interface";
import {
  periciaToInsertObject,
  periciaToUpsertObject,
} from "../pericia/pericia.utils";

const supabaseUrl = process.env.REACT_APP_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const getCostumers = async () => {
  const { data, error } = await supabase
    .from<Costumer>("costumers")
    .select("*");
  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
};

export const insertCar = async (car: Car) => {
  try {
    const { data, error } = await supabase.from<Car>("cars").insert(car);
    if (error) {
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export type PericiaToInsert = Omit<Pericia, "id" | "done">;

export const insertPericia = async (pericia: PericiaToInsert) => {
  const periciaToInsert = periciaToInsertObject(pericia);

  try {
    const { data, error } = await supabase
      .from("pericias")
      .insert(periciaToInsert);
    if (error) {
      return { data: null, error };
    }

    return { data: data[0].id, error: null };
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
  done: boolean;
  unmount: boolean;
  unmount_price: number;
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
  insurance_hours: number;
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
  note?: string;
}

export const getPericiaById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from<PericiaByID>("pericias")
      .select(getPericiaByIdSelect)
      .eq("id", id);
    if (error) {
      return {
        data: null,
        error,
      };
    }

    return { data: data[0], error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPericiaByIdSelect = `id,finished, done, price_per_working_hour, date, unmount, unmount_price, insurance_hours, cofano, tetto, sportello_s, 
  sportello_i, parafango_as, porta_as, porta_ps, parafango_ps, piantone_s, parafango_ad, porta_ad, porta_pd, parafango_pd, piantone_d, cars (id, brand, model, plate),
  costumers (id, name)`;
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
      return { data: null, error };
    }

    return { data: data[0], error: null };
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
  date: Date;
}

export const getPericias = async () => {
  try {
    const { data, error } = await supabase
      .from<PericiaWithCarAndCostumer>("pericias")
      .select(getPericiasSelect);
    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPericiasList = async () => {
  try {
    const { data, error } = await supabase
      .from<PericiaWithCarAndCostumer>("pericias")
      .select(getPericiasSelect);
    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const upsertCar = async (car: Car) => {
  try {
    const { data, error } = await supabase
      .from<Car>("cars")
      .update(car)
      .eq("id", car.id);
    if (error) {
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export type PericiaToUpsert = Omit<Pericia, "totalPrice" | "totalHours">;

export const upsertPericia = async (pericia: PericiaToUpsert) => {
  const periciaToUpsert = periciaToUpsertObject(pericia);

  try {
    const { data, error } = await supabase
      .from<Pericia>("pericias")
      .update(periciaToUpsert)
      .eq("id", pericia.id);
    if (error) {
      return { data: null, error };
    }

    return { data: data[0].id, error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPericiasSelect = `id, done, finished, cars (id, brand, model, plate), costumers (id, name), date`;

export const getCostumerById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from<Costumer>("costumers")
      .select()
      .eq("id", id);
    if (error) {
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const upsertCostumer = async (costumer: Costumer) => {
  try {
    const { data, error } = await supabase
      .from<Costumer>("costumers")
      .update(costumer)
      .eq("id", costumer.id);
    if (error) {
      return { data: null, error };
    }

    return { data: data[0], error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

interface NewUser {
  name: string;
  password: string;
  phone: string;
  nationality?: string;
}

export const inviteUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke("invite-user", {
      body: JSON.stringify({ email }),
    });

    if (data.status) {
      return { data: null, error: { message: "Oops...something went wrong" } };
    }

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const signUpWithEmail = async (user: NewUser) => {
  try {
    const { password, name, nationality, phone } = user;

    const { data, error } = await supabase.auth.update({
      password: password,
      data: {
        name,
        nationality,
        phone,
      },
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error };
    }

    return { error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signInWithPassword = async (email: string, password: string) => {
  try {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: user, error: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
