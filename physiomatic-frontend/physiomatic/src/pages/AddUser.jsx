import {
  Alert,
  Avatar,
  Button,
  Card,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { HiKey, HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../services/rolesService";
import { createUser, createAdminUser } from "../services/usersService";
import { initialUserState } from "../utils/initialStates";

function AddUser() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(initialUserState());

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const roles = await getRoles();
    setRoles(roles);
  };

  const handleInputChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleListUsers = () => navigate("/users");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.names || !user.email || user.role_id === "0" || !user.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const { user: createdUser } = await createAdminUser(user);
      if (!createdUser) {
        setError("Error al registrar usuario.");
        return;
      }

      await createUser({
        names: user.names,
        email: user.email,
        role_id: parseInt(user.role_id),
        auth_id: createdUser.id,
      });

      setSuccess(`Usuario ${user.names} creado correctamente.`);
    } catch (error) {
      setError("Error al procesar la solicitud: " + error.message);
    } finally {
      setUser(initialUserState());
    }
  };

  return (
    <Card className="w-full">
      {error && (
        <div className="w-full text-center">
          <Alert color="failure">{error}</Alert>
        </div>
      )}

      {success && (
        <div className="w-full text-center">
          <Alert color="success">{success}</Alert>
        </div>
      )}

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
          Agregar Usuario
        </h1>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
          onClick={handleListUsers}
        >
          Listado de usuarios
        </Button>
      </div>
      <div className="flex items-start gap-8">
        <div>
          <h2 className="text-xl font-semibold tracking-wide mt-6 text-center mb-2 text-slate-200">
            Imagen
          </h2>
          <Avatar
            img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg"
            alt="avatar of Jese"
            size="xl"
          />
        </div>

        <form
          className="flex flex-1 flex-wrap justify-center gap-6 border-2 py-10 border-slate-700 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="names" value="Nombres" />
            </div>
            <TextInput
              id="names"
              type="text"
              icon={FaUserCog}
              value={user.names}
              name="names"
              onChange={handleInputChange}
              placeholder="Nombres"
              required
            />
          </div>
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              icon={HiMail}
              value={user.email}
              name="email"
              onChange={handleInputChange}
              placeholder="email@flowbite.com"
              required
            />
          </div>
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="role_id" value="Rol" />
            </div>
            <Select
              id="role_id"
              value={user.role_id}
              name="role_id"
              onChange={handleInputChange}
            >
              <option value="0">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Contraseña" />
            </div>
            <TextInput
              id="password"
              type="password"
              icon={HiKey}
              value={user.password}
              name="password"
              onChange={handleInputChange}
              placeholder="***************"
              required
            />
          </div>
          <div className="w-full flex justify-center">
            <Button type="submit" className="w-5/12">
              Guardar Usuario
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddUser;
