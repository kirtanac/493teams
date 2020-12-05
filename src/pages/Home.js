import logo from '../logo.svg';
import '../App.css';
import '../custom.scss';
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
import {  Link,  Button, Image, CardGroup , Card, Container, Row} from 'react-bootstrap';

// HOME PAGE!!!!!

class Home extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     loggedin: false,
     data: {}
   }

   this.handleLogin = this.handleLogin.bind(this);
 }



 handleLogin(log_data){
      this.setState({data: log_data})
      if ('user-type' in log_data){
        sessionStorage.setItem('uniqname', log_data['uniqname']);
        sessionStorage.setItem('user-type', log_data['user-type']);
        console.log("setting user-type to: ", sessionStorage.getItem('user-type'))

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
         <Image src="./EECS493_landscape.png" fluid />
         <Row  >
         <i className="mr-2">Sign in to view your team</i>
         <Login className="loginButton ml-2" navbar={false} callback={this.handleLogin} />
         </Row>

         <CardGroup className=" instructions justify-content-md-center mb-10 w-75">
     <Card bg="info" className="cardclass" >
       <Card.Body>
         <Card.Title>Step 1</Card.Title>
         <Card.Text>
           Find a group of 4 students who have similar interests as you on the <a>Class Team-Finding Google Sheet.</a>
         </Card.Text>
       </Card.Body>

     </Card>
     <Card bg="primary"  className="cardclass">

       <Card.Body>
         <Card.Title>Step 2</Card.Title>
         <Card.Text>
            Log into EECS 493 Teams. Have 1 team member create the team, then have all other team members log in to accept the invitation.
         </Card.Text>
       </Card.Body>

     </Card>
     <Card bg="success" className="cardclass">

       <Card.Body>
         <Card.Title>Step 3</Card.Title>
         <Card.Text>
            Continue using EECS 493 Teams to see your team members' progress!
         </Card.Text>
       </Card.Body>

     </Card>
   </CardGroup>

       </header>

   </div> );
 } else if(this.state.loggedin && this.state.data.usertype === 'admin'){
        return (
      <Redirect to="/admin-home" />
    ); }
    else if(this.state.loggedin && this.state.data.usertype === 'unassigned'){
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
