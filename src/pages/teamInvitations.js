import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import Invitation from "../components/invitation"
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav } from 'react-bootstrap';

class TeamInvites extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     numInv:0,
     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     dataLoaded:false,
     onTeam: false
   }
   this.renderInvitations = this.renderInvitations.bind(this);
 }

 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
  db.collection("users").doc(localStorage.getItem('uniqname'))
    .get()
    .then(querySnapshot => {
      this.setState({
        numInv: querySnapshot.data().numInvitations,
        onTeam: querySnapshot.data().onTeam
      });
    });

}

renderInvitations(){
  let renderedChildren = Array.from(Array(this.state.numInv)).map((x, index) => <Invitation invNum={index} />);
  console.log(renderedChildren);
  return renderedChildren;
}

 render(){
   if(this.state.onTeam === true) {
     return <Redirect to='/view-team' />
   }
   if(!localStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }
  return (
    <div className="Home">
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
      <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
    </Nav>

  </Navbar.Collapse>
</Navbar>

        <header className="App-header">
        <div className="body">
      <h1 className="title">493 Team Invitations </h1>
      <div className="body-content">
      <h2>You have ({this.state.numInv}) invitations</h2>
          {this.renderInvitations()}
          <br/>
          </div>
              </div>
        </header>

    </div>
  ); }
}

export default TeamInvites;
