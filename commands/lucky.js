const getUserIdFromMention = require('../controllers/getUserIdFromMention')
const answers = ["Totally not.", "Definitely not.", "No.", "Yes.", "Maybe.", "Who knows?", "I can't tell you.", "Definitely yes.", "Totally yes."]

module.exports = (msg, args) => {
    const userId = getUserIdFromMention(args[0])
    const user = msg.client.users.cache.get(userId) || msg.author

    const answer = answers[Math.floor(Math.random() * answers.length)]
    
    let message = `\`Is ${user.username} lucky?\``

    if (user == msg.author) message = `\`Are you lucky?\``

    message += `\nAnswer: ${answer}`

    msg.channel.send(message)
}