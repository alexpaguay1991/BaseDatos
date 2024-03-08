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
import { FaAddressCard, FaFlag } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { MdOutlineEmail, MdOutlinePhoneAndroid } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import {
  createDoctor,
  getDoctorByDni,
  updateDoctor,
} from "../services/doctorsService";
import { initialDoctorState } from "../utils/initialStates";
import { validateDoctor } from "../utils/validateDataForms";

function AddDoctor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signUp } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [doctor, setDoctor] = useState(initialDoctorState());
  const [disableEmail, setDisableEmail] = useState(false);
  const [disablePassword, setDisablePassword] = useState(false);

  console.log("user", user);

  const handleInputChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    handleEdit();
    setDisableEmail(!!location.state);
    setDisablePassword(!!location.state);
  }, [location.state]);

  const handleEdit = () => {
    const doctor = location.state;
    if (location && doctor) {
      setDoctor(doctor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateDoctor(doctor);
    if (error) {
      setError(error);
      return;
    }

    try {
      setError("");
      setSuccess("");

      if (location.state) {
        const isNationalIdModified =
          doctor.national_id !== location.state.national_id;

        if (isNationalIdModified) {
          const doctorExists = await getDoctorByDni(doctor.national_id);
          if (doctorExists) {
            setError("Ya existe un doctor con esa cédula.");
            return;
          }
        }

        await updateDoctor(location.state.id, {
          names: doctor.names,
          national_id: doctor.national_id,
          specialty: doctor.specialty,
          phone_number: doctor.phone_number,
        });

        setSuccess("Doctor actualizado correctamente.");
        return;
      }

      const doctorExists = await getDoctorByDni(doctor.national_id);
      if (doctorExists) {
        setError("Ya existe un doctor con esa cédula.");
        return;
      }

      const { user: createdUser } = await signUp({
        email: doctor.email,
        password: doctor.password,
      });

      if (!createdUser) {
        setError("Error al registrar doctor.");
        return;
      }

      await createDoctor({
        national_id: doctor.national_id,
        names: doctor.names,
        specialty: doctor.specialty,
        phone_number: doctor.phone_number,
        email: doctor.email,
      });

      setSuccess("Doctor creado correctamente, verifique su email.");
    } catch (error) {
      setError(error.message);
    } finally {
      if (!location.state) {
        setDoctor(initialDoctorState());
      }
    }
  };

  return (
    <Card className="w-full">
      {error && <Alert color="failure"> {error} </Alert>}
      {success && <Alert color="success">{success}</Alert>}

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-slate-200">
          Agregar Doctor
        </h1>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 text-white self-end"
          onClick={() => navigate("/doctors")}
        >
          Listado de Doctores
        </Button>
      </div>
      <div className="flex items-start gap-8">
        <div>
          <h2 className="text-xl font-semibold tracking-wide mt-6 text-center mb-2 text-slate-200">
            Imagen
          </h2>
          <Avatar
            size="large"
            img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg"
          />
        </div>

        <form
          className="flex flex-1 flex-wrap justify-center gap-6 border-2 py-10 border-slate-700 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="national_id"
                className="flex items-center"
                value="Cédula"
              />
            </div>
            <TextInput
              id="national_id"
              icon={FaAddressCard}
              name="national_id"
              placeholder="Cédula"
              value={doctor.national_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="names"
                className="flex items-center"
                value="Nombres"
              />
            </div>
            <TextInput
              id="names"
              icon={GrDocumentUser}
              name="names"
              placeholder="Nombres"
              value={doctor.names}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="specialty"
                className="flex items-center"
                value="Especialidad"
              />
            </div>
            <Select
              id="specialty"
              icon={FaFlag}
              name="specialty"
              value={doctor.specialty}
              onChange={handleInputChange}
            >
              <option value="0">Seleccione una especialidad</option>
              <option value="Fisioterapia">Fisioterapia</option>
            </Select>
          </div>
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="phone_number"
                className="flex items-center"
                value="Teléfono"
              />
            </div>
            <TextInput
              id="phone_number"
              icon={MdOutlinePhoneAndroid}
              name="phone_number"
              placeholder="Teléfono"
              value={doctor.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                className="flex items-center"
                value="Email"
              />
            </div>
            <TextInput
              id="email"
              icon={MdOutlineEmail}
              name="email"
              placeholder="Email"
              value={doctor.email}
              onChange={handleInputChange}
              disabled={disableEmail}
            />
          </div>

          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                className="flex items-center"
                value="Contraseña"
              />
            </div>
            <TextInput
              id="password"
              type="password"
              icon={MdOutlineEmail}
              name="password"
              placeholder="Contraseña"
              value={doctor.password}
              onChange={handleInputChange}
              disabled={disablePassword}
            />
          </div>
          <div className="w-5/12 ">
            <Button type="submit" className="w-full">
              Guardar Doctor
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddDoctor;
