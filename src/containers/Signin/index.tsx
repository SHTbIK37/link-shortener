import { type FC, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";

import { TSigninProps } from "./types";
import { address } from "../../constants";

const Singin: FC<TSigninProps> = (props) => {
  const navigate = useNavigate();
  // запрос токена
  const sendData = async () => {
    const res = await fetch(`${address}/api/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.userData.username,
        password: props.userData.password,
      }),
    });

    if (res.ok) {
      const token = await res.json();
      props.setToken(token.access_token);
      return navigate("/");
    } else {
      props.setToken("error");
    }
  };
  // хранение логина и пароля
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Container
      component="form"
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4" color="initial">
        Вход
      </Typography>
      <TextField
        name="username"
        onChange={handleChange}
        sx={{ m: "8px 0" }}
        label="Логин"
        variant="outlined"
      />
      <TextField
        name="password"
        onChange={handleChange}
        sx={{ m: "8px 0" }}
        label="Пароль"
        type="password"
        variant="outlined"
      />
      {props.token === "error" && (
        <Typography color={"error"}>Неверный логин или пароль</Typography>
      )}
      <Button
        size="large"
        onClick={sendData}
        sx={{ m: "8px 0" }}
        variant="contained"
      >
        Войти
      </Button>
      <Button sx={{ textTransform: "none", m: "8px 0" }}>
        <Link to="/signup">Нет аккаунта? Зарегистрироваться</Link>
      </Button>
    </Container>
  );
};
export { Singin };
