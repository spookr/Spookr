require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const aws = require('aws-sdk');
const auth = require('./controllers/auth_controller');
const bcrypt = require('bcryptjs')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

const app = express();
app.use(express.json());

app.use(
    session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`Now arriving at ${SERVER_PORT}`));
})

//account handling



//when account is logged in
