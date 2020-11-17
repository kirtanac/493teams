import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink
} from "react-router-dom";
import {  Link,  Button } from 'react-bootstrap';

// HOME PAGE!!!!!

class Home extends React.Component {
 //  constructor(props) {
 //   super(props);
 //   this.state = {
 //     loggedin: false
 //   }
 // }

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
          <NavLink to="/view-team" activeClassName="hurray">
            View your current Team
          </NavLink>
          <NavLink to="/admin-home" activeClassName="hurray">
            Admin Home
          </NavLink>


        </header>

    </div>
  ); }
}

export default Home;
