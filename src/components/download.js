import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav, Form, FormControl, Row, Col, ButtonGroup, Dropdown } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";

class Download extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     isLoggedIn: false,
     accessToken: '',
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     onTeam: false,
     searched:false,
     searchVal:"",
     searchType:"",
     foundTeam: false,
     teamName:"",
     teams: [],
     teamsLoaded: false,
     users: [],
     usersLoaded: false,
     unassigned: [],
     unassignedLoaded: false
   };

  }


   async componentDidMount() {
     const db = firebase.firestore();
     db.settings({
       timestampsInSnapshots: true
     });
     await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{
        this.setState({ usertype: data.usertype });
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

     let unassigned_in = [];
     await db.collection("users").where("onTeam", "==", false).get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        unassigned_in.push(doc.data());
      });
       this.setState({ unassigned: unassigned_in, unassignedLoaded: true });
       console.log("unassigned loaded: ", unassigned_in);
     })


   }

 render() {
   return (

   <Dropdown className="align-self-right" as={ButtonGroup}>
     <Button variant="success" >Download Data</Button>

     <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

     <Dropdown.Menu>
{this.state.teamsLoaded && <CSVLink
data={this.state.teams}
filename={"teams.csv"}
className=" w-100 btn btn-outline-secondary align-items-sm-center rounded-0"
target="_blank">
teams.csv
</CSVLink> }

{this.state.usersLoaded && <CSVLink
data={this.state.users}
filename={"users.csv"}
className="btn w-100 btn-outline-secondary align-items-sm-center rounded-0"
target="_blank">
users.csv
</CSVLink>  }

{this.state.unassignedLoaded &&  <CSVLink
data={this.state.unassigned}
filename={"unassigned.csv"}
className="btn w-100 btn-outline-secondary align-items-sm-center rounded-0"
target="_blank">
unassigned.csv
</CSVLink>}
</Dropdown.Menu>
</Dropdown>

   )
 }
}

export default Download;
