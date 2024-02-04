import type { FC } from "react";
import { useState } from "react";

import "./App.css";
import { Singin } from "./containers/Signin";
import type { TUser } from "./types";

const App: FC = () => {
  const [userData, setUserData] = useState<TUser>({
    username: "",
    password: "",
  });
  const [token, setToken] = useState<string>("");
  return (
    <div className="App">
      {!token && (
        <Singin
          userData={userData}
          setUserData={setUserData}
          setToken={setToken}
        ></Singin>
      )}
    </div>
  );
};

export default App;
