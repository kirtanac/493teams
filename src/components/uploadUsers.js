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
import {  Link,  CardGroup, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";
import { CSVReader } from 'react-papaparse';

class UploadUsers extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     userData:[],
     displayErrorMessage:false,
     errorMessage:"",
     finishedUpload:false,
     showButton: false
   };

   this.handleOnDrop = this.handleOnDrop.bind(this);
   this.handleOnError = this.handleOnError.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleOnRemoveFile = this.handleOnRemoveFile.bind(this);
  }


   handleOnDrop(data){
     console.log("dropped: ", data);
     if (!data || data.length < 2) {
        this.setState({
           displayErrorMessage: true,
           errorMessage: "The file you uploaded is empty"
         });
         return;
     }
     let headers = data[0].data;
     console.log(headers);
     if (headers.length !== 2 || headers[0] !== "uniqname" || headers[1] !== "isAdmin") {
        this.setState({
           displayErrorMessage: true,
           errorMessage: "The file you uploaded does not contain the proper headers"
         });
        return;
     }
     this.setState({ userData: data.slice(1), showButton: true });
   }

   handleOnRemoveFile(data) {
      this.setState({
        showButton: false,
        displayErrorMessage: false,
         errorMessage: ""
      });
    }


   handleOnError(error){
     console.log("error: ", error);
   }
   async handleSubmit(event) {
     const db = firebase.firestore();
     db.settings({
       timestampsInSnapshots: true
     });
     event.preventDefault();
     console.log(this.state.userData)
     if (this.state.userData) {
       //array of dictionaries
       //need to use .data to access the data array
       this.state.userData.forEach(user => {
         if (user.data.[0] !== "") {
           dbFunctions.getUserInfo(user.data[0]).then(thisUser => {
             if (thisUser !== "error") {
               let errorStr = "Some users are already in the database. Skipping..."
               this.setState({
                  displayErrorMessage: true,
                  errorMessage: errorStr
                });
             }
             else {
               let data1 = {
                 uniqname: user.data[0],
                 invitations: [],
                 isAdmin:Boolean(user.data[1]),
                 numInvitations: 0,
                 onTeam:false,
                 teamName:""
               }
               db.collection("users").doc(user.data[0]).set(data1);
             }
           });
         }
         });
         //end forEach
         this.setState({ finishedUpload: true});
    }
     else {
       this.setState({
          displayErrorMessage: true,
          errorMessage: "The file you uploaded is empty"
        });
        return;
     }
     //upload all students to the user table

   }

 render() {
   let displayButton = this.state.showButton;
   return (
     <React.Fragment as="div" className="mb-2 mh-90">
     {this.state.displayErrorMessage &&
       <Row className="w-100 align-items-center m-2">
       <Col className="col-md-8 offset-md-2 w-100">
       <Alert style={{"font-size": 14}} variant="danger" className="w-100 small" onClose={() => this.setState({displayErrorMessage: false, errorMessage: ""})} dismissible>
       {this.state.errorMessage}</Alert>
       </Col>
       </Row>
     }
     {this.state.finishedUpload &&
       <Row className="w-100 align-items-center m-2">
       <Col className="col-md-8 offset-md-2 w-100">
       <Alert style={{"font-size": 14}} variant="success" className="w-100 small" dismissible>
       Roster successfully uploaded! You may exit out now</Alert>
       </Col>
       </Row>
     }
     <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
          className="h-80"
        >
          <span>Upload a CSV of users</span>
        </CSVReader>
        {displayButton && <Button className="w-100 mb-2" variant="success" onClick={this.handleSubmit}>Upload</Button>}

        </React.Fragment>
   )
 }
}


export default UploadUsers;
