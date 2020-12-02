import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl, Modal } from 'react-bootstrap';
import { Redirect, NavLink} from 'react-router-dom'

//PAGE FOR CREATING A TEAM

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
     show2:false,
     uniqname: localStorage.getItem('uniqname'),
     usertype: localStorage.getItem('user-type'),
     onTeam: false,
   };

   this.updateInput = this.updateInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.addTeam = this.addTeam.bind(this);
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
   let onTeam1 = false;
   let teamName1 = ""
   switch(number) {
     case 1:
      numHolder = this.state.uniq1;
      onTeam1 = true;
      teamName1 = tempName;
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
        onTeam:onTeam1,
        teamName:teamName1
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
 addTeam(event){
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
      uniqname1:this.state.uniq[0],
      uniqname2:this.state.uniq[1],
      uniqname3:this.state.uniq[2],
      uniqname4:"",
      uniqname1Accepted:false,
      uniqname2Accepted:false,
      uniqname3Accepted:false,
    });
        //TODO: check to see if uniqnames already have teams, are valid uniqnames, are in class
    this.sendData(1, tempName);
    this.sendData(2, tempName);
    this.sendData(3, tempName);

  }
  //team of 4 information
  else {
    db.collection("teams").doc(tempName).set({
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
    //TODO: check to see if uniqnames already have teams, are valid uniqnames, are in class
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
  if (this.state.redi === true || this.state.usertype === 'team') {
    return <Redirect to='/view-team' />
  }
  if (this.state.usertype === 'admin') {
    return <Redirect to='/admin-home' />
  }
  if(!localStorage.getItem('uniqname')){
    return <Redirect to='/' />
  }
  console.log(this.state);
  return (
    <div className="createteam">
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/create-team">
      <img
        src="/EECS493_landscape.png"
        height="30"
        className="d-inline-block align-top"
        alt="EECS 493 Teams logo"
      />
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/create-team">Create Team</Nav.Link>
    <Nav.Link href="/team-invites">Team Invitations</Nav.Link>
      <Nav.Link href="/see-teams">Registered Teams</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
    </Nav>

  </Navbar.Collapse>
</Navbar>
      <header className="loggedInHeader">
      <div className="body">
        <h1 className="title">
        Register your team

        </h1>
<div className="body-content">
        <Form className="text-left" onSubmit={this.handleShow}>

        <Form.Group controlId="fullname">
        <Form.Label>Team name</Form.Label>
    <Form.Control required
    type="text"
      name="teamName"
      placeholder=""
      onChange={this.updateInput}
      value={this.state.teamName} />
          </Form.Group>


          <Form.Group controlId="uniq1">
          <Form.Label>Uniqname 1</Form.Label>
      <Form.Control required
      type="text"
      name="uniq1"
      placeholder={this.state.uniqname}
      defaultValue={this.state.uniqname}
       />
            </Form.Group>

        <Form.Group controlId="uniq1">
        <Form.Label>Uniqname2</Form.Label>
    <Form.Control required
    type="text"
    name="uniq2"
    placeholder=""
    onChange={this.updateInput}
    value={this.state.uniq2}/>
          </Form.Group>

        <Form.Group controlId="uniq1">
        <Form.Label>Uniqname3</Form.Label>
    <Form.Control required
    type="text"
      name="uniq3"
      placeholder=""
      onChange={this.updateInput}
      value={this.state.uniq3} />
          </Form.Group>

          <Form.Group controlId="uniq1" >
          <Form.Label >Uniqname4</Form.Label>
          <Form.Control
          type="text"
          name="uniq4"
          placeholder=""
          onChange={this.updateInput}
          value={this.state.uniq4} />
            </Form.Group>

        <br/>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>


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
          <Button variant="success" onClick={this.addTeam}>
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
      </div>
      </div>
      </header>
    </div>
  ); }
}

export default CreateTeam;
