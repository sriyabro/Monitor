import React from "react";
import {Container} from "react-bootstrap";
import "./assets/styles/main.scss"
import './App.css';
import Login from "./components/login";
import Signup from "./components/signup";
import SignInOutContainer from "./containers";

function App() {
  return (
      <div className="App">

          <SignInOutContainer/>
      </div>

  );
}

export default App;
