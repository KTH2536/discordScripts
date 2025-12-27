var xhr = new XMLHttpRequest();
var req = new XMLHttpRequest();
let ChannelID = "" // 개발자 모드로 채널 우클릭 시 ID 복사 활성화
let token = "" // 개발자 도구의 Network 탭에서 Authorization 항목 값
let targetId = "" // 개발자 모드로 유저 우클릭 시 ID 복사 활성화
let currentId;
let chatId = [];
var url = `/api/v9/channels/${ChannelID}/messages`
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
            let jsonRes = JSON.parse(xhr.response);
            for (let i = 0; i < jsonRes.length; i++)
            {
                if (jsonRes[i].author.id === targetId)
                {
                    chatId.push(jsonRes[i].id)
                }
            }
            currentId = jsonRes[99].id;
        }
    }
};
// To Start : delMsg();
// To stop : delMsg = () => console.log("STOP")
xhr.send();
