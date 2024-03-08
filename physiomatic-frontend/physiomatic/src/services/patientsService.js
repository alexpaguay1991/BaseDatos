import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const supabaseGetPatients = async () => {
  const { data, error } = await supabase.from("patients").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetPatientById = async (national_id) => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("national_id", national_id);
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
  const { data, error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", id);
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
  // GET http://localhost:3000/api/patients HTTP/1.1
  const response = await fetch(`${baseUrl}/patients`);
  const data = await response.json();
  return data;
};

const localGetPatientById = async (national_id) => {
  // GET http://localhost:3000/api/patients/national-id/1726137597 HTTP/1.1
  try {
    const response = await fetch(
      `${baseUrl}/patients/national-id/${national_id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const localCreatePatient = async (patient) => {
  // POST http://localhost:3000/api/create-patient HTTP/1.1
  const response = await fetch(`${baseUrl}/create-patient`, {
    method: "POST",
    body: JSON.stringify(patient),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const localUpdatePatient = async (id, patient) => {
  // PUT http://localhost:3000/api/update-patient/21 HTTP/1.1
  const response = await fetch(`${baseUrl}/update-patient/${id}`, {
    method: "PUT",
    body: JSON.stringify(patient),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const localDeletePatient = async (id) => {
  // DELETE http://localhost:3000/api/delete-patient/21 HTTP/1.1
  const response = await fetch(`${baseUrl}/delete-patient/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const localGetGenders = async () => {
  // GET http://localhost:3000/api/genders HTTP/1.1
  const response = await fetch(`${baseUrl}/genders`);
  const data = await response.json();
  return data;
};

export const getPatients = useSupabase ? supabaseGetPatients : localGetPatients;
export const getPatientById = useSupabase
  ? supabaseGetPatientById
  : localGetPatientById;
export const createPatient = useSupabase
  ? supabaseCreatePatient
  : localCreatePatient;
export const updatePatient = useSupabase
  ? supabaseUpdatePatient
  : localUpdatePatient;
export const deletePatient = useSupabase
  ? supabaseDeletePatient
  : localDeletePatient;
export const getGenders = useSupabase ? supabaseGetGenders : localGetGenders;
