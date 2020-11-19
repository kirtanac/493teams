import '../App.css';
import firebase from "../firebase";
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Modal } from 'react-bootstrap';


class Invite extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     invitation:{},
     dataLoaded:false,
     accepted:false,
     show:false
   }
   this.viewInvitation = this.viewInvitation.bind(this);
   this.handleShow = this.handleShow.bind(this);
   this.handleHide = this.handleHide.bind(this);
   this.acceptedTeam = this.acceptedTeam.bind(this);
 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   //hardcoding in kirtana for functionality purposes
  db.collection("users").doc("kirtana")
    .get()
    .then(querySnapshot => {
      let specInv = querySnapshot.data().invitations[this.props.invNum];
      this.setState({ invitation: specInv});
      this.setState({dataLoaded: true});
    });

}
viewInvitation(){
  if (this.state.dataLoaded === false) {
    return <h2>Loading...</h2>
  }
  else {
    let invList = (
      <Fragment>
      <b>{this.state.invitation.teamName}</b>
      <br />
      {this.state.invitation.teamMembers.join(', ')}
      <br/>
      </Fragment>
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

acceptedTeam() {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  //update team info in database
  //find which one equals 'kirtana'
  let user1;
  let user2;
  let user3;
  let user4;
  db.collection("teams").doc(this.state.invitation.teamName).get()
  .then(querySnapshot => {
    console.log("got user data")
    user1 = querySnapshot.data().uniqname1;
    user2 = querySnapshot.data().uniqname2;
    user3 = querySnapshot.data().uniqname3;
    try{
      user4 = querySnapshot.data().uniqname4;
    } catch(error) {
      console.log(error)
    }
    let userString = "kirtana";
    console.log(user3);
    switch(userString) {
      case user1:
        db.collection("teams").doc(this.state.invitation.teamName).update({
          uniqname1Accepted:true
        });
      break;
      case user2:
        db.collection("teams").doc(this.state.invitation.teamName).update({
        uniqname2Accepted:true
        })
      break;
      case user3:
        db.collection("teams").doc(this.state.invitation.teamName).update({
          uniqname3Accepted:true
        })
      break;
      case user4:
        db.collection("teams").doc(this.state.invitation.teamName).update({
          uniqname4Accepted:true
        })
      break;

    };
  });

  db.collection("users").doc("kirtana").update({
    onTeam:true,
    teamName:this.state.invitation.teamName
  }).then(() => {
    this.setState({ accepted: true});
  });

}
 render(){
   if (this.state.accepted === true) {
     return <Redirect to='/view-team' />
   }
  return (
    <div className="Invite">
      {this.viewInvitation()}
      <Button variant="success" onClick={this.handleShow}>Join Team</Button>{' '}
      <Modal show={this.state.show} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to accept this team Invitation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.viewInvitation()}</Modal.Body>
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
