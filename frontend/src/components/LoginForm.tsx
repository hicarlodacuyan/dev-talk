import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const dispatch = useAppDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const userCrentials = {
      username,
      password,
    };

    await dispatch(login(userCrentials));
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-md drop-shadow-md flex flex-col gap-2 lg:w-3/5"
    >
      <div className="flex flex-col text-sm gap-4">
        <h1 className="text-gray-700 text-center font-semibold text-2xl">
          Login your account
        </h1>
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
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
