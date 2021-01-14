import '../App.css';
import firebase from "../firebase";
import dbFunctions from "../helpers"
import React from 'react';
import { CardColumns, Card, Nav, Navbar, NavDropdown, Form, Button, FormControl, Modal } from 'react-bootstrap';
import { Redirect, NavLink} from 'react-router-dom';
import CustomNavbar from "../components/customNavbar.js";

//PAGE FOR CREATING A TEAM

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [redi, setRedi] = useState(false);
  const [uniq1, setUniq1] = sessionStorage.getItem('uniqname');
  const [uniq2, setUniq2] = useState("");
  const [uniq3, setUniq3] = useState("");
  const [uniq4, setUniq4] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [uniqname, setUniqname] = sessionStorage.getItem('uniqname');
  const [usertype, setUserType] = sessionStorage.getItem('user-type');
  const [onTeam, setOnTeam] = useState(false);

  // set state variables and session storage items
  useEffect (() => {
    const getInfo = () => {
      dbFunctions.getUserInfo(uniqname).then((data) =>{
        setUserType(data.usertype);
        setOnTeam(data.usertype === 'team');
        sessionStorage.setItem('user-type', data.usertype);
        console.log("user data updated: ", data);
      });
    };
    getInfo();
  }, [uniqname]);

<<<<<<< HEAD
  // rewrote to reduce lines of code
  const sendData = async(uniq, number, tempName) => {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      let onTeam1 = false;
      let teamName1 = ""
      if (number == 1) {
        onTeam1 = true;
        teamName1 = tempName;
        db.collection("users").doc(uniq).update({
          onTeam:onTeam1,
          teamName:teamName1
        });
      } 
      dbFunctions.getUserInfo(uniq).then((data) => {
      let tempArray = data.invitations;
      let newVal = data.numInvitations;

      tempArray.push(tempName);
      if (uniq !== uniq1) {
        db.collection("users").doc(uniq).update({
          invitations: tempArray,
          numInvitations: newVal + 1,
          onTeam:onTeam1
      });
      }
    })
  };
  // checks whether user is on a team or not registered 
  const userCheck = (uniq) => {
    dbFunctions.getUserInfo(uniq).then(userInfo => {
      if (userInfo.onTeam === true) {
        alert(uniq+" is already on a team. Please enter a different uniqname");
        return;
      }
      else if (userInfo === "error") {
        alert(uniq+" is not a registered uniqname in the class. Please enter a different uniqname");
        return;
      }
    })
  };

  // updates team info to database 
  // added this function to avoid repetition
  const updateTeam = () => {
    db.collection("teams").doc(tempName).set({
      teamName:tempName,
      uniqname1:uniq1,
      uniqname2:uniq2,
      uniqname3:uniq3,
      uniqname4:uniq4,
      uniqname1Accepted:true,
      uniqname2Accepted:false,
      uniqname3Accepted:false,
      uniqname4Accepted:false,
      description:description,
      rejectedInvites:[]
    }).then(() => {
      dbFunctions.getUserInfo(uniqname).then((data) =>{
        setUserType(data.usertype);
        setOnTeam(data.userType === 'team');
        sessionStorage.setItem('user-type', data.usertype);
        console.log("user data updated: ", data);
      });
      { show2: true};
    });
  };

  const addTeam = (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    let tempName = teamName.split(' ').join('');
=======
    tempArray.push(tempName);
    if (numHolder !== this.state.uniq1) {
      db.collection("users").doc(numHolder).update({
        invitations: tempArray,
        numInvitations: newVal + 1,
        onTeam:onTeam1
    });
    }
  })
 }


 updateInput(event){
   this.setState({
     [event.target.name]: event.target.value
   });
 }


 addTeam(event){
  event.preventDefault();
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  let tempName = this.state.teamName.split(' ').join('');
  let uniq4Holder;
  if (this.state.uniq4 === "") {
    uniq4Holder = "";
  }
  else {
    uniq4Holder = this.state.uniq4;
  }
  dbFunctions.getUserInfo(this.state.uniq1).then(userInfo => {
    if (userInfo.onTeam === true) {
      alert(this.state.uniq1+" is already on a team. Please enter a different uniqname");
      return;
    }
    else if (userInfo === "error") {
      alert(this.state.uniq1+" is not a registered uniqname in the class. Please enter a different uniqname");
      return;
    }
    else {

    }
    //uniqname2 checks
    dbFunctions.getUserInfo(this.state.uniq2).then(userInfo1 => {
      if (userInfo1.onTeam === true) {
        alert(this.state.uniq2+" is already on a team. Please enter a different uniqname");
        return;
      }
      else if (userInfo1 === "error") {
        alert(this.state.uniq2+" is not a registered uniqname in the class. Please enter a different uniqname");
        return;
      }
      //uniqname3 checks
      dbFunctions.getUserInfo(this.state.uniq3).then(userInfo2 => {
        if (userInfo2.onTeam === true) {
          alert(this.state.uniq3+" is already on a team. Please enter a different uniqname");
          return;
        }
        else if (userInfo2 === "error") {
          alert(this.state.uniq3+" is not a registered uniqname in the class. Please enter a different uniqname");
          return;
        }
        //uniqname4 checks
        if (this.state.uniq4 !== "") {
          dbFunctions.getUserInfo(this.state.uniq4).then(userInfo3 => {
            if (userInfo3.onTeam === true) {
              alert(this.state.uniq4+" is already on a team. Please enter a different uniqname");
              return;
            }
            else if (userInfo3 === "error") {
              alert(this.state.uniq4+" is not a registered uniqname in the class. Please enter a different uniqname");
              return;
            }

            this.sendData(1, tempName);
            this.sendData(2, tempName);
            this.sendData(3, tempName);
            this.sendData(4, tempName);
            db.collection("teams").doc(tempName).set({
              teamName:tempName,
              uniqname1:this.state.uniq1,
              uniqname2:this.state.uniq2,
              uniqname3:this.state.uniq3,
              uniqname4:uniq4Holder,
              uniqname1Accepted:true,
              uniqname2Accepted:false,
              uniqname3Accepted:false,
              uniqname4Accepted:false,
              description:this.state.description,
              rejectedInvites:[]
            }).then(() => {
              dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{

                this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
                  sessionStorage.setItem('user-type', data.usertype);
                  console.log("user data updated: ", data);

              });
              this.setState({ show2: true});
            });

          });
        }
        else {
          this.sendData(1, tempName);
          this.sendData(2, tempName);
          this.sendData(3, tempName);
          db.collection("teams").doc(tempName).set({
            teamName:tempName,
            uniqname1:this.state.uniq1,
            uniqname2:this.state.uniq2,
            uniqname3:this.state.uniq3,
            uniqname4:uniq4Holder,
            uniqname1Accepted:true,
            uniqname2Accepted:false,
            uniqname3Accepted:false,
            uniqname4Accepted:false,
            description:this.state.description,
            rejectedInvites:[]
          }).then(() => {
            dbFunctions.getUserInfo(this.state.uniqname).then((data) =>{

              this.setState({ usertype: data.usertype, onTeam: (data.usertype === 'team')});
                sessionStorage.setItem('user-type', data.usertype);
                console.log("user data updated: ", data);

            });
              this.setState({ show2: true});
          });

        }

      });

    });

  });
}


handleShow(event) {
  event.preventDefault();
  console.log("made it here");
  this.setState({ show: true});
}
handleHide() {
  this.setState({ show: false});
}
handleSecondHide() {
  this.setState({
    redi:true,
    show2: false
  });
}
>>>>>>> parent of 273e580... fixed repetitive code

    // if only 3 members
    // used forEach to minimize repetitive code
    if (uniq4 == ""){
      var users = [uniq1, uniq2, uniq3];
      users.forEach(user=>{
        userCheck(user);
      });
      sendData(uniq1, 1, tempName);
      sendData(uniq2, 2, tempName);
      sendData(uniq3, 3, tempName);
      updateTeam();
    } else{
      var users = [uniq1, uniq2, uniq3, uniq4];
      users.forEach(user=>{
        userCheck(user);
      });
      sendData(uniq1, 1, tempName);
      sendData(uniq2, 2, tempName);
      sendData(uniq3, 3, tempName);
      sendData(uniq4, 4, tempName);
      updateTeam();
    }
  };
  const handleShow = (event) => {
    event.preventDefault();
    console.log("made it here");
    setShow(true);
  };
  
  const handleHide = () => {
    setShow(false);
  };
  
  const handleSecondHide () => {
    setRedi(true);
    setShow2(false);
  };

  if (redi === true && sessionStorage.getItem('user-type') === 'team'){
    setOneTeam(true);
    return <Redirect to='/view-team' />
  }
  if (usertype === 'admin') {
    return <Redirect to='/admin-home' />
  }
  if(getItem('uniqname')){
    return <Redirect to='/' />
  }
  return (
    <div className="createteam">
  <CustomNavbar/>
      <header className="loggedInHeader">
      <div className="body">
<<<<<<< HEAD
        <h1 className="title">Register your team</h1>
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
=======
        <h1 className="title">
        Register your team

        </h1>
<div className="body-content">
        <Form className="text-left" onSubmit={this.handleShow}>

        <Form.Group controlId="fullname">
        <Form.Label>Team name*</Form.Label>
    <Form.Control required
    type="text"
      name="teamName"
      placeholder=""
      onChange={this.updateInput}
      value={this.state.teamName} />
          </Form.Group>


          <Form.Group controlId="uniq1">
          <Form.Label>Uniqname 1*</Form.Label>
      <Form.Control disabled
      type="text"
      name="uniq1"
      placeholder={this.state.uniqname}
      defaultValue={this.state.uniqname}
       />
>>>>>>> parent of 273e580... fixed repetitive code
            </Form.Group>

            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname 2*</Form.Label>
              <Form.Control required
              type="text"
              name="uniq2"
              placeholder=""
              onChange={e => setUniq2(e.target.value)}
              value={uniq2}/>
            </Form.Group>

<<<<<<< HEAD
            <Form.Group controlId="uniq1">
              <Form.Label>Uniqname 3*</Form.Label>
              <Form.Control required
                type="text"
                name="uniq3"
                placeholder=""
                onChange={e => setUniq3(e.target.value)}
                value={uniq3} />
=======
          <Form.Group controlId="uniq1" >
          <Form.Label >Uniqname 4*</Form.Label>
          <Form.Control
          type="text"
          name="uniq4"
          placeholder=""
          onChange={this.updateInput}
          value={this.state.uniq4} />
>>>>>>> parent of 273e580... fixed repetitive code
            </Form.Group>

            <Form.Group controlId="uniq1" >
              <Form.Label >Uniqname 4*</Form.Label>
              <Form.Control 
                type="text"
                name="uniq4"
                placeholder=""
                onChange={e => setUniq4(e.target.value)}
                value={uniq4} />
            </Form.Group>

            <Form.Group controlId="uniq1" >
              <Form.Label >Project Description</Form.Label>
              <Form.Control
                type="textarea"
                size="lg"
                name="description"
                placeholder=""
                onChange={e => setDescription(e.target.value)}
                value={description} />
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
      <Modal show={tshow2} onHide={handleHide}>
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
  ); 
}


export default CreateTeam;
