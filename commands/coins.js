const coinsController = require('../controllers/getCoins.js')

function getUserIdFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return mention
    }
}

module.exports = (msg, args) => {
    let message

    let mentionId = getUserIdFromMention(args[0])
    let user = msg.client.users.cache.get(mentionId) || msg.author

    coinsController(user).catch(err => console.log(err)).then(coins => {
        message = `${user.username}'s balance is ${coins}`

        if (user == msg.author) message = `Your balance is ${coins}.`

        msg.channel.send(message)
    })
}