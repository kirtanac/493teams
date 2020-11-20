import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import Invitation from "../components/invitation"
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button } from 'react-bootstrap';

class TeamInvites extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     numInv:0,
     dataLoaded:false,
     onTeam: false
   }
   this.renderInvitations = this.renderInvitations.bind(this);
 }
 componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
  db.collection("users").doc("kirtana")
    .get()
    .then(querySnapshot => {
      this.setState({
        numInv: querySnapshot.data().numInvitations,
        onTeam: querySnapshot.data().onTeam
      });
    });

}

renderInvitations(){
  let renderedChildren = Array.from(Array(this.state.numInv)).map((x, index) => <Invitation invNum={index} />);
  console.log(renderedChildren);
  return renderedChildren;
}

 render(){
   if(this.state.onTeam === true) {
     return <Redirect to='/view-team' />
   }
   if(!localStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }
  return (
    <div className="Home">

        <header className="App-header">
      <h1>493 Team Invitations </h1>
      <h2>You have ({this.state.numInv}) invitations</h2>
          {this.renderInvitations()}
          <br/>
          <NavLink to="/view-team" activeClassName="hurray">
            Back to viewing your team
          </NavLink>
          <NavLink to="/create-team" activeClassName="hurray">
            Back to Creating your team
          </NavLink>
          <NavLink to="/" activeClassName="hurray">
            Back to Home
          </NavLink>


        </header>

    </div>
  ); }
}

export default TeamInvites;
