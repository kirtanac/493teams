import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import Login from "../components/login"
import {  Link,  Button } from 'react-bootstrap';

// HOME PAGE!!!!!

class Home extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     loggedin: false,
     data: {}
   }

   this.handleLogin = this.handleLogin.bind(this);
 }

 handleLogin(log_data){
      this.setState({data: log_data})


      if ('user-type' in log_data){
        localStorage.setItem('uniqname', log_data['uniqname']);
        localStorage.setItem('user-type', log_data['user-type']);
        console.log("setting user-type to: ", localStorage.getItem('user-type'))

        this.setState({
          loggedin: true,
          data: {usertype: log_data['user-type'],
          uniqname: log_data['uniqname'],
          accessToken: log_data['accessToken']}
        });
      }
  }

 render(){
   // <Redirect to="/somewhere/else" />
   console.log("am i admin", this.state.data.usertype)
   if(!this.state.loggedin || this.state.data.usertype === "not umich email address" || this.state.data.usertype === "'not on roster'"){
     return (
     <div className="Home">

         <header className="App-header">
       <h1>493 Teams </h1>
       <i>Sign in to view your team</i>
       <Login callback={this.handleLogin} />
       </header>

   </div> );
 } else if(this.state.loggedin && this.state.data.usertype === 'admin'){
        return (
      <Redirect to="/admin-home" />
    ); }
    else if(this.state.loggedin && this.state.data.usertype === 'no team'){
       return (
         <Redirect to="/create-team" />
   );

 }else if(this.state.loggedin && this.state.data.usertype === 'team'){
       return (
          <Redirect to="/view-team" />
   );
 }


}
}

export default Home;
