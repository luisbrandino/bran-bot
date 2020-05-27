module.exports = (msg, args) => {
    return msg.channel.send(`<@${msg.author.id}> :ping_pong: Pong!`)
}