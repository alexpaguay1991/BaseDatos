import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const supabaseGetAppointments = async () => {
  const { data, error } = await supabase.from("view_appointments").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreateAppointment = async (appointment) => {
  const { data, error } = await supabase
    .from("appointments")
    .insert([appointment]);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseDeleteAppointment = async (id) => {
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

const supabaseAvailableAppointments = async (doctor_id, date) => {
  const { data: appointments, error } = await supabase
    .from("available_appointments")
    .select("*")
    .eq("doctor_id", doctor_id)
    .eq("appointment_date", date);

  if (error) throw error;

  if (!appointments.length) {
    const hours = Array.from({ length: 9 }, (_, i) => i + 8); // Horas de 8 a 16
    return hours.map((hour) => ({
      doctor_id: doctor_id,
      appointment_date: date,
      available_start_time: `${hour.toString().padStart(2, "0")}:00:00`,
    }));
  }

  return appointments;
};

const localGetAppointments = async () => {
  //GET http://localhost:3000/api/view-appointments HTTP/1.1
  const response = await fetch(`${baseUrl}/view-appointments`);
  const data = await response.json();
  return data;
};

const localCreateAppointment = async (appointment) => {
  // POST http://localhost:3000/api/create-appointment HTTP/1.1
  const response = await fetch(`${baseUrl}/create-appointment`, {
    method: "POST",
    body: JSON.stringify(appointment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const localDeleteAppointment = async (id) => {
  // DELETE http://localhost:3000/api/delete-appointment/1 HTTP/1.1
  const response = await fetch(`${baseUrl}/delete-appointment/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const localAvailableAppointments = async (doctor_id, date) => {
  // GET http://localhost:3000/api/view-available-appointments/1/2024-03-04 HTTP/1.1
  const response = await fetch(
    `${baseUrl}/view-available-appointments/${doctor_id}/${date}`
  );
  const data = await response.json();
  if (!data.length) {
    const hours = Array.from({ length: 9 }, (_, i) => i + 8); // Horas de 8 a 16
    return hours.map((hour, index) => ({
      id: index + 1,
      doctor_id: doctor_id,
      appointment_date: date,
      available_start_time: `${hour.toString().padStart(2, "0")}:00:00`,
    }));
  }

  return data;
};

export const getAppointments = useSupabase
  ? supabaseGetAppointments
  : localGetAppointments;
export const createAppointment = useSupabase
  ? supabaseCreateAppointment
  : localCreateAppointment;
export const deleteAppointment = useSupabase
  ? supabaseDeleteAppointment
  : localDeleteAppointment;
export const availableAppointments = useSupabase
  ? supabaseAvailableAppointments
  : localAvailableAppointments;
