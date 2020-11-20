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
   console.log("props", props);
   // if(props.location){
   //   console.log("check out view team", props.location.aboutProps)
   // }

   this.state = {
     teams:[],
     userdata: props.location
   }
   this.viewTeam = this.viewTeam.bind(this);


 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   console.log("state", this.state.userdata)
   //hard coding in my uniqname to work on rendering
  db.collection("teams").where("uniqname1", "==", "clantonm")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      //console.log(data);
      this.setState({ teams: data });
    });
}
viewTeam() {
  let inc = 1;
  const { teams } = this.state;
  return teams.map((val) => (
    <p>
    <b key={++inc}>{val.teamName}</b>
    <br/>
    {val.uniqname1}{' '}{val.uniqname1Accepted ? 'accepted' : 'pending'}
    <br/>
    {val.uniqname2}{' '}{val.uniqname2Accepted ? 'accepted' : 'pending'}
    <br/>
    {val.uniqname3}{' '}{val.uniqname3Accepted ? 'accepted' : 'pending'}
    <br/>
    {val.uniqname4}{' '}{val.uniqname4Accepted ? 'accepted' : 'pending'}
    <br/>
    </p>
  ))
}


 render(){
   const { teams } = this.state;
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
