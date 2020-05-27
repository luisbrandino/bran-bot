const insertUsers = require('../controllers/insertUsers')

module.exports = member => {
    insertUsers([member])
}