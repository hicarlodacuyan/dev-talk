import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import { UserCredentials } from "./types/user";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<UserCredentials | null>(null);

  useEffect(() => {
    const loggedInUserTokenJSON =
      window.localStorage.getItem("loggedInUserToken");

    if (loggedInUserTokenJSON) {
      const user = JSON.parse(loggedInUserTokenJSON) as UserCredentials;
      setUser(user);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center flex-col h-screen gap-4">
        <h1 className="text-center text-4xl md:text-6xl font-bold text-slate-300">
          <span className="text-slate-500 font-extrabold">Dev</span>Talk
        </h1>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
        />
      </div>
    );
  }

  return (
    <div>
      <Logout setUser={setUser} />
    </div>
  );
};

export default App;
