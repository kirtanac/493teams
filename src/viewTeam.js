import './App.css';
import firebase from "./firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';

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
  db.collection("teams")
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


        <p>
        {this.viewTeam()}

        </p>
        <br/>

      </header>

    </div>
  ); }
}

export default ViewTeam;
