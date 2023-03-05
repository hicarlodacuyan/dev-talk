import { useState } from "react";
import { Link } from "react-router-dom";
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
      className="lg:max-w-md lg:mx-auto bg-gray-800 p-8 rounded-md drop-shadow-md"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Sign in to DevTalk</h1>
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
          Login
        </button>
        <p className="text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
