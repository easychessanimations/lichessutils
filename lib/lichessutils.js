const fetch = require("node-fetch")

const streamBotGameUrl = gameId => `https://lichess.org/api/bot/game/stream/${gameId}`
const makeBotMoveUrl = (gameId, bestmove) => `https://lichess.org/api/bot/game/${gameId}/move/${bestmove}`
const acceptChallengeUrl = challengeId => `https://lichess.org/api/challenge/${challengeId}/accept`
const postChatUrl = gameId => `https://lichess.org/api/bot/game/${gameId}/chat`

function postApi(props){    
    if(props.log) console.log("postApi", props)

    let headers = {}

    if(props.token) headers.Authorization = `Bearer ${props.token}`                        
    if(props.contentType) headers["Content-Type"] = props.contentType

    let request = {
        method: "POST",
        body: props.body || "",
        headers: headers
    }

    console.log("postApi request", request)

    fetch(props.url, request)
    .then(response=>response.text().then(content =>{
        if(props.callback) props.callback(content)
    }))
}

function gameChat(gameId, room, text, log, callback){	
    let rooms = [room]
    if(room == "all") rooms = ["player", "spectator"]
    for(currentRoom of rooms) postApi({
        url: postChatUrl(gameId), log: typeof log != "undefined" ? log : true, token: process.env.TOKEN,
        body: `room=${currentRoom}&text=${text}`,
        contentType: "application/x-www-form-urlencoded",
        callback: callback || (content => console.log(`chat response: ${content}`))
    })
}

module.exports = {
    streamBotGameUrl : streamBotGameUrl,
    makeBotMoveUrl : makeBotMoveUrl,
    acceptChallengeUrl : acceptChallengeUrl,
    postChatUrl : postChatUrl,
    streamEventsUrl : `https://lichess.org/api/stream/event`,
    postApi: postApi,
    gameChat: gameChat
}
