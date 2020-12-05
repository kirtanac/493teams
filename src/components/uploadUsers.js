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
import {  Link,  CardGroup, Card } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";
import { CSVReader } from 'react-papaparse';

class UploadUsers extends React.Component {
  constructor(props) {
   super(props);

   this.state = {

   };

   this.handleOnDrop = this.handleOnDrop.bind(this);
   this.handleOnError = this.handleOnError.bind(this);

  }


   handleOnDrop(data){
     console.log("dropped: ", data);
     // TODO: CHECK TO SEE IF THE DATA HAS THE RIGHT COLUMNS ("email", "isAdmin")
     // if yes, then upload and return a success snackbar
     // if no, then return an error snack bar
   }

   handleOnError(error){
     console.log("error: ", error);
   }


 render() {
   return (

     <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Upload a CSV of users here with "email" and "isAdmin".</span>
        </CSVReader>

   )
 }
}


export default UploadUsers;
