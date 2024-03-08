import { Badge, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi";

import { FaHospitalUser, FaCalendarPlus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.Logo className="text-slate-800">Physiomatic </Sidebar.Logo>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiChartPie}
            onClick={() => navigateTo("/home")}
            className="cursor-pointer"
            href="#"
          >
            Inicio
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiUser}
            onClick={() => navigateTo("/users")}
            className="cursor-pointer"
            href="#"
          >
            Usuarios
          </Sidebar.Item>
          <Sidebar.Item
            icon={FaHospitalUser}
            href="#"
            onClick={() => navigateTo("/patients")}
            className="cursor-pointer"
          >
            Pacientes
          </Sidebar.Item>

          <Sidebar.Item
            icon={FaUserDoctor}
            onClick={() => navigateTo("/doctors")}
            className="cursor-pointer"
            href="#"
          >
            Medicos
          </Sidebar.Item>
          <Sidebar.Item
            icon={FaCalendarPlus}
            onClick={() => navigateTo("/appointments")}
            className="cursor-pointer"
            href="#"
          >
            Citas
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignOut}
            className="cursor-pointer"
            href="#"
          >
            Salir
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

      <Sidebar.CTA>
        <div className="mb-3 flex items-center">
          <Badge color="warning">Beta</Badge>
          <button
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            type="button"
          >
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
          Preview the new Flowbite dashboard navigation! You can turn the new
          navigation off for a limited time in your profile.
        </div>
        <div className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300">
          Turn new navigation off
        </div>
      </Sidebar.CTA>
    </Sidebar>
  );
}

export default SideBar;
