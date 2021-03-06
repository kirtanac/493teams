import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers";
import Invitation from "../components/invitation"
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav } from 'react-bootstrap';
import CustomNavbar from "../components/customNavbar.js";

class TeamInvites extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     numInv:0,
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     dataLoaded:false,
     onTeam: false
   }
   this.renderInvitations = this.renderInvitations.bind(this);
 }

async componentDidMount() {
   console.log("uniqname", this.state.uniqname);
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });


  await dbFunctions.getUserInfo(this.state.uniqname).then(result => {
      console.log("result",result);
      sessionStorage.setItem('user-type', result.usertype);
    this.setState({
      usertype: result.usertype,
      onTeam: (result.usertype === 'team'),
      numInv: result.numInvitations,
      onTeam: result.onTeam
    });
    if(result.onTeam){
      sessionStorage.setItem('user-type', 'team');
    }
  });

}

renderInvitations(){
  let renderedChildren = Array.from(Array(this.state.numInv)).map((x, index) => <Invitation invNum={index} />);
  console.log(renderedChildren);
  return renderedChildren;
}

 render(){

   if(!sessionStorage.getItem('uniqname')){
     return <Redirect to='/' />
   }
   if (this.state.usertype === 'team') {
     return <Redirect to='/view-team' />
   }
   if (this.state.usertype === 'admin') {
     return <Redirect to='/admin-home' />
   }

  return (
    <div className="Home">
<CustomNavbar/>

        <header className="App-header">
        <div className="body">
      <h1 className="title">493 Team Invitations </h1>
      <div className="body-content">
      <h2>You have ({this.state.numInv}) invitations</h2>
          {this.renderInvitations()}
          <br/>
          </div>
              </div>
        </header>

    </div>
  ); }
}

export default TeamInvites;
