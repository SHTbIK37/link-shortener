import { useEffect, useState, type FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Singin } from "./containers/Signin";
import { Singup } from "./containers/Signup";
import { Account } from "./containers/Account";
import "./App.css";
import type { TUser } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<TUser>({
    username: "",
    password: "",
  });
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    if (!token) navigate("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Singin
              token={token}
              userData={userData}
              setUserData={setUserData}
              setToken={setToken}
            />
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
