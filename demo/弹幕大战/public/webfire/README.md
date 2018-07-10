webfire
=========

### 这是一个开源的游戏引擎

这有什么特点？
--------------
* 1.轻便
* 2.简单
* 3.免费
* 4.开源
* 5.好用
* 6.会不定期更新

怎么使用？
-----------
只需在你的html文件中写入：
```html
<link rel="stylesheet" href="css/jquery-ui.css" type="text/css"/>
<script type ="text/javascript" src ="js/jQuery-v3.3.1.js"></script>
<script type ="text/javascript" src ="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/obj.js"></script>
<script type="text/javascript" src="js/physics.js"></script>
<script type="text/javascript" src="js/encryption.js"></script>
<script type="text/javascript" src="js/com.js"></script>
```
##### 即可获得UI界面的全部功能

文件结构
---------
* js
    * jQuery-v3.3.1.js 这是引擎所需的jQuery库
    * jquery-ui.js 这是引擎所需的jQuery插件
    * obj.js 这是管理游戏对象创建的文件
    * physics.js 这是给游戏对象添加物理属性的文件
    * encryption.js 这是在网络通信中可以将信息加密的文件
    * com.js 这是前端网络通信所需的文件
    * main.js 这是后端通信所需的文件
    * node_modules 这是后端通信所需要的库
        * async-limiter nodejs 自带库  
        * ws 网络通信所需要的WebSocket支持库  
* css
    * jquery-ui.js 这是一个jQuery ui插件所需的css库
* img
    * outText.png 这是一个透明图片，可以支持文字输出
    * cursor.png 这是一个鼠标样式图片，可以自行删除

创建游戏对象
-----------
你只需在任意js文件中写入
```js
var rect = new role({
   image: "#f36",
   width: 100,
   height: 100,
   type: "color",
   name: "ball",
   x: 0,
   y: 0,
   pos: "main"
});
```
就可以在`#main`这个标签中添加一个位置为(0,0)的矩形，当然，去掉x、y属性，role这个函数也会自动设置其的位置为(0,0)
其实，也可以只这么写:
```js
var rect = new role({
   image: "#f36",
   type: "color",
   pos: "main"
});
```
##### 不过，这样该对象的name属性就为`game-object-xx`了

游戏对象自带主要方法集
----------------
* `gameObj.update()`
    * 这可以刷新游戏对象在游戏页面中的样子
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.update();
    ```
* `gameObj.showShadow(info)`
    * 这可以为游戏对象的文字添加投影，增加立体感
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.setText({
      text: "Hello world!"
    });
    rect.showShadow({
      x: 10,
      y: 10,
      color: "rgba(100,100,100,0.5)"
    });
    ```
    
* `gameObj.change(info)`
    * 这可以改变游戏对象的一些属性
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.change({
      speed: 100
    });
    ```
    ```
    
    
* `gameObj.circle(value)`
    * 这可以为游戏对象添加圆弧属性(无须加单位，单位：占游戏对象自身大小的百分比)
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.showShadow({
      x: 10,
      y: 10,
      color: "rgba(100,100,100,0.5)"
    });
    ```
    
* `gameObj.setText(info)`
    * 这可以设置游戏对象的文字内容
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.setText({
      text: "Hello world!",
      color: "#fa0",
      anlign: "left",
    });
    ```
    
* `gameObj.copy()`
    * 这可以拷贝游戏对象
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.copy()
    ```
    
* `gameObj.del(style,time)`
    * 这可以删除游戏对象
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.del("hide",1000);
    ```
    
* `gameObj.move(x,y)`
    * 这可以移动游戏对象至(x,y)点
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.move(100,100)
    ```
    
* `gameObj.run(angle)`
    * 这可以使游戏对象向angle方向移动游戏对象的speed步(注意，如果初始化未设置speed属性，则speed为10)
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      speed: 25,
      pos: "main"
    });
    rect.run(10)
    ```
    
* `gameObj.setCss(style)`
    * 这可以设置游戏对象的另外属性(凡是css属性都可以)
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.css({
         "cursor": "pointer"
    })
    ```
    
* `gameObj.define(att,val)`
    * 这可以设置游戏对象其他自带值
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.define("what","a rect");
    ```
    
* `gameObj.get(att)`
    * 这可以获得游戏对象外挂的属性
    * 示范：
    ```js
    var rect = new role({
      image: "#f36",
      type: "color",
      pos: "main"
    });
    rect.define("what","a rect");
    console.log(rect.get("what"));
    ```
