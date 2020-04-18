var AnnouncementService = {

    getToken: function () {
        return localStorage.getItem("token");
    },

    showList: function () {

        //  lauui.use(["jquery","layer","form",'table'],function(){});
        layui.use(["jquery", "layer", "form", 'table'], function () {
            var layUi_$ = layui.$, layer = layui.layer, form = layui.form, table = layui.table;

            //1.清楚上一次展示的数据,并设置新的视图。
            $('section').html("            <div class=\"announcement-table-area\">\n" +
                "                <table id=\"demoId\" class=\"layui-hide\" lay-filter=\"demoId\"></table>\n" +
                "            </div>");

            //2.发送ajax.
            $.ajax({
                headers: {
                    "X-Authentication-Token": tokenOfHeader//此处放置请求到的用户token
                },
                url: basePath + '/announcement',
                type: "get",
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                async: true,
                success: function (res) {
                        if(res.code == 200){
                            table.render({
                                elem: '#demoId'//绑定元素
                                , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                                , cols: [[
                                    {field: 'id', width: 70, title: 'ID',show:false, sort: true}
                                    , {field: 'title', width: 280, title: '标题'}
                                    , {field: 'content', title: '内容'}
                                ]]
                                , skin: 'line' //表格风格
                                , even: true
                                , page: true //是否显示分页
                                , data: res.data
                            });
                        }else {
                            layui.msg(res.msg);
                        }

                },
                error: function () {
                    layui.msg("接口不可用！");
                }
            });




        })
    },
    addList: function () {

    },
    deleteOne: function () {

    },
    updateOne: function () {

    }


}