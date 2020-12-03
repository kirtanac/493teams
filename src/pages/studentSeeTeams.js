import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl,Table } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";

//VIEW THE CURRENT TEAM YOU ARE ON

class StudentSeeTeams extends React.Component {
  constructor(props) {
   super(props);
   console.log("props", props);
   this.state = {
     numInv:0,
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     teams: [],
     teamsLoaded: false,
     dataLoaded:false,
     onTeam: false
   }
 }

 async componentDidMount(){
   await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{

   this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
   sessionStorage.setItem('user-type', data.usertype);
   console.log("user data updated: ", data);
   });
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   let teams_in = [];
   await db.collection("teams").get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      teams_in.push(doc.data());
    });
     this.setState({ teams: teams_in, teamsLoaded: true });
     console.log("oh dear", teams_in);
   })

 }
render(){
  if(!sessionStorage.getItem('uniqname')){
    return <Redirect to='/' />
  }

  if (this.state.usertype === 'admin') {
    return <Redirect to='/admin-home' />
  }

  // conditionally render navbar based on whether they're on a team or not
  // <Navbar.Brand href="/view-team">EECS 493 Teams</Navbar.Brand>
  const onTeam = (this.state.usertype==='team');

 const rows = this.state.teams.map(row => <tr><td>{row.teamName}</td><td>{row.uniqname1Accepted?row.uniqname1:""}{row.uniqname2Accepted?", " +row.uniqname2:""}{row.uniqname3Accepted?", " +row.uniqname3:""}{row.uniqname4Accepted?", " + row.uniqname4:""}</td><td>{row.description}</td></tr>)
  return (
    <div className="viewteam">
  {onTeam?
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/view-team">
      <img
        src="/EECS493_landscape.png"
        height="30"
        className="d-inline-block align-top"
        alt="EECS 493 Teams logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="/view-team">My Team</Nav.Link>
        <Nav.Link href="/see-teams">All Teams</Nav.Link>

      </Nav>
    <Nav>
      <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
    </Nav>

    </Navbar.Collapse>
    </Navbar>
  :
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/create-team">
    <img
      src="/EECS493_landscape.png"
      height="30"
      className="d-inline-block align-top"
      alt="EECS 493 Teams logo"
    />
  </Navbar.Brand>
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

}


{this.state.teamsLoaded ?
  <header className="loggedInHeader">
  <div className="body">
  <h1 className="title">Registered Teams</h1>
  <div className="body-content">
  <Table className="seeTeams" responsive="sm" bordered hover striped>
  <thead>

  <tr>
  <th className="seeTeams">Name</th>
  <th className="seeTeams">Registered Team Members</th>
  <th className="seeTeams">Description</th>
</tr>
</thead>
            <tbody striped hover>
              {rows}
            </tbody>
          </Table>
  </div>
    </div>
  </header>


:
<header className="loggedInHeader">
<div className="body">
<h1 className="title">Loading...</h1>
<div className="body-content">

</div>
  </div>
</header>
}




    </div>
  ); }

}

export default StudentSeeTeams;
