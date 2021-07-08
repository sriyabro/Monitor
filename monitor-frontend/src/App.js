import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/main.scss"


import Start from "./components/header/Header"
import Chart from "./components/chart/Chart";
import Table from "./components/table/Table"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
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

    // <Container fluid={true}>
    //      <h1>Monitor</h1>
    // </Container>

  );
}

export default App;
