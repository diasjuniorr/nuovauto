import { createClient } from "@supabase/supabase-js";

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
