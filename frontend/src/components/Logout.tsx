import { Dispatch } from "react";
import { UserCredentials } from "../types/user";

const Logout = ({
  setUser,
}: {
  setUser: Dispatch<React.SetStateAction<UserCredentials | null>>;
}) => {
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <button
      onClick={logout}
      className="font-bold text-white bg-red-500 rounded-sm p-2"
    >
      Logout
    </button>
  );
};

export default Logout;
