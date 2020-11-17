import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

const clientID = "718813902892-24n6sjnr041if9ip2dcf68kvvi4q1ssn.apps.googleusercontent.com";
const clientSECRET = "DYpLH6L0691jCID48fBZARjD";

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
