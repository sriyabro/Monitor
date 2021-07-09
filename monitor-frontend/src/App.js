import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/main.scss"


import Header from "./components/header/Header"
import Chart from "./components/chart/Chart";
import Table from "./components/table/Table"

function App() {
  return (


    <Container fluid={true}>
        <Router>
            <Header />
            <Switch>
                <Route path="/chart">
                    <Chart />
                </Route>
            </Switch>
            <Switch>
                <Route path="/table">
                    <Table />
                </Route>
            </Switch>
        </Router>
    </Container>

  );
}

export default App;
