const bcrypt = require('bcryptjs')

module.exports = {
    user_register: async (req, res) => {
        const { username, password, ghost } = req.body
        const db = req.app.get('db')
        const { session } = req

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const findExisting = await db.account_handling.check_if_exists([username])
        if(findExisting[0]){
            // console.log(findExisting)
            return res.status(400).send('username exists already')
        }

        if (username && password) {
            try {
                let newUser = await db.account_handling.user_register([username, hash, ghost])
                newUser = newUser[0]
                console.log(newUser)
                session.user = newUser
                console.log(session.user)
                return res.status(200).send(session.user)
            } catch (err) {
                return res.status(400).send('Account could not be created')
            }
        }
           return res.status(400).send('Need all info')
    

    }
}
