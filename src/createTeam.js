import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import React from 'react';

class CreateTeam extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
    email: "v", fullname: "x"
   };

   this.updateInput = this.updateInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.addUser = this.addUser.bind(this);
 }

 updateInput(event){
   this.setState({
     [event.target.name]: event.target.value
   });}

 handleSubmit(event) {
   alert('A name was submitted: ' + this.state.value);
   event.preventDefault();
 }

 addUser(event){
  event.preventDefault();
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const userRef = db.collection("users").add({
    fullname: this.state.fullname,
    email: this.state.email
  });
  this.setState({
    fullname: "",
    email: ""
  });
}

 render(){
  return (
    <div className="createteam">
      <header className="App-header">

        <p>
        Here's your form!!1
          Name: {this.state.fullname}
            Email: {this.state.email}
        </p>
        
        <form onSubmit={this.addUser}>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          onChange={this.updateInput}
          value={this.state.fullname}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={this.updateInput}
          value={this.state.email}
        />
        <button type="submit">Submit</button>
      </form>
      </header>
    </div>
  ); }
}

export default CreateTeam;
