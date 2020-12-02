import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl, Table } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";

//VIEW THE CURRENT TEAM YOU ARE ON
//currently hardcoded for my uniqname (clantonm)

class ViewTeam extends React.Component {
  constructor(props) {
   super(props);
   console.log("props", props);

   this.state = {
     teams:[],
     userdata: props.location,
     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     teamName: '',
     onTeam: localStorage.getItem('user-type') === 'team',
     dataLoaded:false
   }


   this.viewTeam = this.viewTeam.bind(this);


 }

 componentDidMount() {
    console.log(localStorage.getItem('user-type'));
    if(this.state.onTeam) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      console.log("state", this.state.uniqname)
      let data = dbFunctions.getTeamFromUser(this.state.uniqname);
      this.setState({ teams: data});
      this.setState({ dataLoaded:true });

    }
}


viewTeam() {
  if (this.state.dataLoaded === true && this.state.onTeam) {
    const teams = this.state.teams[0];
    console.log(this.state.teams)
    console.log("made it here")
    let teamList = (
      <Table striped bordered className="w-25">
      <thead>
      <tr>
        <th colSpan="2">{teams.teamName}</th>
      </tr>
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


 render(){
   if(!this.state.uniqname){
     return(
       <Redirect to="/" />
     );
   }

   if(!this.state.onTeam){
     return(
       <Redirect to="/create-team" />
     );
   }

   console.log(this.state.usertype);

   const { teams } = this.state;
  return (
    <div className="viewteam">
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

      <header className="loggedInHeader">

      <div className="body">
      <h1 className="title">Your Current Team</h1>
        <div className="body-content">
        <p>
        {this.viewTeam()}

        </p>
        <br/>
  </div>
        </div>
      </header>

    </div>
  ); }
}

export default ViewTeam;
