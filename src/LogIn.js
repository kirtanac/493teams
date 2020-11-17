import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

const clientID = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com";

class Login extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    }
     this.responseGoogle = this.responseGoogle.bind(this);
  }

const responseGoogle = (response) => {
   console.log(response);
  }

 render(){
  return (
    <div className="googleButton">

    <GoogleLogin
      clientId={clientID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />

    </div>
  ); }
}

export default Login;
