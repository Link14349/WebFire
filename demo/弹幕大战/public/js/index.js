var posY = screen.height - 200;
var me = new role({
    image: "img/me.png",
    width: 100,
    height: 50,
    type: "img",
    name: "me",
    x: screen.width / 2 - 50,
    y: posY,
    pos: "main"
});
var bullet = new role({
    image: "webfire/img/outText.png",
    width: 100,
    height: 100,
    type: "img",
    name: "bullet",
    x: me.x,
    y: me.y - 5,
    pos: "main"
});
var em = new role({
    image: "webfire/img/outText.png",
    width: 50,
    height: 50,
    type: "img",
    name: "em",
    x: 0,
    y: 50,
    pos: "main"
});
var blood = $("#bloodNum");
var kill = $("#killNum");
var bloodNum = 20;
var killNum = 0;
var can = false;
var texts = ["emmm","哈哈","→_→","打call","尬聊","你的良心不会痛吗？","惊不惊喜，意不意外","皮皮虾，我们走","扎心了，老铁","还有这种操作？","怼","你有freestyle吗？","油腻"];
bullet.setText({
    text: "^",
    size: 30,
    color: "#f00"
});
me.setCss({
    "z-index": "1"
});
bullet.setCss({
    "z-index": "0"
});
em.setCss({
    "z-index": "-1"
});
bullet.webEntity.fadeOut(0);
em.webEntity.fadeOut(0);
me.speed = 3;
$(document).keydown(function (e) {
    switch (e.keyCode){
        case 32:// space
            var newBullet = bullet.copy();
            newBullet.setText({
                text: "^",
                color: "#f00",
                size: 30
            });
            var Interval = setInterval(function () {
                if (newBullet.die){
                    clearInterval(Interval);
                } else {
                    newBullet.run(270);
                    if (newBullet.y <= 60){
                        newBullet.del("none",0);
                        clearInterval(Interval);
                    }
                }
            },10);
            window.moveTo(0,0);
            break;
        case 13:
            can = false;
            for (var i = 0 ; i < 15 ; i++){
                for (var j = 0 ; j < 5 ; j++){
                    var newBullet = bullet.copy();
                    newBullet.setText({
                        text: "^",
                        color: "#f00",
                        size: 30
                    });
                    newBullet.move(i * 30 + me.x,j * 30 + 300);
                }
            }
            setTimeout(function () {
                can = true;
            },10000);
            break;
    }
});
var gameLoop = setInterval(function () {
    var newEm = em.copy();
    newEm.move(Math.floor(Math.random() * screen.width - 100),newEm.y);
    newEm.setText({
        text: texts[Math.floor(Math.random() * texts.length)],
        size: 10,
        color: color.hex({
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
        })
    });
    var interval = setInterval(function () {
        newEm.run(90);
        var collisionObjs = collisionObj(newEm);
        if (collisionObjs.length){
            for (var i = 0 ; i < collisionObjs.length ; i++){
                if (collisionObjs[i].name == "bullet"){
                    newEm.del("none",0);
                    killNum++;
                    kill.html(killNum);
                    collisionObjs[i].del("none",0);
                    gameObjs.splice(collisionObjs[i].id,1);
                    clearInterval(interval);
                    break;
                } else if (collisionObjs[i].name == "me"){
                    newEm.del("none",0);
                    clearInterval(interval);
                    bloodNum--;
                    blood.html(bloodNum);
                    if (bloodNum <= 0){
                        clearInterval(gameLoop);
                        for (var j in gameObjs){
                            gameObjs[j].del("none",0);
                        }
                        alert("游戏结束");
                    }
                }
            }
        }
        if (newEm.y >= (screen.height - 200)){
            newEm.del("none",0);
            clearInterval(interval);
        }
    },100);
},100);
$(document).mousemove(function (e) {
    me.move(e.pageX - 50,posY);
    bullet.move(e.pageX - 50,posY - 5);
});
setTimeout(function () {
    can = true;
},10000);
var movie = $("#movie");
movie.attr("width",screen.width + "px");
movie.attr("height",screen.height - 125 + "px");