const path = require('path')
const fs = require('fs')
const config = require('../config.json')

const commandsPath = path.join(__dirname.replace('middlewares', ''), 'commands')

module.exports = async msg => {
    if (!msg.content.startsWith(config.prefix)) return

    let userCommand = msg.content.replace(config.prefix, '').trim()

    let commandSplitted = userCommand.split(/ +/)
    let args = commandSplitted.slice(1)

    fs.readdir(commandsPath, (err, files) => {
        if (err) return console.log(`Unable to continue. Error: ${err}`)

        files.forEach(file => {
            let commandFileName = file.replace('.js', '')

            if (userCommand.startsWith(commandFileName)) return require(`../commands/${file}`)(msg, args)
        })
    })
}