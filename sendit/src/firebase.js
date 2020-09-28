import firebase from "firebase";
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyA3UxVKy6ew2vLPmPybsgzEPZXysgRpgr4",
  authDomain: "sendit-d1680.firebaseapp.com",
  databaseURL: "https://sendit-d1680.firebaseio.com",
  projectId: "sendit-d1680",
  storageBucket: "sendit-d1680.appspot.com",
  messagingSenderId: "85600096762",
  appId: "1:85600096762:web:4df8c805e9f47b3dde9443",
  measurementId: "G-32BHK3DQND"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()
export {auth,provider, storage};
export default db;
