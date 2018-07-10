/*this is front-end of com*/
/*
* WebFire v1.5
* com.js v1.0
* yhzheng©2018
*/
var ws;
var fun = {};
function connet(url) {
    if (!("WebSocket" in window)){
        alert("你的浏览器不支持WebSocket,请下载后再进行聊天!");
        ws.onopen = function () {
        };
        ws.onmessage = function (message) {
            var data = JSON.parse(message.data);
            fun[data.type](data);
        };
    } else {
        ws = new WebSocket(url);
    }
}
function on(name,callback) {
    fun[name] = callback;
}
function send(message) {
    ws.send(JSON.stringify(message));
}