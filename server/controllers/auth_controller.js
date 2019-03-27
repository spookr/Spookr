const bcrypt = require('bcryptjs')
module.exports = {
  userRegister: async (req, res) => {
    const { username, password, ghost } = req.body
    const db = req.app.get('db')
    const { session } = req
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const findExisting = await db.auth.check_if_exists([username])
    if (findExisting[0]) {

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
      const { username, password } = req.body
      const { session } = req
      const db = req.app.get('db')

      let user = await db.auth.user_login(username)
      user = user[0]

      if (!user) {
        return res.status(401).send('User does not exist')
      }

      const authedUser = bcrypt.compareSync(password, user.password)

      if (authedUser) {
        if (user.ghost) {
          let maybeGhost = await db.auth.check_for_ghost(username)
          maybeGhost = maybeGhost[0]
          if (!maybeGhost) {
            return res.status(406).send('fill out ghost form')
          }
        } else {
          let maybeOwner = await db.auth.check_for_owner(username)
          maybeOwner = maybeOwner[0]
          if (!maybeOwner) {
            return res.status(417).send('fill out homeowner form')
          } else {
            let maybeHouse = await db.auth.check_for_house(maybeOwner.username)
            maybeHouse = maybeHouse[0]
            if (!maybeHouse) {
              return res.status(406).send('No House Found')
            } else {
              delete maybeHouse.password
              res.status(200).send(maybeHouse)
            }
          }
        }

        if (user.ghost) {
          let ghost = await db.auth.check_for_ghost(username)
          ghost = ghost[0]
          delete ghost.password
          session.user = ghost
          return res.status(200).send(session.user)
        } else {
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
    const { user } = req.session
    if (user) {
      res.status(200).send(user)
    } else {
      res.sendStatus(401)
    }
  },

  ghostDetails: async (req, res) => {
    const { name, bio, type, user_id, profile_pic, lat, lng } = req.body;
    console.log(name, bio, type, user_id, profile_pic, lat, lng)
    const db = req.app.get('db');

    if (!name || !bio || !type || !user_id || !profile_pic || !lat || !lng) {
      return res.status(400).send('need all info')
    }

    try {
      let newGhost = await db.auth.new_ghost([name, bio, type, user_id, profile_pic, lat, lng])
      console.log('Hello my dudes', newGhost)
      newGhost = newGhost[0]
      return res.status(200).send(newGhost)
    } catch (err) {
      return res.status(500).send('Could not create account')
    }
  },

  ownerDetails: async (req, res) => {
    const { firstName, lastName, bio, user_id, profilePhoto } = req.body;
    const db = req.app.get('db');

    if (!firstName || !lastName || !bio || !user_id || !profilePhoto) {
      return res.status(400).send('Need all info, you Human')
    }

    try {
      let newOwner = await db.auth.new_owner([firstName, lastName, user_id, profilePhoto, bio])
      newOwner = newOwner[0]
      req.session.homeowner = newOwner
      console.log(req.session.homeowner.id)
      return res.status(200).send(newOwner)
    } catch (err) {
      return res.status(500).send('Could Not Create Account')
    }
  },

  houseDetails: async (req, res) => {
    const {header, body, rooms, remodeled, amenities : {spiderwebs, basement, grandfatherClock, dolls, electricity, pets}, lat, lng, livingOccupants} = req.body
    const db = req.app.get('db')

  console.log(req.session.homeowner.id)

    try {
      let newHouse = await db.auth.new_house([header, body, rooms, remodeled, req.session.homeowner.id, livingOccupants, lat, lng])
      newHouse = newHouse[0]
      const home = newHouse.id
      let newAmenities = await db.auth.new_amenities([spiderwebs, basement, grandfatherClock, dolls, electricity, pets, home])
      console.log(newHouse)
      console.log(newAmenities)
    } catch (err) {
      console.log(err)
      return res.status(500).send('Could Not Create House')
    }
  },

  logout: (req, res) => {
    console.log(req.session.user)
    req.session.destroy();
    // console.log(req.session.user)
    res.sendStatus(200);
  }
}
