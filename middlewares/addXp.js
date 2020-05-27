const db = require('../controllers/database')

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

module.exports = async msg => {
    let gainChance = random(1, 5)
    let gainXp = random(1, 5)

    if (gainChance != 1) return

    db.addXp(msg.author.id, gainXp)
}