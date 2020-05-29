const db = require('./database')

module.exports = user => {
    return new Promise(async resolve => {
        try {
            const userData = await db.get(['description'], user.id)
            resolve(userData.description)
        } catch (err) {
            db.insertUsers([user])
            resolve('Hello, world!')
        }
    }) 
}