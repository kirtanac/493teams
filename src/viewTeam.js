import './App.css';
import firebase from "./firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink
} from "react-router-dom";
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
   //hard coding in my uniqname to work on rendering
  db.collection("teams").where("uniqname1", "==", "clantonm")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
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
    {val.uniqname1}
    <br/>
    {val.uniqname2}
    <br/>
    {val.uniqname3}
    <br/>
    {val.uniqname4}
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

      </header>

    </div>
  ); }
}

export default ViewTeam;
