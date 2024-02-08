import {
  type ChangeEvent,
  useState,
  type FC,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material/";
import { MenuItem } from "@mui/material/";
import { FormControl } from "@mui/material/";
import { Box } from "@mui/material/";
import { Select, SelectChangeEvent } from "@mui/material/";

import type {
  TAccountProps,
  TResponseLink,
  TResponseLinks,
  TRows,
  TSort,
} from "./types";
import { LinksTable } from "../../components/LinksTable";
import { address } from "../../constants";

const Account: FC<TAccountProps> = (props) => {
  const prefixLink: string = address + "/s/";
  const allLinks = useRef<number>(0);
  const [linkPerPage, setLinkPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<TSort>("desc_counter");
  const [fullLink, setFullLink] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFullLink(event.target.value);
  };
  const handleSelect = (event: SelectChangeEvent) => {
    setSort(event.target.value as TSort);
  };
  const sendLink = async () => {
    if (fullLink === "") return null;
    const res = await fetch(`${address}/api/squeeze?link=${fullLink}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (res.ok) {
      getLinks();
    } else {
      let error = await res.json();
      alert(`Ошибка со стороны сервера: ${error.details}`);
    }
  };

  const createData = (shortLink: string, fullLink: string, counter: number) => {
    return { shortLink, fullLink, counter };
  };
  const [rows, setRows] = useState<TRows>([]);
  const getLinks = useCallback(async () => {
    const res = await fetch(
      `https://front-test.hex.team/api/statistics?order=${sort}&offset=${
        linkPerPage * page
      }&limit=${linkPerPage}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    if (res.ok) {
      const data: TResponseLinks = await res.json();
      if (data.length === 0) return [];
      allLinks.current = Number(res.headers.get(`x-total-count`));
      setRows(
        data.map((row: TResponseLink) => {
          return createData(prefixLink + row.short, row.target, row.counter);
        })
      );
    } else alert("Данные не загружены или истек срок токена");
  }, [linkPerPage, page, sort, props.token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);
  const handleSetLinkPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setLinkPerPage(Number(event.target.value));
  };
  const handleChangePage = (move: number) => {
    if (move === 1)
      if ((page + 1) * linkPerPage >= allLinks.current) return null;
    if (page + move !== -1) setPage(page + move);
  };
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
          name="link"
          onChange={handleChange}
          sx={{ m: "8px 0" }}
          label="Ссылка"
          variant="outlined"
        />
        <Button onClick={sendLink} sx={{ m: "8px 0" }} variant="contained">
          Сократить
        </Button>

        {/* Выбор сортировки */}

        <Typography variant="h5" color="initial">
          Выбор сортировки
        </Typography>
        <FormControl sx={{ maxWidth: "300px", margin: "16px auto" }}>
          <InputLabel>Сортировка</InputLabel>
          <Select
            name="sorting"
            value={sort}
            label="Сортировка"
            onChange={handleSelect}
          >
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
        <Typography variant="h5" color="initial" m={2}>
          Ваши ссылки
        </Typography>
      </Container>

      {/* Таблица */}
      <LinksTable rows={rows} />

      {/* Выбор страницы */}
      <Typography m={2} variant="h6" color="initial">
        Сколько отображать на странице:
      </Typography>
      <TextField
        name="rowsCounter"
        sx={{ margin: "16px" }}
        type="number"
        label="Кол-во строк"
        defaultValue={linkPerPage}
        onChange={handleSetLinkPerPage}
      />
      <Box>
        <Button
          onClick={() => {
            handleChangePage(-1);
          }}
          sx={{ minWidth: "100px", margin: "8px" }}
          variant="outlined"
        >
          Назад
        </Button>
        Страница: {page + 1}
        <Button
          onClick={() => {
            handleChangePage(1);
          }}
          sx={{ minWidth: "100px", margin: "8px" }}
          variant="outlined"
        >
          Вперед
        </Button>
      </Box>
    </>
  );
};
export { Account };
