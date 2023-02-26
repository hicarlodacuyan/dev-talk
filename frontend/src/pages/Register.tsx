import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NewUserCredentials } from "../types/user";
import { register, reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

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
      console.log(message);
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
    <div>
      <form
        onSubmit={handleRegistration}
        className="flex flex-col max-w-md gap-2"
      >
        <div className="flex flex-col text-sm gap-2">
          <input
            type="text"
            value={name}
            name="name"
            onChange={onChange}
            placeholder="Name"
            required
            className="p-2 rounded-sm border-solid border-2 border-slate-500"
          />
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
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
