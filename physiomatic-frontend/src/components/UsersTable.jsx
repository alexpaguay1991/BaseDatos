import { Badge, Table } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";

function UsersTable({ users, onEdit, onDelete }) {
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Nombre</Table.HeadCell>
        <Table.HeadCell>Usuario</Table.HeadCell>
        <Table.HeadCell>Rol</Table.HeadCell>
        <Table.HeadCell>Fecha Ingreso</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Acciones</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user, index) => (
          <Table.Row
            key={user.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell>{user.names}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                {user.role_id === 1 ? (
                  <Badge color="success">Administrador</Badge>
                ) : (
                  <Badge color="warning">Usuario</Badge>
                )}
              </div>
            </Table.Cell>
            <Table.Cell>
              {new Intl.DateTimeFormat("es", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(user.created_at))}
            </Table.Cell>
            <Table.Cell className="flex items-center gap-2">
              {/* <button
                onClick={() => onEdit(user)}
                className="p-1 text-cyan-600 hover:text-cyan-900 dark:text-cyan-500 dark:hover:text-cyan-400"
              >
                <GrEdit className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                onClick={() => onDelete(user.id)}
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

export default UsersTable;
