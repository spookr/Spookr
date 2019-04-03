var geodist = require('geodist')
const Geocode = require('react-geocode')
module.exports = {
    filteredSwipes: async (req, res) => {
        //   console.log('hit filtered swipes')
        const { session } = req;
        const db = req.app.get('db')
        const { latitude, longitude, user_id } = session.user;
        const userType = session.user.ghost

        // console.log(session)

        if (userType) {

            try {
                const userHouses = await db.auth.filtered_houses(user_id)
                const location_filtered = await userHouses.filter(user => {
                    delete user.username
                    delete user.password
                    return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: session.user.radius })
                })

                // location_filtered.forEach( async user => {
                //     console.log(user.latitude, user.longitude)
                //     await Geocode.setApiKey("AIzaSyCdZuqe3hLZO8Tq1wYHOA4WJ8bmPFK1XT4");
                //     await Geocode.enableDebug();
                //     Geocode.fromLatLng(`${user.latitude}`, `${user.longitude}`).then(
                //     response => {
                //         const locationObj = response.results[0];
                //         for(let i = 0; i < locationObj.address_components.length; i ++){
                //             if(locationObj.address_components[i].types.includes('locality')){
                //                 user.address = locationObj.address_components[i].long_name
                //             }
                //             if(locationObj.address_components[i].types.includes('administrative_area_level_1')){
                //                 user.state = locationObj.address_components[i].long_name
                //             }
                //         }
                //     },
                //     error => {
                //         console.error(error);
                //     }
                //     );
                // })

                // console.log(location_filtered)

                return res.status(200).send(location_filtered)

            } catch (err) {
                // console.log(err)
                return res.status(400).send('Could not get users from database')
            }
        } else {
            try {
                const userGhosts = await db.auth.filtered_ghosts(user_id)
                const location_filtered = await userGhosts.filter(user => {
                    delete user.username
                    delete user.password
                    return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: user.radius })
                })
                return res.status(200).send(location_filtered)
            } catch (err) {
                return res.status(400).send('Could not get users from database')
            }
        }
    },

    swipe: async (req, res) => {
        const { user_id } = req.session.user;
        const db = req.app.get('db')
        const { swiped, swipedUser } = req.body

        // console.log(user_id, swipedUser, swiped)

        try {
            const swipedOn = await db.auth.swiped(swipedUser, user_id, swiped)
            return res.status(200).send('user added to swipe')
        } catch (err) {
            return res.status(500).send('could not process swipe')
        }
    },

    insertMatched: async (req, res) => {
        const { user_id } = req.session.user;
        const { matchedUser } = req.body
        const db = req.app.get('db')

        try {
            const insertMatched = await db.auth.matches_insert(user_id, matchedUser)
            return res.status(200).send('Matched users!')
        } catch (err) {
            res.status(500).send("could not match the users")
        }
    },

    getMatches: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user;
        const userType = req.session.user.ghost

        console.log('hit get matches')
        console.log(user_id, userType)

        if (userType) {
            try {
                const getMatches = await db.auth.get_ghost_matches(user_id)
                const getRecents = await db.auth.get_recents(user_id)

                for(let i = 0; i < getMatches.length; i++){
                    for(let j = 0; j < getRecents.length; j++){
                        if(getRecents[j].messenger === getMatches[i].user_id || getRecents[j].receiver === getMatches[i].user_id){
                           getMatches[i].recent = getRecents[j].message
                        }
                    }
                }
                res.status(200).send(getMatches)
            } catch (err) {
                res.status(500).send('could not get matches')
            }

        } else {
            try {
                console.log('before matches')
                const getMatches = await db.auth.get_house_matches(user_id)
                console.log('before recents')
                const getRecents = await db.auth.get_recents(user_id)
                
                for(let i = 0; i < getMatches.length; i++){
                    for(let j = 0; j < getRecents.length; j++){
                        if(getRecents[j].messenger === getMatches[i].user_id || getRecents[j].receiver === getMatches[i].user_id){
                           getMatches[i].recent = getRecents[j].message
                        }
                    }
                }
                res.status(200).send(getMatches)
            } catch (err) {
                res.status(500).send('could not get matches')
            }
        }
    },



    editProfile: async (req, res) => {
        const db = req.app.get('db')
        const {ghost, user_id} = req.session.user


        if(ghost){
            const {name, bio, imageUrl} = req.body
            if(!name || !bio || !imageUrl){
                return res.status(500).send('need all info')
            }
            try {
                const editInfo = await db.auth.edit_ghost(user_id, name, bio, imageUrl)
                req.session.user.bio = bio;
                req.session.user.name = name;
                req.session.user.imageUrl = imageUrl;
                return res.status(200).send('info edited!')
            } catch (err) {
                return res.status(401).send('could not edit profile')
            }


        } else {
            const { owner } = req.session.user
            const { firstName, lastName, bio, imageUrl, body, header } = req.body
            if (!firstName || !lastName || !bio || !imageUrl || !body || !header) {
                return res.status(400).send('need all infoooooo')
            }
            try {
                const editOwner = await db.auth.edit_owner(user_id, firstName, lastName, bio, imageUrl)
                req.session.user.first_name = firstName;
                req.session.user.last_name = lastName;
                req.session.user.bio = bio;
                req.session.user.imageUrl = imageUrl;
                const editHouse = await db.auth.edit_house(owner, header, body)
                req.session.user.header = header;
                req.session.user.body = body;
                return res.status(200).send('info edited!')
            } catch (err) {
                return res.status(401).send('could not edit profile')
            }
        }
    },

    updateRadius : async (req,res) => {
        const db = req.app.get('db')
        const {ghost, user_id} = req.session.user
        const {radius} = req.body

        if(ghost){
            try{
                const radiusUpdate = await db.auth.update_radius(user_id, radius)
                req.session.user.radius = radius
                return res.status(200).send('updated radius')
            }catch(err){
                return res.status(500).send('could not send db request')
            }
        }
    }
}
