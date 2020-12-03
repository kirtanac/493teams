import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import CreateTeam from "./createTeam";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  Button, Navbar, Nav, Table, Form, Modal } from 'react-bootstrap';

class AdminEdit extends React.Component {
  constructor(props) {
   super(props);

   this.state = {

     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     onTeam: false,
     team: sessionStorage.getItem('teamSearch'),
     assigned: sessionStorage.getItem('userOnTeam'),
     teams: [],
     dataLoaded:false,
     show1:false,
     show2:false,
     teamName:"",
     uniq1:"",
     uniq2:"",
     uniq3:"",
     uniq4:"",
     doneEditing:false
   };
   this.handleShow = this.handleShow.bind(this);
   this.handleHide = this.handleHide.bind(this);
   this.handleShow2 = this.handleShow2.bind(this);
   this.handleHide2 = this.handleHide2.bind(this);
   this.pushData = this.pushData.bind(this);
   this.deleteTeam = this.deleteTeam.bind(this);
   this.updateInput = this.updateInput.bind(this);
   //this.isValidForm = this.isValidForm.bind(this);

 }


componentDidMount() {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  console.log(this.state)

    console.log("MADE IT HERE")
    db.collection("teams").doc(this.state.team)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data())
        let data = []
        data.push(querySnapshot.data());
        this.setState({ teams: data});
        this.setState({ uniq1: data[0].uniqname1, uniq2: data[0].uniqname2, uniq3: data[0].uniqname3, uniq4: data[0].uniqname4});
        this.setState({ dataLoaded:true });
      });


}

updateInput(event){
  this.setState({
    [event.target.name]: event.target.value
  });}
handleShow(event) {
  event.preventDefault();
  //if (this.isValidForm === false) {
  ////  alert("[specify uniqname] is already on a team");
    //return;
  //}
  console.log("made it here");
  this.setState({ show1: true});
}
handleHide() {
  this.setState({ show1: false});
}
handleShow2(event) {
  event.preventDefault();
  console.log("made it here");
  this.setState({ show2: true});
}
handleHide2() {
  this.setState({ show2: false});
}

// isValidForm() {
//   //check to make sure new users are not on a team already
//   const db = firebase.firestore();
//   db.settings({
//     timestampsInSnapshots: true
//   });
//   if (this.state.uniq1 !== sessionStorage.getItem('uniq1')) {
//     db.collection("users").doc(this.state.uniq1)
//       .get()
//       .then(querySnapshot => {
//         if (querySnapshot.data().onTeam === true) {
//           return false;
//         }
//       });
//   }
//   if (this.state.uniq2 !== sessionStorage.getItem('uniq2')) {
//     db.collection("users").doc(this.state.uniq2)
//       .get()
//       .then(querySnapshot => {
//         if (querySnapshot.data().onTeam === true) {
//           return false;
//         }
//       })
//   }
//   if (this.state.uniq3 !== sessionStorage.getItem('uniq3')) {
//     db.collection("users").doc(this.state.uniq3)
//       .get()
//       .then(querySnapshot => {
//         if (querySnapshot.data().onTeam === true) {
//           return false;
//         }
//       })
//   }
//   if (this.state.uniq4 !== sessionStorage.getItem('uniq4')) {
//     db.collection("users").doc(this.state.uniq4)
//       .get()
//       .then(querySnapshot => {
//         if (querySnapshot.data().onTeam === true) {
//           return false;
//         }
//       })
//   }
//   return true;
// }

pushData(event) {
  event.preventDefault();
  //ok update team info in the team doc, if new uniqname added/changed then need to remove team
  //from user, then send new invite to new teammember (if they changed the name, if they switched it to blank then just leave it blank)
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  // if (this.state.teamName !== sessionStorage.getItem('teamSearch')) {
  //
  // }
  // if (this.state.uniq1 !== sessionStorage.getItem('uniq1')) {
  //
  // }
  // if (this.state.uniq2 !== sessionStorage.getItem('uniq2')) {
  //
  // }
  // if (this.state.uniq3 !== sessionStorage.getItem('uniq3')) {
  //
  // }
  // if (this.state.uniq4 !== sessionStorage.getItem('uniq4')) {
  //
  // }
  this.setState({ doneEditing: true});
}
deleteTeam(event) {
  event.preventDefault();
  //we already have all the uniqnames in local storage, so we need to go mark them all as not being on a team and reset invitations
  //if user is not on this team but is on a team then do nothing
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });

  this.setState({ doneEditing: true});
}

 render(){

   if (this.state.doneEditing === true) {
     sessionStorage.removeItem("uniq1");
     sessionStorage.removeItem("uniq2");
     sessionStorage.removeItem("uniq3");
     sessionStorage.removeItem("uniq4");
     sessionStorage.removeItem('teamSearch');
     sessionStorage.removeItem('userOnTeam');
     console.log("redirecting to adminhome");
     return <Redirect to='/admin-home' />

   }
   if(!sessionStorage.getItem('uniqname')){
     console.log("redirecting from edit admin to uniqname");
     return <Redirect to='/' />
   }
   if (this.state.dataLoaded === false) {
     return <h1> Loading ... </h1>
   }

  return (
    <div className="Home">
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/admin-home">
        <img
          src="./EECS493-admin.png"
          height="30"
          className="d-inline-block align-top"
          alt="EECS 493 Teams logo"
        />
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="/admin-home">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link  className="mr-sm-2" href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header className="App-header">
        <div className="body">
          <h1 className="title">Edit Team</h1>
          <div className="body-content">
          <br />

          <Form onSubmit={this.handleShow}>
            <Button variant="danger" onClick={this.handleShow2}>Delete Team</Button>
            <br />
            <Form.Group controlId="fullname">
              <Form.Label>Team name</Form.Label>
              <Form.Control
                type="text"
                name="teamName"
                placeholder={sessionStorage.getItem('teamSearch')}
                onChange={this.updateInput}
                value={this.state.teamName} />
            </Form.Group>
            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname1</Form.Label>
              <Form.Control
                type="text"
                name="uniq1"
                placeholder={sessionStorage.getItem('uniq1')}
                onChange={this.updateInput}
                value={this.state.uniq1} />
            </Form.Group>
            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname2</Form.Label>
              <Form.Control
                type="text"
                name="uniq2"
                placeholder={sessionStorage.getItem('uniq2')}
                onChange={this.updateInput}
                value={this.state.uniq2}/>
            </Form.Group>
            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname3</Form.Label>
              <Form.Control
                type="text"
                name="uniq3"
                placeholder={sessionStorage.getItem('uniq3')}
                onChange={this.updateInput}
                value={this.state.uniq3} />
            </Form.Group>
            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname4</Form.Label>
              <Form.Control
                type="text"
                name="uniq4"
                placeholder={sessionStorage.getItem('uniq4')}
                onChange={this.updateInput}
                value={this.state.uniq4} />
            </Form.Group>

            <Button variant="success" type="submit">Save Changes</Button>
          </Form>
        </div>
            </div>
      </header>
      <Modal show={this.state.show1} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to make these changes?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2>{this.state.teams[0].teamName}</h2>
        {this.state.uniq1},{' '}
        {this.state.uniq1},{' '}
        {this.state.uniq3},{' '}
        {this.state.uniq4}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.pushData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={this.state.show2} onHide={this.handleHide2}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this team?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2>{this.state.teams[0].teamName}</h2>
        {this.state.uniq1},{' '}
        {this.state.uniq1},{' '}
        {this.state.uniq3},{' '}
        {this.state.uniq4}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleHide2}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.deleteTeam}>
            Delete Team
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  ); }
}

export default AdminEdit;
