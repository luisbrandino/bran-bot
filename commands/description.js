const setDescription = require('../controllers/setDescription')
const getDescription = require('../controllers/getDescription')
const getUserIdFromMention = require('../controllers/getUserIdFromMention')

module.exports = async (msg, args) => {
    const userId = getUserIdFromMention(args[0])
    const user = msg.client.users.cache.get(userId) || msg.author

    if (user == msg.author) {
        if (args[0]) {
            if (args[0].trim().toLowerCase() == 'set') {
                if (!args[1]) return msg.channel.send(`<@${user.id}>, please tell a new description.`)

                let newDescription = args.slice(1, args.length).join(' ')

                if (!newDescription) return msg.channel.send(`<@${user.id}>, please tell a new description.`)

                if (newDescription.length > 50) return msg.channel.send(`<@${user.id}>, you reached 50 character limit.`)

                setDescription(newDescription, user)

                return msg.channel.send(`<@${user.id}>, your description is now \`${newDescription}\``)
            } else if (msg.client.users.cache.get(getUserIdFromMention(args[0]))) {
                const userDescription = await getDescription(user)

                return msg.channel.send(`Your description is \`${userDescription}\``)                
            }

            return msg.channel.send(`<@${user.id}>, param \`${args[0].trim().toLowerCase()}\` not found.`)
        } else {
            const userDescription = await getDescription(user)

            return msg.channel.send(`Your description is \`${userDescription}\``)
        }
    } else {
        const userDescription = await getDescription(user)

        return msg.channel.send(`${user.username}'s description is \`${userDescription}\``)
    }
}