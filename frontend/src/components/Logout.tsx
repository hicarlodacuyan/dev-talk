import { logout } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

const Logout = () => {
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    await dispatch(logout());
  };

  return (
    <button
      onClick={onLogout}
      className="font-bold text-white bg-red-500 rounded-sm p-2"
    >
      Logout
    </button>
  );
};

export default Logout;
