import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";

const supabaseGetPatients = async () => {
  const { data, error } = await supabase.from("patients").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetPatientById = async (national_id) => {
  const { data, error } = await supabase.from("patients").select("*").eq("national_id", national_id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreatePatient = async (patient) => {
  const { data, error } = await supabase.from("patients").insert([patient]);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseUpdatePatient = async (id, patient) => {
  const { data, error } = await supabase.from("patients").update(patient).eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseDeletePatient = async (id) => {
  const { data, error } = await supabase.from("patients").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetGenders = async () => {
  const { data, error } = await supabase.from("genders").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const localGetPatients = async () => {
  // Implementación para obtener pacientes de la API local
};

const localGetPatientById = async (national_id) => {
  // Implementación para obtener un paciente por national_id de la API local
};

const localCreatePatient = async (patient) => {
  // Implementación para crear un paciente en la API local
};

const localUpdatePatient = async (id, patient) => {
  // Implementación para actualizar un paciente en la API local
};

const localDeletePatient = async (id) => {
  // Implementación para eliminar un paciente en la API local
};

const localGetGenders = async () => {
  // Implementación para obtener géneros de la API local
};

export const getPatients = useSupabase ? supabaseGetPatients : localGetPatients;
export const getPatientById = useSupabase ? supabaseGetPatientById : localGetPatientById;
export const createPatient = useSupabase ? supabaseCreatePatient : localCreatePatient;
export const updatePatient = useSupabase ? supabaseUpdatePatient : localUpdatePatient;
export const deletePatient = useSupabase ? supabaseDeletePatient : localDeletePatient;
export const getGenders = useSupabase ? supabaseGetGenders : localGetGenders;
