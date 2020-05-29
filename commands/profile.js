const profileController = require('../controllers/getProfileInfo.js')
const getUserIdFromMention = require('../controllers/getUserIdFromMention')

module.exports = (msg, args) => {
    let author = msg.author

    if (!args[0]) {
        profileController(author).then(profileUserInfo => {  
            let message = `<@${author.id}>\nLevel: ${profileUserInfo.level}\nXP: ${profileUserInfo.xp}\nCoins: ${profileUserInfo.coins}\nDescription: ${profileUserInfo.description}`
    
            msg.channel.send(message)  
        })

        return
    }

    let userId = getUserIdFromMention(args[0])
    let user = msg.client.users.cache.get(userId)

    if (!user) return

    if (user.bot) return msg.channel.send('Bots não possuem um perfil!')

    profileController(user).then(profileUserInfo => {
        let message = `${user.username}'s profile\nLevel: ${profileUserInfo.level}\nXP: ${profileUserInfo.xp}\nCoins: ${profileUserInfo.coins}\nDescription: ${profileUserInfo.description}`
    
        if (user == msg.author) message = `<@${author.id}>\nLevel: ${profileUserInfo.level}\nXP: ${profileUserInfo.xp}\nCoins: ${profileUserInfo.coins}\nDescription: ${profileUserInfo.description}`

        msg.channel.send(message)
    })
}