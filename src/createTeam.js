import './App.css';
import firebase from "./firebase";
import React from 'react';

class CreateTeam extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     teamName:"",
     uniq1:"",
     uniq2:"",
     uniq3:"",
     uniq4:""
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
  let tempName = this.state.teamName.split(' ').join('');
  if (this.state.uniq4 === "") {
    db.collection("teams").add({
      teamName:tempName,
      uniqname1:this.state.uniq1,
      uniqname2:this.state.uniq2,
      uniqname3:this.state.uniq3,
      uniqname1Accepted:false,
      uniqname2Accepted:false,
      uniqname3Accepted:false,
    });
    db.collection("users/"+this.state.uniq1+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
    db.collection("users/"+this.state.uniq2+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
    db.collection("users/"+this.state.uniq3+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
  }
  else {
    db.collection("teams").add({
      teamName:tempName,
      uniqname1:this.state.uniq1,
      uniqname2:this.state.uniq2,
      uniqname3:this.state.uniq3,
      uniqname4:this.state.uniq4,
      uniqname1Accepted:false,
      uniqname2Accepted:false,
      uniqname3Accepted:false,
      uniqname4Accepted:false,
    });
    db.collection("users/"+this.state.uniq1+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
    db.collection("users/"+this.state.uniq2+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
    db.collection("users/"+this.state.uniq3+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
    db.collection("users/"+this.state.uniq4+"/Invitations").add({
      teamName:tempName,
      accepted:false
    });
  }
  this.setState({
    teamName:"",
    uniq1:"",
    uniq2:"",
    uniq3:"",
    uniq4:""
  });
}

 render(){
  return (
    <div className="createteam">
      <header className="App-header">

        <p>
        Register your team

        </p>
        <br/>
        <form onSubmit={this.addUser}>
        <input
          type="text"
          name="teamName"
          placeholder="Your TeamName"
          onChange={this.updateInput}
          value={this.state.teamName}
        />
        <br/>
        <input
          type="text"
          name="uniq1"
          placeholder="Your Uniqname"
          onChange={this.updateInput}
          value={this.state.uniq1}
        />
        <br/>
        <input
          type="text"
          name="uniq2"
          placeholder="Uniqname 2"
          onChange={this.updateInput}
          value={this.state.uniq2}
        />
        <br/>
        <input
          type="text"
          name="uniq3"
          placeholder="Uniqname 3"
          onChange={this.updateInput}
          value={this.state.uniq3}
        />
        <br/>
        <input
          type="text"
          name="uniq4"
          placeholder="Uniqname 4"
          onChange={this.updateInput}
          value={this.state.uniq4}
        />
        <br/>
        <button type="submit">Submit</button>
      </form>
      </header>
    </div>
  ); }
}

export default CreateTeam;
