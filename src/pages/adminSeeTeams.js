import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import { CardColumns, Card, Col,Nav, Navbar, NavDropdown, Form, Button, FormControl, Table, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import { CSVLink } from "react-csv";
import CustomNavbar from "../components/customNavbar.js";

//VIEW THE CURRENT TEAM YOU ARE ON
//currently hardcoded for my uniqname (clantonm)

class AdminSeeTeams extends React.Component {
  constructor(props) {
   super(props);
   console.log("props", props);
   this.state = {
     numInv:0,
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     dataLoaded:false,
     onTeam: false,
     teamsLoaded: false,
     teams: [],
     users: [],
     usersLoaded: false
   }
 }

   async componentDidMount(){
     const db = firebase.firestore();
     db.settings({
       timestampsInSnapshots: true
     });
     await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{

     this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
     sessionStorage.setItem('user-type', data.usertype);
     console.log("user data updated: ", data);
     });

     let teams_in = [];
     await db.collection("teams").get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        teams_in.push(doc.data());
      });
       this.setState({ teams: teams_in, teamsLoaded: true });
       console.log("teams loaded: ", teams_in);
     })

     let users_in = [];
     await db.collection("users").get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        users_in.push(doc.data());
      });
       this.setState({ users: users_in, usersLoaded: true });
       console.log("users_in loaded: ", users_in);
     })

   }
   // if(props.location){
   //   console.log("check out view team", props.location.aboutProps)
   // }

render(){
  if(!sessionStorage.getItem('uniqname')){
    console.log("redirecting from admin see teams to logout");
    return <Redirect to='/' />
  }

  if (this.state.usertype === 'team') {
    console.log("redirecting from admin see teams to view team");
    return <Redirect to='/view-team' />
  }
  if (this.state.usertype === 'unassigned') {
    console.log("redirecting from admin see teams to create team");
    return <Redirect to='/create-team' />
  }

   const rows = this.state.teams.map(row => <tr><td>{row.teamName}</td><td>{row.uniqname1Accepted?row.uniqname1:""}{row.uniqname2Accepted?", " +row.uniqname2:""}{row.uniqname3Accepted?", " +row.uniqname3:""}{row.uniqname4Accepted?", " + row.uniqname4:""}</td><td>{row.description}</td></tr>)

  return (
    <div className="admin-see-teams">
  <CustomNavbar/>

{this.state.teamsLoaded ?
  <header className="loggedInHeader">
  <div className="body">
  <Row>
  <Col className="text-left align-items-sm-start mb-3">
  <h1 className="title mb-3">Registered Teams</h1>
  <a  className="text-secondary " href="/admin-home"><Card.Subtitle className="mb-1">Find a specific team</Card.Subtitle></a>
  </Col>
  </Row>

  <div className="body-content">


  <Table className="seeTeams align-content-center" responsive="sm" bordered hover striped>
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
          {this.state.teams.length === 0 && <i className="text-muted">There are currently no teams registered</i>}
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

export default AdminSeeTeams;
