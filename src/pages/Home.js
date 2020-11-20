import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink
} from "react-router-dom";
import Login from "../components/login"
import {  Link,  Button } from 'react-bootstrap';

// HOME PAGE!!!!!

class Home extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     loggedin: false,
     data: {}
   }
   this.handleLogin = this.handleLogin.bind(this);
 }

 handleLogin(log_data){
      this.setState({data: log_data})
      console.log(log_data);
      if ('user-type' in log_data){
        console.log("handle login got this")
        this.setState({
          loggedin: true,
          data: {usertype: log_data['user-type'],
          response: log_data['response'],
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
       <Login callback={this.handleLogin} />
       </header>

   </div> );
 } else if(this.state.loggedin && this.state.data.usertype === 'admin'){
        return (
      <div className="Home">

          <header className="App-header">
        <h1>Admin </h1>
        <NavLink to="/admin-home" activeClassName="hurray">
          Admin Home
        </NavLink>

          </header>

      </div>
    ); }
    else if(this.state.loggedin && this.state.data.usertype === 'no team'){
       return (
     <div className="Home">

         <header className="App-header">
       <h1>493 Teams </h1>

           <NavLink to={{pathname: "/create-team", aboutProps: this.state.data}} activeClassName="hurray">
             Create a Team!!
           </NavLink>


         </header>

     </div>
   );

 }else if(this.state.loggedin && this.state.data.usertype === 'team'){
       return (
     <div className="Home">
         <header className="App-header">
       <h1>On Teams </h1>
       <NavLink to={{pathname: "/view-team", yo: "thehells" }} activeClassName="hurray">
         View your Team
       </NavLink>

         </header>
     </div>
   );
 }


}
}

export default Home;
