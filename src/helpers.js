import firebase from 'firebase';
const dbFunctions = {
   getUserInfo: async function(user){
     console.log("in getUserInfo", user);
     let data;
    const db = await firebase.firestore();
      db.settings({
      timestampsInSnapshots: true
    });
     await db.collection("users").doc(user).get()
      .then(querySnapshot => {
        console.log("returned ", querySnapshot)
        let status;
        if(querySnapshot.data().isAdmin){
          status = 'admin';
        }else if(querySnapshot.data().onTeam){
          status = 'team';
        }else{
          status = 'unassigned';
        }
        data = querySnapshot.data();
        data['usertype'] = status;
      }).catch(err => {
        console.log("error!");
        data = "error"
      });

      return data;

  },

  getTeamInfo: async function(teamName) {
    let data;
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
  await db.collection("teams").doc(teamName)
      .get()
      .then(querySnapshot => {
        console.log("returned ", querySnapshot)
        data = querySnapshot.data();
      }).catch(err => {
        console.log("error!");
        data = "error"
      });
      return data;
  },

  getTeamFromUser:  async function(user) {
    const db = firebase.firestore();
    let onTeam;
    let teamName;
    let data;
    db.settings({
      timestampsInSnapshots: true
    });
  await db.collection("users").doc(user)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.data().onTeam === false) {
          onTeam = false;
        }else{
          onTeam = true;
          teamName=querySnapshot.data().teamName;
          }
      });
    if(onTeam){
      await db.collection("teams").doc(teamName)
        .get()
        .then(querySnapshot => {
          data = querySnapshot.data();
          console.log("data in helpers: ", data)
        });
      }else{
        data="not on team";
      }
      console.log("returned ", data)
      return data;
  },

  userStatus:  async function(user) {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
  await  db.collection("users").doc(user)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        return "not on roster";
      }
      if (querySnapshot.data().isAdmin) {
        return "admin";
      }
      if (querySnapshot.data().onTeam) {
        return "team";
      }
      else {
        return "unassigned";
      }
    });

  }

}

export default dbFunctions;
