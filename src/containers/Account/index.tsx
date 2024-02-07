import { type ChangeEvent, useState, type FC } from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Table } from "@mui/material/";
import { TableBody } from "@mui/material/";
import { TableCell } from "@mui/material/";
import { TableContainer } from "@mui/material/";
import { TableHead } from "@mui/material/";
import { TableRow } from "@mui/material/";
import { Paper } from "@mui/material/";

import type { TAccountProps, TRows } from "./types";

const Account: FC<TAccountProps> = (props) => {
  const [fullLink, setFullLink] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFullLink(event.target.value);
  };
  const sendLink = async () => {
    console.log(fullLink);
    console.log(props.token);
    const res = await fetch(
      `https://front-test.hex.team/api/squeeze?link=${fullLink}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.token}`,
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (res.ok) console.log(await res.json());
    else console.log(await res.json());
  };
  const createData = (shortLink: string, fullLink: string, counter: number) => {
    return { shortLink, fullLink, counter };
  };
  const [rows, setRows] = useState<TRows>([
    createData("Frozen yoghurt", "159", 6.0),
    createData("Ice cream sandwich", "237", 9.0),
    createData("Eclair", "262", 16.0),
    createData("Cupcake", "305", 3.7),
    createData("Gingerbread", "356", 16.0),
  ]);

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", margin: "16px auto" }}
      >
        <Typography variant="h4" color="initial" m={2}>
          Добро пожаловать, {props.username}!
        </Typography>
        <Typography variant="h5" color="initial">
          Введите ссылку для сокращения
        </Typography>
        <TextField
          onChange={handleChange}
          sx={{ m: "8px 0" }}
          label="Ссылка"
          variant="outlined"
        />
        <Button onClick={sendLink} sx={{ m: "8px 0" }} variant="contained">
          Сократить
        </Button>
        <Typography variant="h5" color="initial" m={2}>
          Ваши ссылки
        </Typography>
      </Container>
      {/* Таблица */}
      <TableContainer
        sx={{ maxWidth: "1280px", margin: "0 auto" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Короткая ссылка</TableCell>
              <TableCell align="right">Исходная ссылка</TableCell>
              <TableCell align="right">
                Кол-во переходов по короткой ссылке
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.shortLink}>
                <TableCell component="th" scope="row">
                  {row.shortLink}
                </TableCell>
                <TableCell align="right">{row.fullLink}</TableCell>
                <TableCell align="right">{row.counter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export { Account };
