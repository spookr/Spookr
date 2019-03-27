var geodist = require('geodist')
module.exports = {
    filteredSwipes: async (req, res) => {
        const { session } = req;
        const { radius } = req.body;
        const db = req.app.get('db')
        const { latitude, longitude, id } = session.user;
        const userType = session.user.ghost;
        if (userType) {
            try{
            const userHouses = await db.auth.filtered_houses()
            const location_filtered = await userHouses.filter(user => {
                return geodist({ lat: latitude, lon: longitude }, { lat: parseFloat(user.latitude), lon: parseFloat(user.longitude) }, { exact: true, unit: 'miles', limit: radius })
            })
            const yesChecks = await db.auth.yes_checks(id);
            console.log(yesChecks)
            console.log(location_filtered)
            console.log(userHouses)

            for(let i=0; i < location_filtered.length;  i++){
                console.log(location_filtered[i])
                for(let j = 0; j < yesChecks.length; j++){
                    console.log(yesChecks[j])
                    if(location_filtered[i].user_id === yesChecks[j].swiped_id){
                        location_filtered[i].saidYes = true;
                    }
                }
            }

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