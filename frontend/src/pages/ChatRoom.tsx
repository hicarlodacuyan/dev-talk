import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getCompanies } from "../features/company/companySlice";
import Logout from "../components/Logout";

const ChatRoom = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { companies } = useAppSelector((state) => state.company);

  useEffect(() => {
    if (!user?.token) navigate("/login");

    const fetchData = async () => {
      await dispatch(getCompanies());
    };

    void fetchData();
  }, [user, navigate, dispatch]);

  return (
    <main className="flex h-screen text-gray-100">
      <aside className="flex-2 hidden lg:flex flex-col bg-gray-900 h-full p-4">
        <ul className="flex-1">
          {companies?.map((company) => (
            <li key={company.id}>{company.description}</li>
          ))}
        </ul>
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
