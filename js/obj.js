/*
* WebFire v1.5
* obj.js v1.4
* yhzheng©2018
*/

var gameObjs = [];

const OUT_TEXT = "img/outText.png";
const DOCUMENT_ENTITY = $(document);
const TRANSPARENT = "agba(255,255,255,0)";
const MOVE_TYPES = {
    "nomove": "absolute",
    "move": "fixed"
};
const DIE_STYLE = {
    "fade": function (webEntity,time) {
        webEntity.fadeOut(time);
    },
    "hide": function (webEntity,time) {
        webEntity.hide(webEntity,time);
    },
    "none": function () {}
};
var color = {
    hex: function (rgb) {
        if (typeof rgb == "string")
            rgb = color.obj_rgb(rgb);
        var red = rgb.r;
        var green = rgb.g;
        var blue = rgb.b;
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        if (red.length == 1)
            red = red + red;
        if (green.length == 1)
            green = green + green;
        if (blue.length == 1)
            blue = blue + blue;
        var hex = {
            r: red,
            g: green,
            b: blue,
        };
        hex.toString = function (){
            return "#" + this.r + this.g + this.b;
        }
        return hex;
    },
    rgb: function (hex) {
        if (typeof hex == "object")
            hex = hex.toString();
        if (hex.length != 4 && hex.length != 7)// hex first is "#"
            return NaN;
        hex = hex.split("");
        var tmp = [];
        for (var i = 1 ; i < hex.length ; i++)// rm hex[0]
            tmp.push(hex[i]);
        hex = tmp;
        var rgb = {r: 0,g: 0,b: 0};
        if (hex.length == 3){
            rgb.r = parseInt(hex[0] + hex[0],16);
            rgb.g = parseInt(hex[1] + hex[1],16);
            rgb.b = parseInt(hex[2] + hex[2],16);
        } else {
            rgb.r = parseInt(hex[0] + hex[1],16);
            rgb.g = parseInt(hex[2] + hex[3],16);
            rgb.b = parseInt(hex[4] + hex[5],16);
        }
        rgb.toString = function (){
            var string = "rgb(";
            string += this.r + ",";
            string += this.g + ",";
            string += this.b + ")";
            return string;
        };
        return rgb;
    },
    obj_rgb: function(str_rgb) {
        var rgb = {};
        var arr_rgb = str_rgb.split("(")[1].split(")")[0].split(",");
        rgb.r = arr_rgb[0];
        rgb.g = arr_rgb[1];
        rgb.b = arr_rgb[2];
        rgb.toString = function (){
            var string = "rgb(";
            string += this.r + ",";
            string += this.g + ",";
            string += this.b + ")";
            return string;
        };
        return rgb;
    },
    random: function() {
        function randomInt(){
            return Math.floor(Math.random() * 255);
        }
        var newColor = {r: randomInt(),g: randomInt(),b: randomInt()};
        newColor.toString = function (){
            var string = "rgb(";
            string += this.r + ",";
            string += this.g + ",";
            string += this.b + ")";
            return string;
        };
        newColor = newColor.toString();
        return newColor;
    },
    randomRange: function (range){
        return range[Math.floor(Math.random() * range.length)];
    }
};
class role{
    constructor(info,callback) {
        // image,width,height,type,x,y,angle,name,pos,moveType
        if (info.image == undefined)
            info.image = "#fff";
        if (info.width == undefined)
            info.width = 100;
        if (info.height == undefined)
            info.height = 100;
        if (info.type == undefined)
            info.type = "color";
        if (info.x == undefined)
            info.x = 0;
        if (info.y == undefined)
            info.y = 0;
        if (info.angle == undefined)
            info.angle = 0;
        if (info.name == undefined)
            info.name = "game-object-" + gameObjs.length;
        if (info.speed == undefined)
            info.speed = 10;
        if (info.pos == undefined)
            throw "The pos is undefined,you need set pos!";
        this.name = info.name;
        this.width = info.width;
        this.height = info.height;
        this.image = info.image;
        this.x = info.x;
        this.y = info.y;
        this.angle = info.angle;
        this.copyNum = 0;
        this.textColor = "#fff";
        this.textSize = "20px";
        this.textWeight = "bold";
        this.textAlign = "center";
        this.xOff = 0;
        this.yOff = 0;
        this.shadowColor = "rgba(255,255,255,0)";
        this.type = info.type;
        this.posEntity = $("#" + info.pos);
        this.cir = 0;
        this.broadcastNum = 0;
        this.die = false;
        this.id = gameObjs.length;
        this.speed = info.speed;
        this.styleCss = {};
        this.pos = info.pos;
        var pos = info.pos;
        if (info.moveType === undefined){
            this.moveType = MOVE_TYPES["nomove"];
            this.moveTypeText = "nomove";
        } else {
            this.moveType = MOVE_TYPES[info.moveType];
            this.moveTypeText = info.moveType;
            if (this.moveType === undefined){
                throw "TypeError:moveType can't is" + info.moveType
            }
        }

        this.children = [];

        $("#" + pos).append("<div id=\"" + this.id + "\"></div>");
        this.webEntity = $("#" + this.id);
        gameObjs.push(this);
        this.update();
        if (callback != undefined)
            callback(this,{id: this.id,name: this.name,pos: pos});
    }
    update(){
        var me = $("#" + this.id);
        if (this.type !== "color" && this.type !== "img"){
            throw "TypeError:this.type:" + this.type + " is not grammaticalness";
            return;
        }
        me.css({
                "display": "block",
                "position": this.moveType,
                "top": this.y + "px",
                "left": this.x + "px",
                "width": this.width,
                "height": this.height,
                "transform": "rotate(" + this.angle + "deg)",
                "color": this.textColor,
                "font-size": this.textSize,
                "font-weight": this.textWeight,
                "text-align": this.textAlign,
                "text-shadow": this.xOff + "px " +  this.yOff + "px " + "0 " + this.shadowColor,
                "border-radius": this.cir + "%"
            }
        );
        me.css(this.styleCss);
        if (this.type === "img"){
            me.css({
                "background-image": "url(" + this.image + ")"
            });
        } else if (this.type === "color"){
            me.css({
                "background-color": this.image
            });
        }
    }
    showShadow(info){
        if (info.open == undefined)
            info.open = true;
        if (info.open){
            var xOff = 3,yOff = 3,color = "#aaa";
            if (info.x != undefined)
                xOff = info.x;
            if (info.y != undefined)
                yOff = info.y;
            if (info.color != undefined)
                color = info.color;
            this.xOff = xOff;
            this.yOff = yOff;
            this.shadowColor = color;
        } else {
            this.xOff = 0;
            this.yOff = 0;
        }
        this.update();
    }
    change(info){
        if (info.image != undefined)
            this.image = info.image;
        if (info.width != undefined)
            this.width = info.width;
        if (info.height != undefined)
            this.height = info.height;
        if (info.angle != undefined){
            $("#" + this.id).css({
                "transform": "rotate(" + (0 - this.angle) + "deg)"
            });
            this.angle = info.angle;
        }
        if (info.speed != undefined)
            this.define("speed",speed);
        this.update();
    }
    circle(value){
        this.cir = value;
        this.update();
    }
    toMaxWidth(){
        this.width = $(document).width();
        this.update();
    }
    toMaxHeight(){
        this.height = $(document).height();
        this.update();
    }
    toMax(){
        this.width = $(document).width();
        this.height = $(document).height();
        this.update();
    }
    setText(info){
        // text,color,size,weight,anlign
        if (info.text == undefined)
            info.text = "hello world!";
        if (info.color == undefined)
            info.color = "#000";
        if (info.size == undefined)
            info.size = "100px";
        if (info.weight == undefined)
            info.weight = "bold";
        if (info.anlign == undefined)
            info.anlign = "center";
        this.textColor = info.color;
        this.textSize = info.size;
        this.textWeight = info.weight;
        this.textAlign = info.anlign;
        $("#" + this.id).html(info.text);
        this.update();
    }
    define(att,val){
        this[att] = val;
    }
    get(attName){
        return this[attName]
    }
    copy(){
        var newObj = new role({
            image: this.image,
            width: this.width,
            height: this.height,
            type: this.type,
            x: this.x,
            y: this.y,
            angle: this.angle,
            name: this.name,
            pos: this.pos,
            moveType: this.moveTypeText
        });
        newObj.setCss(this.styleCss);
        return newObj;
    }
    addPhysics(){
        obj.define("air",true);
        obj.define("grav",true);
        obj.define("force",true);
    }
    del(style,time){
        DIE_STYLE[style](this.webEntity,time);
        var me = this;
        setTimeout(function () {
            $("#" + me.id).remove();
        },time);
        this.width = null;
        this.height = null;
        this.image = null;
        this.x = null;
        this.y = null;
        this.angle = null;
        this.copyNum = null;
        this.textColor = null;
        this.textSize = null;
        this.textWeight = null;
        this.textAlign = null;

        this.name = null;
        this.die = true;
        gameObjs.splice(this.id,1);
    }
    addPosZ(){
        this.define("pos-z",gameObjs.length);
    }
    setPosZ(z){
        this.define("pos-z",z);
    }
    move(x,y){
        this.x = x;
        this.y = y;
        this.update();
    }
    randomMoveX(x){
        this.move(Math.random() * (x.max - x.min) + x.min,this.y)
    }
    randomMoveY(y){
        this.move(this.x,Math.random() * (y.max - y.min) + y.min)
    }
    randomMove(x,y){
        this.move(Math.random() * (x.max - x.min) + x.min,Math.random() * (y.max - y.min) + y.min);
    }
    run(angle){
        var me = $("#" + this.id);
        var x = me.offset().left;
        var y = me.offset().top;
        x += Math.cos(angle / 180 * Math.PI) * this.get("speed");
        y += Math.sin(angle / 180 * Math.PI) * this.get("speed");
        this.move(x,y);
    }
    setCss(style){
        var web = $("#" + this.id);
        web.css(style);
        var styleCss = this.styleCss;
        for (var i in style){
            styleCss[i] = style[i];
        }
        this.styleCss = styleCss;
    }
}
function getById(id){
    return gameObjs[id];
}
function getByName(name){
    var objs = [];
    for (var i in gameObjs){
        if (gameObjs[i].name == name)
            obj.push(gameObjs[i]);
    }
    return objs;
}
function randint(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function random(min,max) {
    return Math.random() * (max - min) + min;
}