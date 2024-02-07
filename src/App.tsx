import type { FC } from "react";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import { Singin } from "./containers/Signin";
import { Singup } from "./containers/Signup";
import type { TUser } from "./types";
import { Account } from "./containers/Account";

const App: FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<TUser>({
    username: "",
    password: "",
  });
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            token && <Account username={userData.username} token={token} />
          }
        />
        <Route
          path="/signin"
          element={
            (!token || token === "error") && (
              <Singin
                token={token}
                userData={userData}
                setUserData={setUserData}
                setToken={setToken}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={<Singup userData={userData} setUserData={setUserData} />}
        />
        <Route path="*" element={<a href="/">page not found, go home</a>} />
      </Routes>
    </div>
  );
};

export { App };
