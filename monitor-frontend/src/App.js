import React from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./assets/styles/main.scss"
import Header from "./components/Header"
import routes from "./routes/routes";
import Footer from "./components/Footer";

function App() {
  return (

    <Container fluid={true}>
        <div>
            <Header/>
            <BrowserRouter>
                <Switch>
                    {routes.map((route, index) =>
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(routeProps) => {
                                // if (route.protected)
                                //     return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                                return <route.component  {...routeProps} />
                            }}
                        />)}
                </Switch>
            </BrowserRouter>
            <Footer/>
        </div>
    </Container>

  );
}

export default App;
