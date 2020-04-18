
/**
 * 遮罩层的帮助类。 [todo 注意每次使用的时候，去除遮罩层。]
 * @param width 弹窗宽度。
 * @param height 弹窗高度
 * @param top 定位top
 * @param left 定位left
 * @param insertHtml 插入弹窗的html
 *
 * popup("calc(100vw - 50vw)","calc(100vh - 50vh)","20vh","25vw","<p>测试</p>")
 */
function popup(width, height, top, left, insertHtml) {
    //1.添加遮罩层。

    //创建遮罩层。
    var overLayer = $('<div id="overLayer"></div>');
    overLayer.css({
        height: '100%',
        width: '100%',
        background: 'rgba(0,0,0,.6)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100
    });
    //body 最后一行加入我们的层。
    $('body').append(overLayer)

    //2.在遮罩层上，添加弹窗div.
    var popWindow = $('<div></div>');


    popWindow.css({
        width: "calc(100vw - 50vw)",
        height: "calc(100vh - 50vh)",
        background: "#f2f2f2",
        position: "fixed",
        top: "20vh",
        left: "25vw",
        zIndex: "101",
        borderRadius: "2px"
    });
    overLayer.after(popWindow);

    popWindow.html(insertHtml);

    $("#overLayer").on("click", function () {
        //点击影子区域，大小面板消失。
        $("#overLayer").add(popWindow).fadeOut("show", function () {
            $(this).remove();
        })
    })
}