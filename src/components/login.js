import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientID = "718813902892-24n6sjnr041if9ip2dcf68kvvi4q1ssn.apps.googleusercontent.com";
const clientSECRET = "DYpLH6L0691jCID48fBZARjD";

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

 login (response) {
   if(response.accessToken){
     this.setState(state => ({
      isLoggedIn: true,
       accessToken: response.accessToken
     }));
   }
 }

 logout (response) {
   this.setState(state => ({
    isLoggedIn: false,
     accessToken: ''
   }));
 }

 handleLoginFailure (response) {
   alert('Failed to log in')
 }

 handleLogoutFailure (response) {
   alert('Failed to log out')
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
