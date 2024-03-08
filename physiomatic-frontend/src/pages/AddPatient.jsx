import {
  Alert,
  Avatar,
  Button,
  Card,
  Datepicker,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";
import {
  MdOutlineDateRange,
  MdOutlineEmail,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createPatient,
  getGenders,
  getPatientById,
  updatePatient,
} from "../services/patientsService";
import { formatDateTime } from "../utils/common";
import { initialPatientState } from "../utils/initialStates";
import { validatePatient } from "../utils/validateDataForms";

function AddPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [patient, setPatient] = useState(initialPatientState());

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    fetchGenders();
  }, []);

  const fetchGenders = async () => {
    const genders = await getGenders();
    setGenders(genders);
  };

  const handleInputChange = (e) =>
    setPatient({ ...patient, [e.target.name]: e.target.value });

  useEffect(() => {
    handleEdit();
  }, [location.state]);

  const handleEdit = () => {
    const patient = location.state;
    if (location && patient) {
      setPatient(patient);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validatePatient(patient);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    
    try {
      setError("");
      setSuccess("");

      if (location.state) {
        const isNationalIdModified =
          patient.national_id !== location.state.national_id;

        if (isNationalIdModified) {
          const patientExists = await getPatientById(patient.national_id);
          if (patientExists.length > 0) {
            setError("El paciente ya existe, verifique la cédula.");
            return;
          }
        }

        await updatePatient(location.state.id, {
          ...patient,
          gender_id: parseInt(patient.gender_id),
        });
        setSuccess("Paciente actualizado con éxito.");
        return;
      }

      const patientExists = await getPatientById(patient.national_id);
      if (patientExists.length > 0) {
        setError("El paciente ya existe, verifique la cédula.");
        return;
      }

      await createPatient({
        ...patient,
        gender_id: parseInt(patient.gender_id),
      });

      setSuccess("Paciente guardado con éxito.");
    } catch (error) {
      setError("Ha ocurrido un error al guardar el paciente.");
    } finally {
      if (!location.state) {
        setPatient(initialPatientState());
      }
    }
  };

  return (
    <Card className="w-full">
      {error && <Alert color="failure"> {error} </Alert>}
      {success && <Alert color="success">{success}</Alert>}

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
          Agregar Paciente
        </h1>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
          onClick={() => navigate("/patients")}
        >
          Listado de Pacientes
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
          {/* Cedula */}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="national_id" value="Cédula" />
            </div>
            <TextInput
              id="national_id"
              type="text"
              icon={FaAddressCard}
              value={patient.national_id}
              name="national_id"
              onChange={handleInputChange}
              placeholder="Cédula"
              required
            />
          </div>
          {/* Names */}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="names" value="Nombres" />
            </div>
            <TextInput
              id="names"
              type="text"
              icon={GrDocumentUser}
              value={patient.names}
              name="names"
              onChange={handleInputChange}
              placeholder="Nombres"
              required
            />
          </div>
          {/* Birthdate */}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="birth_date" value="Fecha de Nacimiento" />
            </div>
            <Datepicker
              id="birth_date"
              weekStart={1}
              icon={MdOutlineDateRange}
              name="birth_date"
              onSelectedDateChanged={(date) =>
                handleInputChange({
                  target: {
                    name: "birth_date",
                    value: formatDateTime(date),
                  },
                })
              }
              value={patient.birth_date}
              maxDate={new Date()}
              placeholder="Fecha de Nacimiento"
              required
            />
          </div>

          {/* Gender */}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="gender_id" value="Género" />
            </div>
            <Select
              id="gender_id"
              value={patient.gender_id}
              name="gender_id"
              onChange={handleInputChange}
              required
            >
              <option value={0}>Seleccione un género</option>
              {genders.map((gender, index) => (
                <option key={index + 1} value={gender.id}>
                  {gender.description}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              icon={MdOutlineEmail}
              value={patient.email}
              name="email"
              onChange={handleInputChange}
              placeholder="email@flowbite.com"
              required
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="phone_number" value="Teléfono" />
            </div>
            <TextInput
              id="phone_number"
              type="text"
              icon={MdOutlinePhoneAndroid}
              value={patient.phone_number}
              name="phone_number"
              onChange={handleInputChange}
              placeholder="Teléfono"
              required
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Dirección" />
            </div>
            <TextInput
              id="address"
              type="text"
              value={patient.address}
              name="address"
              onChange={handleInputChange}
              placeholder="Dirección"
              required
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="emergency_contact_name"
                value="Contacto de Emergencia"
              />
            </div>
            <TextInput
              id="emergency_contact_name"
              type="text"
              icon={IoMdContacts}
              value={patient.emergency_contact_name}
              name="emergency_contact_name"
              onChange={handleInputChange}
              placeholder="Contacto de Emergencia"
              required
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="emergency_contact_phone"
                value="Teléfono de Emergencia"
              />
            </div>
            <TextInput
              id="emergency_contact_phone"
              type="text"
              icon={MdOutlinePhoneAndroid}
              value={patient.emergency_contact_phone}
              name="emergency_contact_phone"
              onChange={handleInputChange}
              placeholder="Teléfono de Emergencia"
              required
            />
          </div>

          <div className="w-5/12 mt-8">
            <Button type="submit" className="w-full">
              Guardar Paciente
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddPatient;
