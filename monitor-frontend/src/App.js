import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/main.scss"


import Header from "./components/Header"
import Chart from "./components/Chart";
import Table from "./components/Table"

function App() {
  return (

    <Container fluid={true}>
        <Router>
            <Header />
            <Switch>
                <Route path="/">
                    <Chart />
                </Route>
            </Switch>
            <Switch>
                <Route path="/history">
                    <Table />
                </Route>
            </Switch>
        </Router>
    </Container>

  );
}

export default App;
