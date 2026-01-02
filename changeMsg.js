let rain = ["｀、、｀ヽ｀ヽ｀｀、ヽヽ、｀｀ヽ｀ヽ｀ヽヽ｀", 
            "ヽ｀、ヽヽ｀、ヽ｀｀、ヽ｀ヽ｀｀ヽヽ｀ヽ、ヽ", 
            "｀、｀ヽヽ｀ヽ｀、｀ヽ、｀ヽ、ヽ、ヽ｀ヽ｀ヽ", 
            "、ヽ｀ヽ｀、ヽヽ｀｀、ヽ｀、ヽヽ ｀｀ ヽ｀｀"]
let man = ["、ヽ｀ヽ｀、ヽヽ｀｀、ヽ｀、ヽヽ ｀｀ ヽ｀𐂊", 
           "｀、、｀ヽ｀ヽ｀｀、ヽヽ、｀｀ヽ｀ヽ𐂊ヽヽ｀", 
           "ヽ｀、ヽヽ｀、ヽ｀｀、ヽ｀ヽ｀｀ヽ𐂊｀ヽ、ヽ", 
           "｀、｀ヽヽ｀ヽ｀、｀ヽ、｀ヽ𐂊ヽ、ヽ｀ヽ｀ヽ", 
           "、ヽ｀ヽ｀、ヽヽ｀｀、𐂊｀、ヽヽ ｀｀ ヽ｀｀", 
           "｀、、｀ヽ｀ヽ𐂊｀、ヽヽ、｀｀ヽ｀ヽ｀ヽヽ｀", 
           "ヽ｀、ヽヽ𐂊、ヽ｀｀、ヽ｀ヽ｀｀ヽヽ｀ヽ、ヽ", 
           "｀𐂊｀ヽヽ｀ヽ｀、｀ヽ、｀ヽ、ヽ、ヽ｀ヽ｀ヽ"]

var xhr = new XMLHttpRequest();
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
        msg += man[idx%8];
        xhr.send(JSON.stringify({'content' : msg}));
        setTimeout(() => modifyMsg(channelId, msgId, idx+1), 2000); // 2500 is prequency, recommended over than 1500ms
    }
}

// ex) modifyMsg('270224375534428111', '942403621373657271.');
