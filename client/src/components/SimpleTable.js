import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';


const styles = {
  root: {
    width: '100%',
    overflowX: 'none',
  },
  table: {
    minWidth: 700,
  },
};


const SimpleTable = ({
  classes, adminFirstName,
}) => {
  let id = 0;
  function createData(name, timeIn, breakStart, breakEnd, timeOut) {
    id += 1;
    return {
      id, name, timeIn, breakStart, breakEnd, timeOut,
    };
  }


  const data = [
    createData(adminFirstName, 10.01, 12.10, 14.99, 15.01),
    createData('Sting', 13.12, 13.13, 15.56, 16.09),
    createData('Kurt Cobain', 10.01, undefined, undefined, 10.02),
    createData('Cupcake', undefined, undefined, undefined, undefined),
    createData('Gingerbread Man', undefined, undefined, undefined, undefined),
  ];


  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell>Time In</TableCell>
            <TableCell>Break Start</TableCell>
            <TableCell>Break End</TableCell>
            <TableCell>Time Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell>{n.timeIn}</TableCell>
              <TableCell>{n.breakStart}</TableCell>
              <TableCell>{n.breakEnd}</TableCell>
              <TableCell>{n.timeOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="row">
        <div className="col-6">
          <h2>Clocked in</h2>
          <p>0</p>
        </div>
        <div className="col-6">
          <h2>Clocked out</h2>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

SimpleTable.propTypes = {
  classes: PropTypes.string.isRequired,
  adminFirstName: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleTable);
