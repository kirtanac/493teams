import logo from '../logo.svg';
import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import CreateTeam from "./createTeam";
import AdminSearch from "./adminSearch";
import Download from "../components/download";
import AdminSettings from "../components/adminSettings";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import {  Alert, Tooltip, OverlayTrigger, Figure, Link,  Button, Navbar, Nav, Image, Form, FormControl, Row, Col, ButtonGroup, Dropdown, Card, Modal } from 'react-bootstrap';
import { CsvDownload } from "react-json-to-csv"
import { CSVLink } from "react-csv";
import CustomNavbar from "../components/customNavbar.js";
import ResetDatabase from "../components/resetDatabase.js";


class AdminHome extends React.Component {
  constructor(props) {
   super(props);
   this.state = {

     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     onTeam: false,
     searched:false,
     searchVal:"",
     searchType:"",
     foundTeam: false,
     teamName:"",
     teams: [],
     teamsLoaded: false,
     teamsLength: 0,
     users: [],
     usersLoaded: false,
     usersLength: 0,
     numStudents: 0,
     unassigned: [],
     unassignedLoaded: false,
     unassignedLength: 0,
     admins: [],
     adminsLoaded: false,
     adminsLength: 0,
     displayErrorMessage: false,
     errorMessage: "",
     showModal: false
   };
   this.handleSearch = this.handleSearch.bind(this);
   this.updateInput = this.updateInput.bind(this);
   this.handleModal = this.handleModal.bind(this);


 }

 async componentDidMount() {
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{
      this.setState({ usertype: data.usertype });
      sessionStorage.setItem('user-type', data.usertype);
      console.log("user data updated: ", data);
      });

   let teams_in = [];
   await db.collection("teams").get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      teams_in.push(doc.data());
    });
     this.setState({ teams: teams_in, teamsLoaded: true, teamsLength: teams_in.length });
     console.log("teams loaded: ", teams_in, "size: ", teams_in.length );
   })

   let users_in = [];
   await db.collection("users").get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      users_in.push(doc.data());
    });
     this.setState({ users: users_in, usersLoaded: true, usersLength: users_in.length });
     console.log("users_in loaded: ", users_in);
   })

   let students_in = []
   await db.collection("users").where("isAdmin", "==", false).get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      students_in.push(doc.data());
    });
     this.setState({ numStudents: students_in.length });
   })

   let unassigned_in = [];
   await db.collection("users").where("onTeam", "==", false).where("isAdmin", "==", false).get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      unassigned_in.push(doc.data());
    });
     this.setState({ unassigned: unassigned_in, unassignedLoaded: true,  unassignedLength: unassigned_in.length });
     console.log("unassigned loaded: ", unassigned_in);
   })

   let admins_in = [];
   await db.collection("users").where("isAdmin", "==", true).get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
      admins_in.push(doc.data());
    });
     this.setState({ admins: admins_in, adminsLoaded: true,  adminsLength: admins_in.length });
     console.log("admins_in loaded: ", admins_in);
   })

 }

 handleModal(event){
   let temp = !this.state.showModal;
   this.setState({
     showModal: temp
   });
   console.log("modal: ", this.state.showModal);
 }


 updateInput(event){

   this.setState({
     [event.target.name]: event.target.value
   });

   if(event.target.name === "searchVal" || event.target.name === "searchType" ){
     this.setState({displayErrorMessage: false, errorMessage: "" });
   }
   console.log("value", event.target.value)
   console.log("name", event.target.name)

 }

 handleSearch(event) {
   event.preventDefault();
   if (this.state.searched === true) {
     this.setState({ searched: false});
   }
   console.log(this.state)
   const db = firebase.firestore();
   db.settings({
     timestampsInSnapshots: true
   });
   console.log(this.state.searchType)
   if (this.state.searchType === "Teamname") {
     db.collection("teams").doc(this.state.searchVal)
       .get()
       .then(querySnapshot => {
         console.log(querySnapshot.data())
         if(!querySnapshot.data()) {  this.setState({
             displayErrorMessage: true,
             errorMessage: "This is not a current team name"
           });
         }
         else{
           let tempName = this.state.searchVal.split(' ').join('');
           this.setState({searched:true, foundTeam:true, teamName: tempName});
         }
       }).catch(err => {
         console.log(err);
       });



   }
  else if (this.state.searchType === "Uniqname") {
    console.log("users: ", this.state.users)
    db.collection("users").doc(this.state.searchVal)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.data())
        if(!querySnapshot.data()) {  this.setState({
            displayErrorMessage: true,
            errorMessage: "This user is not on the roster"
          });
        }
      else  if(querySnapshot.data().onTeam === false) {
          this.setState({searched:true, foundTeam: false});
          this.setState({
            displayErrorMessage: true,
            errorMessage: "This user is not yet on a team"
          });
        }

        else if(querySnapshot.data().onTeam === true){
          this.setState({teamName: querySnapshot.data().teamName, displayErrorMessage: false, errorMessage: "" });
          this.setState({searched:true, foundTeam: true,});
        }
      }).catch(err => {
        console.log(err);
      });

  } else {
    this.setState({
      displayErrorMessage: true,
      errorMessage: "Must select a Uniqname or Teamname"
    });
  }

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


 render(){
   let teamVal;
   if(!sessionStorage.getItem('uniqname')){
     console.log("redirecting to logout from admin home")
     return <Redirect to='/' />
   }

   if (this.state.usertype === 'team') {
     console.log("redirecting from admin home to view team");
     return <Redirect to='/view-team' />
   }
   if (this.state.usertype === 'unassigned') {
     console.log("redirecting from admin home to create team");
     return <Redirect to='/create-team' />
   }

   const teamsDownload = JSON.stringify(this.state.teams);
  return (
    <div className="Home">
      <CustomNavbar/>
      <header className="App-header">
        <div className="body">
        <h1 className="title mb-3">Admin Dashboard</h1>

        {(this.state.usersLoaded &&this.state.unassignedLoaded && this.state.teamsLoaded && this.state.adminsLoaded) &&

        <Card as="div" className=" justify-content-between align-items-between shadow-sm w-100 mb-4">
        <Card.Body className="text-left">
        <Row md={12} className="align-items-md-center">
        <Col xl={9.5} lg={9}>
        <Card.Title>Summary</Card.Title>
          <a  className="text-secondary" href="/admin-view"><Card.Subtitle className="mb-1">{this.state.teamsLength} total teams registered</Card.Subtitle></a>
        <Card.Subtitle className="mb-1">{this.state.unassignedLength} unassigned students out of {this.state.numStudents} total students</Card.Subtitle>
        <Card.Subtitle>{this.state.adminsLength} administrators out of {this.state.usersLength} total users</Card.Subtitle>
</Col>


        <Col  xl={2.5} lg={3} className="mr-0 ">
        <ButtonGroup vertical>
        <OverlayTrigger
             key="right"
             placement="right"
             className="mb-1 float-right"
             overlay={
               <Tooltip className="text-left" id="tooltip-top">
                 Upload rosters, reset the database, and learn how to use 493 teams.
               </Tooltip>
             }
           >
        <Button className="mb-2" onClick={this.handleModal} alt="information instructions" variant="success">Admin Settings</Button>
        </OverlayTrigger>

        <Download className="pr-0 mt-2"/>


        </ButtonGroup>
        </Col>


        </Row>
          </Card.Body>
        </Card>

        }

        {this.state.displayErrorMessage &&
          <Row className="w-100 align-items-center m-2">
          <Col className="col-md-8 offset-md-2 w-100">
          <Alert style={{"font-size": 14}} variant="danger" className="w-100 small" onClose={() => this.setState({displayErrorMessage: false, errorMessage: ""})} dismissible>
    {this.state.errorMessage}</Alert>
    </Col>
    </Row>}
          <Form inline className="search-bar w-100" onSubmit={this.handleSearch}>

              <Form.Control as="select"
              value={this.state.searchType}
              name="searchType"
              onChange={this.updateInput} custom>
                <option value="default">Search by...</option>
                <option value="Teamname">Teamname</option>
                <option value="Uniqname">Uniqname</option>
              </Form.Control>
              <Form.Control required type="text"
              name="searchVal"
              value={this.state.searchVal}
              onChange={this.updateInput}
              placeholder="Search by teamname or uniqname of team member"
              className="mr-sm-2 w-75" />
            <Button variant="success" type="submit">Search</Button>
          </Form>

          <br />

          {this.state.searched ? <div className="adminsearch-holder m-1"> <AdminSearch team={this.state.teamName} onTeam={this.state.foundTeam} /> </div>:

    <br />
        }

        <Modal size="lg" centered show={this.state.showModal} onHide={this.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Settings</Modal.Title>
        </Modal.Header>
        <AdminSettings/>
                <Modal.Footer as="div" className="w-100 d-flex justify-content-sm-between">
                  <ResetDatabase/>
                  <Button className="ml-2" variant="secondary" onClick={this.handleModal}>
                    Okay
                  </Button>

                </Modal.Footer>
              </Modal>


        </div>
      </header>

    </div>
  ); }
}

export default AdminHome;
