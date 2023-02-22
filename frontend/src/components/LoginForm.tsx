import React, { Dispatch } from "react";
import { UserCredentials } from "../types/user";
import loginService from "../services/login";

interface UserData {
  username: string;
  password: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  setPassword: Dispatch<React.SetStateAction<string>>;
  setUser: Dispatch<React.SetStateAction<UserCredentials | null>>;
}

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
}: UserData) => {
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

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col container max-w-md mx-auto gap-2"
    >
      <div className="flex flex-col text-sm gap-2">
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
          required
          className="p-2 rounded-sm border-solid border-2 border-slate-500"
        />
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          required
          className="p-2 rounded-sm border-solid border-2 border-slate-500"
        />
      </div>
      <button
        type="submit"
        className="font-bold text-white bg-slate-500 rounded-sm p-2"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
