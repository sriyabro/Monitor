import React from 'react'
import { Dropdown } from "react-bootstrap";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tablenew from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
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

function createData(date, time, temp, value2, value3) {
    return { date, time, temp, value2, value3 };
}

const rows = [
    createData("2021 - 07 - 09", 159, 6.0, 24, 4.0),
    createData("2021 - 07 - 09", 237, 9.0, 37, 4.3),
    createData("2021 - 07 - 09", 262, 16.0, 24, 6.0),
    createData("2021 - 07 - 09", 305, 3.7, 67, 4.3),
    createData("2021 - 07 - 09", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function Table() {
    const classes = useStyles();

    return (

        <div class="shadow-lg p-3 mb-5 bg-white rounded" >
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Sensor
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Sensor 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Sensor 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Sensor 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br></br>


            <TableContainer component={Paper}>
                <Tablenew className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="right">time</StyledTableCell>
                            <StyledTableCell align="right">temp</StyledTableCell>
                            <StyledTableCell align="right">Value2</StyledTableCell>
                            <StyledTableCell align="right">Value3</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.date}>
                                <StyledTableCell component="th" scope="row">
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.time}</StyledTableCell>
                                <StyledTableCell align="right">{row.temp}</StyledTableCell>
                                <StyledTableCell align="right">{row.value2}</StyledTableCell>
                                <StyledTableCell align="right">{row.value3}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Tablenew>
            </TableContainer>
        </div>
    );
}


export default Table