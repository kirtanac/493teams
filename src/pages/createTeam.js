import '../App.css';
import firebase from '../firebase';
import dbFunctions from '../helpers';
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CustomNavbar from '../components/customNavbar.js';

//PAGE FOR CREATING A TEAM

const CreateTeam = (props) => {
  const [teamName, setTeamName] = useState('');
  const [redi, setRedi] = useState(false);
  const [uniqname, setUniqname] = useState(sessionStorage.getItem('uniqname'));
  const [usertype, setUsertype] = useState('user-type');
  const [onTeam, setOnTeam] = useState(false);
  const [uniq1, setUniq1] = useState(sessionStorage.getItem('uniqname'));
  const [uniq2, setUniq2] = useState('');
  const [uniq3, setUniq3] = useState('');
  const [uniq4, setUniq4] = useState('');
  const [description, setDescription] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  // gets current users initial info and sets appropriate state variables and sessionStorage items
  useEffect(() => {
    const getUserInfo = () => {
      dbFunctions.getUserInfo(uniqname).then((data) => {
        setUsertype(data.usertype);
        setOnTeam(data.usertype === 'team');

        sessionStorage.setItem('user-type', data.usertype);
        console.log('user data updated: ', data);
      });
    };

    getUserInfo();
  }, [uniqname]);

  //function to simplify sending the data so we don't have code repitition
  const sendData = async (number, tempName, totNum) => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    let numHolder;
    let onTeam1 = false;
    let teamName1 = '';
    switch (number) {
      case 1:
        numHolder = uniq1;
        onTeam1 = true;
        teamName1 = tempName;
        db.collection('users').doc(numHolder).update({
          onTeam: onTeam1,
          teamName: teamName1,
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
        db.collection('users')
          .doc(numHolder)
          .update({
            invitations: tempArray,
            numInvitations: newVal + 1,
            onTeam: onTeam1,
          });
      }
    });
  };

  // checks if user is already on a team or an error occurred
  const isValidUser = (userInfo, uniq) => {
    if (userInfo.onTeam === true) {
      alert(uniq + ' is already on a team. Please enter a different uniqname');
      return false;
    } else if (userInfo === 'error') {
      alert(
        uniq +
          ' is not a registered uniqname in the class. Please enter a different uniqname'
      );
      return false;
    }
    return true;
  };

  const addTeam = async (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    let tempName = teamName.split(' ').join('');

    const userInfo = await dbFunctions.getUserInfo(uniq1);
    if (!isValidUser(userInfo, uniq1)) return;

    //uniqname2 checks
    const userInfo1 = await dbFunctions.getUserInfo(uniq2);
    if (!isValidUser(userInfo1, uniq2)) return;

    //uniqname3 checks
    const userInfo2 = await dbFunctions.getUserInfo(uniq3);
    if (!isValidUser(userInfo2, uniq3)) return;

    //uniqname4 checks if filled
    if (uniq4 !== '') {
      const userInfo3 = await dbFunctions.getUserInfo(uniq4);
      if (!isValidUser(userInfo3, uniq4)) return;
    }

    // update all team members on db with invitations
    sendData(1, tempName);
    sendData(2, tempName);
    sendData(3, tempName);
    if (uniq4 !== '') sendData(4, tempName);

    // set new team in db
    db.collection('teams')
      .doc(tempName)
      .set({
        teamName: tempName,
        uniqname1: uniq1,
        uniqname2: uniq2,
        uniqname3: uniq3,
        uniqname4: uniq4,
        uniqname1Accepted: true,
        uniqname2Accepted: false,
        uniqname3Accepted: false,
        uniqname4Accepted: false,
        description: description,
        rejectedInvites: [],
      })
      .then(() => {
        dbFunctions.getUserInfo(uniqname).then((data) => {
          setUsertype(data.usertype);
          setOnTeam(data.usertype === 'team');

          sessionStorage.setItem('user-type', data.usertype);
          console.log('user data updated: ', data);
        });

        setShow2(true);
      });
  };

  const handleShow = (event) => {
    event.preventDefault();
    console.log('made it here');
    setShow1(true);
  };

  const handleHide = () => {
    setShow1(false);
  };

  const handleSecondHide = () => {
    setRedi(true);
    setShow2(false);
  };

  if (redi === true && sessionStorage.getItem('user-type') === 'team') {
    // did user make team and is on a team
    setOnTeam(true);
    return <Redirect to='/view-team' />;
  } else if (usertype === 'admin') {
    // is user admin
    return <Redirect to='/admin-home' />;
  } else if (!sessionStorage.getItem('uniqname')) {
    // check if no uniqname then send to home to login
    return <Redirect to='/' />;
  } else {
    return (
      <div className='createteam'>
        <CustomNavbar />
        <header className='loggedInHeader'>
          <div className='body'>
            <h1 className='title'>Register your team</h1>
            <div className='body-content'>
              <Form className='text-left' onSubmit={handleShow}>
                <Form.Group controlId='fullname'>
                  <Form.Label>Team name*</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='teamName'
                    placeholder=''
                    onChange={(event) => setTeamName(event.target.value)}
                    value={teamName}
                  />
                </Form.Group>

                <Form.Group controlId='uniq1'>
                  <Form.Label>Uniqname 1*</Form.Label>
                  <Form.Control
                    disabled
                    type='text'
                    name='uniq1'
                    placeholder={uniqname}
                    defaultValue={uniqname}
                  />
                </Form.Group>

                <Form.Group controlId='uniq1'>
                  <Form.Label>Uniqname 2*</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='uniq2'
                    placeholder=''
                    onChange={(event) => setUniq2(event.target.value)}
                    value={uniq2}
                  />
                </Form.Group>

                <Form.Group controlId='uniq1'>
                  <Form.Label>Uniqname 3*</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='uniq3'
                    placeholder=''
                    onChange={(event) => setUniq3(event.target.value)}
                    value={uniq3}
                  />
                </Form.Group>

                <Form.Group controlId='uniq1'>
                  <Form.Label>Uniqname 4*</Form.Label>
                  <Form.Control
                    type='text'
                    name='uniq4'
                    placeholder=''
                    onChange={(event) => setUniq4(event.target.value)}
                    value={uniq4}
                  />
                </Form.Group>

                <Form.Group controlId='uniq1'>
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    type='textarea'
                    size='lg'
                    name='description'
                    placeholder=''
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                  />
                  <Form.Text id='passwordHelpBlock' muted>
                    You can do this later too!
                  </Form.Text>
                </Form.Group>

                <br />
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>

              <Modal show={show1} onHide={handleHide}>
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
                  <Button variant='secondary' onClick={handleHide}>
                    Cancel
                  </Button>
                  <Button variant='success' onClick={addTeam}>
                    Create Team
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={show2} onHide={handleHide}>
                <Modal.Header closeButton>
                  <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h2>
                    Please ask these team members to log into 493teams and
                    accept this team invitation:
                  </h2>
                  <p>{uniq1}</p>
                  <p>{uniq2}</p>
                  <p>{uniq3}</p>
                  <p>{uniq4}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='success' onClick={handleSecondHide}>
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
};

export default CreateTeam;
