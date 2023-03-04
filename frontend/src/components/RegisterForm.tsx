import { useState } from "react";
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
    <form
      onSubmit={handleRegistration}
      className="bg-white p-8 rounded-md drop-shadow-md flex flex-col gap-2 w-3/5"
    >
      <div className="flex flex-col text-sm gap-4">
        <h1 className="text-gray-700 text-center font-semibold text-2xl">
          Register an account
        </h1>
        <input
          type="text"
          value={name}
          name="name"
          onChange={onChange}
          placeholder="Name"
          required
          className="p-2 rounded-sm border-solid border-2 border-slate-300"
        />
        <input
          type="text"
          value={username}
          name="username"
          onChange={onChange}
          placeholder="Username"
          required
          className="p-2 rounded-sm border-solid border-2 border-slate-300"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={onChange}
          placeholder="Password"
          required
          className="p-2 rounded-sm border-solid border-2 border-slate-300"
        />
        <button
          type="submit"
          className="font-bold text-white bg-green-500 rounded-sm p-2"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
