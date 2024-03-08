import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.png";

function Login() {
  return (
    <div className="h-screen bg-slate-900 flex">
      <section className=" w-2/3 flex flex-col">
        <div className="flex items-center justify-center  w-full ">
          <img src={logo} alt="logo" className="w-2/3 p-5 border-none" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-cyan-600 text-center ">
            Todos los derechos reservados
          </p>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center">
        <LoginForm />
      </section>
    </div>
  );
}

export default Login;
