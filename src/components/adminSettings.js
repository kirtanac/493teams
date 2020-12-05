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
import {  Link,  CardGroup, Card, Modal, Button } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";
import UploadUsers from "./uploadUsers";

class AdminSettings extends React.Component {
  constructor(props) {
   super(props);

   this.state = {

   };

  }

 render() {
   return (


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
<Button variant="danger">
  Reset Database
</Button>
</Modal.Body>

   )
 }
}

export default AdminSettings;
