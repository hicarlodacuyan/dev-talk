import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";
import WelcomeMessage from "../components/WelcomeMessage";

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row h-screen bg-gray-100 p-32">
      <WelcomeMessage />
      <section className="flex-1 flex flex-col justify-center items-center gap-4">
        <RegisterForm />
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
