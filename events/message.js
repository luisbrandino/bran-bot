const path = require('path')
const fs = require('fs')

const middlewaresPath = path.join(__dirname.replace('events', ''), 'middlewares')

module.exports = msg => {
    fs.readdir(middlewaresPath, (err, files) => {
        if (err) return console.log(`Unable to continue. Error: ${err}`)

        files.forEach(file => {
            require(`../middlewares/${file}`)(msg)
        })
    })
}