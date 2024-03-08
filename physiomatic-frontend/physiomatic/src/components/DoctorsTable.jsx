import { Table } from "flowbite-react";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

function DoctorsTable({ doctors, onEdit, onDelete }) {
  /*     
    national_id VARCHAR(255) NOT NULL UNIQUE,
    names VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    phone_number VARCHAR(50),
    email VARCHAR(255) UNIQUE
     */
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>N0</Table.HeadCell>
        <Table.HeadCell>Cedula</Table.HeadCell>
        <Table.HeadCell>Nombres</Table.HeadCell>
        <Table.HeadCell>Especialidad</Table.HeadCell>
        <Table.HeadCell>Telefono</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Acciones</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {doctors.map((doctor, index) => (
          <Table.Row
            key={index + 1}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell>{doctor.national_id}</Table.Cell>
            <Table.Cell>{doctor.names}</Table.Cell>
            <Table.Cell>{doctor.specialty}</Table.Cell>
            <Table.Cell>{doctor.phone_number}</Table.Cell>
            <Table.Cell>{doctor.email}</Table.Cell>
            <Table.Cell className="flex items-center gap-2">
              <button
                onClick={() => onEdit(doctor)}
                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
              >
                <GrEdit className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => onDelete(doctor.id)}
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

export default DoctorsTable;
