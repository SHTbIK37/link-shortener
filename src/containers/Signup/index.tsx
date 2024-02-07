import { type FC, type ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";

import type { TSignupProps } from "./types";

const Singup: FC<TSignupProps> = (props) => {
  const [success, setSuccess] = useState<string>("-1");
  const navigate = useNavigate();
  // запрос регистрации
  const sendRegData = async () => {
    // проверка полей
    if (props.userData.username === "") {
      setSuccess("Введите логин");
      return 0;
    }
    if (props.userData.password === "") {
      setSuccess("Введите пароль");
      return 0;
    }
    const res = await fetch(
      `https://front-test.hex.team/api/register?username=${props.userData.username}&password=${props.userData.password}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (res.ok) {
      setSuccess("1");
      setTimeout(() => {
        return navigate("/signin");
      }, 1000);
    } else {
      const error = await res.json();
      setSuccess(error.detail);
    }
  };
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
        Регистрация
      </Typography>
      <TextField
        onChange={handleChange}
        id="username"
        sx={{ m: "8px 0" }}
        label="Логин"
        variant="outlined"
      />
      <TextField
        onChange={handleChange}
        id="password"
        sx={{ m: "8px 0" }}
        label="Пароль"
        type="password"
        variant="outlined"
      />
      {success !== "1" && success !== "-1" && (
        <Typography color={"error"}>{success}</Typography>
      )}
      <Button onClick={sendRegData} sx={{ m: "8px 0" }} variant="contained">
        зарегистрироваться
      </Button>
      <Button sx={{ textTransform: "none", m: "8px 0" }}>
        <Link to="/signin">Есть аккаунт? Войти</Link>
      </Button>
    </Container>
  );
};
export { Singup };
