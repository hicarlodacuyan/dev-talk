import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  // if (!user) {
  //   return (
  //     <div className="flex justify-center flex-col h-screen gap-4">
  //       <h1 className="text-center text-4xl md:text-6xl font-bold text-slate-300">
  //         <span className="text-slate-500 font-extrabold">Dev</span>Talk
  //       </h1>
  //       <LoginForm
  //         username={username}
  //         setUsername={setUsername}
  //         password={password}
  //         setPassword={setPassword}
  //         setUser={setUser}
  //       />
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
