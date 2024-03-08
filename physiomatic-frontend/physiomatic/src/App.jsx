import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProtectedRoute from "./router/ProtectedRoute";
import Users from "./pages/Users";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import AddUser from "./pages/AddUser";
import ListUsers from "./pages/ListUsers";
import ListPatients from "./pages/ListPatients";
import AddPatient from "./pages/AddPatient";
import ListDoctors from "./pages/ListDoctors";
import AddDoctor from "./pages/AddDoctor";
import ListAppointments from "./pages/ListAppointments";
import AddAppointments from "./pages/AddAppointments";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<ListUsers />} />
            <Route path="add-user" element={<AddUser />} />
          </Route>
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<ListPatients />} />
            <Route path="add-patient" element={<AddPatient />} />
          </Route>
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<ListDoctors />} />
            <Route path="add-doctor" element={<AddDoctor />} />
          </Route>
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<ListAppointments />} />
            <Route path="add-appointment" element={<AddAppointments />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
