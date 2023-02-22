import { useEffect, useState } from "react";
import loginService from "./services/login";
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

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const user: UserCredentials = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUserToken", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }

  return (
    <div>
      <h1>DevTalk</h1>
    </div>
  );
};

export default App;
