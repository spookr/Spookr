require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const aws = require('aws-sdk');
const bcrypt = require('bcryptjs')
const axios = require('axios')
const path = require('path')

// Controllers
const auth = require('./controllers/auth_controller');
const signedin = require('./controllers/signedin_controller');
const amazon = require('./controllers/amazon_controller');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express();
app.use(express.json());
app.use(bodyParser.json())

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database is spookin')
})

// Auth
app.post('/register', auth.userRegister)
app.post('/login', auth.userLogin)
app.get('/api/user', auth.getUser)
app.post('/ghost', auth.ghostDetails)
app.post('/owner', auth.ownerDetails)
app.post('/house', auth.houseDetails)
app.post('/logout', auth.logout)

//Aws
app.get('/sign-s3', amazon.awsS3)

// Is Signed In
app.get('/filterswipes', signedin.filteredSwipes)
app.post('/swipe', signedin.swipe)
app.get('/matches', signedin.getMatches)
app.post('/insertmatch', signedin.insertMatched)
app.post('/editprofile', signedin.editProfile)

// EndPoints
app.listen(SERVER_PORT, () => {
  console.log(`Spooking on Port ${SERVER_PORT} 👻`)
});
