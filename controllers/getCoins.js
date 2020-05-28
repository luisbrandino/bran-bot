const db = require('./database')

module.exports = user => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.get(['coins'], user.id)
            resolve(userData.coins)
        } catch (err) {
            db.insertUsers([user])
            resolve(0)
        }
    })
}