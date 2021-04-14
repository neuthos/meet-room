import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ usages }) {
  const classes = useStyles();

  function SetDateTime(time) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return time.toLocaleDateString("en-US", options);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Start</TableCell>
            <TableCell align="right">End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usages.map((el) => (
            <TableRow key={el.id}>
              <TableCell component="th" scope="row">
                {el.Client.name}
              </TableCell>
              <TableCell align="right">{el.rentTime} Hours</TableCell>
              <TableCell align="right">
                {SetDateTime(new Date(el.createdAt))}
              </TableCell>
              <TableCell align="right">
                {SetDateTime(new Date(el.stoppedAt))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
