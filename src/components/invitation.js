import '../App.css';
import firebase from "../firebase";
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button } from 'react-bootstrap';


class Invite extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     invitation:{},
     dataLoaded:false,
     accepted:false
   }
   this.viewInvitation = this.viewInvitation.bind(this);
 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
  db.collection("users").doc("clantonm")
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

 render(){
   if (this.state.accepted === true) {
     return <Redirect to='/view-team' />
   }
  return (
    <div className="Invite">
          {this.viewInvitation()}
          <Button variant="success">Join Team</Button>{' '}
          <Button variant="danger">Delete Invitation</Button>
          <br />
          <br />
    </div>
  ); }
}

export default Invite;
