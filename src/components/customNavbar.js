import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import ReactDOM from "react-dom";
import Download from "./download";
import Login from "./login";

import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav, Form, FormControl, Row, Col, ButtonGroup, Dropdown } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";


class CustomNavbar extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     isLoggedIn: false,
     accessToken: '',
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type')
   };
   this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount(){
    await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{
      this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
      sessionStorage.setItem('user-type', data.usertype);
      console.log("user data updated: ", data);
    });
  }


   handleLogout(log_data){
        this.setState({data: log_data})
        console.log(log_data);
        if ('type' in log_data && log_data['type'] === "logout"){
          sessionStorage.clear();
        }
    }

 render() {

console.log(sessionStorage);

if (sessionStorage.getItem('user-type') === 'team'){
  return(
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/view-team">
    <img
      src="/EECS493_landscape.png"
      height="30"
      className="d-inline-block align-top"
      alt="EECS 493 Teams logo"
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/view-team">My Team</Nav.Link>
      <Nav.Link href="/see-teams">All Teams</Nav.Link>

    </Nav>
  <Nav>
    <Nav.Link  className="mr-sm-2" href="/">
    <Login className="loginButton ml-2" navbar={true} callback={this.handleLogout} /></Nav.Link>
  </Nav>

  </Navbar.Collapse>
  </Navbar>);
}
else if( sessionStorage.getItem('user-type') === 'unassigned'){
  return(
<Navbar bg="light" expand="lg">
<Navbar.Brand href="/create-team">
  <img
    src="/EECS493_landscape.png"
    height="30"
    className="d-inline-block align-top"
    alt="EECS 493 Teams logo"
  />
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
  <Nav.Link href="/create-team">Create Team</Nav.Link>
  <Nav.Link href="/team-invites">Team Invitations</Nav.Link>
    <Nav.Link href="/see-teams">Registered Teams</Nav.Link>
</Nav>
<Nav>
  <Nav.Link  className="mr-sm-2" href="/">
  <Login className="loginButton ml-2" navbar={true} callback={this.handleLogout} /></Nav.Link>
</Nav>

</Navbar.Collapse>
</Navbar>);

}else if (sessionStorage.getItem('user-type') === 'admin'){

   return (
<Navbar bg="light" expand="lg">
<Navbar.Brand href="/admin-home">
  <img
    src="./EECS493-admin.png"
    height="30"
    className="d-inline-block align-top"
    alt="EECS 493 Teams logo"
  />
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
<Nav.Link href="/admin-home">Home</Nav.Link>
<Nav.Link href="/admin-view">Teams</Nav.Link>

  </Nav>
  <Nav>
    <Nav.Link  className="mr-sm-2" href="/">
    <Login className="loginButton ml-2" navbar={true} callback={this.handleLogout} /></Nav.Link>
  </Nav>
  </Navbar.Collapse>
</Navbar>);
}else{
  return(<br/>)
}
}
}

export default CustomNavbar;
