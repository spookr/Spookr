var geodist = require('geodist')
module.exports = {
    filteredSwipes: async (req, res) => {
        const { session } = req;
        const db = req.app.get('db')
        // const { radius } = search_prefs;
        // const { latitude, longitude } = session.user;
        const userType = session.user.ghost;
        const userID = session.user.id;

        // let LA = { lat: 34.0522, lon: 118.2437 }
        let SLC = { lat: 40.76078, lon: 111.89105 }
        // console.log(geodist(LA, SLC, { exact: true, unit: 'miles', limit: 600 }))


        if (userType) {
            // const meters = radius * 1609.344;
            const userHouses = await db.auth.filtered_houses()
            const location_filtered = userHouses.filter((user, i) => {
                console.log(typeof user.latitude, typeof user.longitude)
                return geodist({ lat: 34.0522, lon: 118.2437 }, { lat: parseInt(user.latitude), lon: parseInt(user.longitude) }, { exact: true, unit: 'miles', limit: 600 })

            })
            // console.log(geodist({ lat: 34.0522, lon: 118.2437 }, { lat: 40.76078, lon: 111.89105 }, { exact: true, unit: 'miles' }))
            console.log(location_filtered, 'Filtered Location')
        }

    }
}