/*this is back-end of com*/
/*
* WebFire v1.5
* main.js v1.0
* yhzheng©2018
*/
/*API*/
var WebSocketServer,wss;
var fun = {};
var saves = {};
var wsOut;

const DEFINED = true;

function setWS(port) {
    WebSocketServer = require('ws').Server;
    wss = new WebSocketServer({ port: port });
}
wss.on('connection', function (ws) {
    wsOut = ws;
    ws.on("open", function () {
    });
    ws.on("message", function (message) {
        message = JSON.parse(message);
        if (fun[message.type] === undefined){
            return;
        }
        trigger(message.type,message);
    });
    ws.on("close",function () {
    });
    ws.on("error",function () {
    });
});
function error(err) {
    throw err;
}
function on(type,callback) {
    if (typeof callback !== "function"){
        error("callback is not a function");
    }
    fun[type] = callback;
}
function addSaves(name) {
    saves[name] = DEFINED;
}
function setSaves(name,num) {
    saves[name] = num;
}
function getSaves(name){
    return saves[name];
}
function trigger(name,value) {
    fun[name](value);
}