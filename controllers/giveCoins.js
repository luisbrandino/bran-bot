const db = require('./database')

module.exports = async (value, user) => {
    try {
        let userData = await db.get(['coins'], user.id)

        userData.coins += value

        db.set(userData, user.id)
    } catch (err) {
        await db.insertUsers([user])

        db.set({ coins: value }, user.id)
    }
}