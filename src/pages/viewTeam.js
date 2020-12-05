import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import { Row, Col,CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl, Table } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route, NavLink, Redirect
} from "react-router-dom";
import CustomNavbar from "../components/customNavbar.js";

//VIEW THE CURRENT TEAM YOU ARE ON
//currently hardcoded for my uniqname (clantonm)

class ViewTeam extends React.Component {
  constructor(props) {
   super(props);
   console.log("props", props);

   this.state = {
     teams:[],
     userdata: props.location,
     uniqname: sessionStorage.getItem('uniqname'),
     usertype: sessionStorage.getItem('user-type'),
     teamName: '',
     onTeam: sessionStorage.getItem('user-type') === 'team',
     dataLoaded:false,
     edited:false
   }
   this.editDesc = this.editDesc.bind(this);

 }

 async componentDidMount() {

    await dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{

    this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
    sessionStorage.setItem('user-type', data.usertype);
    console.log("user data updated: ", data);
    });

    if(sessionStorage.getItem('user-type') === 'team' ) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      console.log("state", this.state.uniqname)
      await dbFunctions.getTeamFromUser(this.state.uniqname).then((data) =>{
      this.setState({ teams: data,
      dataLoaded:true});
      console.log("team data loaded: ", data);
      });

      //let data = await dbFunctions.getTeamFromUser(this.state.uniqname);
    }
}

editDesc(event) {
  event.preventDefault();
  var newVal = prompt("What do you want to change your project description to?")
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  db.collection("teams").doc(this.state.teams.teamName).update({
    description:newVal

  });
  let tempHolder = this.state.teams;
  tempHolder.description = newVal
  this.setState({ teams: tempHolder});
}

 render(){
   if(!this.state.uniqname){
     return(
       <Redirect to="/" />
     );
   }

   if(!this.state.onTeam){

     return(
       <Redirect to="/create-team" />
     );
   }

   console.log(this.state.usertype);
  const isLoaded = (this.state.dataLoaded === true && this.state.onTeam);
  console.log("loaded: ", isLoaded);
  return (
    <div className="viewteam">
<CustomNavbar/>

      <header className="loggedInHeader">

      <div className="body">
      <h1 className="title mb-3">Your Current Team:  {this.state.dataLoaded  &&   <i className="text-secondary"> {this.state.teams.teamName}</i>}</h1>

        <div className=" w-100">
        <p>
        {this.state.dataLoaded  ?

          <div className="container w-100">

          <Row id="team_info" className="row w-100">

            <Col id="info_table" md={6} xs={12} className="col-6 w-100 ml-0 pl-0">
              <Table striped bordered className="w-100 ml-0 text-left">
              <thead>

              <tr>
                <th className="text-left">Uniqname</th>
                <th className="text-left">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr>
               <td>{this.state.teams.uniqname1}</td>
               <td>{this.state.teams.uniqname1Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              <tr>
               <td>{this.state.teams.uniqname2}</td>
               <td>{this.state.teams.uniqname2Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              <tr>
                <td>{this.state.teams.uniqname3}</td>
                <td>{this.state.teams.uniqname3Accepted ? 'accepted' : 'pending'}</td>
              </tr>
              {this.state.teams.uniqname4 === "" ? <br/> :
              <React.Fragment>
                <tr>
                <td>{this.state.teams.uniqname4}</td>
                <td>{this.state.teams.uniqname4Accepted ? 'accepted' : 'pending'}</td>
                </tr>
              </React.Fragment>
              }
              </tbody>
              </Table>
            </Col>

              <Col md={6}  xs={12} className="col-x4 offset-xs-8 w-100 ml-0 pl-0">
            <Table bordered striped>
            <thead>
            <tr>
            <th colSpan="4" className="text-left">Description </th>
            </tr>
            </thead>
            <tbody>
            <tr>
             <td colSpan="2" className="pb-1 text-left">{this.state.teams.description} <Button id="editDescription" variant="outline-success" className="float-right " size="sm" onClick={this.editDesc}>Edit</Button></td>

            </tr>
            </tbody>
            </Table>

            <Table bordered striped>
            <thead>
            <tr>
              <th className="text-left" colSpan="4">Rejected Invitations</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan="4" className="text-left">{this.state.teams.rejectedInvites.length !== 0 ? this.state.teams.rejectedInvites.join(', ') : <i className="text-secondary">No rejected invitations</i>}</td>
            </tr>
            </tbody>
            </Table>
            </Col>

          </Row>
          </div>
         :
       <i>Loading...</i>}
</p>


        <br/>
  </div>
        </div>
      </header>

    </div>
  ); }
}

export default ViewTeam;
