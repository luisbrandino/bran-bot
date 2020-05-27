const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')
const db = require('./controllers/database')
const dotenv = require('dotenv')
dotenv.config()

const client = new Discord.Client()
const token = process.env.TOKEN

const eventsPath = path.join(__dirname, "events")

client.on('ready', () => {
    fs.readdir(eventsPath, (err, files) => {
        if (err) return console.log(`Unable to continue. Error: ${err}`)

        files.forEach(file => {
            let eventName = file.replace('.js', '')

            client.on(eventName, require(`./events/${file}`))

            console.log(`Event ${eventName} loaded.`)
        })
    })

    db.insertUsers(client.users.cache)
})

client.login(token)