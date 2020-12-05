import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Modal, Card } from 'react-bootstrap';


class Invite extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     invitation:"",
     teamMems:[],
     dataLoaded:false,
     accepted:false,
     show:false,
     userInf:{}
   }
   this.viewInvitation = this.viewInvitation.bind(this);
   this.handleShow = this.handleShow.bind(this);
   this.handleHide = this.handleHide.bind(this);
   this.acceptedTeam = this.acceptedTeam.bind(this);
 }

 async componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   //hardcoding in kirtana for functionality purposes
  let userInfo = await dbFunctions.getUserInfo(sessionStorage.getItem('uniqname'));
  let specInv = await userInfo.invitations[this.props.invNum];
  console.log("loading invitation at: ", userInfo);
  this.setState({ invitation: specInv});
  this.setState({ userInf: userInfo});
  let teamInfo = await dbFunctions.getTeamInfo(this.state.invitation);
  let tempArray = [];
  let user1, user2, user3, user4;
  user1 = teamInfo.uniqname1;
  user2 = teamInfo.uniqname2;
  user3 = teamInfo.uniqname3;
  tempArray.push(user1);
  tempArray.push(user2);
  tempArray.push(user3);
  try{
    user4 = teamInfo.uniqname4;
    tempArray.push(user4);

  } catch(error) {
    console.log(error)
  }
  this.setState({ teamMems: tempArray});
  this.setState({dataLoaded: true});
}


viewInvitation(){
  if (this.state.dataLoaded === false) {
    return <h2>Loading...</h2>
  }
  else {
    //go in and retrieve the team members from the team page
    //use that for the teammember names
    let invList = (
      <Card >
  <Card.Body>
    <Card.Title>{this.state.invitation}</Card.Title>
    <Card.Text>
    {this.state.teamMems.join(', ')}
    </Card.Text>
      <Button variant="success" onClick={this.handleShow}>Join Team</Button>
  </Card.Body>
  </Card>
    );
    return invList;
  }
}

handleShow() {
  console.log("made it here");
  this.setState({ show: true});
}
handleHide() {
  this.setState({ show: false});
}

async acceptedTeam() {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  //update team info in database
  let user1 = this.state.teamMems[0];
  let user2 = this.state.teamMems[1];
  let user3 = this.state.teamMems[2];
  let user4;
  if (this.state.teamMems.length === 4) {
    user4 = this.state.teamMems[3];
  }
  let userString = sessionStorage.getItem('uniqname');
  console.log(userString);
  switch(userString) {
    case user1:
      db.collection("teams").doc(this.state.invitation).update({
        uniqname1Accepted:true
      });
    break;
    case user2:
      db.collection("teams").doc(this.state.invitation).update({
      uniqname2Accepted:true
      })
    break;
    case user3:
      db.collection("teams").doc(this.state.invitation).update({
        uniqname3Accepted:true
      })
    break;
    case user4:
      db.collection("teams").doc(this.state.invitation).update({
        uniqname4Accepted:true
      })
    break;

  };
  //go through each team in the users invite list and add their name to the rejected invites array
  this.state.userInf.invitations.forEach((element, index) => {
    if (index !== this.props.invNum) {
      dbFunctions.getTeamInfo(element).then(teamData => {
        console.log(teamData);
        console.log("ready to push")
        teamData.rejectedInvites.push(sessionStorage.getItem('uniqname'));
        db.collection("teams").doc(element).update({
          rejectedInvites:teamData.rejectedInvites
        });
      });
    }
  })
  db.collection("users").doc(sessionStorage.getItem('uniqname')).update({
    onTeam:true,
    teamName:this.state.invitation,
    numInvitations:0,
    invitations:[]
  }).then(() => {
    this.setState({ accepted: true});
  });

}


 render(){
   if (this.state.accepted === true) {
     sessionStorage.setItem('user-type', 'team')
     console.log("moving from invitation to view-team");
     return <Redirect to='/view-team' />
   }
   // removed: <Button variant="success" onClick={this.handleShow}>Join Team</Button>{' '}
  return (
    <div className="Invite">
      {this.viewInvitation()}

      <Modal show={this.state.show} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to accept this team Invitation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2>{this.state.invitation}</h2>
        <p>
        {this.state.teamMems.join(', ')}
        </p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.acceptedTeam}>
            Accept Invitation
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
    </div>
  ); }
}

export default Invite;
