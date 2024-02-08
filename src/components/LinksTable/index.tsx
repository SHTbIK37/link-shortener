import { Table } from "@mui/material/";
import { TableBody } from "@mui/material/";
import { TableCell } from "@mui/material/";
import { TableContainer } from "@mui/material/";
import { TableHead } from "@mui/material/";
import { TableRow } from "@mui/material/";
import { Paper } from "@mui/material/";

import type { FC } from "react";
import { TLinksTableProps } from "./types";

const LinksTable: FC<TLinksTableProps> = (props) => {
  return (
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
          {/* если нет данных */}
          {!props.rows.length && (
            <TableRow key="404">
              <TableCell component="th" scope="row">
                Нет данных
              </TableCell>
            </TableRow>
          )}
          {props.rows.map((row) => (
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
  );
};
export { LinksTable };
