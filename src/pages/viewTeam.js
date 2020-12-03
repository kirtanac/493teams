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
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     teamName: '',
     onTeam: sessionStorage.getItem('user-type') === 'team',
     dataLoaded:false,
     edited:false
   }
   this.editDesc = this.editDesc.bind(this);

 }

 async componentDidMount() {

    await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{

    this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
    sessionStorage.setItem('user-type', data.usertype);
    console.log("user data updated: ", data);
    });

    if(sessionStorage.getItem('user-type') === 'team' ) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      console.log("state", this.state.uniqname)
      await dbFunctions.getTeamFromUser(this.state.uniqname).then((data) =>{
      this.setState({ teams: data,
      dataLoaded:true});
      console.log("team data loaded: ", data);
      });

      //let data = await dbFunctions.getTeamFromUser(this.state.uniqname);
    }
}

editDesc(event) {
  event.preventDefault();
  var newVal = prompt("What do you want to change your project description to?")
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  db.collection("teams").doc(this.state.teams.teamName).update({
    description:newVal

  });
  let tempHolder = this.state.teams;
  tempHolder.description = newVal
  this.setState({ teams: tempHolder});
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
  const isLoaded = (this.state.dataLoaded === true && this.state.onTeam);
  console.log("loaded: ", isLoaded);
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
        {this.state.dataLoaded  ?
          <React.Fragment>
          <div className="container">
          <div id="team_info" className="row">
            <div id="info_table" className="col-xs-6">
              <Table striped bordered className="w-25">
              <thead>
              <tr>
                <th colSpan="2">{this.state.teams.teamName}</th>
              </tr>
              <tr>
                <th>Uniqname</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              <tr>
               <td>{this.state.teams.uniqname1}</td>
               <td>{this.state.teams.uniqname1Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              <tr>
               <td>{this.state.teams.uniqname2}</td>
               <td>{this.state.teams.uniqname2Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              <tr>
                <td>{this.state.teams.uniqname3}</td>
                <td>{this.state.teams.uniqname3Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              <tr>
               <td>{this.state.teams.uniqname4}</td>
               <td>{this.state.teams.uniqname4Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              </tbody>
              </Table>
            </div>
            <div id="second_div" className="col-xs-6 w-75">
              <span><h2 id="desc_name">Description </h2> <Button variant="outline-danger" size="sm" onClick={this.editDesc}>Edit</Button></span>
              <p>{this.state.teams.description}</p>
            </div>
          </div>
          </div>
          </React.Fragment> :
       <i>Loading...</i>}
</p>


        <br/>
  </div>
        </div>
      </header>

    </div>
  ); }
}

export default ViewTeam;
