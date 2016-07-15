# fm-dialog

## 安装

执行命令

`npm install --save-dev fm-dialog`

或者在 html 中直接引用

`<script src="./dist/fm-dialog.min.js"></script>`

## 使用方法

html 中添加引用
`<link rel="stylesheet" href="./dist/fm-dialog.min.css">`

* [commonjs](#commonjs)
* [global](#global)
* [api](#api)

### CommonJS
```javascript
var Dlg = require('./fm-dialog');;
Dlg.show(id, content, options, callback);
```


### Global
```javascript
<script src="./dist/fm-dialog.min.js"></script>
Dlg.show(id, content, options, callback);
```

### API

### Dlg.show(id, content, options, callback)

`id` 默认“ishow”

`content` html 模板

`options`
- width: 320
- height: 180
- title: "提示"
- template: true
- ok: null
- okText: "确定"
- cancel: null
- cancelText: "取消"
- lock: true
- quickClose: false
- auto: false
- timeOut: 3000
- zindex: 98
- closeBtn: false
- isMsg: false
- msgType: "default" //success, info, error, warning, inverse, muted

`callback` function， 初始化完成回调函数

示例：
```javascript
Dlg.show('ishow', '<div style="padding:60px 10px;">亲爱的朋友，您好！又要请我吃饭了<br/><br/>我是自定义模板，写你想写的，做你想做的……<br/><br/>点击其他空白处我会消失的，点点看</div>', {
    width: 420,
    height: 200,
    template: false,
    quickClose: true,
    closeBtn: true
},
function () {
    //callback
});
```


### 快速调用

若想快速调用，可以用以下 api ，它们的默认 id 均为 "i"+对应的 api 名称。


### Dlg.confirm(content, ok)

`content` 确认对话框内容

`ok` function， 确认回调函数

示例：
```javascript
Dlg.confirm('点我干什么，要请我吃饭吗？', function () {
    dlg.msg('果然是亲生的朋友，这么爽快就应答了', 'success');
});
```



### Dlg.msg(msg, type)

`msg` 消息内容

`type` 消息类型，default, success, info, error, warning, inverse, muted

示例：
```javascript
Dlg.msg('亲爱的朋友，您好！3 秒后自动消失，请稍等', 'success');
```


### Dlg.msglock(msg, type)

`msg` 消息内容

`type` 消息类型，default, success, info, error, warning, inverse, muted

示例：
```javascript
Dlg.msglock('亲爱的朋友，您好！点击其他空白处我会消失，点点看', 'success');
```


### Dlg.loading(tips)

`tips` 加载提示内容

示例：
```javascript
Dlg.loading("处理中，请稍候…");
setTimeout(function(){
    Dlg.close('iloading');
},3000)
```


### Dlg.close(id)

`id` 要关闭的对象 id

示例：
```javascript
Dlg.close('iloading');
```



##	Demo
demo: [http://ifootmark.github.io/fm-dialog/demo.html](http://ifootmark.github.io/fm-dialog/demo.html)


## License
[MIT](http://spdx.org/licenses/MIT)


© allmeet.net

