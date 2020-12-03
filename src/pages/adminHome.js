import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import CreateTeam from "./createTeam";
import AdminSearch from "./adminSearch";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";
class AdminHome extends React.Component {
  constructor(props) {
   super(props);
   this.state = {

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
   this.handleSearch = this.handleSearch.bind(this);
   this.updateInput = this.updateInput.bind(this);

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


 updateInput(event){

   this.setState({
     [event.target.name]: event.target.value
   });

 }

 handleSearch(event) {


   event.preventDefault();
   if (this.state.searched === true) {
     this.setState({ searched: false});
   }
   console.log(this.state)
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   console.log(this.state.searchType)
   if (this.state.searchType === "Teamname") {
     let tempName = this.state.searchVal.split(' ').join('');
     this.setState({searched:true, foundTeam:true, teamName: tempName});
   }
  else {
    db.collection("users").doc(this.state.searchVal)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data())
        if(querySnapshot.data().onTeam === false) {
          this.setState({searched:true, foundTeam: false});
        }
        else {
          this.setState({teamName: querySnapshot.data().teamName});
          this.setState({searched:true, foundTeam: true});
        }
      }).catch(err => {
        console.log(err);
      });
  }

 }

 render(){
   let teamVal;
   if(!sessionStorage.getItem('uniqname')){
     console.log("redirecting to logout from admin home")
     return <Redirect to='/' />
   }

   if (this.state.usertype === 'team') {
     console.log("redirecting from admin home to view team");
     return <Redirect to='/view-team' />
   }
   if (this.state.usertype === 'unassigned') {
     console.log("redirecting from admin home to create team");
     return <Redirect to='/create-team' />
   }

   const teamsDownload = JSON.stringify(this.state.teams);
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
      <Nav.Link href="/admin-view">Teams</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header className="App-header">
        <div className="body">
          <Form inline className="search-bar w-100" onSubmit={this.handleSearch}>

              <Form.Control as="select"
              value={this.state.searchType}
              name="searchType"
              onChange={this.updateInput} custom>
                <option value="default">Search by...</option>
                <option value="Teamname">Teamname</option>
                <option value="Uniqname">Uniqname</option>
              </Form.Control>
              <Form.Control required type="text"
              name="searchVal"
              value={this.state.searchVal}
              onChange={this.updateInput}
              placeholder="Search by teamname or uniqname of team member"
              className="mr-sm-2 w-75" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <br />
          <br />
          <br />
          {this.state.searched ? <AdminSearch team={this.state.teamName} onTeam={this.state.foundTeam} /> :

          <div className="w-100">
          {this.state.teamsLoaded &&   <CSVLink
      data={this.state.teams}
      filename={"teams.csv"}
      className="download-buttons btn btn-outline-secondary btn-lg"
  target="_blank">
    Download teams.csv
    </CSVLink>     }

    {this.state.usersLoaded &&   <CSVLink
data={this.state.users}
filename={"users.csv"}
className="download-buttons btn btn-outline-secondary btn-lg"
target="_blank">
Download users.csv
</CSVLink>     }

            {this.state.unassignedLoaded &&   <CSVLink
data={this.state.unassigned}
filename={"unassigned.csv"}
className="download-buttons btn btn-outline-secondary btn-lg"
target="_blank">
Download unassigned.csv
</CSVLink>     }
          </div>
        }
        </div>
      </header>

    </div>
  ); }
}

export default AdminHome;
