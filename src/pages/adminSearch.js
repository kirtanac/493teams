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
import {  Link,  Button, Navbar, Nav, Table, Card } from 'react-bootstrap';

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
     doneEditing:false,
     teamName:props.team,
   };
   this.editTeam = this.editTeam.bind(this);
   this.deleteTeam = this.deleteTeam.bind(this);
   this.editTeamName = this.editTeamName.bind(this);

 }


async componentDidMount() {
  console.log("check props ", this.state.data)
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });

    if(this.props.onTeam){
      dbFunctions.getTeamInfo(this.state.teamName).then(data => {
        console.log("data from get team info: ", data);
        this.setState({
          teams: data,
          dataLoaded: true
        })
      })
    }

}

async editTeamName(event) {

  event.preventDefault();
  console.log("MADE IT TO EDIT TEAM NAME")
  console.log("TEAM NAME BEFORE EDITING"+this.state.teamName);
  var newVal = prompt("What do you want to change "+event.target.id+" to?")
  newVal = newVal.split(' ').join('');
  console.log(newVal);
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  //check if user is already on a team
  if (newVal.length !== 0) {
    //create new team w same info but different name

    dbFunctions.getTeamInfo(this.state.teamName).then(teamInfo => {
      let description1;
      if (teamInfo.description === "") {
        description1 = "";
      }
      else {
        description1 = teamInfo.description
      }
      db.collection("teams").doc(newVal).set({
        teamName:newVal,
        uniqname1:teamInfo.uniqname1,
        uniqname2:teamInfo.uniqname2,
        uniqname3:teamInfo.uniqname3,
        uniqname4:teamInfo.uniqname4,
        uniqname1Accepted:teamInfo.uniqname1Accepted,
        uniqname2Accepted:teamInfo.uniqname2Accepted,
        uniqname3Accepted:teamInfo.uniqname3Accepted,
        uniqname4Accepted:teamInfo.uniqname4Accepted,
        description:description1,
        rejectedInvites:teamInfo.rejectedInvites
      });
      console.log("created New team")
      //user1 update
      dbFunctions.getTeamInfo(newVal).then(data => {
        console.log("CHECKING THAT DATA WAS CREATED");
        console.log(data)
      });
      console.log("updating user1");
      if (teamInfo.uniqname1Accepted) {
        db.collection("users").doc(teamInfo.uniqname1).update({
          teamName:newVal
        });
        console.log("updated user1");
      }
      else {
        //need to update the invitations array wherever the old team name was
        dbFunctions.getUserInfo(teamInfo.uniqname1).then(userInfo => {
          let tempArray = userInfo.invitations;
          let index = tempArray.indexOf(teamInfo.teamName);
          console.log(teamInfo.teamName)
          console.log("PERSON 1 ARRAY"+tempArray)
          console.log("PERSON 1 INDEX"+index);
          if (index !== -1) {
            tempArray[index] = newVal;
          }
          db.collection("users").doc(teamInfo.uniqname1).update({
            invitations:tempArray
          });
          console.log("updated user1");
        });
      }
      console.log("updating user2");
      //user2 update
      if (teamInfo.uniqname2Accepted === true) {
        db.collection("users").doc(teamInfo.uniqname2).update({
          teamName:newVal
        });
        console.log("updated userInfo2");
      }
      else {
        //need to update the invitations array wherever the old team name was
        dbFunctions.getUserInfo(teamInfo.uniqname2).then(userInfo => {
          let tempArray = userInfo.invitations;
          let index = tempArray.indexOf(teamInfo.teamName);
          console.log(teamInfo.teamName)
          console.log("PERSON 2 ARRAY"+tempArray)
          console.log("PERSON 2 INDEX"+index);
          if (index !== -1) {
            tempArray[index] = newVal;
          }
          db.collection("users").doc(teamInfo.uniqname2).update({
            invitations:tempArray
          });
          console.log("updated userInfo2");
        });
      }
      //user3 update
      console.log("updating user3");
      if (teamInfo.uniqname2Accepted === true) {
        db.collection("users").doc(teamInfo.uniqname3).update({
          teamName:newVal
        });
        console.log("updated userInfo3");
      }
      else {
        //need to update the invitations array wherever the old team name was
        dbFunctions.getUserInfo(teamInfo.uniqname3).then(userInfo => {
          let tempArray = userInfo.invitations;
          let index = tempArray.indexOf(teamInfo.teamName);
          console.log(teamInfo.teamName)
          console.log("PERSON 3 ARRAY"+tempArray)
          console.log("PERSON 3 INDEX"+index);
          if (index !== -1) {
            tempArray[index] = newVal;
          }
          db.collection("users").doc(teamInfo.uniqname3).update({
            invitations:tempArray
          });
          console.log("updated user3");
        });
      }
      //user4 update
      console.log("updating user4");
      if (teamInfo.uniqname4Accepted === true && teamInfo.uniqname4 !== "") {
        db.collection("users").doc(teamInfo.uniqname4).update({
          teamName:newVal
        });
        console.log("updated user4");
      }
      else if (teamInfo.uniqname4 !== "") {
        //need to update the invitations array wherever the old team name was
        dbFunctions.getUserInfo(teamInfo.uniqname4).then(userInfo => {
          let tempArray = userInfo.invitations;
          let index = tempArray.indexOf(teamInfo.teamName);
          console.log(teamInfo.teamName)
          console.log("PERSON 4 ARRAY"+tempArray)
          console.log("PERSON 4 INDEX"+index);
          if (index !== -1) {
            tempArray[index] = newVal;
          }
          db.collection("users").doc(teamInfo.uniqname4).update({
            invitations:tempArray
          });
          console.log("updated user4");
        });

      }
      //delete old team
      db.collection("teams").doc(teamInfo.teamName).delete().then(function() {
        console.log("Document successfully deleted!");
        //update the team info displayed in the search hehe

      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
      dbFunctions.getTeamInfo(newVal).then(data => {
        console.log(data)
        this.setState({ teams: data});
        this.setState({ teamName: newVal});
        this.setState({ dataLoaded:true });
      });
      console.log("FINISHED UPDATING THE TEAM NAME");

    });

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
        let tf;
        switch(event.target.id) {
          case "uniqname1":
           numHolder = this.state.teams.uniqname1;
           tf = "uniqname1Accepted";
          break;
          case "uniqname2":
           numHolder = this.state.teams.uniqname2;
           tf = "uniqname4Accepted";
          break;
          case "uniqname3":
           numHolder = this.state.teams.uniqname3;
           tf = "uniqname4Accepted";
          break;
          case "uniqname4":
           numHolder = this.state.teams.uniqname4;
           tf = "uniqname4Accepted";
          break;
       };
        db.collection("users").doc(numHolder).update({
          onTeam:false,
          teamName:""
        });
        db.collection("teams").doc(this.state.teams.teamName).update({
          [event.target.id]: newVal,
          [tf]:true
        });
        dbFunctions.getTeamInfo(this.props.team).then(data => {
          console.log(data)
          this.setState({ teams: data});
          this.setState({ dataLoaded:true });
        });
      }
    })
  }

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
   // //

   if(this.state.doneEditing === true){
     return <h2>Team Deleted Successfully</h2>
   }
   if (this.state.dataLoaded === true) {
     const teams = this.state.teams;
     console.log(this.state.teams)
     console.log("made it here")
     let teamList = (
       <Card className="shadow-sm rounded-1 align-items-center">
       <Button variant="danger mr-4 mt-3 align-self-end" size="sm" onClick={this.deleteTeam}>Delete Team</Button>

       <Table className="m-4 text-left team-admin-table" xs="auto">
       <thead>
       <tr>
       <td className="small">Team Name</td>
         <th colSpan="2">{teams.teamName}</th>
         <th className="disappear-on-mobile"><Button id="teamName" variant="outline-success" size="sm" onClick={this.editTeamName}>Edit</Button></th>
       </tr>
       </thead>
       <tbody>
       <tr>
       <td className="small">Member #1</td>
        <td colSpan="2">{teams.uniqname1}</td>
        <td className="disappear-on-mobile"><Button id="uniqname1" variant="outline-success" size="sm" onClick={this.editTeam}>Edit</Button></td>
       </tr>
       <tr>
       <td className="small">Member #2</td>
        <td colSpan="2">{teams.uniqname2}</td>
        <td className="disappear-on-mobile"><Button id="uniqname2 "variant="outline-success" size="sm" onClick={this.editTeam}>Edit</Button></td>
       </tr>
       <tr>
       <td className="small">Member #3</td>
         <td colSpan="2">{teams.uniqname3}</td>
         <td className="disappear-on-mobile"><Button id="uniqname3" variant="outline-success" size="sm" onClick={this.editTeam}>Edit</Button></td>
       </tr>
       <tr>
       <td className="small">Member #4</td>
        <td colSpan="2">{teams.uniqname4}</td>
        <td className="disappear-on-mobile"><Button id="uniqname4" variant="outline-success" size="sm" onClick={this.editTeam}>Edit</Button></td>
      </tr>
      <tr>
      <td className="small">Description</td>
        <td colSpan="3">{teams.description}</td>
      </tr>
      </tbody>
      </Table>
      </Card>
     )
     return teamList
   }
   else {
     return <p>Loading...</p>
   }
 }
}

export default AdminSearch;
