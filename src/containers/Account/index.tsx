import { type ChangeEvent, useState, type FC, useEffect } from "react";
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
import { InputLabel } from "@mui/material/";
import { MenuItem } from "@mui/material/";
import { FormControl } from "@mui/material/";
import { Select, SelectChangeEvent } from "@mui/material/";

import type { TAccountProps, TRows, TSort } from "./types";

const Account: FC<TAccountProps> = (props) => {
  const prefixLink: string = "https://front-test.hex.team/s/";
  const [linkPerPage, setLinkPerPage] = useState<number>(5);
  const [sort, setSort] = useState<TSort>("desc_counter");
  const [fullLink, setFullLink] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFullLink(event.target.value);
  };
  const handleSelect = (event: SelectChangeEvent) => {
    setSort(event.target.value as TSort);
  };
  const sendLink = async () => {
    if (fullLink === "") return 0;
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
    if (res.ok) {
      console.log(await res.json());
      getLinks();
    } else {
      console.log(await res.json());
      alert("Ошибка");
    }
  };

  const createData = (shortLink: string, fullLink: string, counter: number) => {
    return { shortLink, fullLink, counter };
  };
  const [rows, setRows] = useState<TRows>([]);
  const getLinks = async () => {
    const res = await fetch(
      `https://front-test.hex.team/api/statistics?order=${sort}&offset=0&limit=2`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      // console.log(res.headers.get(`x-total-count`));
      setRows(
        data.map((row: any) => {
          return createData(prefixLink + row.short, row.target, row.counter);
        })
      );
    } else alert("Данные не загружены");
  };
  useEffect(() => {
    getLinks();
  }, [setRows, sort]);
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

        {/* Выбор сортировки */}

        <Typography variant="h5" color="initial">
          Выбор сортировки
        </Typography>
        <FormControl sx={{ maxWidth: "300px", margin: "16px auto" }}>
          <InputLabel>Сортировка</InputLabel>
          <Select value={sort} label="Сортировка" onChange={handleSelect}>
            <MenuItem value={"asc_short"}>По короткой ссылке (A-Z)</MenuItem>
            <MenuItem value={"desc_short"}>По короткой ссылке (Z-A)</MenuItem>
            <MenuItem value={"asc_target"}>По длинной ссылке (A-Z)</MenuItem>
            <MenuItem value={"desc_target"}>По длинной ссылке (Z-A)</MenuItem>
            <MenuItem value={"desc_counter"}>
              По кол-ву переходов (2..1..0)
            </MenuItem>
            <MenuItem value={"asc_counter"}>
              По кол-ву переходов (0..1..2)
            </MenuItem>
          </Select>
        </FormControl>
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
                  <a rel="noreferrer" target="_blank" href={row.shortLink}>
                    {row.shortLink}
                  </a>
                </TableCell>
                <TableCell align="right">
                  <a rel="noreferrer" target="_blank" href={row.fullLink}>
                    {row.fullLink}
                  </a>
                </TableCell>
                <TableCell align="right">{row.counter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography m={2} variant="h6" color="initial">
        Сколько отображать на странице:
      </Typography>
      <TextField label="Кол-во строк" defaultValue={linkPerPage} />
    </>
  );
};
export { Account };
