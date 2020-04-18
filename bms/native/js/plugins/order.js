function showOrdersUI() {
    $.ajax({
        url: "http://localhost:8888/order/showOrders?pageNo=0&pageSize=10",
        method: 'post',
        success: function (dataFromServer) {
            $("section").html("<div class=\"my-table-area\">" +
                "                <table class=\"my-table\"><thead>" +
                "                    <tr>" +
                "                        <th>NO</th>" +
                "                        <th>服务名称</th>" +
                "                        <th>服务地址</th>" +
                "                        <th>更新时间</th>" +
                "                        <th>服务时间</th>" +
                "                        <th>创建时间</th>" +
                "                        <th>服务价格</th>" +
                "                        <th>用户</th>" +
                "                        <th>订单详情</th>" +
                "                        <th>订单状态</th>" +
                "                        <th>订单评价</th>" +
                "                        <th>操作</th>" +
                "                    </tr></thead>" +
                "<tbody class='insertData'></tbody>" +
                "                </table>" +
                "            </div>");

            $(".my-table-area").hide();
            //看下服务器响应。
            var _resultCode = dataFromServer.resultCode;

            var count = dataFromServer.resultDesc;


            //获取服务器核心数据data
            var data = dataFromServer.resultData;
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var entity = data[i];
                $(".insertData").fadeIn(1000).append("<tr data-opid='" + entity.id + "'>" +
                    "                        <td><input type='checkbox' value='" + entity.id + "'>" + entity.id + "</td>" +
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
                    "                        <td><a href='javascript:void(0)' onclick='popup(\"calc(100vw - 50vw)\",\"calc(100vh - 50vh)\",\"20vh\",\"25vw\",\"<h1>测试</h1>\")'>修改 </a> &nbsp;|&nbsp; <a href='javascript:void(0)' onclick='myPageTools.deleteOrder(this)' data-opid='" + entity.id + "'> 删除</a></td>" +
                    "                    </tr>");
            }

            $(".my-table").append(
                "<tfoot>" +
                "<tr>" +
                "                        <td></td>" +
                "                        <td></td>" +
                "                        <td></td>" +
                "                        <td></td>" +
                "                        <td></td>" +
                "                        <td></td>" +
                "                        <td colspan='6'><div id='tzPage' class='fr'>1</div></td>" +
                "                    </tr>" +
                "</tfoot>");

            //没有接口之前不妨，虚拟一下总条数,60 条数据 看看UI效果。
            myPageTools.initPage(count);

            $(".my-table-area").fadeIn(800);
        }
    });
}
