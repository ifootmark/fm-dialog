'use strict';
/**
* fmDialog
* @param {String,String,Object,Object}
* @call fmDialog.show(id, content, options, callback)
* @return {undefined}
* @author ifootmark@163.com
*/
var fmDialog = {
    _id: null,
    options: {},
    default: {
        id: "fmdialog",
        title: "提示",
        content: "",
        width: 300,
        showTitle: true,
        showClose: false,
        template: true,
        buttonMaxCount: 3,
        buttonDirection: "horizontal",//"vertical", //
        button: [{
            name: '取消',
            css: '',
            callback: null
        }, {
            name: '确定',
            css: '',
            callback: null
        }],
        lock: true,
        quickClose: false,
        auto: false,
        timeOut: 2000,
        isMsg: false,
        msgType: "default",
        zIndex: 98,
        boxCss: "",
        titleCss: "",
        contentCss: "",
        footCss: "",
        callback: null
    },
    show: function (options) {
        if (fmDialog.default != null && typeof (fmDialog.default) != "undefined") {
            options = options || {};
            for (var key in fmDialog.default) {
                if (options[key] === undefined || options[key] === null) {
                    options[key] = fmDialog.default[key];
                }
            }
            fmDialog.options[options.id] = options;
        }

        var _dlg_opt = fmDialog.options[options.id];
        fmDialog._id = _dlg_opt.id;
  
        var closeHtml = _dlg_opt.showClose ? '<div class="iclose" style="position:absolute;top:4px;right:8px;color:#8C8C8C;font-size:20px;cursor:pointer;">X</div>' : '';
        var contentHtml = _dlg_opt.content;
        if (_dlg_opt.template && !_dlg_opt.isMsg) {
            var titleBorder = _dlg_opt.buttonDirection == 'horizontal' ? '' : 'border-bottom: 1px solid #EFEFEF;padding-bottom: 20px;';
            contentHtml ='<div class="ftitle" style="padding: 20px 20px 0;font-size: 18px;color: #1A1A1A; text-align: center;' + titleBorder + ' ' + _dlg_opt.titleCss + '">' + _dlg_opt.title + '</div>'
                + '<div class="fcontent" style="padding: 30px 24px;font-size: 15px; color: #6B6B6B;text-align: center;' + _dlg_opt.contentCss + '">' + _dlg_opt.content + '</div>';
            
            var buttonCount = _dlg_opt.button.length;
            if (buttonCount > 0) {
                var buttonWidth = parseFloat((100 / buttonCount).toFixed(2))+'%';
                if (_dlg_opt.buttonDirection == 'horizontal') {
                    contentHtml += '<div class="ffoot" style="display: flex;flex-flow: row nowrap;color: #1A1A1A;font-size: 17px;border-top: 1px solid #EFEFEF;' + _dlg_opt.footCss + '">';
                } else {
                    contentHtml += '<div class="ffoot" style="display: flex;flex-flow: column nowrap;color: #1A1A1A;font-size: 16px;' + _dlg_opt.footCss + '">';
                }
                for (var index in _dlg_opt.button) {
                    if (index > _dlg_opt.buttonMaxCount - 1) {
                        break;
                    }
                    var btnObj = _dlg_opt.button[index];
                    var buttonCss = btnObj.css || '';
                    var firstBtnCss = '';
                    var buttonBorder = index > 0 ? 'border-left: 1px solid #EFEFEF;' : '';
                    if (_dlg_opt.buttonDirection == 'horizontal') {
                        contentHtml += '<div class="fbtn" id="btn_' + index + '" style="flex:auto;width:' + buttonWidth + '; height:46px;line-height:46px; text-align: center;cursor: pointer; ' + buttonBorder + ' ' + buttonCss + '">' + btnObj.name + '</div>';
                    } else {
                        if (index == 0) {
                            firstBtnCss = 'background-color:#1A1A1A;color:#FFFFFF;';
                            buttonBorder = 'border: 1px solid #1A1A1A;border-radius: 2px;margin:0 20px 20px;';
                        } else {
                            buttonBorder = 'border: 1px solid #8C8C8C;border-radius: 2px;margin:0 20px 20px;';
                        }
                        contentHtml += '<div class="fbtn" id="btn_' + index + '" style="flex:auto; height:46px;line-height:46px; text-align: center;cursor: pointer; ' + firstBtnCss + ' ' + buttonBorder + ' ' + buttonCss + '">' + btnObj.name + '</div>';
                    }
                }
                contentHtml += '</div>';
            }
        }

        var dialogHtml = '<div id=' + fmDialog._id + '>'
            + '<div class="imask" style="display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.4);filter: alpha(opacity=40); z-index:' + _dlg_opt.zIndex + ';"></div>'
            + '<div class="ipopup" style="display: none;position: fixed;border-radius: 8px;background: #fff; max-width:80%; overflow: hidden; z-index:' + (_dlg_opt.zIndex + 1) + ';">'
            + '     <div class="ibox"></div>'
            + '</div>'
            + '</div>';

        if (!document.getElementById(fmDialog._id)) {
            var ele = document.createElement('div');
            ele.innerHTML = dialogHtml;
            document.body.appendChild(ele);
        }

        var _dlg = document.getElementById(fmDialog._id);
        var _dlg_id = _dlg.getAttribute("id");

        var boxEle = _dlg.querySelector('.ibox');
        boxEle.innerHTML = closeHtml + contentHtml;

        if (_dlg_opt.button.length > 0) {
            for (var index in _dlg_opt.button) {
                if (index > _dlg_opt.buttonMaxCount - 1) {
                    break;
                }
                var buttonEle = _dlg.querySelector('#btn_' + index);
                addEvent(buttonEle, 'click', function() {
                    var btnIndex = this.id.replace(/btn_/, "");
                    var btnObj = _dlg_opt.button[btnIndex];
                    if (btnObj.callback) {
                        btnObj.callback();
                    }
                });
            }
        }

        if (_dlg_opt.boxCss != "") {
            boxEle.style.cssText = _dlg_opt.boxCss;
        } else {
            boxEle.style.cssText = "";
        }

        if (_dlg_opt.showClose) {
            var closeEle = _dlg.querySelector('.iclose');
            addEvent(closeEle, 'click', function() {
                if (_dlg) {
                    fmDialog.close(_dlg_id);
                }
            });
        }

        if (_dlg_opt.lock) {
            fmDialog.showMask(_dlg);
        }

        if (!_dlg_opt.showTitle) {
            _dlg.querySelector('.ftitle').style.display = 'none';
        }

        if (_dlg_opt.auto) {
            setTimeout(function () {
                if (_dlg) {
                    fmDialog.close(_dlg_id);
                }
            }, _dlg_opt.timeOut);
        }

        fmDialog.showContent(_dlg);

        var cb = _dlg_opt.callback;
        if (cb != null && typeof (cb) != "undefined" && typeof (cb) == "function") {
            cb();
        }
    },
    showMask: function (dialogObj) {
        // var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        // var scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        var maskObj = dialogObj.querySelector('.imask');
        maskObj.style.display = 'block';
        if (fmDialog.options[fmDialog._id].quickClose) {
            addEvent(maskObj, 'click', function() {
                fmDialog.close(fmDialog._id);
            });
        }
    },
    showContent: function (dialogObj) {
        var ipopupObj = dialogObj.querySelector('.ipopup');
        ipopupObj.style.display = 'block';
        fmDialog.resize(dialogObj);
        fmDialog.center(ipopupObj);

        removeClass(ipopupObj, 'animateOut');
        addClass(ipopupObj, 'animateIn');
    },
    resize: function (dialogObj) {
        var boxObj = dialogObj.querySelector('.ibox');
        var popupObj = boxObj.parentElement;
        var _dlg_opt = fmDialog.options[fmDialog._id];
        var width = _dlg_opt.width;

        if (_dlg_opt.isMsg) {
            popupObj.style.width = "auto";

            var msgTypeName = _dlg_opt.msgType || 'default';
            var cssMsg = (boxObj.className.match(/\bmsg-\S+/g) || []).join('');
            removeClass(boxObj, cssMsg);
            addClass(boxObj, "msgcomm");
            addClass(boxObj, "msg-" + msgTypeName);
        } else {
            var isContainPercent = width.toString().indexOf("%") > -1 ? true : false;
            popupObj.style.width = parseInt(width) + (isContainPercent ? "%" : "px");

            boxObj.className = "ibox";
        }
    },
    center: function (obj) {
        var top = (document.documentElement.clientHeight - obj.offsetHeight) / 2;
        var left = (document.documentElement.clientWidth - obj.offsetWidth) / 2;
        obj.style.top = top + "px";
        obj.style.left = left + "px";
    },
    close: function (id) {
        var maskObj = document.querySelector('#' + id + ' .imask');
        var popupObj = document.querySelector('#' + id + ' .ipopup');
        if (window.getComputedStyle(popupObj, null).getPropertyValue("animation-name") == 'none') {
            popupObj.style.display = 'none';
        } else {
            setTimeout(function() {
                popupObj.style.display = 'none';
            }, 500);
        }
        removeClass(popupObj, 'animateIn');
        addClass(popupObj, 'animateOut');
        maskObj.style.display = 'none';
    }
}

/**
 * [hasClass description]
 * @param  {[type]}  ele [description]
 * @param  {[type]}  cls [description]
 * @return {Boolean}     [description]
 */
function hasClass(ele, cls) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    return ele.className.match(reg);
}

/**
 * [addClass description]
 * @param {[type]} ele [description]
 * @param {[type]} cls [description]
 */
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * [removeClass description]
 * @param  {[type]} ele [description]
 * @param  {[type]} cls [description]
 * @return {[type]}     [description]
 */
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, "");
    }
}

/**
 * [addEvent description]
 * @param {[type]}   elem [description]
 * @param {[type]}   type [description]
 * @param {Function} fn   [description]
 * @example 
 * addEvent(elem,'click',function(){consle.log('add event ok');});
 */
function addEvent(elem, type, fn) {
    if (!elem) {
        return;
    }
    if (elem.addEventListener) {
        elem.addEventListener(type, fn, false); //默认是冒泡
    } else if (elem.attachEvent) {
        elem[type + fn] = function() {
            fn.call(elem);
        };
        elem.attachEvent('on' + type, elem[type + fn]);
    } else {
        elem['on' + type] = fn;
    }
}

/**
 * [removeEvent description]
 * @param  {[type]}   elem [description]
 * @param  {[type]}   type [description]
 * @param  {Function} fn   [description]
 * @return {[type]}        [description]
 * @example 
 * removeEvent(elem,'click',function(){consle.log('remove event ok');});
 */
function removeEvent(elem, type, fn) {
    if (!elem) {
        return;
    }
    if (elem.removeEventListener) {
        elem.removeEventListener(type, fn, false);
    } else if (elem.attachEvent) {
        elem.detachEvent('on' + type, elem[type + fn]);
    } else {
        elem['on' + type] = fn;
    }
}

/**
* [loadCSS description]
* @param  {String}   fileName              [description]
* @param  {Function} [callback=function()] [description]
* @param  {String}   [into="head"]         [description]
* loadCSS("/css/style", function(){});
*/
function loadCSS (fileName, callback, into) {
    if(!fileName){
        return;
    }
    into = into || "head";
    callback = callback || function() {};

    var css = document.createElement("link");
    css.type = "text/css";
    css.rel = "stylesheet";
    css.onload = css.onreadystatechange = function() {
        callback();
    };

    // css.href = fileName + ".css";
    css.href = fileName;

    if (into === "head") {
        document.getElementsByTagName("head")[0].appendChild(css);
    } else {
        document.body.appendChild(css);
    }
  }

//simple call
var Dlg = {
    show: function (options) {
        fmDialog.show(options);
    },
    confirm: function (options) {
        options.id = options.id || 'iconfirm';
        fmDialog.show(options);
    },
    msg: function (options) {
        options.id = options.id || 'imsg';
        options.content = options.content || '';
        options.msgType = options.msgType || 'default';
        options.isMsg = true;
        options.lock = options.lock === undefined ? false : options.lock;
        options.auto = options.auto === undefined  ? true : options.auto;
        options.zIndex = options.zIndex || 999;
        fmDialog.show(options);
    },
    loading: function (options) {
        options.id = options.id || 'iloading';
        var tips = options.content || '处理中，请稍候…';
        options.content = '<div class="floading"><span class="loading"></span><span class="tips">' + tips + '</span></div>';
        options.isMsg = true;
        options.msgType = options.msgType || 'inverse';
        options.zIndex = options.zIndex || 999;
        fmDialog.show(options);
    },
    close: function (id) {
        fmDialog.close(id);
    },
    config: function (options) {
        var configOptions = options || {};
        var cssDir = configOptions.cssDir || '';
        if(cssDir){
            loadCSS(cssDir, null, 'head');
        }
    }
};

(function(root, _Dlg){
    if (typeof define === 'function' && define.amd) {
        define([], _Dlg);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = _Dlg;
    } else {
        root.Dlg = _Dlg;
    }    
})(this, Dlg);