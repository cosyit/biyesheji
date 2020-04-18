/**
 * 展开，收缩 单元的代码。 为什么这块的代码 用<script> 放在页面body 的尾部可以，抽出来就不能执行了呢？
 */
(function () {
        //1.每次第一次加载页面的时候，先隐藏所有的子级。
        /**
         * speed:三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)
         easing:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"
         fn:在动画完成时执行的函数，每个元素执行一次。
         */


        $('.children').hide(300, function () {
            $(".children").eq(0).show(300);
        });


        //2.模块单元UI开关上的图片，展开同时更换图标。
        $(".unit-parent").first().find('i').attr("class", "iconfont icon-shousuo");

        var closeAndOpen = function (e) {
            /**
             * eq()方法返回的是一个JQuery对象，也就是[object Object];

             get()方法返回的是DOM对象组成的数组，也就是[object HTMLLIElement];

             get出来的是原生JS对象。

             ​JQ->JS
             var $idElement = $("#id"); 
             var  idElement=$idElement.get(0);
             console.log(idElement.checked); //调用JS的属性

             ​JS->JQ
             var jsobj = document.getElementById('xxId');   
             var $obj = $(jsobj); 


             =============
             $(node).prev(); 相邻的前一个节点
             $(node).next();相邻的后一个节点。
             .siblings(":first").val()); 相邻的第一个兄弟节点。

             */
            $(this).siblings().css({background:"#304156"});
            $(this).css({background:"#233446"});
            //$(this).find(".children").off("click");
            //根据结构找第一个a标签下的i.
            var $i = $(this).first().find('i');

            //绑定点击事件。  如果是隐藏的，全部显示出来。
            if ($(this).next('.children').is(':hidden')) {
                $(this).next('.children').show(300);// 显示自己
                //并切换iconfont小图标。
                if ($i.hasClass("icon-zhankai")) {
                    $i.toggleClass("icon-zhankai icon-shousuo");
                }
            }
            else if ($(this).next('.children').is(':visible')) {  //如果不加else ,上面的代码会在内存中展开列表。
                $(this).next('.children').hide(300);
                //隐藏后修改本图标。
                if ($i.hasClass("icon-shousuo")) {
                    $i.toggleClass("icon-shousuo icon-zhankai");
                }
            }
            e.stopPropagation();
            e.cancelBubble = true;
            //防止默认事件。
            //event.preventDefault();

        };
        //3.当小单元整体 被点击的时候， on cb 填入函数名即可。
        $(".unit-parent").on("click", closeAndOpen);
    }
)();
