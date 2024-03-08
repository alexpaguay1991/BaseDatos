import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorsTable from "../components/DoctorsTable";
import { getDoctors, deleteDoctor } from "../services/doctorsService";

function ListDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    const doctors = await getDoctors();
    setDoctors(doctors);
    setIsLoading(false);
  };

  const handleCreateDoctor = () => {
    navigate("add-doctor");
  };

  const handleEditDoctor = (doctor) => {
    navigate("add-doctor", { state: doctor });
  };

  const handleDeleteDoctor = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex  flex-col items-start justify-between">
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
            Doctores
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Listado de doctores
          </p>
        </div>
        <div className="flex">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
            onClick={handleCreateDoctor}
          >
            Agregar Doctor
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          <DoctorsTable
            doctors={doctors}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
          />
        )}
      </div>
    </section>
  );
}

export default ListDoctors;
