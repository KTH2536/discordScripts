let rain = ["｀、、｀ヽ｀ヽ｀｀、ヽヽ、｀｀ヽ｀ヽ｀ヽヽ｀", 
            "ヽ｀、ヽヽ｀、ヽ｀｀、ヽ｀ヽ｀｀ヽヽ｀ヽ、ヽ", 
            "｀、｀ヽヽ｀ヽ｀、｀ヽ、｀ヽ、ヽ、ヽ｀ヽ｀ヽ", 
            "、ヽ｀ヽ｀、ヽヽ｀｀、ヽ｀、ヽヽ ｀｀ ヽ｀｀"]

            // <:emoji_name:emoji_id> / animated : <a:emoji_name:emoji_id>
let msgs = ["💥<:pistolright:1155387541881638962><:sadcat:1455855200454836346><:pistolleft:1155386479502168064>💥",
            "✴️<:pistolright:1155387541881638962><:sadcat:1455855200454836346><:pistolleft:1155386479502168064>✴️"];

var xhr = new XMLHttpRequest();
let token = "" // authorization

var modifyMsg = (channelId, msgId, idx = 1) => {
    if (1){
        xhr.open('PATCH', '/api/v9/channels/'+channelId+'/messages/'+msgId, true); 
        xhr.setRequestHeader('X-RateLimit-Limit', 5);
        xhr.setRequestHeader('X-RateLimit-Remaining', 0);
        xhr.setRequestHeader('authorization', token); // USER TOKEN MUST BE ASSIGN
        xhr.setRequestHeader('Content-Type', 'application/json');
        let msg = "";
        msg += rain[idx%4]+"\n";
        msg += rain[(idx+1)%4]+"\n";
        msg += rain[(idx+2)%4]+"\n";
        msg += rain[(idx+3)%4]+"\n";
        msg += rain[idx%4]+"\n";
        msg += rain[(idx+1)%4]+"\n";
        msg += rain[(idx+2)%4]+"\n";
        let man = rain[(idx+3)%4];
        man = man.substring(0, man.length-(idx%man.length))+"𐂊"+man.substring(man.length-(idx%man.length)+1, man.length+1);
        msg += man;
        xhr.send(JSON.stringify({'content' : msg}));
        setTimeout(() => modifyMsg(channelId, msgId, idx+1), 10000); // 10000 is prequency, 1000 => 1 sec
    }
}

// ex) modifyMsg('270224375534428111', '942403621373657271.');
