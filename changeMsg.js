var xhr = new XMLHttpRequest();
var modifyMsg = (channelId, msgId, msg, idx = 0) => {
    if (idx < msg.length){
        console.log("printing : " + msg.slice(0, idx+1));
        xhr.open('PATCH', '/api/v9/channels/'+channelId+'/messages/'+msgId, true); 
        xhr.setRequestHeader('X-RateLimit-Limit', 5);
        xhr.setRequestHeader('X-RateLimit-Remaining', 0);
        xhr.setRequestHeader('authorization', token); // USER TOKEN MUST BE ASSIGN
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({'content' : msg.slice(0, idx+1)}));
        setTimeout(() => modifyMsg(channelId, msgId, msg, idx+1), 2500); // 2500 is prequency, recommended over than 1500ms
    }
}
// ex) modifyMsg('270224375534428111', '942403621373657271.', "TEST MSG");
