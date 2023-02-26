import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, reset } from "../features/auth/authSlice";
import Register from "./Register";

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
      console.log(message);
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
    <div>
      <form onSubmit={handleLogin} className="flex flex-col max-w-md gap-2">
        <div className="flex flex-col text-sm gap-2">
          <input
            type="text"
            value={username}
            name="username"
            onChange={onChange}
            placeholder="Username"
            required
            className="p-2 rounded-sm border-solid border-2 border-slate-500"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            placeholder="Password"
            required
            className="p-2 rounded-sm border-solid border-2 border-slate-500"
          />
        </div>
        <button
          type="submit"
          className="font-bold text-white bg-slate-500 rounded-sm p-2"
        >
          Login
        </button>
      </form>
      <p>
        Need an account?{" "}
        <Link to="/register" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
