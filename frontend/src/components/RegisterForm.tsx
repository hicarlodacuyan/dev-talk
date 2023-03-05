import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { register } from "../features/auth/authSlice";
import { NewUserCredentials } from "../types/user";

const RegisterForm = () => {
  const [formData, setFormData] = useState<NewUserCredentials>({
    name: "",
    username: "",
    password: "",
  });

  const { name, username, password } = formData;

  const dispatch = useAppDispatch();

  const handleRegistration = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const userCrentials: NewUserCredentials = {
      name,
      username,
      password,
    };

    await dispatch(register(userCrentials));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleRegistration} className="lg:max-w-md lg:mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Create your account</h1>
        <input
          type="text"
          value={name}
          name="name"
          onChange={onChange}
          placeholder="Name"
          required
          className="bg-transparent border-2 outline-none rounded-md p-2 focus:border-blue-500"
        />
        <input
          type="text"
          value={username}
          name="username"
          onChange={onChange}
          placeholder="Username"
          required
          className="bg-transparent border-2 outline-none rounded-md p-2 focus:border-blue-500"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={onChange}
          placeholder="Password"
          required
          className="bg-transparent border-2 outline-none rounded-md p-2 focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-gray-100 text-black font-bold rounded-md p-2 hover:bg-gray-300"
        >
          Register
        </button>
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
