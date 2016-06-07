'use strict';

/**
* fmDialog
* @param {String,String,Object,Object}
* @call fmDialog.show(id, content, options, callback)
* @return {undefined}
* @author ifootmark@163.com
* 2015.12.15
*/
var fmDialog = {
    _id: null,
    options: {},
    default: { 
        width: 320, 
        height: 180, 
        title: "提示", 
        template: true, 
        ok: null, 
        okText: "确定", 
        cancel: null, 
        cancelText: "取消", 
        lock: true, 
        quickClose: false, 
        auto: false, 
        timeOut: 3000, 
        zindex: 98, 
        closeBtn: false, 
        isMsg:false,
        msgType: "default"
    },
    show: function (id, content, options, callback) {
        fmDialog._id = !!id ? id : "ishow";
        if (fmDialog.default != null && typeof (fmDialog.default) != "undefined") {
            options = options || {};
            for (var key in fmDialog.default) {
                if (options[key] === undefined || options[key] === null) {
                    options[key] = fmDialog.default[key];
                }
            }
            fmDialog.options[fmDialog._id] = options;
        }
        if (fmDialog.options[fmDialog._id].template && !fmDialog.options[fmDialog._id].isMsg) {
            content = '<div class="confirmmsg" style="margin: auto;">' +
                '<div class="ftitle" style="font-size: 16px; font-weight: bold; text-align: center; padding: 20px 0;">' + fmDialog.options[fmDialog._id].title + '</div>' +
                '<div class="fcontent" style="color: #666666; padding: 10px 20px 20px 20px; text-align: center;">' + content + '</div>' +
                '<div class="ffoot" style="margin: auto; padding: 10px 0; text-align: center;  color: #FFFFFF; font-size: 14px;">' +
                '<div class="fok" style="display:inline-block;  padding: 6px 20px; cursor: pointer; background-color:#E05658; margin:0 20px; border-radius:5px;">' + fmDialog.options[fmDialog._id].okText + '</div>' +
                '<div class="fcancel" style="display:inline-block; padding: 6px 20px; cursor: pointer; background-color:#999; margin:0 20px; border-radius:5px;">' + fmDialog.options[fmDialog._id].cancelText + '</div></div></div>';
        }
        var closeImg = '';
        if (fmDialog.options[fmDialog._id].closeBtn) {
            closeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAXVBMVEUAAAD/UFD//Or//vj///3/mpr/s7P/zs7/VFT/WVn/q6v/hYX/XV3/9/f/x8f/w8P/i4v/f3//cHD/a2v/o6P/5+f/oqL//fP/pKT/5ub/t7f/l5f/dHT/ZWX/Y2NgN9pvAAAAAXRSTlMAQObYZgAAATtJREFUOMuV1eGugjAMBeAeEDbYQJAB4lXf/zGvBmMrFMjOP8IXMraupUUqE1znrfWdC6aivZjGQsQ2ZpPWF6xyqVXat1DT9mt7LrCR4ry0V+zk+msz7OZP2gEHGcR6cZjvuvviGBf9B7fAcdrZ1uDcvQT+Ds58OuLcyvQk9iU7paU4y7c10ibJKWObJFIbImr4J15vWWfzE/98Q1RZ+eVZs5VfthUZiOQf/bU5RAwFaFqzCOSgac3CUQdNaxYdeShatfBkoWjVwjKWZyH3W2KvWV176jSbppruyGk2zzXtKGgW0HQgo1pVG1lIBVvWhSgkWaIox9myHkXVNb/F/7iNb8t6vD3EKhbX6lk6iLjyKa4VX9jj1DGtIKbJTDHtK6YxxrTcuGYePyY409YAmqJHW/zQ3BnHw2oc/wM4sxEbu8EAnQAAAABJRU5ErkJggg==';
        }

        var tmplHtml = '<div id=' + fmDialog._id + '><div class="imask" style="display: none;position: absolute;top: 0px;left: 0px;background-color: #333;z-index:' + fmDialog.options[fmDialog._id].zindex + ';opacity: 0.3;-moz-opacity: 0.3;filter: alpha(opacity=30);"></div>' +
            '<div class="ipopup" style="display: none;position: fixed;border: 1px solid rgba(178,178,178,.3);border-radius: 6px;background: #fff;z-index:' + (fmDialog.options[fmDialog._id].zindex + 1) + ';max-width:90%;">' +
            '<div class="iclose" style="position:absolute;top:-10px;right:-10px;width:22px;height:22px;border-radius: 16px;color:#f00;cursor:pointer;background: url(' + closeImg + ') no-repeat center center; background-size: contain; background-origin: content-box;"></div>' +
            '<div class="icontent"></div></div></div>';
        var ele = $(tmplHtml);
        if ($('#' + fmDialog._id).length <= 0) {
            $("body").append(ele);
        }

        var _dlg = $('#' + fmDialog._id);
        var _dlg_id = _dlg.attr("id");
        _dlg.find('.icontent').html(content);
        _dlg.find('.fok').on({
            click: function () {
                if (!fmDialog.options[_dlg_id].ok) {

                } else {
                    fmDialog.options[_dlg_id].ok();
                }
                return false;
            }
        });
        _dlg.find('.fcancel').on({
            click: function () {
                if (!fmDialog.options[_dlg_id].cancel) {
                    fmDialog.close(_dlg_id);
                } else {
                    fmDialog.options[_dlg_id].cancel();
                }
                return false;
            }
        });
        _dlg.find('.iclose').on({
            click: function () {
                if (_dlg) {
                    fmDialog.close(_dlg_id);
                }
                return false;
            }
        });

        if (!fmDialog.options[fmDialog._id].closeBtn) {
            _dlg.find('.iclose').hide();
        }
        if (fmDialog.options[fmDialog._id].lock) {
            fmDialog.showMask();
        }

        fmDialog.showContent();

        if (fmDialog.options[fmDialog._id].auto) {
            setTimeout(function () {
                if (_dlg) {
                    fmDialog.close(_dlg_id);
                }
            }, fmDialog.options[fmDialog._id].timeOut);
        }

        if (callback != null && typeof (callback) != "undefined" && typeof (callback) == "function") {
            callback();
        }
    },
    showMask: function () {
        var documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        var documentWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        $('#' + fmDialog._id + ' .imask').css({ "height": documentHeight + "px", "width": documentWidth + "px" }).show();
        if (fmDialog.options[fmDialog._id].quickClose) {
            $('#' + fmDialog._id + ' .imask').on("click", function () {
                var dlg = $(this).parent();
                fmDialog.close(dlg.attr("id"));
            });
        }
    },
    showContent: function () {
        var ipopupobj = $('#' + fmDialog._id + ' .ipopup');
        ipopupobj.show();
        fmDialog.resize();
        fmDialog.center(ipopupobj);
        ipopupobj.removeClass('animateOut').addClass('animateIn').removeClass('animated').addClass('animated');
    },
    resize: function () {
        var content = $('#' + fmDialog._id + ' .icontent');
        var width = fmDialog.options[fmDialog._id].width;
        var height = fmDialog.options[fmDialog._id].height;
        content.removeAttr("style");
        if (fmDialog.options[fmDialog._id].isMsg) {
            var msgTypeName = fmDialog.options[fmDialog._id].msgType || 'default';
            content.css({ "padding": "12px" });
            $('#' + fmDialog._id + ' .ipopup').removeClass(function(index, css) {
                return (css.match(/\bmsg-\S+/g) || []).join('');
            });
            $('#' + fmDialog._id + ' .ipopup').addClass("msg-" + msgTypeName);
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

//simple call
var dialog = {
    show: function (id, content, options, callback) {
        fmDialog.show(id, content, options, callback);
    },
    confirm: function (content, ok) {
        fmDialog.show("iconfirm", content || null, { ok: ok || null, cancel: function () { fmDialog.close("iconfirm"); }, cancelText: "关闭", zindex: 999 });
    },
    msg: function (msg, type) {
        fmDialog.show("imsg", msg || "", { msgType: type, isMsg: true, lock: false, auto: true, zindex: 9999 });
    },
    msglock: function (msg, type) {
        fmDialog.show("imsglock", msg || "", { msgType: type, isMsg: true, quickClose: true, zindex: 9999 });
    },
    loading: function (tips) {
        tips = tips || "处理中，请稍候…";
        var imgUrl = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA=="
        var msg = '<div><img src="' + imgUrl + '" style="max-width:16px; border:none;" /><span style="padding-left:10px;">'+tips+'</span></div>';
        fmDialog.show("iloading", msg, { isMsg: true, zindex: 9999 });
    },
    close: function (id) {
        fmDialog.close(id);
    }
}

module.exports = dialog;