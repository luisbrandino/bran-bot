const db = require('../controllers/database')

module.exports = async msg => {
    let user = msg.author
    let userProfile = {}

    try {
        userProfile = await db.findProfile(user)
    } catch (v) {
        db.insertUsers([user])
        return
    }

    if (userProfile.xp >= (userProfile.level || 1) * (userProfile.level * 300)) {
        userProfile.xp = userProfile.xp - ((userProfile.level || 1) * (userProfile.level * 300))
        userProfile.level += 1

        db.set({ level: userProfile.level, xp: userProfile.xp }, user.id)
    }
}