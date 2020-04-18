var DavidUtil = {
    //给一个JQ 类型的dom 在没有值的情况下给一个默认值。
    giveDefaultTextForDom:function (jqDom,msg){
        if( jqDom.text().trim().length == 0){
            jqDom.text(msg);
        }
    },
    //------------------------Util1:根据id获取对象----------------------------
    dom: function (id) {
        return document.getElementById(id);
    }
    ,
    //-------------------------Util2:对dom对象css的操作?----------------------------
    css: function (dom, opts) {
        for (var key in opts) {
            var val = opts[key];
            if (typeof val == "number") {
                val += "px";
            }
            dom["style"][key] = val;
        }
    },
    //-------------------------Util3:随机色产生.------------------------------
    randomDomColor: function (op) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgba(" + r + "," + g + "," + b + "," + (op || 1) + ")";
    },
    //-------------------------Util4:时间格式化.------------------------------
    format: function (time) {
        var initSecond = time % 60;//除以之后是一个小数.你要取一个floor.向下取.
        var second = Math.floor(initSecond);
        var minute = Math.floor(time / 60);
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        return minute + ":" + second;
    },

    tip: function (msg) {
        $("#msg_tip").remove();
        $("body").append("<div id='msg_tip'>" +
            "        <span>  <i class='iconfont icon-xiaoxi' style='margin-right:28px;font-size: 28px;'></i> " + msg + " </span>" +
            "    </div>");
        $("#msg_tip").css({"font-family": "新宋体", "font-size": 20});

        $("#msg_tip").animate({top: 0}, 800).delay(1600).animate({top: -64}, 600);

        //当被点击的时候让它停止之前的动画，直接缩回去。
        $("#msg_tip").on("click",function(){
            $(this).stop(true,true).animate({top:-56},600);
        });
    }
    ,


    /**
     * 判断非空
     *
     * @param val
     * @returns {Boolean}
     */
    isEmpty: function (val) {
        val = $.trim(val);
        if (val == null)
            return true;
        if (val == undefined || val == 'undefined')
            return true;
        if (val == "")
            return true;
        if (val.length == 0)
            return true;
        if (!/[^(^\s*)|(\s*$)]/.test(val))
            return true;
        return false;
    }
    ,
    isNotEmpty: function (val) {
        return !this.isEmpty(val);
    },

    /**
     * 控制台log 简单封装。
     * @param content 输出内容。
     */
    log:function(content){
        if(console){
            console.log("您的运行结果为："+content);
        }else{
            alert("您的运行结果为："+content);
        }
    },
    //获取鼠标的位置。兼容ie678
    getXY:function(e){
        var ev = e || window.event;
        var x=0,y=0;
        if(ev.pageX){
            x = ev.pageX;
            y = ev.pageY;
        }else{
            //拿到scrollTop 和scrollLeft
            var sleft = 0,stop = 0;
            //ie678---
            if(document.documentElement){
                stop =document.documentElement.scrollTop;
                sleft = document.documentElement.scrollLeft;
            }else{
                //ie9+ 谷歌
                stop = document.body.scrollTop;
                sleft = document.body.scrollLeft;
            }
            x = ev.clientX + sleft;
            y = ev.clientY + stop;
        }
        return {x:x,y:y};
    }
}