import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
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
     dataLoaded:false,
     editing:false
   };
   this.viewTeam = this.viewTeam.bind(this);
   this.editTeam = this.editTeam.bind(this);

 }
componentDidMount() {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  console.log(this.state)

    console.log("MADE IT HERE")
    db.collection("teams").doc(this.state.team)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data())
        let data = []
        data.push(querySnapshot.data());
        this.setState({ teams: data});
        this.setState({ dataLoaded:true });
      });


}



viewTeam() {
  let inc = 1;
  if (this.state.dataLoaded === true) {
    const teams = this.state.teams[0];
    console.log(this.state.teams)
    if (this.state.assigned === "false") {
      return <h2> This user is not on a team </h2>
    }
    console.log("made it here")
    let teamList = (
      <Table striped bordered className="w-25">
      <thead>
      <tr>
        <th>Uniqname</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr>
       <td>{teams.uniqname1}</td>
       <td>{teams.uniqname1Accepted ? 'accepted' : 'pending'}</td>
      </tr>
      <tr>
       <td>{teams.uniqname2}</td>
       <td>{teams.uniqname2Accepted ? 'accepted' : 'pending'}</td>
      </tr>
      <tr>
        <td>{teams.uniqname3}</td>
        <td>{teams.uniqname3Accepted ? 'accepted' : 'pending'}</td>
      </tr>
      <tr>
       <td>{teams.uniqname4}</td>
       <td>{teams.uniqname4Accepted ? 'accepted' : 'pending'}</td>
     </tr>
     </tbody>
     </Table>
    )
    return teamList
  }
  else {
    return <p>Loading...</p>
  }
}
editTeam(event){
  event.preventDefault();
  localStorage.setItem("uniq1", this.state.teams[0].uniqname1)
  localStorage.setItem("uniq2", this.state.teams[0].uniqname2)
  localStorage.setItem("uniq3", this.state.teams[0].uniqname3)
  localStorage.setItem("uniq4", this.state.teams[0].uniqname4)
  this.setState({ editing:true });
}

 render(){
   if(!localStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }
   if(this.state.editing === true){
     return <Redirect to="/admin-edit" />
   }
  return (
    <div className="Home">
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/admin-home">
      <img
        src="./EECS493-admin.png"
        height="30"
        className="d-inline-block align-top"
        alt="EECS 493 Teams logo"
      />
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/admin-home">Home</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
    </Nav>

  </Navbar.Collapse>
</Navbar>
<header className="App-header">
<div className="body">
<h1 className="title">493 Teams Admin Search</h1>
<div className="body-content">
<br />
  {this.viewTeam()}
  <Button onClick={this.editTeam}>Edit Team</Button>
</div>
</div>
</header>

    </div>
  ); }
}

export default AdminSearch;
