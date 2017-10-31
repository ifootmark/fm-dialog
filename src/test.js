$(document).ready(function(){
    Dlg.config({
      cssDir: '/dist/fm.dialog.min.css'
    });

    $(".v-confirm").click(function(){
        var buttons,
            direction = this.getAttribute('direction');

        if (direction == "horizontal") {
            buttons = [{
                name: '取消',
                callback: function() {
                    Dlg.close("iconfirm");
                }
            }, {
                name: '确定',
                callback: function() {
                    Dlg.msg({
                        content: '果然是亲生的朋友，这么爽快就应答了',
                        msgType: 'success'
                    });
                }
            }]
        } else {
            buttons = [{
                name: '确定',
                callback: function() {
                    Dlg.msg({
                        content: '果然是亲生的朋友，这么爽快就应答了',
                        msgType: 'success'
                    });
                }
            }, {
                name: '取消',
                callback: function() {
                    Dlg.close("iconfirm");
                }
            }]
        }        
        Dlg.confirm({
            id: "iconfirm",
            content: '点我干什么，要请我吃饭吗？',
            buttonDirection: direction,
            button: buttons
        });
    });

    $(".v-confirm-notitle").click(function(){
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
            buttonDirection: 'horizontal',
            button: buttons,
            showTitle: false
        });
    });

    $(".v-confirm-custom").click(function(){
        var buttons = [{
            name: '取消',
            css: 'background-color:#999999; height:36px;line-height:36px; margin:0 20px; border-radius:5px;',
            callback: function() {
                Dlg.close("iconfirm");
            }
        }, {
            name: '确定',
            css: 'background-color:#DF5658; height:36px;line-height:36px; margin:0 20px; border-radius:5px; border-left:none;',
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
            buttonDirection: 'horizontal',
            footCss: 'padding-bottom: 20px;border:none;color:#fff;',
            button: buttons
        });
    });

    $(".v-msg").click(function(){
        var msgType = this.className.replace(/v-msg\s*/gi, "");
        Dlg.msg({
            content: '有话赶紧讲，2 秒后自动消失',
            msgType: msgType
        });
    });

    $(".v-msg-lock").click(function(){
        Dlg.msg({
            content: '亲爱的朋友，您好！点击空白处我会消失哦，请试试看',
            msgType: 'inverse',
            lock: true,
            auto: false,
            quickClose: true
        });
    });

    $(".v-loading").click(function(){
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
    });

    $(".v-custom").click(function(){
        Dlg.show({
            id: 'icustom',
            content: '<div style="padding:30px;">亲爱的朋友，您好！又要请我吃饭了<br/><br/>我是自定义内容，写你想写的，做你想做的……<br/><br/>点击其他空白处我会消失的，点点看</div>',
            template: false,
            quickClose: true,
            showClose: true,
            callback: function(){}
        });
    });

});


/**
 * [getJsonData description]
 * @param  {[type]} type     [description]
 * @param  {[type]} url      [description]
 * @param  {[type]} data     [description]
 * @param  {[type]} dataType [description]
 * @param  {[type]} callfunc [description]
 * @param  {[type]} errfunc  [description]
 * @return {[type]}          [description]
 * @example   
 * getJsonData("get", 'url?t=' + Date.now(), {}, 'json', function(data) {});
 * example
 */
var getJsonData = function(type, url, data, dataType, callfunc, errfunc) {
    var isJsonp = false;
    if (url.indexOf('jsonp!') >= 0) {
        isJsonp = true;
        url = url.replace(/jsonp!/, '');
        dataType = "jsonp";
    }
    $.ajax({
        type: !type ? "get" : type,
        url: url,
        data: data,
        dataType: dataType,
        jsonp: isJsonp ? "callback" : null,
        success: function(data) {
            if (callfunc) callfunc(data);
        },
        error: function(data) {
            if (errfunc) errfunc(data);
        }
    });
}
