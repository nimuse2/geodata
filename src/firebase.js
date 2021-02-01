// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

//firebase
const config = {
    apiKey: "AIzaSyDK3k50MfL9rxfGi0uqKql5GaAgFMr4ajU",
    authDomain: "geosynth-39a78.firebaseapp.com",
    databaseURL: "https://geosynth-39a78.firebaseio.com",
    projectId: "geosynth-39a78",
    storageBucket: "geosynth-39a78.appspot.com",
    messagingSenderId: "1048064109355",
    appId: "1:1048064109355:web:6e6a484c2c77b17473f36e"
  };
  
  // Initialize Firebase
firebase.initializeApp(config);
var db = firebase.firestore();

export default db;