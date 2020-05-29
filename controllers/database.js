const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./bran.db')

db.findProfile = user => {
    return new Promise((resolve, reject) => {
        let query = `SELECT level, xp, coins, description FROM users WHERE id = '${user.id}'`

        db.all(query, (err, rows) => {
            if (err) return console.log(`An error ocurred: ${err}`)

            if (!rows.length) return reject('User not found in database')

            resolve({
                level: rows[0].level,
                xp: rows[0].xp,
                coins: rows[0].coins,
                description: rows[0].description
            })
        })
    })
}

db.insertUsers = async users => {
    users.forEach(user => {
        if (user.bot) return

        let consultUser =  `SELECT * FROM users WHERE id = ${user.id}`

        db.all(consultUser, (err, rows) => {
            if (err) return console.log(`An error ocurred: ${err}`)

            if (!rows.length > 0) {
                let insertUser = `INSERT INTO users (id, level, xp, coins, description) VALUES (${user.id}, 0, 0, 0, 'Hello, world!')`

                db.run(insertUser, (result, err) => {
                    if (err) return console.log(`An error ocurred: ${err}`)

                    console.log(`User ${user.username} inserted`)
                })
            }
        })
    })
}

db.get = (attributes, userId) => {
    return new Promise((resolve, reject) => {
        let consultAttributes = ''

        for (let i = 0; i < attributes.length; i++) {
            if (attributes.length == i+1) { 
                consultAttributes += attributes[i] 
            } else {
                consultAttributes += (attributes[i] + ',')
            }
        }

        let query = `SELECT ${consultAttributes} FROM users WHERE id = '${userId}'`

        db.all(query, (err, rows) => {
            if (err) return console.log(`An error ocurred: ${err}`)

            if (rows.length === 0) { reject('User not found in database'); return }

            resolve(rows[0])
            return
        })
    })
}

db.set = (attributes, userId) => {
    for (let key in attributes) {
        let query = `UPDATE users SET ${key} = '${attributes[key]}' WHERE id = '${userId}'`

        db.run(query, (err, rows) => {
            if (err) return console.log(`An error ocurred: ${err}`)
        })
    }
}

module.exports = db