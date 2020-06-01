const giveCoins = require('../controllers/giveCoins')
const getCoins = require('../controllers/getCoins')
const roulettes = [":dog:", ":mouse:", ":cat:", ":heart:", ":purple_heart:", ":purple_circle:", ":purple_square:", ":red_square:", ":red_circle:" ]

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

function getRandomRoulettes() {
    let firstRoulette, secondRoulette, thirdRoulette

    firstRoulette = roulettes[Math.floor(Math.random() * roulettes.length)]
    secondRoulette = roulettes[Math.floor(Math.random() * roulettes.length)]
    thirdRoulette = roulettes[Math.floor(Math.random() * roulettes.length)]

    return { firstRoulette, secondRoulette, thirdRoulette }
}

async function changeRoulettesOnMessage(msg, currenciesBet) {
    let { firstRoulette, secondRoulette, thirdRoulette } = getRandomRoulettes()

    let messageContent = `
    ==============
        ${firstRoulette} ${secondRoulette} ${thirdRoulette}    <-
==============
Your bet: ${currenciesBet}
    `
    await msg.edit(messageContent)

    return [firstRoulette, secondRoulette, thirdRoulette]
}

function isRewarded(roulettes) {
    let firstRoulette = roulettes[0]
    let secondRoulette = roulettes[1]

    const matchesFirstRoulette = roulettes.filter(v => v == firstRoulette) 

    switch (matchesFirstRoulette.length) {
        case 2:
            return { matches: 2 }
        case 3:
            return { matches: 3 }
    }

    const matchesSecondRoulette = roulettes.filter(v => v == secondRoulette)

    switch (matchesSecondRoulette.length) {
        case 2:
            return { matches: 2 }
    }

    return false
}

module.exports = async (msg, args) => {
    const user = msg.author

    if (args[0] && Number(args[0])) {
        const currenciesBet = Number(args[0])

        const userCoins = await getCoins(user)

        if (currenciesBet > userCoins) return msg.channel.send(`<@${user.id}>, you don't have this balance.`)
        if (currenciesBet <= 0) return msg.channel.send(`<@${user.id}>, please tell a valid value.`)

        let { firstRoulette, secondRoulette, thirdRoulette } = getRandomRoulettes()
        let messageContent = `
        ==============
        ${firstRoulette} ${secondRoulette} ${thirdRoulette}    <-
==============
Your bet: ${currenciesBet}
        `

        const message = await msg.channel.send(messageContent)

        let lastRoulettes
        let isWon

        for (let i = 0; i < 5; i++) {
            await wait(750)
            lastRoulettes = await changeRoulettesOnMessage(message, currenciesBet)
        }

        isWon = isRewarded(lastRoulettes)

        if (isWon) {
            let coinsWon

            switch (isWon.matches) {
                case 2:
                    coinsWon = (currenciesBet / 2)

                    await giveCoins(coinsWon, user)

                    return msg.channel.send(`<@${user.id}>, you won ${coinsWon} coins!`)
                
                case 3:
                    coinsWon = Number(currenciesBet)

                    await giveCoins(coinsWon, user)

                    return msg.channel.send(`<@${user.id}>, you won ${coinsWon} coins!`)
            }
        }
        
        await giveCoins(-Number(currenciesBet), user)

        return msg.channel.send(`<@${user.id}>, you lost everything!`)
    }

    return msg.channel.send(`<@${user.id}>, please tell a valid value.`)
}