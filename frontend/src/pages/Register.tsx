import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";
import WelcomeMessage from "../components/WelcomeMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
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

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-4 bg-black text-gray-300 h-screen p-8 lg:p-32">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className="lg:flex-1">
            <WelcomeMessage />
          </section>
          <section className="lg:flex-1">
            {isLoading ? <LoadingSpinner /> : <RegisterForm />}
          </section>
        </>
      )}
    </div>
  );
};

export default Register;
