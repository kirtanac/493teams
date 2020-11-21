import '../App.css';
import firebase from "../firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";

//VIEW THE CURRENT TEAM YOU ARE ON
//currently hardcoded for my uniqname (clantonm)

class AdminSeeTeams extends React.Component {
  constructor(props) {
   super(props);
   console.log("props", props);
   this.state = {
     numInv:0,
     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     dataLoaded:false,
     onTeam: false
   }
   // if(props.location){
   //   console.log("check out view team", props.location.aboutProps)
   // }
 }
render(){
  return (
    <div className="admin-see-teams">
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">EECS 493 Teams (Admin)</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/view-team">My Team</Nav.Link>
      <Nav.Link href="/see-teams">All Teams</Nav.Link>

    </Nav>
  <Nav>
    <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
  </Nav>

  </Navbar.Collapse>
</Navbar>

      <header className="loggedInHeader">
      <div className="body">
      <h1>Coming Soon</h1>
      </div>
      </header>

    </div>
  ); }

}

export default AdminSeeTeams;
