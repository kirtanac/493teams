import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import CreateTeam from "./createTeam";
import Home from "./LogIn";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {


 render(){
  return (
    <div className="App">
      <Switch>

        <Route path="/create-team">
          <CreateTeam />
        </Route>

        <Route path="/">
        <Home />
        </Route>

      </Switch>
    </div>
  ); }
}

export default App;
