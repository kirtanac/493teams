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

class AdminHome extends React.Component {


 render(){
  return (
    <div className="Home">

        <header className="App-header">
      <h1>493 Teams </h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.

          </p>
        <h1>THIS IS WHAT THE HOME PAGE WILL LOOK LIKE FOR ADMINS</h1>
        <NavLink to="/admin-search" activeClassName="hurray">
          View Admin Search Page
        </NavLink>
        <NavLink to="/" activeClassName="hurray">
          Back to Home
        </NavLink>


        </header>

    </div>
  ); }
}

export default AdminHome;
