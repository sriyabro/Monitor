import React, {useEffect, useState} from 'react'
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
import Header from "./Header";
import Axios from "axios";
import {BACKEND_URL} from "../constants/constants";

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

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const AlertHistory = () => {
    const classes = useStyles();
    const history = useHistory();

    const [selectedSensor, setSelectedSensor] = useState([]);

    const getSelectedSensor = async () => {
        const sensorID = localStorage.getItem("selectedSensorId");
        try {
            const data = await Axios.get(
                BACKEND_URL + "/sensors/" + sensorID
            );
            setSelectedSensor(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSelectedSensor();
    }, []);


    const handleBackButtonClicked = () => {
        history.push('/dashboard');
    }

    return (
        <React.Fragment>
            <Header/>
        <div className="alert-history bg-white rounded" >
            <Row className="sensors p-3" >
                <Col xs={12} md={6}>
                    <h3>{selectedSensor.sensor_name}</h3>
                    <h6 className="m-0">Threshold value :
                        <span className="text-danger"> {selectedSensor.sensor_threshold}</span></h6>
                </Col>
                <Col xs={12} md={6} className="text-right pr-1">

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
                        {selectedSensor.sensor_readings && selectedSensor.sensor_readings.map((sensor) => (
                            sensor.values >= selectedSensor.sensor_threshold ?
                            (<StyledTableRow key={sensor.date_time}>
                                <StyledTableCell component="th" scope="row" >
                                    {sensor.date_time.split(' ')[0]}
                                </StyledTableCell>
                                <StyledTableCell >
                                    {sensor.date_time.split(' ')[1]}
                                </StyledTableCell>
                                <StyledTableCell >
                                    {sensor.values}
                                </StyledTableCell>
                            </StyledTableRow>) : <StyledTableRow/>
                        ))}
                    </TableBody>
                </Tablenew>
            </TableContainer>
        </div>
        </React.Fragment>
    );
}


export default AlertHistory;

