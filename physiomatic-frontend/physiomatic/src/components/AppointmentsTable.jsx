import { Badge, Table } from "flowbite-react";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

function AppointmentsTable({ appointments, onEdit, onDelete }) {
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>N0</Table.HeadCell>
        <Table.HeadCell>Paciente</Table.HeadCell>
        <Table.HeadCell>Fecha</Table.HeadCell>
        <Table.HeadCell>Hora</Table.HeadCell>
        <Table.HeadCell>Doctor</Table.HeadCell>
        <Table.HeadCell>Registrado por</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Acciones</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {appointments.map((appointment, index) => (
          <Table.Row
            key={index + 1}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell>{appointment.patient_name}</Table.Cell>
            <Table.Cell>{appointment.appointment_date}</Table.Cell>
            <Table.Cell>{appointment.start_time}</Table.Cell>
            <Table.Cell>{appointment.doctor_name}</Table.Cell>
            <Table.Cell>
              {appointment.scheduler_name}
              {/* <div className="flex items-center">
                <Badge
                  color={
                    appointment.state_id === 1
                      ? "green"
                      : appointment.state_id === 2
                      ? "yellow"
                      : "red"
                  }
                >
                  {appointment.appointment_state}
                </Badge>
              </div> */}
            </Table.Cell>
            <Table.Cell className="flex items-center gap-2">
              <button
                onClick={() => onEdit(appointment)}
                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
              >
                <GrEdit className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => onDelete(appointment.id)}
                className="p-1 text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
              >
                <MdDeleteForever className="h-5 w-5" aria-hidden="true" />
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default AppointmentsTable;
/* 
CREATE TABLE public.appointments (
    id SERIAL PRIMARY KEY,
    scheduler_id INTEGER NOT NULL REFERENCES public.users(id), -- Quien agenda la cita
    patient_id INTEGER NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES public.doctors(id),
    appointment_date DATE NOT NULL,  -- Esta es la fecha programada para la cita
    start_time TIME NOT NULL,
    state_id INTEGER NOT NULL, -- Añadido para el estado de la cita
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_start_time CHECK (start_time >= '08:00:00' AND start_time <= '17:00:00'), -- Asegura horario de atención
    FOREIGN KEY (state_id) REFERENCES public.appointment_states(id) -- Nueva clave foránea para el estado de la cita
);
*/
