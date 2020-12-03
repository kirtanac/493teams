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

     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     onTeam: false,
     teams: {},
     data: props,
     dataLoaded:false,
     doneEditing:false
   };
   this.editTeam = this.editTeam.bind(this);
   this.deleteTeam = this.deleteTeam.bind(this);

 }


async componentDidMount() {
  console.log("check props ", this.state.data)
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });

    if(this.props.onTeam){
      dbFunctions.getTeamInfo(this.props.team).then(data => {
        console.log("data from get team info: ", data);
        this.setState({
          teams: data,
          dataLoaded: true
        })
      })
    }

}


editTeam(event){
  event.preventDefault();

  var newVal = prompt("What do you want to change "+event.target.id+" to?")
  console.log(newVal);
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  //check if user is already on a team
  if (event.target.id !== "teamName") {
    console.log("made it in here");
    dbFunctions.getUserInfo(newVal).then(result => {
      if (result.onTeam === true) {
        alert("User already on team enter a different uniqname");
      }
      else {
        //change value in team
        db.collection("users").doc(newVal).update({
          onTeam:true,
          teamName:this.state.teams.teamName
        });
        let numHolder;
        switch(event.target.id) {
          case "uniqname1":
           numHolder = this.state.teams.uniqname1;
          break;
          case "uniqname2":
           numHolder = this.state.teams.uniqname2;
          break;
          case "uniqname3":
           numHolder = this.state.teams.uniqname3;
          break;
          case "uniqname4":
           numHolder = this.state.teams.uniqname4;
          break;
       };
        db.collection("users").doc(numHolder).update({
          onTeam:false,
          teamName:""
        });
        db.collection("teams").doc(this.state.teams.teamName).update({
          [event.target.id]: newVal
        });
      }
    })
  }
  //if not then push edit and push invite
  dbFunctions.getTeamInfo(this.props.team).then(data => {
    console.log(data)
    this.setState({ teams: data});
    this.setState({ dataLoaded:true });
  });
}
deleteTeam(event) {
  event.preventDefault();

  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  dbFunctions.getUserInfo(this.state.teams.uniqname1).then(result => {
    if (result.onTeam && result.teamName !== this.props.team) {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname1).update({
        onTeam:false,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
    else {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname1).update({
        onTeam:true,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
  });
  //uniqname2
  dbFunctions.getUserInfo(this.state.teams.uniqname2).then(result => {
    if (result.onTeam && result.teamName !== this.props.team) {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname2).update({
        invitations:tempArray,
        numInvitations: numInv

      });
    }
    else {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname2).update({
        onTeam:false,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
  });
  //uniqname3
  dbFunctions.getUserInfo(this.state.teams.uniqname3).then(result => {
    if (result.onTeam && result.teamName !== this.props.team) {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname3).update({
        onTeam:false,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
    else {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname3).update({
        onTeam:false,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
  });
  //uniqname4
  dbFunctions.getUserInfo(this.state.teams.uniqname4).then(result => {
    if (result.onTeam && result.teamName !== this.props.team) {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname4).update({
        onTeam:false,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
    else {
      let tempArray = result.invitations;
      let index = tempArray.indexOf(this.props.team);
      if (index > -1) {
        tempArray.splice(index,1);
      }
      let numInv = result.numInvitations - 1;
      db.collection("users").doc(this.state.teams.uniqname4).update({
        onTeam:false,
        teamName:"",
        invitations:tempArray,
        numInvitations: numInv

      });
    }
  });
  db.collection("teams").doc(this.props.team).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
  this.setState({ doneEditing: true});
}
 render(){

   if(this.state.doneEditing === true){
     return <h2>Team Deleted Successfully</h2>
   }
   if (this.props.onTeam === false) {
     return <h2> This user is not on a team </h2>
   }
   if (this.state.dataLoaded === true) {
     const teams = this.state.teams;
     console.log(this.state.teams)
     console.log("made it here")
     let teamList = (
       <React.Fragment>
       <Button variant="outline-danger" size="sm" onClick={this.deleteTeam}>Delete Team</Button>
       <br />
       <Table borderless className="w-25">
       <thead>
       <tr>
         <th colSpan="2">{teams.teamName}</th>
         <th><Button id="teamName" variant="outline-danger" size="sm" onClick={this.editTeam}>Edit</Button></th>
       </tr>
       <tr>
         <th></th>
         <th></th>
         <th></th>
       </tr>
       </thead>
       <tbody>
       <tr>
        <td colSpan="2">{teams.uniqname1}</td>
        <td><Button id="uniqname1" variant="outline-danger" size="sm" onClick={this.editTeam}>Edit</Button></td>
       </tr>
       <tr>
        <td colSpan="2">{teams.uniqname2}</td>
        <td><Button id="uniqname2 "variant="outline-danger" size="sm" onClick={this.editTeam}>Edit</Button></td>
       </tr>
       <tr>
         <td colSpan="2">{teams.uniqname3}</td>
         <td><Button id="uniqname3" variant="outline-danger" size="sm" onClick={this.editTeam}>Edit</Button></td>
       </tr>
       <tr>
        <td colSpan="2">{teams.uniqname4}</td>
        <td><Button id="uniqname4" variant="outline-danger" size="sm" onClick={this.editTeam}>Edit</Button></td>
      </tr>
      <tr>
        <td colSpan="3">{teams.description}</td>
      </tr>
      </tbody>
      </Table>
      </React.Fragment>
     )
     return teamList
   }
   else {
     return <p>Loading...</p>
   }
 }
}

export default AdminSearch;
