const db = require('./database')

module.exports = (users) => {
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