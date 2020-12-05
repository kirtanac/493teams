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
     errorMessage:""
   };

   this.handleOnDrop = this.handleOnDrop.bind(this);
   this.handleOnError = this.handleOnError.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
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
     this.setState({ userData: data });
   }

   handleOnError(error){
     console.log("error: ", error);
   }
   handleSubmit(event) {
     event.preventDefault();

     //upload all students to the user table

   }

 render() {
   return (
     <React.Fragment>
     {this.state.displayErrorMessage &&
       <Row className="w-100 align-items-center m-2">
       <Col className="col-md-8 offset-md-2 w-100">
       <Alert style={{"font-size": 14}} variant="danger" className="w-100 small" onClose={() => this.setState({displayErrorMessage: false, errorMessage: ""})} dismissible>
       {this.state.errorMessage}</Alert>
       </Col>
       </Row>
     }
     <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Upload a CSV of users here with "email" and "isAdmin".</span>
        </CSVReader>
        <Button variant="success" onClick={this.handleSubmit}>Upload</Button>
        </React.Fragment>
   )
 }
}


export default UploadUsers;
