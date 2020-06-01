const channelsPlaying = []
const fs = require('fs')
const giveCoins = require('../controllers/giveCoins')
const getUserIdFromMention = require('../controllers/getUserIdFromMention')

function findElementInArray(array, elementToFind) {
    for (let element of array) {
        if (element == elementToFind) return true
    }

    return false
}

function getRandomWordFromFile(filename) {
    return new Promise(resolve => {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) return console.log(err)

            let words = data.split('\n')

            resolve(words[Math.floor(Math.random() * words.length)].toLowerCase().replace(/(\r\n|\n|\r)/gm, ""))
        })
    })
}

function findCorrectLettersInResponse(response, correctLetters) {
    let correctLettersIndex = []

    for (let i = 0; i < correctLetters.length; i++) {
        if (correctLetters[i] == response) {
            correctLettersIndex.push(i)
        }
    }
 
    return correctLettersIndex
}

function hideSplittedWord(word) {
    let hiddenSplittedWord = []

    for (let i = 0; i < word.length; i++) {
        hiddenSplittedWord[i] = '- '
    }

    return hiddenSplittedWord
}

function splitString(string) {
    return string.split(/(?!$)/u)
}

module.exports = async (msg, args) => {
    const messageChannelId = msg.channel.id
    const userId = getUserIdFromMention(args[0])
    let user = msg.client.users.cache.get(userId)

    if (!user) {
        user = msg.author

        if (findElementInArray(channelsPlaying, messageChannelId)) return msg.channel.send(`<@${user.id}>, já há um jogo ocorrendo nesse canal.`)

        channelsPlaying.push(messageChannelId)

        const gameInfo = {
            currentLives: 5,
            word: await getRandomWordFromFile('commands/words.txt')
        }

        gameInfo.splittedWord = splitString(gameInfo.word)
        gameInfo.hiddenSplittedWord = hideSplittedWord(gameInfo.splittedWord)

        const filter = response => response.author == user
        const collector = msg.channel.createMessageCollector(filter, { time: 999999 })

        msg.channel.send(`Palavra: ${gameInfo.hiddenSplittedWord.join('')}\nVidas: ${':heart:'.repeat(gameInfo.currentLives) + 'x'.repeat(5 - gameInfo.currentLives)}`)

        collector.on('collect', message => {
            let hunch = message.content
            let correctIndices = findCorrectLettersInResponse(hunch, gameInfo.splittedWord)
 
            if (correctIndices.length) {
                for (let correctIndex of correctIndices) {
                    gameInfo.hiddenSplittedWord[correctIndex] = gameInfo.splittedWord[correctIndex]
                }

                if (gameInfo.hiddenSplittedWord.join('') == gameInfo.word) {
                    msg.channel.send('Ganhou!')
                    giveCoins(150, user)

                    return collector.stop()
                }
            } else {
                if (hunch == gameInfo.word) {
                    msg.channel.send('Ganhou!')
                    giveCoins(150, user)

                    return collector.stop()
                }

                gameInfo.currentLives--
            }

            if (gameInfo.currentLives <= 0) { msg.channel.send(`Suas vidas acabaram! A palavra era: ${gameInfo.word}`); return collector.stop()}

            msg.channel.send(`Palavra: ${gameInfo.hiddenSplittedWord.join('')}\nVidas: ${':heart:'.repeat(gameInfo.currentLives) + ':x:'.repeat(5 - gameInfo.currentLives)}`)
        })

        collector.on('end', () => {
            channelsPlaying.splice(channelsPlaying.findIndex(value => value == msg.channel.id), 1)
        })
    }
}