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

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

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
app.post('/ghost', auth.ghostDetails)
app.post('/logout', auth.logout)
app.post('/login', auth.userLogin)
app.get('/api/user', auth.getUser)

// EndPoints

app.listen(SERVER_PORT, ()=> {
  console.log(`Spooking on Port ${SERVER_PORT} 👻 `)
})
