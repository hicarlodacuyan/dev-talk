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
    <main className="flex h-screen text-gray-100">
      <aside className="flex-2 hidden lg:flex items-end bg-gray-900 h-full p-4">
        <section className="flex items-center gap-4">
          {`You are logged in as ${user?.name}`}
          <Logout />
        </section>
      </aside>
      <section className="flex-1 flex justify-center items-center bg-gray-800 text-2xl font-bold">
        See conversations here
      </section>
    </main>
  );
};

export default ChatRoom;
