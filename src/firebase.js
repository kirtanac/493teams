import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC2y91CURRmBsyzrIi96IVx_2tdnMEIYpw",
  authDomain: "eecs-493-96f7b.firebaseapp.com",
  databaseURL: "https://eecs-493-96f7b.firebaseio.com",
  projectId: "eecs-493-96f7b",
  storageBucket: "eecs-493-96f7b.appspot.com",
  messagingSenderId: "746380302805",
  appId: "1:746380302805:web:d44a0675ece3ea84d2855c"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
