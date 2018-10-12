import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;
function createData(name, timeIn, breakStart, breakEnd, timeOut) {
  id += 1;
  return { id, name, timeIn, breakStart, breakEnd, timeOut };
}

const data = [
  createData('Eric Clapton', 10.01, 12.10, 14.99, 15.01),
  createData('Sting', 13.12, 13.13, 15.56, 16.09),
  createData('Kurt Cobain', 10.01, undefined, undefined, 10.02),
  createData('Cupcake', undefined, undefined, undefined, undefined),
  createData('Gingerbread Man', undefined, undefined, undefined, undefined),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell numeric>Time In</TableCell>
            <TableCell numeric>Break Start</TableCell>
            <TableCell numeric>Break End</TableCell>
            <TableCell numeric>Time Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell numeric>{n.timeIn}</TableCell>
                <TableCell numeric>{n.breakStart}</TableCell>
                <TableCell numeric>{n.breakEnd}</TableCell>
                <TableCell numeric>{n.timeOut}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
