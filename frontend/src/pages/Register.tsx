import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NewUserCredentials } from "../types/user";
import { register, reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState<NewUserCredentials>({
    name: "",
    username: "",
    password: "",
  });

  const { name, username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegistration = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const userCrentials: NewUserCredentials = {
      name,
      username,
      password,
    };

    await dispatch(register(userCrentials));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row h-screen bg-gray-100 p-32">
      <section className="flex-1 flex flex-col justify-center gap-10">
        <h1 className="text-gray-700 font-extrabold text-2xl md:text-4xl">
          Join communities of programmers and start discussions about companies
        </h1>
        <p className="text-gray-500 text-base">
          Search or start new company conversations with a discord-like
          interface. Built with React, Redux, MongoDB, Express, NodeJS and
          TypeScript.
        </p>
      </section>
      <section className="flex-1 flex flex-col justify-center items-center gap-4">
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
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
