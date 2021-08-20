const express = require('express')
const path = require('path')

const app = express()
const port = 3000

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

app.get('/', (req, res) => {
    res.sendFile('views/traccur.html', {root: __dirname })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));

// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyCSuvRDAImIauW9r3Sy3VTUC_Wk_tolZUQ",
    authDomain: "aimassist-350cf.firebaseapp.com",
    projectId: "aimassist-350cf",
    storageBucket: "aimassist-350cf.appspot.com",
    messagingSenderId: "581818834530",
    appId: "1:581818834530:web:c91dd8aedbd70c06c2bb3b",
    measurementId: "G-GKVC569PTE"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var db = firebase.database();

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}

// db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });

firebase.database().ref('users').set({
  username: "TESTING USER 3",
  email: "TESTING USER EMAIL 3"
})