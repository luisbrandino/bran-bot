const path = require('path')
const fs = require('fs')
const config = require('../config.json')

const commandsPath = path.join(__dirname.replace('middlewares', ''), 'commands')

module.exports = async msg => {
    if (!msg.content.startsWith(config.prefix)) return

    let userCommand = msg.content.replace(config.prefix, '')

    fs.readdir(commandsPath, (err, files) => {
        if (err) return console.log(`Unable to continue. Error: ${err}`)

        files.forEach(file => {
            let commandFileName = file.replace('.js', '')

            if (userCommand == commandFileName) return require(`../commands/${file}`)(msg)
        })
    })
}