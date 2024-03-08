import { supabase } from "../supabase/client";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";

const supabaseGetAppointments = async () => {
  const { data, error } = await supabase.from("view_appointments").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreateAppointment = async (appointment) => {
  const { data, error } = await supabase.from("appointments").insert([appointment]);
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
    .from('available_appointments')
    .select('*')
    .eq('doctor_id', doctor_id)
    .eq('appointment_date', date);

  if (error) throw error;

  if (!appointments.length) {
    const hours = Array.from({ length: 9 }, (_, i) => i + 8); // Horas de 8 a 16
    return hours.map(hour => ({
      doctor_id: doctor_id,
      appointment_date: date,
      available_start_time: `${hour.toString().padStart(2, '0')}:00:00`
    }));
  }

  return appointments;
};

const localGetAppointments = async () => {
  // Implementación para obtener citas de la API local
};

const localCreateAppointment = async (appointment) => {
  // Implementación para crear una cita en la API local
};

const localDeleteAppointment = async (id) => {
  // Implementación para eliminar una cita en la API local
};

const localAvailableAppointments = async (doctor_id, date) => {
  // Implementación para obtener citas disponibles de la API local
};

export const getAppointments = useSupabase ? supabaseGetAppointments : localGetAppointments;
export const createAppointment = useSupabase ? supabaseCreateAppointment : localCreateAppointment;
export const deleteAppointment = useSupabase ? supabaseDeleteAppointment : localDeleteAppointment;
export const availableAppointments = useSupabase ? supabaseAvailableAppointments : localAvailableAppointments;
