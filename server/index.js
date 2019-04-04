require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const socket = require('socket.io')
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
app.post('/updateradius', signedin.updateRadius)


app.post('/editprofile', signedin.editProfile)

const io = socket(app.listen(SERVER_PORT, () => console.log(`Spooking on Port ${SERVER_PORT} 👻`)));


io.on('connection', socket => {
  console.log('User connected')
  const db = app.get('db')

  socket.on('Join room', async ({ roomName, senderID, receiverID }) => {
    console.log(roomName, senderID, receiverID)
    // console.log('Apple Bottom Jeans')
    // this is where you make your DB query
    socket.join(roomName)
    try{
      const messages = await db.auth.get_messages([senderID, receiverID])
      // console.log(messages)
      io.to(roomName).emit('Messages', messages)
    } catch(err){
      console.log(err)
    }
  })

  socket.on('New Message', async ({ messenger, receiver, message, roomName }) => {
    const db = app.get('db')
    console.log(messenger, receiver, message, roomName)
    const addMessage = await db.auth.add_message([messenger, receiver, message])
    const messages = await db.auth.get_messages([messenger, receiver])
    // console.log(messages)
    io.to(roomName).emit('Messages', messages)
  })
})
