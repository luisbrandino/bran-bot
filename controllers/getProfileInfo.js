const insertUsers = require('../controllers/insertUsers')
const db = require('./database')

module.exports = user => {
    return new Promise((resolve) => {
        let userProfile = {
            level: 0,
            xp: 0,
            coins: 0,
            description: 'Hello, world!'
        }

        let query = `SELECT level, xp, coins, description FROM users WHERE id = '${user.id}'`

        db.all(query, (err, rows) => {
            if (err) return console.log(`Error: ${err}`)
                    
            if (!rows.length == 0) {
                userProfile = {
                    level: rows[0].level,
                    xp: rows[0].xp,
                    coins: rows[0].coins,
                    description: rows[0].description
                }
            } else {
                insertUsers([user])
            }

            resolve(userProfile)
        })
    })
}