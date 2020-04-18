/**
 * 使用分页插件的代码：
 */

var myPageTools = {
    //首先初始化，分页的相关设置。
    initPage: function (itemCount) {
        $("#tzPage").tzPage(itemCount, {
            num_display_entries: 5, //主体页数
            num_edge_entries: 4,//边缘页数
            current_page: 0,//指明选中页码
            items_per_page: 10, //每页显示多条条
            prev_text: "首页",
            next_text: "尾页",
            showGo: true,//显示
            showSelect: true,
            callback: function (pageNo, psize) {//会回传两个参数一个当前页，显示的页数
                myPageTools.loadData(pageNo, psize);
            }
        });
    },
    loadData: function (pageNo, pageSize) {
        $.ajax({
            type: "post",
            url: basePath + "/order/showOrders",
            data: {pageNo: pageNo * pageSize, pageSize: pageSize},
            success: function (dataFromServer) {
                if (dataFromServer) {
                    var html = "";
                    var coreDataArrs = dataFromServer.resultData;
                    for (var i = 0, len = coreDataArrs.length; i < len; i++) {
                        var entity = coreDataArrs[i];
                        html += "<tr>" +
                            "                        <td>" + entity.id + "</td>" +
                            "                        <td>" + entity.productName + "</td>" +
                            "                        <td>" + entity.serviceAddress + "</td>" +
                            "                        <td>" + entity.updateTime + "</td>" +
                            "                        <td>" + entity.serviceTime + "</td>" +
                            "                        <td>" + entity.createTime + "</td>" +
                            "                        <td>" + entity.price + "</td>" +
                            "                        <td>" + entity.username + "</td>" +
                            "                        <td>" + entity.orderDetail + "</td>" +
                            "                        <td>" + entity.orderStateNo + "</td>" +
                            "                        <td>" + entity.evaluateState + "</td>" +
                            "                        <td><a href='javascript:void(0)' onclick='popup(\"calc(100vw - 50vw)\",\"calc(100vh - 50vh)\",\"20vh\",\"25vw\",\"<h1>测试</h1>\")' >修改 </a> &nbsp;|&nbsp; <a href='javascript:void(0)' onclick='myPageTools.deleteOrder(this)' data-opid='" + entity.id + "'> 删除</a></td>" +
                            "                    </tr>";
                    }
                    $(".insertData").html(html);
                }
            }
        });
    },
    deleteOrder: function (obj) {
        if (confirm("确定删除?")) {
            var id = $(obj).data("opid");
            $.ajax({
                type: "post",
                url: basePath + "/order/cancelOrder/" + id,
                success: function (data) {
                    //DavidUtil.tip(data.resultData =="1"?"删除成功!":"删除失败!");
                    if (data.resultData == "1") {
                        $(obj).parents("tr").fadeOut("slow", function () {
                            $(this).remove();
                        });
                    }
                }
            });
        }
    }
};