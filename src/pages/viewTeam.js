import '../App.css';
import firebase from "../firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink
} from "react-router-dom";

//VIEW THE CURRENT TEAM YOU ARE ON
//currently hardcoded for my uniqname (clantonm)

class ViewTeam extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     teams:[]
   }
   this.viewTeam = this.viewTeam.bind(this);


 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
  db.collection("users").doc("clantonm")
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot.data())
      const data1 = querySnapshot.data().invitations;
      this.setState({ invitations: data1});
      console.log("set state");
      console.log("finished query");
    });

}
viewInvitations(){
  const { invites } = this.state;
  let invList = [];
  console.log("I AM TRYING MY BEST")
    invList = invites.map((invite) =>
      <h2>{invite.teamName}</h2>
    );
}


 render(){
  return (
    <div className="viewteam">
      <header className="loggedInHeader">
      <h1>Your Current Team</h1>

        <p>
        {this.viewTeam()}

        </p>
        <br/>
        <NavLink to="/" activeClassName="hurray">
          Homepage
        </NavLink>
        <NavLink to="/team-invites" activeClassName="hurray">
          Team Invites
        </NavLink>

      </header>

    </div>
  ); }
}

export default ViewTeam;
