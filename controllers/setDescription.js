const db = require('./database')

module.exports = (newDescription, user) => {
    db.set({ description: newDescription }, user.id)
}