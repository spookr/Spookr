var geodist = require('geodist')
module.exports = {
    filteredSwipes: async (req, res) => {
        const { session } = req;
        const { radius } = req.body;
        const db = req.app.get('db')
        const { latitude, longitude } = session.user;
        const userType = session.user.ghost;
        if (userType) {
            try{
            const userHouses = await db.auth.filtered_houses()
            const location_filtered = await userHouses.filter(user => {
                return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: radius })
            })
            return res.status(200).send(location_filtered)

            }catch(err){
                return res.status(400).send('Could not get users from database')
            }
        }else{
            try{
                const userGhosts = await db.auth.filtered_ghosts()
                const location_filtered = await userGhosts.filter(user => {
                    return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: radius })
                })
                return res.status(200).send(location_filtered)
            }catch(err){
                return res.status(400).send('Could not get users from database')
            }
        }
    }
}