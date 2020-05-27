const db = require('./database')

module.exports = user => {
    return new Promise(resolve => {
        let defaultUserProfile = {
            level: 0,
            xp: 0,
            coins: 0,
            description: 'Hello, world!'
        }

        db.findProfile(user).catch(v => {
            db.insertUsers([user])

            resolve(defaultUserProfile)
        }).then(userProfile => {
            resolve(userProfile)
        })
    })
}