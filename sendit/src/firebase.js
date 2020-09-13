import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAxQnzNHjV-dvLcCbNUonHSV5p9Unct8OE",
    authDomain: "sendit-62f34.firebaseapp.com",
    databaseURL: "https://sendit-62f34.firebaseio.com",
    projectId: "sendit-62f34",
    storageBucket: "sendit-62f34.appspot.com",
    messagingSenderId: "460023645868",
    appId: "1:460023645868:web:28c6fad350bca8cd4b8109",
    measurementId: "G-CCLW1E4RJ8"
    };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;
