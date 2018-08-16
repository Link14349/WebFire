/* this is front-end of com */
/*
* WebFire v1.5
* com.js v2.0
* yhzheng©2018
*/
function connect(url) {
    if (!("WebSocket" in window)){
        this.state = false;
        return;
    }
    this.connectBy = url;
    this.ws = new WebSocket(url);
    this.responses = {};
    this.onerr = null;
    this.onclose = null;
    this.ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (this.responses[data.type]) this.responses[data.type](data);
    }
}
connect.prototype.send = function (type,value) {
    if (!this.state || !this.ws.readyState) return;
    var json = {type: type};
    for (var i in value){
        json[i] = value[i];
    }
    this.ws.send(JSON.stringify(json));
};
connect.prototype.error = function (callback) {
    if (arguments.length > 0){
        this.onerr = callback;
        return;
    }
    if (this.onerr) this.onerr();
};
connect.prototype.close = function (callback) {
    if (arguments.length > 0){
        this.onclose = callback;
        return;
    }
    if (this.onclose) this.onclose();
};
connect.prototype.on = function (type,callback) {
    this.responses[type] = callback;
};