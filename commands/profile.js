const profileController = require('../controllers/getProfileInfo.js')

module.exports = msg => {
    let author = msg.author
    
    profileController(author).then(profileUserInfo => {  
        let message = `<@${author.id}>\nLevel: ${profileUserInfo.level}\nXP: ${profileUserInfo.xp}\nCoins: ${profileUserInfo.coins}\nDescription: ${profileUserInfo.description}`

        msg.channel.send(message)  
    })
}