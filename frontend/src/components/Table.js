import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    // backgroundColor:'#2F363F',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function DisplayTable({data}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead >
          <TableRow className="tablehead">
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">Total Case</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Active</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data && data.map((res) => (
            <StyledTableRow key={res.Country} className="tabledata">
              <StyledTableCell component="th" scope="row">
                {res.Country}
              </StyledTableCell>
              <StyledTableCell align="right">{res.TotalConfirmed}</StyledTableCell>
              <StyledTableCell align="right">{res.TotalRecovered}</StyledTableCell>
              <StyledTableCell align="right">{res.TotalConfirmed - res.TotalRecovered}</StyledTableCell>
              <StyledTableCell align="right">{res.TotalDeaths}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}