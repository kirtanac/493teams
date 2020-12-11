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

 render() {
   return (

     <React.Fragment>
     <Modal.Body as="div" className="mb-2">


     <CardGroup className="justify-content-md-center mb-3">
 <Card bg="info" className="cardclass" >
   <Card.Body className="text-light">
     <Card.Title>Step 1</Card.Title>
     <Card.Text>
       Create a roster of users by uploading a CSV. The columns should be "uniqname" (string UMich uniqnames) and "isAdmin" (boolean). Mark isAdmin as false for all students, and as true for all staff<br/><br/>Add users later via the firebase console.</Card.Text>
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
</CardGroup>
<Row className="h-90">
<Col className="w-50">
<UploadUsers/>
</Col>
<br/>
</Row>

</Modal.Body>
<Modal.Footer className="mt-6">
 <i>The EECS 493 Teams recommends considering the addition of other useful features to this MVP, such as the ability to denote specific Zoom links, sign up for virtual presentation slots, and more.</i>
</Modal.Footer>
</React.Fragment>

   )
 }
}

export default AdminSettings;
