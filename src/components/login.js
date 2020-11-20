import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import firebase from "../firebase";

const clientID = "718813902892-24n6sjnr041if9ip2dcf68kvvi4q1ssn.apps.googleusercontent.com";
const clientSECRET = "DYpLH6L0691jCID48fBZARjD";
const db = firebase.firestore();

class Login extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     isLoggedIn: false,
     accessToken: ''
   };

   this.login = this.login.bind(this);
   this.handleLoginFailure = this.handleLoginFailure.bind(this);
   this.logout = this.logout.bind(this);
   this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

 async login (response) {
   if(response.accessToken){

     this.setState(state => ({
      isLoggedIn: true,
       accessToken: response.accessToken
     }));
  //  const status = await this.getStatus(response.profileObj.email);
  let status = '';
    let email = response.profileObj.email;
    console.log("get status email: ", )
    if(!email.endsWith('@umich.edu')){
      console.log("not umich email address")
      status = 'Must be a University of Michigan email address'
    }
    let splits = email.split('@');
    let uniqname = splits[0]

    db.collection("users").doc(uniqname)
      .get()
      .then(querySnapshot => {
        console.log("snapshot", querySnapshot.data())
        if(querySnapshot.empty){
          console.log("return status")
          status = 'not on roster'
        }
        if(querySnapshot.data().isAdmin){
          status = 'admin'
        }else if(querySnapshot.data().onTeam){
          status = 'team'
        }else{
          status = 'no team'
        }
        this.props.callback({'status': 'success', 'type': 'login', 'user-type': status, 'response': email, 'accessToken': this.state.accessToken});
      });
   }
 }

 logout (response) {
   this.setState(state => ({
    isLoggedIn: false,
     accessToken: ''
   }));
   this.props.callback({'status': 'success', 'type': 'logout'});
 }

 handleLoginFailure (response) {
   alert('Failed to log in')
   this.props.callback({'status': 'error', 'type': 'login'});
 }

 handleLogoutFailure (response) {
   alert('Failed to log out')
   this.props.callback({'status': 'error', 'type': 'logout'});
 }



 render() {
   return (
   <div>
     { this.state.isLoggedIn ?
       <GoogleLogout
         clientId={ clientID }
         buttonText='Logout'
         onLogoutSuccess={ this.logout }
         onFailure={ this.handleLogoutFailure }
       />
       :
       <GoogleLogin
         clientId={ clientID }
         buttonText='Login'
         onSuccess={ this.login }
         onFailure={ this.handleLoginFailure }
         cookiePolicy={ 'single_host_origin' }
         responseType='code,token'
       />
     }
     {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}

   </div>
   )
 }
}

export default Login;
