var xhr = new XMLHttpRequest();
var req = new XMLHttpRequest();
var currentId, chatId = [];
var delMsg = (idx = 0) => {
    req.open('DELETE', url+"/"+chatId[idx]);
    req.setRequestHeader('X-RateLimit-Limit', 2);
    req.setRequestHeader('X-RateLimit-Remaining', 0);
    req.setRequestHeader('authorization', token);
    req.send();
    console.log("Delete "+chatId[idx]);
    if (idx < chatId.length - 1 && chatId.length > 0){
        setTimeout(() => delMsg(idx+1), 3000);
    }
    else {
        console.log("End of list");
        getEndId();
        setTimeout(() => delMsg(idx+1), 10000);
    }
}
xhr.open('GET', url+'?limit=50');
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
                    else if (xhr.response.slice(i+6, i+24) === "341617438883840000"){
                        chatId.push(currentId);
                    }
                }
            }
        }
    }
};
// To stop : delMsg = () => console.log("STOP)
xhr.send();
