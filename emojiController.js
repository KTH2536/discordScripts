var xhr = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();
var tagEmoji = (channelId, messageId, emoji) => {
    xhr.open('PUT', '/api/v9/channels/'+channelId+'/messages/'+messageId+'/reactions/'+emoji+'/@me', true);
    xhr.setRequestHeader('X-RateLimit-Limit', 5);
    xhr.setRequestHeader('X-RateLimit-Remaining', 0);
    xhr.setRequestHeader('authorization', token);
    xhr.send();
    setTimeout(() => {
        xhr2.open('DELETE', '/api/v9/channels/'+channelId+'/messages/'+messageId+'/reactions/'+emoji+'/@me', true);
        xhr2.setRequestHeader('X-RateLimit-Limit', 5);
        xhr2.setRequestHeader('X-RateLimit-Remaining', 0);
        xhr2.setRequestHeader('authorization', token);
        xhr2.send();
        setTimeout(() => tagEmoji(channelId, messageId, emoji), 800);
    }, 800);
}
// You can get emoji from network tab

// emoji arrays put-delete
var xhr = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();
var tagEmoji = (channelId, messageId, emoji) => {
    if (~~(cnt / 5) % 2 == 0) {
        xhr.open('PUT', '/api/v9/channels/'+channelId+'/messages/'+messageId+'/reactions/'+emoji[cnt%5]+'/@me', true);
        xhr.setRequestHeader('X-RateLimit-Limit', 5);
        xhr.setRequestHeader('X-RateLimit-Remaining', 0);
        xhr.setRequestHeader('authorization', token);
        xhr.send();
    }
    else {
       xhr2.open('DELETE', '/api/v9/channels/'+channelId+'/messages/'+messageId+'/reactions/'+emoji[emoji.length-1-cnt%5]+'/@me', true);
       xhr2.setRequestHeader('X-RateLimit-Limit', 5);
       xhr2.setRequestHeader('X-RateLimit-Remaining', 0);
       xhr2.setRequestHeader('authorization', token);
       xhr2.send();
    }
    cnt++;
    setTimeout(() => tagEmoji(channelId, messageId, emoji), 800);
}
