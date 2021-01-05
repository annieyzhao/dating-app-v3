import firebase from "firebase";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAJ3hmQKVJv4dRB5WulDEWPQP8oq6cXn0M",
  authDomain: "v2-62702.firebaseapp.com",
  projectId: "v2-62702",
  storageBucket: "v2-62702.appspot.com",
  messagingSenderId: "547324270687",
  appId: "1:547324270687:web:5a498741595c255c0863ea",
  measurementId: "G-89PW8TKDDE"
});

export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export default firebaseApp;
export const auth = firebaseApp.auth();
//export default db;
