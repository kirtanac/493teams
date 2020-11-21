import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav } from 'react-bootstrap';

class AdminHome extends React.Component {
  constructor(props) {
   super(props);
   this.state = {

     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     onTeam: false,
   };

 }

 render(){
   if(!localStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }
  return (
    <div className="Home">
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/admin-home">EECS 493 Teams (Admin)</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">

      <Nav.Link href="/admin-home">Home</Nav.Link>
      <Nav.Link href="/admin-search">Search</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
    </Nav>

  </Navbar.Collapse>
</Navbar>
        <header className="App-header">
        <div className="body">
      <h1>493 Teams Admin View</h1>

        <h1>Coming Soon</h1>

        </div>
        </header>

    </div>
  ); }
}

export default AdminHome;
