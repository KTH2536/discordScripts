let rain = ["｀、、｀ヽ｀ヽ｀｀、ヽ｀、｀、ヽ、｀、ヽ｀、", 
            "ヽ｀、ヽ｀｀、｀、｀、ヽ｀ヽ｀｀、ヽ｀｀、ヽ", 
            "｀、、｀、｀ヽ｀、｀ヽ、｀｀、ヽ、ヽ｀、｀｀", 
            "、ヽ｀ヽ｀、、ヽ｀｀、ヽ｀、、ヽ｀｀、、｀｀"]

            // <:emoji_name:emoji_id> / animated : <a:emoji_name:emoji_id>
let msgs = ["💥<:pistolright:1155387541881638962><:sadcat:1455855200454836346><:pistolleft:1155386479502168064>💥",
            "✴️<:pistolright:1155387541881638962><:sadcat:1455855200454836346><:pistolleft:1155386479502168064>✴️"];

var xhr = new XMLHttpRequest();
let token = "" // authorization

var modifyMsg = (channelId, msgId, idx = 1, idx2 = 0) => {
    if (1){
        xhr.open('PATCH', '/api/v9/channels/'+channelId+'/messages/'+msgId, true); 
        xhr.setRequestHeader('X-RateLimit-Limit', 5);
        xhr.setRequestHeader('X-RateLimit-Remaining', 0);
        xhr.setRequestHeader('authorization', token); // USER TOKEN MUST BE ASSIGN
        xhr.setRequestHeader('Content-Type', 'application/json');
        let msg = "";
        let lines = 10; // 몇줄?
        let i, temp;
        for (i = lines; i > 0; i--) {
            temp = rain[(idx + i)%rain.length]
            msg += temp.substring((idx + i - idx2) % temp.length, temp.length) + temp.substring(0, (idx + i - idx2) % temp.length)+"\n";
        }
        temp = rain[(idx + i)%rain.length]
        let man = temp.substring((idx + i - idx2) % temp.length, temp.length - 1) + "𐂊" + temp.substring(0, (idx + i - idx2) % temp.length);
        msg += man;
        xhr.send(JSON.stringify({'content' : msg}));
        setTimeout(() => modifyMsg(channelId, msgId, ++idx, ++idx2), 10000); // 2500 is prequency, recommended over than 1500ms
    }
}

// ex) modifyMsg('270224375534428111', '942403621373657271.');
