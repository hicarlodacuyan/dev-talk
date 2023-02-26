import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Logout from "../components/Logout";

const ChatRoom = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.token) navigate("/login");
  }, [user, navigate]);

  return (
    <div>
      {`You are logged in as ${user?.name}`}
      <Logout />
    </div>
  );
};

export default ChatRoom;
