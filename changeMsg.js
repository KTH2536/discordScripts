var xhr = new XMLHttpRequest();
let token = ""; // authorization value
let msgs = ["💥<:pistolright:1155387541881638962><:sadcat:1455855200454836346><:pistolleft:1155386479502168064>💥", "✴️<:pistolright:1155387541881638962><:sadcat:1455855200454836346><:pistolleft:1155386479502168064>✴️"]; // <:emoji_name:emoji_id> / animated : <a:emoji_name:emoji_id>
var modifyMsg = (channelId, msgId, idx = 0) => {
    if (1){
        xhr.open('PATCH', '/api/v9/channels/'+channelId+'/messages/'+msgId, true); 
        xhr.setRequestHeader('X-RateLimit-Limit', 5);
        xhr.setRequestHeader('X-RateLimit-Remaining', 0);
        xhr.setRequestHeader('authorization', token); // USER TOKEN MUST BE ASSIGN
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({'content' : msgs[idx%msgs.length]}));
        setTimeout(() => modifyMsg(channelId, msgId, idx+1), 2000); // 1000 tick => 1 second. 2000 is 2sec prequency, recommended over than 1500ms
    }
}

// ex) modifyMsg('270224375534428111', '942403621373657271.');
