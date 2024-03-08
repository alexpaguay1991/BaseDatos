import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import { getUsers, deleteUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    const users = await getUsers();
    setUsers(users);
    setIsLoading(false);
  };

  const handleCreateUser = () => {
    navigate("add-user");
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex  flex-col items-start justify-between">
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
            Usuarios
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Listado de usuarios
          </p>
        </div>
        <div className="flex">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
            onClick={handleCreateUser}
          >
            Agregar Usuario
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          <UsersTable users={users} onDelete={handleDeleteUser} />
        )}
      </div>
    </section>
  );
}

export default ListUsers;
