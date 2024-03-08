import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";

const supabaseGetDoctors = async () => {
  const { data, error } = await supabase.from("doctors").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreateDoctor = async (doctor) => {
  const { data, error } = await supabase.from("doctors").insert([doctor]); // Asegúrate de que doctor es un objeto.
  if (error) {
    throw error;
  }
  return data;
};

const supabaseUpdateDoctor = async (id, doctor) => {
  const { data, error } = await supabase.from("doctors").update(doctor).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseDeleteDoctor = async (id) => {
  const { data, error } = await supabase.from("doctors").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetDoctorByDni = async (national_id) => {
  const { data, error } = await supabase.from("doctors").select("*").eq("national_id", national_id);
  if (error) {
    throw error;
  }
  return data[0]; // Suponiendo que national_id es único.
};

const localGetDoctors = async () => {
  // Implementación para obtener doctores de la API local
};

const localCreateDoctor = async (doctor) => {
  // Implementación para crear un doctor en la API local
};

const localUpdateDoctor = async (id, doctor) => {
  // Implementación para actualizar un doctor en la API local
};

const localDeleteDoctor = async (id) => {
  // Implementación para eliminar un doctor en la API local
};

const localGetDoctorByDni = async (national_id) => {
  // Implementación para obtener un doctor por DNI de la API local
};


export const getDoctors = useSupabase ? supabaseGetDoctors : localGetDoctors;
export const createDoctor = useSupabase ? supabaseCreateDoctor : localCreateDoctor;
export const updateDoctor = useSupabase ? supabaseUpdateDoctor : localUpdateDoctor;
export const deleteDoctor = useSupabase ? supabaseDeleteDoctor : localDeleteDoctor;
export const getDoctorByDni = useSupabase ? supabaseGetDoctorByDni : localGetDoctorByDni;
