'use strict';

var dlg = require('./fm-dialog');

$(document).ready(function(){
    $(".v-confirm").click(function(){
        dlg.confirm('点我干什么，要请我吃饭吗？', function () {
            dlg.msg('果然是亲生的朋友，这么爽快就应答了', 'success');
        });
    });

    $(".v-msg").click(function(){
        dlg.msg('亲爱的朋友，您好！3 秒后自动消失，请稍等', 'success');
    });

    $(".v-msglock").click(function(){
        dlg.msglock('亲爱的朋友，您好！点击其他空白处我会消失，点点看', 'success');
    });

    $(".v-loading").click(function(){
        dlg.loading("处理中，请稍候…");
        setTimeout(function(){
            dlg.close('iloading');
        },3000)
    });

    $(".v-show").click(function(){
        dlg.show('ishow', '<div style="padding:60px 10px;">亲爱的朋友，您好！又要请我吃饭了<br/><br/>我是自定义模板，写你想写的，做你想做的……<br/><br/>点击其他空白处我会消失的，点点看</div>', {
            width: 420,
            height: 200,
            template: false,
            quickClose: true,
            closeBtn: true
        },
        function () {
            //callback
        });
    });

});
