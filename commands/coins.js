const coinsController = require('../controllers/getCoins.js')
const getUserIdFromMention = require('../controllers/getUserIdFromMention')

module.exports = (msg, args) => {
    let message

    let mentionId = getUserIdFromMention(args[0])
    let user = msg.client.users.cache.get(mentionId) || msg.author

    coinsController(user).catch(err => console.log(err)).then(coins => {
        message = `${user.username}'s balance is ${coins} coins.`

        if (user == msg.author) message = `Your balance is ${coins} coins.`

        msg.channel.send(message)
    })
}