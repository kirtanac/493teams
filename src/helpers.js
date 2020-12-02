const dbFunctions = {
  getUserInfo: function(user){
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("users").doc(user)
      .get()
      .then(querySnapshot => {
        return querySnapshot.data();
      });
  },

  getTeamInfo: function(teamName) {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("teams").doc(teamName)
      .get()
      .then(querySnapshot => {
        return querySnapshot.data();
      });
  },

  getTeamFromUser: function(user) {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("users").doc(user)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.data().onTeam === false) {
          return "User not on team";
        }
        let teamName = querySnapshot.data().teamName;
        db.collection("teams").doc(teamName)
          .get()
          .then(querySnapshot => {
            return querySnapshot.data();
          });
      });
  },

  userOnTeam: function(user) {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("users").doc(user)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.data().onTeam === true) {
        return true;
      }
    });
    return false;
  }


}

export default dbFunctions;
