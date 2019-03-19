const bcrypt = require('bcryptjs')
module.exports = {
    userRegister: async (req, res) => {
      console.log('hit')
        const { username, password, ghost } = req.body
        const db = req.app.get('db')
        const { session } = req
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const findExisting = await db.auth.check_if_exists([username])
        if(findExisting[0]){
            // console.log(findExisting)
            return res.status(400).send('username exists already')
        }
        if (username && password) {
            try {
                let newUser = await db.auth.user_register([username, hash, ghost])
                newUser = newUser[0]
                // console.log(newUser)
                session.user = newUser
                // console.log(session.user)
                return res.status(200).send(session.user)
            } catch (err) {
                return res.status(400).send('Account could not be created')
            }
        }
           return res.status(400).send('Need all info')
    },

    userLogin: async (req, res) => {
      try {
        const {username, password} = req.body
        const {session} = req
        const db = req.app.get('db')
        console.log(username, password)

        let user = await db.auth.user_login(username)
        user = user[0]

        if (!user) {
          return res.status(401).send('User does not exist')
        }

        const authedUser = bcrypt.compareSync(password, user.password)

        if (authedUser) {
          delete user.password
          session.user = user
          res.status(200).send(session.user)
        } else {
          res.status(401).send('Incorrect password')
        }
      }
       catch (err) {
         console.log(err)
    }
  },

  getUser: (req, res) => {
    const {user} = req.session
    if (user) {
      res.status(200).send(user)
    } else {
      res.sendStatus(401)
    }
  },

  userLogout: async = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}
