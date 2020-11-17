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

class TeamInvites extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     invitations:[]
   }
   this.viewInvitations = this.viewInvitations.bind(this);


 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });


  db.collection("users").doc("clantonm")
    .get()
    .then(querySnapshot => {
      this.setState({ invitations: querySnapshot.data().invitations });
      console.log(this.state.invitations);
    });

}


viewInvitations() {

  const { invites } = this.state.invitations;
  return invites.map((val,index) => (
    <h2 key={index}>{val.teamName}</h2>
  ))

}

 render(){
  return (
    <div className="Home">

        <header className="App-header">
      <h1>493 Teams </h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.

          </p>
          <h1>THIS IS THE TEAM INVITE PAGE</h1>
          {this.viewInvitations()}
          <br/>
          <NavLink to="/view-team" activeClassName="hurray">
            Back to viewing your team
          </NavLink>
          <NavLink to="/" activeClassName="hurray">
            Back to Home
          </NavLink>


        </header>

    </div>
  ); }
}

export default TeamInvites;
