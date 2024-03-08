import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";

const supabaseGetUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetUserById = async (id) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetUserByUid = async (uid) => {
  const { data, error } = await supabase.from("users").select("*").eq("auth_id", uid).single();
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreateUser = async (user) => {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseUpdateUser = async (id, user) => {
  const { data, error } = await supabase.from("users").update(user).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseDeleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

const localGetUsers = async () => {
  // Implementación para obtener usuarios de la API local
};

const localGetUserById = async (id) => {
  // Implementación para obtener un usuario por ID de la API local
};

const localGetUserByUid = async (uid) => {
  // Implementación para obtener un usuario por UID de la API local
};

const localCreateUser = async (user) => {
  // Implementación para crear un usuario en la API local
};

const localUpdateUser = async (id, user) => {
  // Implementación para actualizar un usuario en la API local
};

const localDeleteUser = async (id) => {
  // Implementación para eliminar un usuario en la API local
};

export const getUsers = useSupabase ? supabaseGetUsers : localGetUsers;
export const getUserById = useSupabase ? supabaseGetUserById : localGetUserById;
export const getUserByUid = useSupabase ? supabaseGetUserByUid : localGetUserByUid;
export const createUser = useSupabase ? supabaseCreateUser : localCreateUser;
export const updateUser = useSupabase ? supabaseUpdateUser : localUpdateUser;
export const deleteUser = useSupabase ? supabaseDeleteUser : localDeleteUser;
