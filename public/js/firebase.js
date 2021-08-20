var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var users = db.collection("users");

users.doc().set({
    username: "Test User 2",
    highScore: 0,
    dateCreated: "8/19/21"
})