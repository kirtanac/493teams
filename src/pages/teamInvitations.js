import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import Invitation from "../components/invitation"
import React from 'react';
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
     numInv:0,
     dataLoaded:false
   }
   this.renderInvitations = this.renderInvitations.bind(this);
 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
  db.collection("users").doc("clantonm")
    .get()
    .then(querySnapshot => {
      this.setState({ numInv: querySnapshot.data().numInvitations});
    });

}

renderInvitations(){
}

 render(){
  return (
    <div className="Home">

        <header className="App-header">
      <h1>493 Team Invitations </h1>
          {Array.from(Array(this.state.numInv)).map((x, index) => <Invitation invNum={index} />)}
          <br/>
          <NavLink to="/view-team" activeClassName="hurray">
            Back to viewing your team
          </NavLink>
          <NavLink to="/create-team" activeClassName="hurray">
            Back to Creating your team
          </NavLink>
          <NavLink to="/" activeClassName="hurray">
            Back to Home
          </NavLink>


        </header>

    </div>
  ); }
}

export default TeamInvites;
