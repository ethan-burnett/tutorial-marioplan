import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
//apiKey: SOME KEY,
  authDomain: "panda-marioplan1.firebaseapp.com",
  databaseURL: "https://panda-marioplan1.firebaseio.com",
  projectId: "panda-marioplan1",
  storageBucket: "panda-marioplan1.appspot.com",
  messagingSenderId: "27555338832",
  appId: "1:27555338832:web:2b6922c596dc92670f4f55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
