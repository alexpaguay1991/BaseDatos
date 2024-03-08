import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";

const supabaseGetRoles = async () => {
  const { data, error } = await supabase.from("role").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const localGetRoles = async () => {
  // Implementación para obtener roles de la API local
  // Recuerda reemplazar esta parte con tu lógica de API real
};

export const getRoles = useSupabase ? supabaseGetRoles : localGetRoles;
