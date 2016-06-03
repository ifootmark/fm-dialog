'use strict';

/**
* iDialog
* @param {String,String,Object,Object}
* @call iDialog.show(id, content, options, callback)
* @return {undefined}
* @author xuxin
* 2015.12.15
*/
var iDialog = {
    _id: null,
    options: {},
    default: { width: 320, height: 180, lock: true, quickClose: false, auto: false, time: 2000, zindex: 98, closebtn: false, defaulttmpl: true, title: "提示", oktext: "确定", ok: null, canceltext: "取消", cancel: null, type: null, ismsg:false },
    show: function (id, content, options, callback) {
        iDialog._id = !!id ? id : "ishow";
        if (iDialog.default != null && typeof (iDialog.default) != "undefined") {
            options = options || {};
            for (var key in iDialog.default) {
                if (options[key] === undefined || options[key] === null) {
                    options[key] = iDialog.default[key];
                }
            }
            iDialog.options[iDialog._id] = options;
        }
        if (iDialog.options[iDialog._id].defaulttmpl) {
            content = '<div class="confirmmsg" style="margin: auto;">' +
                '<div class="ftitle" style="font-size: 16px; font-weight: bold; text-align: center; padding: 20px 0;">' + iDialog.options[iDialog._id].title + '</div>' +
                '<div class="fcontent" style="color: #666666; padding: 10px 20px 20px 20px; text-align: center;">' + content + '</div>' +
                '<div class="ffoot" style="margin: auto; padding: 10px 0; text-align: center;  color: #FFFFFF; font-size: 14px;">' +
                '<div class="fok" style="display:inline-block;  padding: 6px 20px; cursor: pointer; background-color:#E05658; margin:0 20px; border-radius:5px;">' + iDialog.options[iDialog._id].oktext + '</div>' +
                '<div class="fcancel" style="display:inline-block; padding: 6px 20px; cursor: pointer; background-color:#999; margin:0 20px; border-radius:5px;">' + iDialog.options[iDialog._id].canceltext + '</div></div></div>';
        }
        var closeImg = '';
        if (iDialog.options[iDialog._id].closebtn) {
            closeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZWY5MWU0Ny0zYTMzLTRjMWQtYmZkMy1jNThkZWI2M2IzYmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RERGRTFFQTc5MzQxMTFFNTk4MzI5MTc3QjAzNDdGREYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RERGRTFFQTY5MzQxMTFFNTk4MzI5MTc3QjAzNDdGREYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNzQ2MWJiMS0wNDU2LTRhNGQtYWM5Mi0zZjFmMGVhMjVhMmMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N2VmOTFlNDctM2EzMy00YzFkLWJmZDMtYzU4ZGViNjNiM2JhIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+otaq+gAAAKtQTFRF//zs//vp///9//74/7Oz/5qa/87O//f3/39//3Bw/1pa/6Oj/1RU/1VV/4WF/2tr/5mZ/6Ki/+fn/62t/11d//3z//76///+/6mp/1xc/8PD/8fH/6Sk/1lZ/8bG/+bm/4yM/4uL/1NT/1hY/4iI/3R0/7e3/2Nj/19f/4qK/2xs/2Vl//vq/1ZW/4aG/8HB/8LC//32/5eX/6ur/8jI/83N//vo/1BQ////K+jkbAAAADl0Uk5T//////////////////////////////////////////////////////////////////////////8AOqxlQAAAAY1JREFUeNqc1Xl3gjAMAPAiWFCuiRyizvs+59wI3/+TTfFogICy/Ff6e7zXpE1YnA6V64dNaBjh5qBzNbPJUis+3gOK/ZgX4l4DctH4IbGjARmak8fdJhREs5vFfSiJfhp/QGl8Y9yCF9ESuAsv4+uBneZr/OncsQZvhHbDPfRpvsJgNUeLXoJR3dp+DeWlXvPbqJZXzMW640tM6HqNSX5H7PILHolSBbsoeuqLjaJdIA4/iplqoj/L0lMnVpLRn02VcXwi5abrT6vgXc50oDRlQWcWUJqyYDEbKE1ZsJkLlKYsuMzIFVY5XfEpZ8HI4+Rs95xksUtZSaK0mz3gPWcype1M6h75VShtpYsiakFpPVVuXDdCc3yRpgGuxU0HU3yR0BWFtodrcdUeuv3j9OXfLjxcN0X2Flux/M08q+V5hk80Oy8zzyr1YEtiUL0VxM7nG01m+J/2Va0xVmu51Zp5HB+Lx8QxP4CGRQNoSI62ATXaBsVDc21iaa55yYRNxrFlh5NJaFut3Dj+E2AAm+xpzo21rlMAAAAASUVORK5CYII=';
        }

        var tmplHtml = '<div id=' + iDialog._id + '><div class="imask" style="display: none;position: absolute;top: 0px;left: 0px;background-color: #333;z-index:' + iDialog.options[iDialog._id].zindex + ';opacity: 0.3;-moz-opacity: 0.3;filter: alpha(opacity=30);"></div>' +
            '<div class="ipopup" style="display: none;position: fixed;border: 1px solid rgba(178,178,178,.3);border-radius: 6px;background: #fff;z-index:' + (iDialog.options[iDialog._id].zindex + 1) + ';max-width:90%;">' +
            '<div class="iclose" style="position:absolute;top:-10px;right:-10px;width:22px;height:22px;border-radius: 16px;color:#f00;cursor:pointer;background: url(' + closeImg + ') no-repeat center center; background-size: contain; background-origin: content-box;"></div>' +
            '<div class="icontent"></div></div></div>';
        var ele = $(tmplHtml);
        if ($('#' + iDialog._id).length <= 0) {
            $("body").append(ele);
        }

        var _dlg = $('#' + iDialog._id);
        var _dlg_id = _dlg.attr("id");
        _dlg.find('.icontent').html(content);
        _dlg.find('.fok').on({
            click: function () {
                if (!iDialog.options[_dlg_id].ok) {

                } else {
                    iDialog.options[_dlg_id].ok();
                }
                return false;
            }
        });
        _dlg.find('.fcancel').on({
            click: function () {
                if (!iDialog.options[_dlg_id].cancel) {
                    iDialog.close(_dlg_id);
                } else {
                    iDialog.options[_dlg_id].cancel();
                }
                return false;
            }
        });
        _dlg.find('.iclose').on({
            click: function () {
                if (_dlg) {
                    iDialog.close(_dlg_id);
                }
                return false;
            }
        });

        if (!iDialog.options[iDialog._id].closebtn) {
            _dlg.find('.iclose').hide();
        }
        if (iDialog.options[iDialog._id].lock) {
            iDialog.showMask();
        }

        iDialog.showContent();

        if (iDialog.options[iDialog._id].auto) {
            setTimeout(function () {
                if (_dlg) {
                    iDialog.close(_dlg_id);
                }
            }, iDialog.options[iDialog._id].time);
        }

        if (callback != null && typeof (callback) != "undefined" && typeof (callback) == "function") {
            callback();
        }
    },
    showMask: function () {
        var documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        var documentWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        $('#' + iDialog._id + ' .imask').css({ "height": documentHeight + "px", "width": documentWidth + "px" }).show();
        if (iDialog.options[iDialog._id].quickClose) {
            $('#' + iDialog._id + ' .imask').on("click", function () {
                var dlg = $(this).parent();
                iDialog.close(dlg.attr("id"));
            });
        }
    },
    showContent: function () {
        var ipopupobj = $('#' + iDialog._id + ' .ipopup');
        ipopupobj.show();
        iDialog.resize();
        iDialog.center(ipopupobj);
        ipopupobj.removeClass('animateOut').addClass('animateIn').removeClass('animated').addClass('animated');
    },
    resize: function () {
        var content = $('#' + iDialog._id + ' .icontent');
        var width = iDialog.options[iDialog._id].width;
        var height = iDialog.options[iDialog._id].height;
        content.removeAttr("style");
        if (iDialog.options[iDialog._id].ismsg) {
            content.css({ "padding": "16px" });
            if (!!iDialog.options[iDialog._id].type) {
                $('#' + iDialog._id + ' .ipopup').removeClass(function(index, css) {
                    return (css.match(/\bmsg-\S+/g) || []).join('');
                });
                $('#' + iDialog._id + ' .ipopup').addClass("msg-" + iDialog.options[iDialog._id].type);
            }
            return false;
        }
        content.css({ "height": height + "px", "width": width + "px" });
    },
    center: function (obj) {
        var top = ($(window).height() - $(obj).height()) / 2;
        var left = ($(window).width() - $(obj).width()) / 2;
        $(obj).css({ "top": top + "px", "left": left + "px" });
    },
    close: function (id) {
        if ($('#' + id + ' .ipopup').css('animation-name') == 'none') {
            $('#' + id + ' .ipopup').hide();
        } else {
            setTimeout(function () {
                $('#' + id + ' .ipopup').hide();
            }, 500);
        }
        $('#' + id + ' .ipopup').removeClass('animateIn').addClass("animateOut").removeClass('animated').addClass('animated');
        $('#' + id + ' .imask').hide();
    }
}

//简单调用
var dialog = {
    show: function (id, content, options, callback) {
        iDialog.show(id, content, options, callback);
    },
    confirm: function (content, ok) {
        iDialog.show("iconfirm", content, { ok: ok, cancel: function () { iDialog.close("iconfirm"); }, canceltext: "关闭", zindex: 999 });
    },
    msg: function (msg, type) {
        iDialog.show("imsg", msg, { type: type, ismsg: true, lock: false, auto: true, time:3000, zindex: 9999, defaulttmpl: false });
    },
    msglock: function (msg, type) {
        iDialog.show("imsglock", msg, { type: type, ismsg: true, quickClose: true, zindex: 9999, defaulttmpl: false });
    },
    loading: function () {
        var msg = '<div><img src="data:image/gif;base64,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"/> 处理中，请稍候…</div>';
        iDialog.show("iloading", msg, { type: 'default', ismsg: true, zindex: 9999, defaulttmpl: false });
    },
    close: function (id) {
        iDialog.close(id);
    }
}

module.exports = dialog;