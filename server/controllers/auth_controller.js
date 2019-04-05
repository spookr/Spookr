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
              delete maybeHouse.username

              session.user = {
                ...session.user,
                ...maybeHouse
              }
              // console.log(session.user)
              return res.status(200).send(session.user)
            }
          }
        }

        if (user.ghost) {
          let ghost = await db.auth.check_for_ghost(username)
          ghost = ghost[0]
          delete ghost.password
          session.user = {
            ...session.user,
            ...ghost
          }
          // console.log(session.user)
          return res.status(200).send(session.user)
        } else {
          //this section doesnt hit when a homeowner logs in, hits starting line 60 instead
          let owner = await db.auth.check_for_owner(username)
          owner = owner[0]
          delete owner.password
          session.user = owner
          // console.log(session.user)
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
    const { name, bio, type, user_id, profile_pic, lat, lng, town, foundState } = req.body;
    const db = req.app.get('db');
    const {session} = req

    const radius = 50;

    console.log(req.body)

    if (!name || !bio || !type || !user_id || !profile_pic || !lat || !lng || !town || !foundState ) {
      return res.status(400).send('need all info')
    }

    try {

      let newGhost = await db.auth.new_ghost([name, bio, type, user_id, profile_pic, lat, lng, radius, town, foundState])
      // console.log('Hello my dudes', newGhost)
      newGhost = newGhost[0]
      session.user = {
        ...session.user,
        ...newGhost
      }

      // console.log(req.session)
      return res.status(200).send(session.user)
    } catch (err) {
      console.log(err)
      return res.status(500).send('Could not create account')
    }
  },

  ownerDetails: async (req, res) => {
    const { firstName, lastName, bio, user_id, profilePhoto } = req.body;
    const db = req.app.get('db');
    // console.log(req.body);


    if (!firstName || !lastName || !bio || !user_id || !profilePhoto) {
      return res.status(400).send('Need all info, you Human')
    }

    try {
      let newOwner = await db.auth.new_owner([firstName, lastName, user_id, profilePhoto, bio])
      newOwner = newOwner[0]
      req.session.user = {
        ...req.session.user,
        ...newOwner
      }
      // console.log(req.session)
      return res.status(200).send(req.session.user)
    } catch (err) {
      return res.status(500).send('Could Not Create Account')
    }
  },

  houseDetails: async (req, res) => {
    const { header, description, rooms, remodeled, lat, lng, amenities, town, foundState, amenities: { spiderwebs, basement, grandfatherClock, dolls, electricity, pets } } = req.body
    const db = req.app.get('db')
    const owner = req.session.user.user_id
    // console.log('pree pree', req.session)

    if (!header || !description || !rooms || !amenities || !lat || !lng || ! town || !foundState) {
      return res.status(400).send('Need All House Info Filled Out')
    }

    try {
      let newHouse = await db.auth.new_house([header, description, rooms, remodeled, owner, lat, lng, town, foundState])
      newHouse = newHouse[0]
      // console.log({spiderwebs, basement, grandfatherClock, dolls, electricity, pets, house_id: newHouse.id})
      const savedAmenities = await db.auth.amenities([spiderwebs, basement, grandfatherClock, dolls, electricity, pets, newHouse.id])
      newHouse.amenities = savedAmenities[0]
      console.log('this is house info',newHouse)
      console.log('pre set', req.session)
      req.session.user = {
        ...req.session.user,
        ...newHouse
      }
      // console.log( "all data", req.session)
      return res.status(200).send(req.session.user)
    } catch (err) {
      // console.log('amenities', amenities)
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
