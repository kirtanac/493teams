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

class AdminHome extends React.Component {
  constructor(props) {
   super(props);
   this.state = {

     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     onTeam: false,
     searched:false,
     searchVal:"",
     searchType:"",
     foundTeam: false,
     teamName:""
   };
   this.handleSearch = this.handleSearch.bind(this);
   this.updateInput = this.updateInput.bind(this);

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
      });
  }

 }

 render(){
   let teamVal;
   if(!localStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }

   if (this.state.usertype === 'team') {
     return <Redirect to='/view-team' />
   }
   if (this.state.usertype === 'unassigned') {
     return <Redirect to='/create-team' />
   }
   if (this.state.searched === true) {
     teamVal = this.state.teamName;
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
            <Button variant="outline-secondary" size="lg">
              Download teams.csv
            </Button>
            <Button className="download-buttons" variant="outline-secondary" size="lg">
              Download users.csv
            </Button>
            <Button variant="outline-secondary" size="lg">
              Download unssigned.csv
            </Button>
          </div>
        }
        </div>
      </header>

    </div>
  ); }
}

export default AdminHome;
