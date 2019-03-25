const geolib = require('geolib')

module.exports = {
    filteredSwipes: async (req, res) => {
        const { session } = req;
        // const { radius } = search_prefs;
        let { latitude, longitude } = session.user;
        console.log(latitude, longitude)
        const userType = session.user.ghost;
        const userID = session.user.id;
        if (userType) {
            console.log(latitude, longitude)

            // geolib.getDistance({ latitude: 51.5103, longitude: 7.49347 })
            // // const meters = radius * 1609.344;
            // navigator.geolocation.getCurrentPosition(function (position) {
            //     console.log(('You Are' + geolib.getDistance(position.coords, {
            //         latitude: 51.525,
            //         longitude: 7.4575
            //     }) + 'meters away from 51.525, 7.4575'))
            // })
            // const userHouses = db.filtered_houses()

        }

    }
}