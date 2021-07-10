import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tablenew from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Col, Row} from "react-bootstrap";
import {BarChart2, ChevronLeft} from "react-feather";
import {useHistory} from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontFamily: 'Ubuntu',
        fontSize: 16,
        fontWeight: "bold"
    },
    body: {
        fontFamily: 'Ubuntu',
},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(date, time, value) {
    return { date, time, value };
}

const rows = [
    createData("2021 - 07 - 09", 159, 6.0 ),
    createData("2021 - 07 - 09", 237, 9.0),
    createData("2021 - 07 - 09", 262, 16.0),
    createData("2021 - 07 - 09", 305, 3.7),
    createData("2021 - 07 - 09", 356, 16.0),
    createData("2021 - 07 - 09", 237, 9.0),
    createData("2021 - 07 - 09", 262, 16.0),
    createData("2021 - 07 - 09", 305, 3.7),
    createData("2021 - 07 - 09", 356, 16.0),
    createData("2021 - 07 - 09", 262, 16.0),
    createData("2021 - 07 - 09", 305, 3.7),
    createData("2021 - 07 - 09", 356, 16.0),
    createData("2021 - 07 - 09", 237, 9.0),
    createData("2021 - 07 - 09", 262, 16.0),
    createData("2021 - 07 - 09", 305, 3.7),
    createData("2021 - 07 - 09", 356, 16.0),
];

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

function AlertHistory() {
    const classes = useStyles();
    const history = useHistory();

    const handleBackButtonClicked = () => {
        history.push('/');
    }

    return (
        <div className="alert-history px-2 bg-white rounded" >
            <Row className="sensors p-3" >
                <Col xs={12} md={6}><h3>Temp Sensor</h3><h6 className="m-0">Threshold value : <span className="text-danger">30</span></h6></Col>
                <Col xs={12} md={6} className="text-right p-0">

                    <Button className="history text-danger border-danger" onClick={handleBackButtonClicked}>
                       <ChevronLeft/> &nbsp; Back to Sensor Readings &nbsp; <BarChart2/>
                    </Button>
                </Col>
            </Row>
            <TableContainer component={Paper} className="alert-table">
                <Tablenew stickyHeader className={classes.table} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Value</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.date}>
                                <StyledTableCell component="th" scope="row">
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell >{row.time}</StyledTableCell>
                                <StyledTableCell >{row.value}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Tablenew>
            </TableContainer>
        </div>
    );
}


export default AlertHistory