import { getAppointments } from "../services/appointmentsService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentsTable from "../components/AppointmentsTable";
import { Datepicker } from "flowbite-react";
import { Button, Label, Select, TextInput, Card } from "flowbite-react";
import { MdOutlineDateRange } from "react-icons/md";
import { GrDocumentUser } from "react-icons/gr";

function ListAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    const appointments = await getAppointments();
    setAppointments(appointments);
    setIsLoading(false);
  };

  const handleCreateAppointment = () => {
    navigate("add-appointment");
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex  flex-col items-start justify-between">
          <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
            Citas
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Listado de citas
          </p>
        </div>
        <div className="flex">
          <Button
            className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
            onClick={handleCreateAppointment}
          >
            Crear Cita
          </Button>
        </div>
      </div>
      {/* Search patient */}
      <div className="flex gap-4">
        <Datepicker
          value={new Intl.DateTimeFormat("es", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date())}
          onChange={(value) => setDate(value)}
          icon={MdOutlineDateRange}
        />
        <TextInput
          placeholder="Buscar cita, ingrese cedula"
          icon={GrDocumentUser}
        />
        {/* State AAppointments  */}
        <Select value="all" onChange={(e) => console.log(e.target.value)}>
          <option value="all">Todas las citas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </Select>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center">
            <Card className="w-full">
              <div className="text-center">
                <p className="text-2xl font-semibold text-slate-200">
                  Cargando
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <AppointmentsTable appointments={appointments} />
        )}
      </div>
    </section>
  );
}

export default ListAppointments;
