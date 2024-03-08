import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const supabaseGetDoctors = async () => {
  const { data, error } = await supabase.from("doctors").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreateDoctor = async (doctor) => {
  const { data, error } = await supabase.from("doctors").insert([doctor]);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseUpdateDoctor = async (id, doctor) => {
  const { data, error } = await supabase
    .from("doctors")
    .update(doctor)
    .eq("id", id);
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
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("national_id", national_id);
  if (error) {
    throw error;
  }
  return data[0];
};

const localGetDoctors = async () => {
  // GET http://localhost:3000/api/doctors HTTP/1.1
  const response = await fetch(`${baseUrl}/doctors`);
  const data = await response.json();
  return data;
};

const localCreateDoctor = async (doctor) => {
  // POST http://localhost:3000/api/create-doctor HTTP/1.1
  try {
    const response = await fetch(`${baseUrl}/create-doctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const localUpdateDoctor = async (id, doctor) => {
  // PUT http://localhost:3000/api/update-doctor/22 HTTP/1.1
  const response = await fetch(`${baseUrl}/update-doctor/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });
  const data = await response.json();
  return data;
};

const localDeleteDoctor = async (id) => {
  // DELETE http://localhost:3000/api/delete-doctor/22 HTTP/1.1
  const response = await fetch(`${baseUrl}/delete-doctor/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const localGetDoctorByDni = async (national_id) => {
  // GET http://localhost:3000/api/doctors/national-id/1820001111 HTTP/1.1
  const response = await fetch(`${baseUrl}/doctors/national-id/${national_id}`);
  const data = await response.json();
  return data;
};

export const getDoctors = useSupabase ? supabaseGetDoctors : localGetDoctors;
export const createDoctor = useSupabase
  ? supabaseCreateDoctor
  : localCreateDoctor;
export const updateDoctor = useSupabase
  ? supabaseUpdateDoctor
  : localUpdateDoctor;
export const deleteDoctor = useSupabase
  ? supabaseDeleteDoctor
  : localDeleteDoctor;
export const getDoctorByDni = useSupabase
  ? supabaseGetDoctorByDni
  : localGetDoctorByDni;
