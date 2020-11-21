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

        <header className="App-header">
        <div className="body">
      <h1>493 Team Invitations </h1>
      <h2>You have ({this.state.numInv}) invitations</h2>
          {this.renderInvitations()}
          <br/>
          </div>
        </header>

    </div>
  ); }
}

export default TeamInvites;
