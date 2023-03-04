import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LoginForm from "../components/LoginForm";
import WelcomeMessage from "../components/WelcomeMessage";
import { reset } from "../features/auth/authSlice";

const Login = () => {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-8 lg:flex-row bg-gray-100 p-4 lg:p-32 h-screen gap">
      <WelcomeMessage />
      <section className="lg:flex-1 flex flex-col justify-center lg:items-center gap-4">
        <LoginForm />
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
