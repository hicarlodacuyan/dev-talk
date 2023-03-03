import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user?.token) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-8 lg:flex-row bg-gray-100 p-4 lg:p-32 h-screen gap">
      <section className="lg:flex-1 flex flex-col justify-center lg:gap-10">
        <h1 className="text-gray-700 font-extrabold text-2xl lg:text-4xl">
          Join communities of programmers and start discussions about companies
        </h1>
        <p className="text-gray-500 text-base">
          Search or start new company conversations with a discord-like
          interface. Built with React, Redux, MongoDB, Express, NodeJS and
          TypeScript.
        </p>
      </section>
      <section className="lg:flex-1 flex flex-col justify-center lg:items-center gap-4">
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
        <p className="text-gray-500 text-center">
          Need an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
