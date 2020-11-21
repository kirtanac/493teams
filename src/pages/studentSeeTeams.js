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

class StudentSeeTeams extends React.Component {
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
 }
render(){
  // conditionally render navbar based on whether they're on a team or not
  const onTeam = (this.state.usertype==='team');

  return (
    <div className="viewteam">
  {onTeam?
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">EECS 493 Teams</Navbar.Brand>
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
  :
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">EECS 493 Teams</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
  <Nav.Link href="/create-team">Create Team</Nav.Link>
  <Nav.Link href="/team-invites">Team Invitations</Nav.Link>
    <Nav.Link href="/see-teams">Registered Teams</Nav.Link>
  </Nav>
  <Nav>
    <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
  </Nav>

  </Navbar.Collapse>
  </Navbar>

}

      <header className="loggedInHeader">
      <h1>Coming Soon</h1>


      </header>

    </div>
  ); }

}

export default StudentSeeTeams;
