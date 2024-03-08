import { Table } from "flowbite-react";
import { Badge } from "flowbite-react";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { currentAge } from "../utils/common";

function PatientsTable({ patients, onEdit, onDelete }) {
  console.log(patients);
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>N0</Table.HeadCell>
        <Table.HeadCell>Cedula</Table.HeadCell>
        <Table.HeadCell>Nombres</Table.HeadCell>
        <Table.HeadCell>Edad</Table.HeadCell>
        <Table.HeadCell>Genero</Table.HeadCell>
        <Table.HeadCell>Fecha Ingreso</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Acciones</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {patients.map((patient, index) => (
          <Table.Row
            key={index + 1}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell>{patient.national_id}</Table.Cell>
            <Table.Cell>{patient.names}</Table.Cell>
            <Table.Cell>{currentAge(patient.birth_date)}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                {patient.gender_id === 1 ? (
                  <Badge color="success">Masculino</Badge>
                ) : patient.gender_id === 2 ? (
                  <Badge color="warning">Femenino</Badge>
                ) : (
                  <Badge color="info">Prefiero no decir</Badge>
                )}
              </div>
            </Table.Cell>
            <Table.Cell>
              {new Intl.DateTimeFormat("es", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(patient.created_at))}
            </Table.Cell>
            <Table.Cell className="flex items-center gap-2">
              <button
                onClick={() => onEdit(patient)}
                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
              >
                <GrEdit className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => onDelete(patient.id)}
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

export default PatientsTable;
