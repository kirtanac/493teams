import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
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
     invitations:[],
     dataLoaded:false
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
      console.log("set state");
      this.setState({ invitations: querySnapshot.data().invitations, dataLoaded:true});
      console.log("set state3");
      console.log("finished query");
    });

}
viewInvitations(){
  if (this.state.dataLoaded === false) {
    return <h2>Loading...</h2>
  }
  const { invites } = this.state;
  let invList = [];
  console.log("I AM TRYING MY BEST")
  console.log(invList);
  invList = invites.map((invite) =>
    <h2>{invite.teamName}</h2>
  );
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
          <p>{this.viewInvitations()}</p>
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
