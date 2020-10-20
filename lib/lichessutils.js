const fetch = require("node-fetch")

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

module.exports = {
    streamBotGameUrl : gameId => `https://lichess.org/api/bot/game/stream/${gameId}`,
    makeBotMoveUrl : (gameId, bestmove) => `https://lichess.org/api/bot/game/${gameId}/move/${bestmove}`,
    acceptChallengeUrl : challengeId => `https://lichess.org/api/challenge/${challengeId}/accept`,
    postChatUrl : gameId => `https://lichess.org/api/bot/game/${gameId}/chat`,
    streamEventsUrl : `https://lichess.org/api/stream/event`,
    postApi: postApi
}