import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/LoadingSpinner";
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

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-4 bg-gray-900 text-gray-300 h-screen p-8 lg:p-32">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className="lg:flex-1">
            <WelcomeMessage />
          </section>
          <section className="lg:flex-1">
            <LoginForm />
          </section>
        </>
      )}
    </div>
  );
};

export default Login;
