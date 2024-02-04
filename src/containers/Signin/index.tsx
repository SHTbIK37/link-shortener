import { type FC, type ChangeEvent } from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";

import { TSigninProps } from "./types";

const Singin: FC<TSigninProps> = (props) => {
  // регистрация или вход
  const [reg, setReg] = useState<boolean>(false);
  // запрос токена
  const sendData = () => {
    // регистрация
    if (reg) {
      console.log("reg");
    }
    // логин
    if (!reg) {
      console.log("no reg");
    }
  };
  // хранение логина и пароля
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.id === "username")
      props.setUserData((prevData) => ({
        ...prevData,
        username: event.target.value,
      }));

    if (event.target.id === "password")
      props.setUserData((prevData) => ({
        ...prevData,
        password: event.target.value,
      }));
  };
  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" color="initial">
        {!reg && "Вход"}
        {reg && "Регистрация"}
      </Typography>
      <TextField
        id="username"
        onChange={handleChange}
        sx={{ m: "8px 0" }}
        label="Логин"
        variant="outlined"
      />
      <TextField
        id="password"
        onChange={handleChange}
        sx={{ m: "8px 0" }}
        label="Пароль"
        type="password"
        variant="outlined"
      />
      <Button onClick={sendData} sx={{ m: "8px 0" }} variant="contained">
        Войти
      </Button>
      <Button
        onClick={() => {
          !reg ? setReg(true) : setReg(false);
        }}
        sx={{ textTransform: "none", m: "8px 0" }}
      >
        {!reg && "Нет аккаунта? Зарегистрироваться"}
        {reg && "Есть аккаунт? Войти"}
      </Button>
    </Container>
  );
};
export { Singin };
