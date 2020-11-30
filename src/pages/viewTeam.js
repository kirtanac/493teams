import '../App.css';
import firebase from "../firebase";
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
   // if(props.location){
   //   console.log("check out view team", props.location.aboutProps)
   // }

   this.state = {
     teams:[],
     userdata: props.location,
     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     teamName: '',
     onTeam: true,
   }
   this.viewTeam = this.viewTeam.bind(this);


 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });

   console.log("state", this.state.uniqname)
   db.collection("users").doc(this.state.uniqname)
     .get()
     .then(querySnapshot => {
       if(!querySnapshot.data().onTeam){
         console.log("NOT on a team!")
         this.setState({
           onTeam: false
         })
         // TODO : redirect
       }
       let teamName = querySnapshot.data().teamName;
       this.setState({ teamName: teamName});
   //hard coding in my uniqname to work on rendering
  db.collection("teams").where("teamName", "==", teamName)
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      //console.log(data);
      this.setState({ teams: data });
      console.log(data)
    });
});
}


viewTeam() {
  let inc = 1;
  const { teams } = this.state;
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
  <Navbar.Brand href="#home">EECS 493 Teams</Navbar.Brand>
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

        <p>
        {this.viewTeam()}

        </p>
        <br/>

        </div>
      </header>

    </div>
  ); }
}

export default ViewTeam;