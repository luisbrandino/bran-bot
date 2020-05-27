module.exports = msg => {
    return msg.channel.send(`<@${msg.author.id}> :ping_pong: Pong!`)
}