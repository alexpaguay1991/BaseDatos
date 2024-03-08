import {
  Alert,
  Button,
  Card,
  Datepicker,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { availableAppointments } from "../services/appointmentsService";
import { getDoctors } from "../services/doctorsService";
import { getPatients } from "../services/patientsService";
import { currentAge, formatDateTime } from "../utils/common";
import {
  initialDoctorState,
  initialPatientState,
} from "../utils/initialStates";

import { useAuth } from "../contexts/Auth";
import { createAppointment } from "../services/appointmentsService";
import { getUserByUid } from "../services/usersService";

function AddAppointments() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(initialPatientState());
  const [availableAppointmentsTime, setAvailableAppointmentsTime] = useState(
    []
  );
  const [searchPatient, setsearchPatient] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(initialDoctorState());
  const [date, setDate] = useState("");
  const [doctor_id, setDoctorId] = useState(0);
  const { user } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctor_id && date) {
      fetchAvailableAppointments();
    }
  }, [doctor_id, date]);

  const handleSearcByDni = () => {
    const foundPatient = patients.find(
      (patient) => patient.national_id === searchPatient
    );

    if (foundPatient) {
      setPatient(foundPatient);
      return;
    }
    setPatient(initialPatientState());
    setError("No se ha encontrado un paciente con la cédula ingresada");
  };

  const handleInputChangePatient = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleInputChangeDoctor = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const fetchPatients = async () => {
    const patients = await getPatients();
    setPatients(patients);
  };

  const fetchDoctors = async () => {
    const doctors = await getDoctors();
    setDoctors(doctors);
  };

  const fetchAvailableAppointments = async () => {
    const appointments = await availableAppointments(
      doctor_id,
      formatDate(date)
    );
    setAvailableAppointmentsTime(appointments);
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    const { id } = await getUserByUid(user.id);
    const newAppointment = {
      patient_id: patient.id,
      scheduler_id: id,
      doctor_id: parseInt(doctor_id),
      appointment_date: date,
      start_time: doctor.time,
      state_id: 1,
    };

    await createAppointment(newAppointment);
  };

  const formatDate = (date) => {
    const parts = date.split("-"); // Divide la fecha en sus partes
    const year = parts[0];
    const month = parts[1].padStart(2, "0"); // Asegura que el mes tenga dos dígitos
    const day = parts[2].padStart(2, "0"); // Asegura que el día tenga dos dígitos
    return `${year}-${month}-${day}`; // Reconstruye la fecha
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
          Crear Cita Médica
        </h1>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
          onClick={() => navigate("/appointments")}
        >
          Listado de citas médicas
        </Button>
      </div>

      {/* Show select with all national_id patients and show fields input of patient disable fields */}
      <div className="w-5/12">
        {/* search patients by national_id */}
        <div className="mb-2 block">
          <Label htmlFor="patient" value="Buscar Paciente" />
        </div>
        <TextInput
          id="patient"
          type="text"
          icon={FaAddressCard}
          placeholder="Buscar paciente por cédula"
          value={searchPatient}
          onChange={(e) => setsearchPatient(e.target.value)}
          required
        />

        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white self-end mt-4"
          onClick={handleSearcByDni}
        >
          Buscar Paciente
        </Button>
      </div>

      {(patient.id && (
        <Card className="w-full">
          <h1 className="text-xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
            Informacion del paciente
          </h1>
          <div className="flex  items-start gap-8">
            <div className="w-5/12">
              <div className="flex justify-between">
                <div className="mb-2 block">
                  <Label htmlFor="national_id" value="Cédula" />
                </div>
              </div>
              <TextInput
                id="national_id"
                type="text"
                icon={FaAddressCard}
                value={patient.national_id}
                name="national_id"
                placeholder="Cédula"
                required
                disabled
              />
            </div>

            <div className="w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="names" value="Nombres" />
              </div>
              <TextInput
                id="names"
                type="text"
                value={patient.names}
                name="names"
                onChange={handleInputChangePatient}
                placeholder="Nombres"
                required
                disabled
              />
            </div>
            {/* age */}
            <div className="w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="age" value="Edad" />
              </div>
              <TextInput
                id="age"
                type="text"
                value={currentAge(patient.birth_date)}
                name="age"
                onChange={handleInputChangePatient}
                placeholder="Edad"
                required
                disabled
              />
            </div>
          </div>
        </Card>
      )) || (
        <Alert type="error" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Created appoinmet */}
      {patient.id && (
        <Card className="w-full">
          <h1 className="text-xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
            Crear Cita Médica
          </h1>
          <form
            className="flex  items-start gap-8 flex-wrap"
            onSubmit={handleCreateAppointment}
          >
            <div className="w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="doctor" value="Doctor" />
              </div>
              <Select
                id="doctor"
                name="doctor"
                value={patient.doctor_id}
                onChange={(e) => setDoctorId(e.target.value)}
                required
              >
                <option value={0}>Seleccione un doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.names}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="date" value="Fecha de la cita" />
              </div>
              <Datepicker
                id="date"
                weekStart={1}
                name="date"
                onSelectedDateChanged={(date) => setDate(formatDateTime(date))}
                value={date}
                minDate={new Date()}
                placeholder="Fecha de la cita"
                required
              />
            </div>
            {/* Free time Appoinments */}
            <div className="w-5/12">
              <div className="mb-2 block">
                <Label htmlFor="time" value="Hora de la cita" />
              </div>
              <Select
                id="time"
                name="time"
                value={patient.time}
                onChange={handleInputChangeDoctor}
                required
              >
                <option value={0}>Seleccione una hora</option>
                {availableAppointmentsTime.map((appointment) => (
                  <option
                    key={appointment.id}
                    value={appointment.available_start_time}
                  >
                    {appointment.available_start_time}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-5/12">
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white self-end w-full mt-8"
                type="submit"
              >
                Guardar Cita
              </Button>
            </div>
          </form>
        </Card>
      )}
    </Card>
  );
}

export default AddAppointments;
