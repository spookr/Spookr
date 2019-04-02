var geodist = require('geodist')
module.exports = {
    filteredSwipes: async (req, res) => {
    //   console.log('hit filtered swipes')
        const { session } = req;
        const db = req.app.get('db')
        const { latitude, longitude, user_id } = session.user;
        const userType = session.user.ghost

        // console.log(session)

        if (userType) {

            try{
            const userHouses = await db.auth.filtered_houses(user_id)
            const location_filtered = await userHouses.filter(user => {
                delete user.username
                delete user.password
                return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: session.user.radius })
            })

            // console.log(location_filtered)

            return res.status(200).send(location_filtered)

            } catch(err) {
              // console.log(err)
                return res.status(400).send('Could not get users from database')
            }
        }else{
            try{
                const userGhosts = await db.auth.filtered_ghosts(user_id)
                const location_filtered = await userGhosts.filter(user => {
                    delete user.username
                    delete user.password
                    return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: user.radius })
                })

                return res.status(200).send(location_filtered)
            } catch(err){
                return res.status(400).send('Could not get users from database')
            }
        }
    },

    swipe: async (req, res) => {
        const { user_id } = req.session.user;
        const db = req.app.get('db')
        const {swiped, swipedUser} = req.body

        try{
            const swipedOn = await db.auth.swiped(user_id, swipedUser, swiped)
            return res.status(200).send('user added to swiped')
        }catch(err){
            return res.status(500).send('could not process swipe')
        }
    },

    insertMatched: async (req,res) => {
        const { user_id } = req.session.user;
        const {matchedUser} = req.body
        const db = req.app.get('db')
        try{
            const insertMatched = await db.auth.matches_insert(user_id, matchedUser)
            return res.status(200).send('Matched users!')
        }catch(err){
            res.status(500).send("could not match the users")
        }
    },

    getMatches : async (req,res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user;

        if(userType){
            try{
                const getMatches = await db.auth.get_ghost_matches(user_id)
                res.status(200).send(getMatches)
            }catch(err){
                res.status(500).send('could not get matches')
            }

        }else{
            try{
                const getMatches = await db.auth.get_house_matches(user_id)
                res.status(200).send(getMatches)
            }catch(err){
                res.status(500).send('could not get matches')
            }
        }
    },
    editProfile : async (req,res) => {
        const db = req.app.get('db')
        const {ghost, user_id} = req.session.user
        
    
        if(ghost){
            const {name, bio, imageUrl} = req.body
            if(!name || !bio || !imageUrl){
                return res.status(500).send('need all info')
            }
            try{
                const editInfo = await db.auth.edit_ghost(user_id, name, bio, imageUrl)
                return res.status(200).send('info edited!')
            }catch(err){
                return res.status(500).send('could not edit profile')
          }
        }else{
            console.log(req.session.user)
            const {owner} = req.session.user
            const{firstName, lastName, bio, imageUrl, body, header} = req.body
            if(!firstName || !lastName ||  !bio || !imageUrl || !body || !header){
                return res.status(500).send('need all infoooooo')
            }
            try{
                const editOwner = await db.auth.edit_owner(user_id, firstName, lastName, bio, imageUrl)
                const editHouse = await db.auth.edit_house(owner, header, body)
                return res.status(200).send('info edited!')
            }catch(err){
                return res.status(500).send('could not edit profile')
            }
        }
    }
}
