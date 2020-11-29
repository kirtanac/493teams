import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav, Table } from 'react-bootstrap';

class AdminSearch extends React.Component {
  constructor(props) {
   super(props);

   this.state = {

     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     onTeam: false,
     team: localStorage.getItem('teamSearch'),
     assigned: localStorage.getItem('userOnTeam'),
     teams: [],
     dataLoaded:false
   };

 }
componentDidMount() {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  console.log(this.state)
  if (this.state.assigned === true) {
    console.log(localStorage)
    db.collection("teams").doc(this.state.team)
      .get()
      .then(querySnapshot => {
        const data = []
        console.log(querySnapshot.data())
        data.push(querySnapshot.data());
        //console.log(data);
        this.setState({ teams: data , dataLoaded:true});
        console.log(data)
      });
  }

}



viewTeam() {
  let inc = 1;
  const { teams } = this.state.teams;
  console.log("CURRENTLY HERE WE ARE " + this.state.teams)
  if (this.state.dataLoaded === true) {
    return teams.map((val) => (
        <Table striped bordered>
        <thead>
        <tr>
          <th>Uniqname</th>
          <th>Invite Status</th>
        </tr>
      </thead>
        <tbody>
        <tr>
         <td>{val.uniqname1}</td>
         <td>{val.uniqname1Accepted ? 'accepted' : 'pending'}</td>
       </tr>
        <tr>
         <td>{val.uniqname2}</td>
         <td>{val.uniqname2Accepted ? 'accepted' : 'pending'}</td>
       </tr>
       <tr>
        <td>{val.uniqname3}</td>
        <td>{val.uniqname3Accepted ? 'accepted' : 'pending'}</td>
      </tr>
      <tr>
       <td>{val.uniqname4}</td>
       <td>{val.uniqname4Accepted ? 'accepted' : 'pending'}</td>
     </tr>
     </tbody>
     </Table>
  ))
  }
  else {
    return <p>Loading...</p>
  }
}

 render(){
   if(!localStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }
  return (
    <div className="Home">
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/admin-home">EECS 493 Teams (Admin)</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">

      <Nav.Link href="/admin-home">Home</Nav.Link>
      <Nav.Link href="/admin-search">Search</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
    </Nav>

  </Navbar.Collapse>
</Navbar>
<header className="App-header">
<div className="body">
<h1>493 Teams Admin Search</h1>

  {this.state.assigned ?  this.viewTeam() : <p> User is not on a team </p> }

</div>
</header>

    </div>
  ); }
}

export default AdminSearch;
