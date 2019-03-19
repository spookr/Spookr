const bcrypt = require('bcryptjs')
module.exports = {
    userRegister: async (req, res) => {
        const { username, password, ghost } = req.body
        const db = req.app.get('db')
        const { session } = req
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const findExisting = await db.auth.check_if_exists([username])
        if(findExisting[0]){
          
            return res.status(400).send('username exists already')
        }
        if (username && password) {
            try {
                let newUser = await db.auth.user_register([username, hash, ghost])
                newUser = newUser[0]
                session.user = newUser
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

        let user = await db.auth.user_login(username)
        user = user[0]

        if (!user) {
          return res.status(401).send('User does not exist')
        }

        const authedUser = bcrypt.compareSync(password, user.password)

        if (authedUser) {
          if(user.ghost){
            let maybeGhost = await db.auth.check_for_ghost(username)
            maybeGhost = maybeGhost[0]
            if(!maybeGhost){
              return res.status(406).send('fill out ghost form')
            }
          }else{
            let maybeOwner = await db.auth.check_for_owner(username)
            maybeOwner = maybeOwner[0]
            if(!maybeOwner){
              return res.status(417).send('fill out homeowner form')
            }
          }

          if(user.ghost){
            let ghost = await db.auth.check_for_ghost(username)
            ghost = ghost[0]
            delete ghost.password
            session.user = ghost
            return res.status(200).send(session.user)
          }else{
            let owner = await db.auth.check_for_owner(username)
            owner = owner[0]
            delete owner.password
            session.user = owner
            return res.status(200).send(session.user)
          }


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
 
  ghostDetails : async (req,res) => {
    const {name, bio, gender, ghost_type, user_id, location} = req.body;
    const db = req.app.get('db');

    if(!name || !bio || !gender || !ghost_type || !user_id || !location){
      return res.status(400).send('need all info')
    }

<<<<<<< HEAD
  logout: (req, res) => {
    req.session.destroy();
=======
    try{
      let newGhost = await db.auth.new_ghost([name, bio, gender, ghost_type, user_id, location])
      newGhost = newGhost[0]
      return res.status(200).send(newGhost)
    }catch(err){
      return res.status(500).send('Could not create account')
    }
  },
  logout: (req, res) => {
    req.session.destroy(); 
>>>>>>> master
    res.sendStatus(200);
  }
}
