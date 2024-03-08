import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { HiKey } from "react-icons/hi";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//loading flowbite-react
function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/home");
    }
    setLoading(false);
  };

  return (
    <section className=" bg-slate-800 rounded-md p-8 w-3/4">
      <h2 className="text-3xl mb-4 font-semibold text-cyan-300 text-center">
        Physiomatic
      </h2>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignIn}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            icon={HiMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Contraseña" />
          </div>
          <TextInput
            id="password"
            type="password"
            icon={HiKey}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***************"
            required
          />
        </div>
        <Button type="submit" className="mt-4">
          Ingresar
        </Button>
      </form>
    </section>
  );
}

export default LoginForm;
