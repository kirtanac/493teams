import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';

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
      <header className="loggedInHeader">

        <p>
        Here's your form!!
        </p>
        <CardColumns>
        <Card className="bg-light text-dark">
          <Card.Body>Name: {this.state.fullname}</Card.Body>
        </Card>

        <Card className="bg-light text-dark">
          <Card.Body>Email: {this.state.email}</Card.Body>
        </Card>
        </CardColumns>


        <Form onSubmit={this.addUser}>

        <Form.Group controlId="fullname">
        <Form.Label>Full name</Form.Label>
    <Form.Control type="text"
    name="fullname"
    placeholder="Full name"
    onChange={this.updateInput}
    value={this.state.fullname} />
          </Form.Group>


          <Form.Group controlId="fullname">
          <Form.Label>Email</Form.Label>
      <Form.Control type="email"
      name="email"
      placeholder="Email"
      onChange={this.updateInput}
      value={this.state.email} />
            </Form.Group>



        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      </header>
    </div>
  ); }
}

export default CreateTeam;
