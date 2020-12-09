import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Link,  CardGroup, Card, Modal, Button, Form } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";
import UploadUsers from "./uploadUsers";

class AdminSettings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     show1:false,
     word:""

   };
   this.handleDelete = this.handleDelete.bind(this);
   this.handleShow = this.handleShow.bind(this);
   this.handleInput = this.handleInput.bind(this);

  }
  handleInput(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleShow() {
    this.setState({ show1:true });
  }
  handleHide() {

  }
  async handleDelete() {
    if (this.state.word === "reset") {
      //get all documents from the database then delete each one.
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      await db.collection("teams").get().then(documents => {
        documents.forEach(document => {
          document.ref.delete().then(() => {
            console.log("successfully deleted team");
          })
        })

      })
      await db.collection("users").where("isAdmin","==", false).get().then(documents => {
        documents.forEach(document => {
          document.ref.delete().then(() => {
            console.log("successfully deleted user");
          })
        })
      })
      console.log("finished deleting");
      alert("Database successfully reset");
      this.setState({ show1:false });
    }
    else {
      alert("Word entered incorrectly. Database not reset");
      this.setState({ show1:false });
    }
  }
 render() {
   return (

     <React.Fragment>
     <Modal show={this.state.show1}>
       <Modal.Header closeButton>
         <Modal.Title>Are you sure you want to reset the database?</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <b>NOTE: This will only clear the students and all teams from the database</b>
         <Form className="text-left">
           <Form.Group controlId="fullname">
           <Form.Label>Enter the word "reset" to clear the database</Form.Label>
           <Form.Control required
           type="text"
             name="word"
             placeholder=""
             onChange={this.handleInput}
             value={this.state.word} />
           </Form.Group>
         </Form>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="danger" onClick={this.handleDelete}>
           Reset Database
         </Button>
       </Modal.Footer>
     </Modal>
     <Modal.Body>


     <CardGroup className="justify-content-md-center mb-2">
 <Card bg="info" className="cardclass" >
   <Card.Body className="text-light">
     <Card.Header>Step 1</Card.Header>
     <Card.Text>
       Create a roster of users by uploading a CSV with columns "email" and "isAdmin". <br/><br/>Mark "isAdmin" as "FALSE" for students and "TRUE" for staff. Only use UMich email addresses to enable students to log in.<br/><br/>Add users later via the firebase console.</Card.Text>
   </Card.Body>
 </Card>

 <Card bg="primary"  className="cardclass">

   <Card.Body className="text-light">
     <Card.Title>Step 2</Card.Title>
     <Card.Text>
        Create a spreadsheet available to unassigned/no-team students for them to list their interests in projects, potential team members, and contact information. Instruct students to log into EECS 493 Teams to register once they have found their team.
     </Card.Text>
   </Card.Body>

 </Card>
 <Card bg="success" className="cardclass">

   <Card.Body className="text-light">
     <Card.Title>Step 3</Card.Title>
     <Card.Text>
      Use EECS 493 Teams to easily see specific teams, download full updated team rosters, limit last-minute student team changes without staff approval, and generate unassigned student lists.
     </Card.Text>
   </Card.Body>

 </Card>
 <i>The EECS 493 Teams recommends considering the addition of other useful features to this MVP, such as the ability to denote specific Zoom links, sign up for virtual presentation slots, and more.</i>
</CardGroup>
<UploadUsers/>
<Button variant="danger" onClick={this.handleShow}>
  Reset Database
</Button>
</Modal.Body>
</React.Fragment>
   )
 }
}

export default AdminSettings;
