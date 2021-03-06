var xhr = new XMLHttpRequest();
var req = new XMLHttpRequest();
var currentId, chatId = []
var url = '/api/v9/channels/{ChannelID}/messages'
var delMsg = (idx = 0) => {
    if (idx < chatId.length && chatId.length > 0){
        req.open('DELETE', url+"/"+chatId[idx]);
        req.setRequestHeader('X-RateLimit-Limit', 2);
        req.setRequestHeader('X-RateLimit-Remaining', 0);
        req.setRequestHeader('authorization', token);
        req.send();
        console.log("Delete "+chatId[idx]);
        setTimeout(() => delMsg(idx+1), 3000);
    }
    else {
        console.log("End of list");
        chatId = [];
        getEndId();
        setTimeout(() => delMsg(), 10000);
    }
}
xhr.open('GET', url+'?limit=100');
xhr.setRequestHeader('X-RateLimit-Limit', 2);
xhr.setRequestHeader('X-RateLimit-Remaining', 0);
xhr.setRequestHeader('authorization', token);
xhr.responseType = 'text';
var getEndId = () => {
    console.log("Collecting New ID List...");
    xhr.open('GET', url+'?before='+currentId);
    xhr.setRequestHeader('X-RateLimit-Limit', 2);
    xhr.setRequestHeader('X-RateLimit-Remaining', 0);
    xhr.setRequestHeader('authorization', token);
    xhr.send();
}

xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            for(var i = 0; i < xhr.response.length; i++) {
                if (xhr.response[i] === "i" && xhr.response[i+1] === "d") {
                    if (xhr.response[i+6] === "9") {
                        currentId = xhr.response.slice(i+6, i+24);
                    }
                    else if (xhr.response.slice(i+6, i+24) === yourUserId){
                        chatId.push(currentId);
                    }
                }
            }
        }
    }
};
// To stop : delMsg = () => console.log("STOP")
xhr.send();
