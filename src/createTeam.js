import './App.css';
import firebase from "./firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

//PAGE FOR CREATING A TEAM

class CreateTeam extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     teamName:"",
     uniq1:"",
     uniq2:"",
     uniq3:"",
     uniq4:"",
     redi:false
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
    uniq4:"",
    redi:true
  });

}

 render(){
  if (this.state.redi == true) {
    return <Redirect to='/view-team' />
  }
  return (
    <div className="createteam">
      <header className="loggedInHeader">
      <CardColumns>
      <Card className="bg-light text-dark">
        <Card.Body>Name: {this.state.teamName}</Card.Body>
      </Card>

      <Card className="bg-light text-dark">
        <Card.Body>Email: {this.state.uniq1}</Card.Body>
      </Card>
      </CardColumns>
        <h1>
        Register your team

        </h1>


        <Form onSubmit={this.addUser}>

        <Form.Group controlId="fullname">
        <Form.Label>Team name</Form.Label>
    <Form.Control
    type="text"
      name="teamName"
      placeholder="Your TeamName"
      onChange={this.updateInput}
      value={this.state.teamName} />
          </Form.Group>


          <Form.Group controlId="uniq1">
          <Form.Label>Uniqname1</Form.Label>
      <Form.Control
      type="text"
      name="uniq1"
      placeholder="Your Uniqname"
      onChange={this.updateInput}
      value={this.state.uniq1} />
            </Form.Group>

        <Form.Group controlId="uniq1">
        <Form.Label>Uniqname1</Form.Label>
    <Form.Control
    type="text"
    name="uniq2"
    placeholder="Uniqname 2"
    onChange={this.updateInput}
    value={this.state.uniq2}/>
          </Form.Group>

        <Form.Group controlId="uniq1">
        <Form.Label>Uniqname1</Form.Label>
    <Form.Control
    type="text"
      name="uniq3"
      placeholder="Uniqname 3"
      onChange={this.updateInput}
      value={this.state.uniq3} />
          </Form.Group>

          <Form.Group controlId="uniq1">
          <Form.Label>Uniqname1</Form.Label>
          <Form.Control
          type="text"
          name="uniq4"
          placeholder="Uniqname 4"
          onChange={this.updateInput}
          value={this.state.uniq4} />
            </Form.Group>

        <br/>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      </header>
    </div>
  ); }
}

export default CreateTeam;
