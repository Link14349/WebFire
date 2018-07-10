/* 
* in this file
* you can coding your index code for game
* ***************************************
* WebFire v1.5
* yhzheng©2018
*/
var text = new role({
    image: "#aaa",
    width: screen.width,
    height: screen.height,
    type: "color",
    name: "txt",
    pos: "main"
});
var title = new role({
    image: "../" + OUT_TEXT,
    width: 500,
    height: 100,
    type: "img",
    x: screen.width / 2 - 250,
    y: 0,
    name: "title",
    pos: "main"
});
var says = new role({
    image: "../" + OUT_TEXT,
    width: 200,
    height: 100,
    type: "img",
    x: 0,
    y: screen.width / 2 - 100,
    name: "says",
    pos: "main"
});
var foot = new role({
    image: "../" + OUT_TEXT,
    width: 200,
    height: 20,
    type: "img",
    x: screen.width / 2 - 100,
    y: 625,
    name: "foot",
    pos: "main"
});
var ball = new role({
    image: "#f36",
    width: 100,
    height: 100,
    type: "color",
    name: "ball",
    pos: "main",
});
ball.circle(100);
ball.webEntity.draggable({cursor: "move",scroll: false,stop: function() {
    ball.move(ball.webEntity.css("x"),ball.webEntity.css("y"));
}});
ball.setText({
    text: "a small game engine",
    size: "17px",
    color: "#fff"
});
ball.webEntity.css({
    "line-height": "30px"
});
var textChar = "";
text.setText({
    text: "hello<br/>WebFire",
    color: "#eee",
    size: "250px"
});
title.setText({
    text: "demo",
    color: "#333",
    size: "50px"
});
foot.setText({
    text: "yhzheng©2018",
    color: "#fff",
    size: "50px"
});
text.showShadow({
    x: 10,
    y: 10,
    color: "rgba(100,100,100,0.5)"
});
title.showShadow({
    x: 5,
    y: 5,
    color: "rgba(100,100,100,0.5)"
});
says.showShadow({
    x: 2,
    y: 2,
    color: "rgba(100,100,100,0.5)"
});
foot.showShadow({
    x: 8,
    y: 8,
    color: "rgba(100,100,100,0.5)"
})
setInterval(function () {
    text.setText({
        text: "hello<br/>WebFire" + textChar,
        color: "#eee",
        size: "250px"
    });
    if (textChar.length < 3){
        textChar += "!";
    } else {
        textChar = "";
    }
},1000);
says.setCss({
    "cursor": "pointer"
});
says.posEntity.on("mousemove",function (e) {
    if (leaveObj(says).length === 0 && (e.pageX - (says.width / 2)) > says.x){
        return;
    }
    says.move(e.pageX - (says.width / 2),says.y);
});
text.webEntity.on("click",function () {
    text.broadcast({type: ""});
});\