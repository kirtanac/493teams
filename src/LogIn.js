import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink
} from "react-router-dom";
import {  Link,  Button } from 'react-bootstrap';

class Home extends React.Component {


 render(){
  return (
    <div className="Home">

        <header className="App-header">
      <h1>493 Teams </h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.

          </p>
          <NavLink to="/create-team" activeClassName="hurray">
  Create a Team!!
</NavLink>



        </header>

    </div>
  ); }
}

export default Home;
