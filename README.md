# fm-dialog

## 引用

* [es6](#es6)
* [global](#global)

### ES6

```javascript
import '@/assets/dialog/fm.dialog.min.css'
import { Dlg } from '@/assets/dialog/fm.dialog.min.js'
```

### Global

```javascript
<link rel="stylesheet" href="/dist/fm-dialog.min.css">
<script src="/dist/fm-dialog.min.js"></script>
```
或者
```javascript
<script src="/dist/fm-dialog.min.js"></script>
Dlg.config({
  cssDir: '/dist/fm.dialog.min.css'
});
```

##  Demo
<a href="http://ifootmark.github.io/fm-dialog/demo.html" target="_blank">http://ifootmark.github.io/fm-dialog/demo.html</a>

## 使用方法

### 参数选项

| 名称  |  类型 | 默认值  | 说明  |
| ------------ | ------------ | ------------ | ------------ |
|  id |  String |  "fmdialog" |  对话框标识，可以设置弹出多个对话框 |
|  title |  String | "提示"  |  标题 |
|  content |  String, HTMLElement | ""  |  内容 |
|  width |  String, Number | 300  |  宽度，也可设置为百分比，如： "50%" |
|  showTitle |  Boolean | true  |  是否显示标题 |
|  showClose |  Boolean | false  |  是否显示右上角的关闭按钮 |
|  template |  Boolean | true  |  使用对话框模板 |
|  buttonMaxCount |  Number | 3  |  展示按钮的上限数目 |
|  buttonDirection |  String | "horizontal"  |  按钮的展示方向，水平和垂直，有 "horizontal", "vertical" 两个取值 |
|  button |  Array | [{<br>name: '取消',<br>css: '',<br>callback: null<br>}, {<br>name: '确定',<br>css: '',<br>callback: null <br>}]  |  按钮对象数组，有几个对象展示几个按钮，最多不超过 buttonMaxCount 数量<br>name: String, 按钮显示文本<br>css: String, 按钮样式<br>callback: Function, 点击按钮时触发事件 |
|  lock |  Boolean | true  |  是否模态方式锁屏 |
|  quickClose |  Boolean | false  |  快速关闭，点击弹窗之外的区域关闭 |
|  auto |  Boolean | false  |  是否自动关闭 |
|  timeOut |  Number | 2000  |  对话框显示时间，以毫秒为单位 |
|  isMsg |  Boolean | false  |  是否以消息的形式展示 |
|  msgType |  String | "default"  |  消息类型，有7种选项：default, inverse, muted, success, info, error, warning |
|  zIndex |  Number | 98  |  设置 z-index 属性值 |
|  boxCss |  String | ""  |  自定义容器样式 |
|  titleCss |  String | ""  |  自定义标题样式 |
|  contentCss |  String | ""  |  自定义内容样式 |
|  footCss |  String | ""  |  自定义按钮样式 |
|  callback |  Function | null  |  对话框初始化完成后的回调函数 |


### API

#### Dlg.show(options)

`options`
- id: "fmdialog",
- title: "提示",
- content: "",
- width: 300,
- showTitle: true,
- showClose: false,
- template: true,
- buttonMaxCount: 3,
- buttonDirection: "horizontal", //"vertical"
- button: [{
  name: '取消',
  css: '',
  callback: null
  }, {
  name: '确定',
  css: '',
  callback: null
  }],
- lock: true,
- quickClose: false,
- auto: false,
- timeOut: 2000,
- isMsg: false,
- msgType: "default", //success, info, error, warning, inverse, muted
- zIndex: 98,
- boxCss: "",
- titleCss: "",
- contentCss: "",
- footCss: "",
- callback: null

示例：
```javascript
Dlg.show({
  id: 'icustom',
  content: '<div style="padding:30px;">亲爱的朋友，您好！又要请我吃饭了<br/><br/>我是自定义内容，写你想写的，做你想做的……<br/><br/>点击其他空白处我会消失的，点点看</div>',
  template: false,
  quickClose: true,
  showClose: true,
  callback: function(){}
});
```

### 快速调用

若想快速调用，可以用以下方法。


#### Dlg.confirm(options)

示例：
```javascript
var buttons = [{
    name: '取消',
    css: 'color: #999999;',
    callback: function() {
      Dlg.close("iconfirm");
    }
  }, {
    name: '确定',
    css: 'color: #DF5658;',
    callback: function() {
      Dlg.msg({
        content: '果然是亲生的朋友，这么爽快就应答了',
        msgType: 'success'
      });
    }
  }]
Dlg.confirm({
  id: "iconfirm",
  content: '点我干什么，要请我吃饭吗？',
  buttonDirection: 'horizontal',//'vertical'
  button: buttons,
  showTitle: false
});
```

#### Dlg.msg(options)

`content` 消息内容
`msgType` 消息类型，default, success, info, error, warning, inverse, muted

示例：
```javascript
Dlg.msg({
  content: '有话赶紧讲，2 秒后自动消失',
  msgType: "inverse"
});
```

示例：
```javascript
Dlg.msg({
  content: '亲爱的朋友，您好！点击空白处我会消失哦，请试试看',
  msgType: 'inverse',
  lock: true,
  auto: false,
  quickClose: true
});
```


#### Dlg.loading(options)

示例：
```javascript
Dlg.loading({
  id: 'iloading',
  content: '处理中，请稍候…',
  msgType: 'inverse',
  lock: true,
  auto: false,
  quickClose: true
});
setTimeout(function(){
  Dlg.close('iloading');
},2000)
```


#### Dlg.close(id)

`id` 要关闭的对象 id

示例：
```javascript
Dlg.close('iloading');
```

#### Dlg.config(options)

`options.cssDir`：css 样式表路径

js 调用示例：
```javascript
Dlg.config({
  cssDir: '/dist/fm.dialog.min.css'
});
```

## License
[MIT](http://spdx.org/licenses/MIT)


© allmeet.net
