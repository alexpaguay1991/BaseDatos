import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import PatientsTable from "../components/PatientsTable";
import { getPatients, deletePatient } from "../services/patientsService";
import { TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ListPatients() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    const patients = await getPatients();
    setPatients(patients);
    setIsLoading(false);
  };

  const handleCreatePatient = () => {
    navigate("add-patient");
  };

  const handleEditPatient = (patient) => {
    navigate("add-patient", { state: patient });
  };

  const handleDeletePatient = async (id) => {
    await deletePatient(id);
    fetchPatients();
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex  flex-col items-start justify-between">
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
            Pacientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Listado de pacientes
          </p>
        </div>

        <div className="flex">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
            onClick={handleCreatePatient}
          >
            Agregar Paciente
          </Button>
        </div>
      </div>
      {/* Search patient */}
      <div className="flex">
        <TextInput
          className="w-96"
          placeholder="Buscar paciente, ingrese cedula"
          /* onChange={handleSearch} */
        />
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          <PatientsTable
            patients={patients}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />
        )}
      </div>
    </section>
  );
}

export default ListPatients;
