import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const supabaseGetRoles = async () => {
  const { data, error } = await supabase.from("role").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const localGetRoles = async () => {
  // GET http://localhost:3000/api/roles HTTP/1.1
  const response = await fetch(`${baseUrl}/roles`);
  const data = await response.json();
  return data;
};

export const getRoles = useSupabase ? supabaseGetRoles : localGetRoles;
