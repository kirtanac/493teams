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
import {  Link,  CardGroup, Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';


class ResetDatabase extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     show1:false,
     word:""

   };
   this.handleDelete = this.handleDelete.bind(this);
   this.handleShow = this.handleShow.bind(this);
   this.handleInput = this.handleInput.bind(this);
   this.handleHide = this.handleHide.bind(this);

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
    this.setState({ show1:false });
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
      await db.collection("users").where("isAdmin","==", true).get().then(documents => {
        documents.forEach(document => {
          document.ref.update({
            onTeam:false,
            teamName:"",
            numInvitations:0,
            invitations:[]
          }).then(() => {
            console.log("successfully cleared admin's info");
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
     <Modal show={this.state.show1} onHide={this.handleHide}>
       <Modal.Header closeButton>
         <Modal.Title>Are you sure you want to reset the database?</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <b>NOTE: This will only clear the students and all teams from the database, admins must be deleted manually in the Cloud Firestore interface</b>
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



<Button variant="danger"onClick={this.handleShow}>
Reset Database
</Button>
</React.Fragment>


   )
 }
}

export default ResetDatabase;
