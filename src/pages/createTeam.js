import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CustomNavbar from "../components/customNavbar.js";

//PAGE FOR CREATING A TEAM

const CreateTeam = () => {

  // initializing variable states
  const [teamName, setTeamName] = useState("");
  const [redi, setRedi] = useState(false);
  const uniq1 = sessionStorage.getItem('uniqname');
  const [uniq2, setUniq2] = useState("");
  const [uniq3, setUniq3] = useState("");
  const [uniq4, setUniq4] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const uniqname = sessionStorage.getItem('uniqname');
  const [usertype, setUserType] = useState(sessionStorage.getItem('user-type'));
  const [onTeam, setOnTeam] = useState(false);

  // runs once on load (dependent on uniqname), replacement for componentdidmount()
  useEffect(() => {
    const loadInfo = async() => {
      await dbFunctions.getUserInfo(uniqname).then((data) =>{
      setUserType(data.usertype);
      setOnTeam(data.usertype === 'team');
      sessionStorage.setItem('user-type', data.usertype);
      console.log("user data updated: ", data);
      });
    }
    loadInfo();
  }, [uniqname]);


  // function to simplify sending the data so we don't have code repetition
  // function not changed besides syntax
  const sendData = async(number, tempName) => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    let numHolder;
    let onTeam1 = false;
    let teamName1 = ""
    switch(number) {
      case 1:
      numHolder = uniq1;
      onTeam1 = true;
      teamName1 = tempName;
      db.collection("users").doc(numHolder).update({
        onTeam:onTeam1,
        teamName:teamName1
      });
      break;
      case 2:
      numHolder = uniq2;
      break;
      case 3:
      numHolder = uniq3;
      break;
      case 4:
      numHolder = uniq4;
      break;
    }
    dbFunctions.getUserInfo(numHolder).then((data) => {
      let tempArray = data.invitations;
      let newVal = data.numInvitations;

      tempArray.push(tempName);
      if (numHolder !== uniq1) {
        db.collection("users").doc(numHolder).update({
          invitations: tempArray,
          numInvitations: newVal + 1,
          onTeam:onTeam1
        });
      }
    })
  }

  // syntax changed and team name check added
  // adds a team to the database
  const addTeam = (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    let tempName = teamName.split(' ').join('');
    let uniq4Holder;
    if (uniq4 === "") {
      uniq4Holder = "";
    }
    else {
      uniq4Holder = uniq4;
    }

    // team name check, if already taken, pick another
    dbFunctions.getTeamInfo(teamName).then(teamInfo => {
      if(teamInfo) {
        alert("team name already taken, please pick a new one");
        return;
      }
      dbFunctions.getUserInfo(uniq1).then(userInfo => {
        if (userInfo.onTeam === true) {
          alert(uniq1+" is already on a team. Please enter a different uniqname");
          return;
        }
        else if (userInfo === "error") {
          alert(uniq1+" is not a registered uniqname in the class. Please enter a different uniqname");
          return;
        }
        else {
    
        }
        //uniqname2 checks
        dbFunctions.getUserInfo(uniq2).then(userInfo1 => {
          if (userInfo1.onTeam === true) {
            alert(uniq2+" is already on a team. Please enter a different uniqname");
            return;
          }
          else if (userInfo1 === "error") {
            alert(uniq2+" is not a registered uniqname in the class. Please enter a different uniqname");
            return;
          }
          //uniqname3 checks
          dbFunctions.getUserInfo(uniq3).then(userInfo2 => {
            if (userInfo2.onTeam === true) {
              alert(uniq3+" is already on a team. Please enter a different uniqname");
              return;
            }
            else if (userInfo2 === "error") {
              alert(uniq3+" is not a registered uniqname in the class. Please enter a different uniqname");
              return;
            }
            //uniqname4 checks
            if (uniq4 !== "") {
              dbFunctions.getUserInfo(uniq4).then(userInfo3 => {
                if (userInfo3.onTeam === true) {
                  alert(uniq4+" is already on a team. Please enter a different uniqname");
                  return;
                }
                else if (userInfo3 === "error") {
                  alert(uniq4+" is not a registered uniqname in the class. Please enter a different uniqname");
                  return;
                }
                

                sendData(1, tempName);
                sendData(2, tempName);
                sendData(3, tempName);
                sendData(4, tempName);
                db.collection("teams").doc(tempName).set({
                  teamName:tempName,
                  uniqname1:uniq1,
                  uniqname2:uniq2,
                  uniqname3:uniq3,
                  uniqname4:uniq4Holder,
                  uniqname1Accepted:true,
                  uniqname2Accepted:false,
                  uniqname3Accepted:false,
                  uniqname4Accepted:false,
                  description:description,
                  rejectedInvites:[]
                }).then(() => {
                  dbFunctions.getUserInfo(uniqname).then((data) =>{
                    setUserType(data.usertype);
                    setOnTeam(data.usertype === 'team');
                    sessionStorage.setItem('user-type', data.usertype);
                    console.log("user data updated: ", data);
                  });
                  setShow2(true);
                });
    
              });
            }
            else {
              sendData(1, tempName);
              sendData(2, tempName);
              sendData(3, tempName);
              db.collection("teams").doc(tempName).set({
                teamName:tempName,
                uniqname1:uniq1,
                uniqname2:uniq2,
                uniqname3:uniq3,
                uniqname4:uniq4Holder,
                uniqname1Accepted:true,
                uniqname2Accepted:false,
                uniqname3Accepted:false,
                uniqname4Accepted:false,
                description:description,
                rejectedInvites:[]
              }).then(() => {
                dbFunctions.getUserInfo(uniqname).then((data) =>{
                  setUserType(data.usertype);
                  setOnTeam(data.usertype === 'team');
                  sessionStorage.setItem('user-type', data.usertype);
                  console.log("user data updated: ", data);
    
                });
                setShow2(true);
              });
    
            }
    
          });
    
        });
    
      });

    });
  }

  // function syntax changed
  // shows create team check modal 
  const handleShow = (event) => {
    event.preventDefault();
    console.log("made it here");
    setShow(true);
  }
  
  // function syntax changed
  // hides modals
  const handleHide = () => {
    setShow(false);
  }

  // function syntax changed
  // shows successful creation modal
  const handleSecondHide = () => {
    setRedi(true);
    setShow2(false);
  }
  
  

  // return statements 
  if (redi === true && sessionStorage.getItem('user-type') === 'team'){
    setOnTeam(true);
    return <Redirect to='/view-team' />
  }
  if (usertype === 'admin') {
    return <Redirect to='/admin-home' />
  }
  if(!sessionStorage.getItem('uniqname')){
    return <Redirect to='/' />
  }

  return (
    <div className="createteam">
      <CustomNavbar/>
      <header className="loggedInHeader">
      <div className="body">
        <h1 className="title">
            Register your team
        </h1>
        <div className="body-content">
          <Form className="text-left" onSubmit={handleShow}>

            <Form.Group controlId="fullname">
              <Form.Label>Team name*</Form.Label>
              <Form.Control required
                type="text"
                name="teamName"
                placeholder=""
                onChange={e => setTeamName(e.target.value)}
                value={teamName} 
              />
            </Form.Group>

            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname 1*</Form.Label>
              <Form.Control disabled
                type="text"
                name="uniq1"
                placeholder={uniqname}
                defaultValue={uniqname}
              />
            </Form.Group>

            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname 2*</Form.Label>
              <Form.Control required
                type="text"
                name="uniq2"
                placeholder=""
                onChange={e => setUniq2(e.target.value)}
                value={uniq2}
              />
            </Form.Group>

            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname 3*</Form.Label>
              <Form.Control required
                type="text"
                name="uniq3"
                placeholder=""
                onChange={e => setUniq3(e.target.value)}
                value={uniq3} 
              />
            </Form.Group>

            <Form.Group controlId="uniq1" >
              <Form.Label >Uniqname 4*</Form.Label>
              <Form.Control
                type="text"
                name="uniq4"
                placeholder=""
                onChange={e => setUniq4(e.target.value)}
                value={uniq4} 
              />
            </Form.Group>

            <Form.Group controlId="uniq1" >
              <Form.Label >Project Description</Form.Label>
              <Form.Control
                type="textarea"
                size="lg"
                name="description"
                placeholder=""
                onChange={e => setDescription(e.target.value)}
                value={description} 
              />
              <Form.Text id="passwordHelpBlock" muted>
                You can do this later too!
              </Form.Text>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>

          <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
              <Modal.Title>Do you want to create this team?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2>{teamName}</h2>
              <p>{uniq1}</p>
              <p>{uniq2}</p>
              <p>{uniq3}</p>
              <p>{uniq4}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleHide}>
                Cancel
              </Button>
              <Button variant="success" onClick={addTeam}>
                Create Team
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={handleHide}>
            <Modal.Header closeButton>
              <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2>Please ask these team members to log into 493teams and accept this team invitation:</h2>
              <p>{uniq1}</p>
              <p>{uniq2}</p>
              <p>{uniq3}</p>
              <p>{uniq4}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleSecondHide}>
                Create Team
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      </header>
    </div>
  )

} // end 


export default CreateTeam;
