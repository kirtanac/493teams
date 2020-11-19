import '../App.css';
import firebase from "../firebase";
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl, Modal } from 'react-bootstrap';
import { Redirect, NavLink} from 'react-router-dom'

//PAGE FOR CREATING A TEAM
let counter = 1;

class CreateTeam extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     teamName:"",
     redi:false,
     uniq1:"",
     uniq2:"",
     uniq3:"",
     uniq4:"",
     show:false,
     show2:false
   };

   this.updateInput = this.updateInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.addUser = this.addUser.bind(this);
   this.sendData = this.sendData.bind(this);
   this.handleShow = this.handleShow.bind(this);
   this.handleHide = this.handleHide.bind(this);
   this.handleSecondHide = this.handleSecondHide.bind(this);

 }

 //function to simplify sending the data so we don't have code repitition
 sendData(number, tempName, totNum) {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   let numHolder;
   switch(number) {
     case 1:
      numHolder = this.state.uniq1;
     break;
     case 2:
      numHolder = this.state.uniq2;
     break;
     case 3:
      numHolder = this.state.uniq3;
     break;
     case 4:
      numHolder = this.state.uniq4;
     break;
  }
  const valRef = db.collection("users").doc(numHolder);
  const docFound = valRef.get().then(docFound => {
    if (!docFound.exists) {
      let data = {
        uniqname: numHolder,
        invitations: [tempName],
        isAdmin:false,
        numInvitations: 1,
        onTeam:false,
        teamName:""
      }
      db.collection("users").doc(numHolder).set(data);
    }
    else {

      let tempArray = docFound.data().invitations;
      let newVal = docFound.data().numInvitations;

      tempArray.push(tempName);
      db.collection("users").doc(numHolder).update({
        invitations: tempArray,
        numInvitations: newVal + 1
      });
    }
  });
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

  //team of 3 information
  if (this.state.uniq4 === "") {
    db.collection("teams").doc(tempName).set({
      teamName:tempName,
      teamID:counter,
      uniqname1:this.state.uniq[0],
      uniqname2:this.state.uniq[1],
      uniqname3:this.state.uniq[2],
      uniqname1Accepted:false,
      uniqname2Accepted:false,
      uniqname3Accepted:false,
    });
    counter += 1;
    this.sendData(1, tempName);
    this.sendData(2, tempName);
    this.sendData(3, tempName);

  }
  //team of 4 information
  else {
    db.collection("teams").doc(tempName).set({
      teamName:tempName,
      teamID:counter,
      uniqname1:this.state.uniq1,
      uniqname2:this.state.uniq2,
      uniqname3:this.state.uniq3,
      uniqname4:this.state.uniq4,
      uniqname1Accepted:false,
      uniqname2Accepted:false,
      uniqname3Accepted:false,
      uniqname4Accepted:false,
    });
    counter += 1;
    this.sendData(1, tempName);
    this.sendData(2, tempName);
    this.sendData(3, tempName);
    this.sendData(4, tempName);
  }
  //setting the state
  this.setState({ show2: true});

}
handleShow(event) {
  event.preventDefault();
  console.log("made it here");
  this.setState({ show: true});
}
handleHide() {
  this.setState({ show: false});
}
handleSecondHide() {
  this.setState({
    redi:true,
    show2: false
  });
}
 render(){
  if (this.state.redi === true) {
    return <Redirect to='/view-team' />
  }
  console.log(this.state);
  return (
    <div className="createteam">
      <header className="loggedInHeader">
        <h1>
        Register your team

        </h1>


        <Form onSubmit={this.handleShow}>

        <Form.Group controlId="fullname">
        <Form.Label>Team name</Form.Label>
    <Form.Control required
    type="text"
      name="teamName"
      placeholder="Your TeamName"
      onChange={this.updateInput}
      value={this.state.teamName} />
          </Form.Group>


          <Form.Group controlId="uniq1">
          <Form.Label>Your Uniqname</Form.Label>
      <Form.Control required
      type="text"
      name="uniq1"
      placeholder="Your Uniqname"
      onChange={this.updateInput}
      value={this.state.uniq1} />
            </Form.Group>

        <Form.Group controlId="uniq1">
        <Form.Label>Uniqname2</Form.Label>
    <Form.Control required
    type="text"
    name="uniq2"
    placeholder="Uniqname 2"
    onChange={this.updateInput}
    value={this.state.uniq2}/>
          </Form.Group>

        <Form.Group controlId="uniq1">
        <Form.Label>Uniqname3</Form.Label>
    <Form.Control required
    type="text"
      name="uniq3"
      placeholder="Uniqname 3"
      onChange={this.updateInput}
      value={this.state.uniq3} />
          </Form.Group>

          <Form.Group controlId="uniq1">
          <Form.Label>Uniqname4</Form.Label>
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
      <NavLink to="/team-invites" activeClassName="hurray">
        Team Invites
      </NavLink>


      <Modal show={this.state.show} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to create this team?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{this.state.teamName}</h2>
          <p>{this.state.uniq1}</p>
          <p>{this.state.uniq2}</p>
          <p>{this.state.uniq3}</p>
          <p>{this.state.uniq4}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.addUser}>
            Create Team
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={this.state.show2} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Please ask these team members to log into 493teams and accept this team invitation:</h2>
          <p>{this.state.uniq1}</p>
          <p>{this.state.uniq2}</p>
          <p>{this.state.uniq3}</p>
          <p>{this.state.uniq4}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.handleSecondHide}>
            Create Team
          </Button>
        </Modal.Footer>
      </Modal>
      </header>
    </div>
  ); }
}

export default CreateTeam;
