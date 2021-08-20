const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('views/traccur.html', {root: __dirname })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));

var firebaseConfig = {
  apiKey: "AIzaSyCSuvRDAImIauW9r3Sy3VTUC_Wk_tolZUQ",
  authDomain: "aimassist-350cf.firebaseapp.com",
  projectId: "aimassist-350cf",
  storageBucket: "aimassist-350cf.appspot.com",
  messagingSenderId: "581818834530",
  appId: "1:581818834530:web:c91dd8aedbd70c06c2bb3b",
  measurementId: "G-GKVC569PTE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();