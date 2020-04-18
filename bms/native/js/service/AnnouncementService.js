var AnnouncementService = {
    showList: function () {

        //  lauui.use(["jquery","layer","form",'table'],function(){});
        layui.use(["jquery", "layer", "form", 'table'], function () {
            var layUi_$ = layui.$, layer = layui.layer, form = layui.form, table = layui.table;

            //1.清楚上一次展示的数据,并设置新的视图。
            globalService.setUIHtml("            <table id=\"demoId\" class=\"layui-hide\" lay-filter=\"demoId\"></table>\n" +
                "            \n" +
                "            <script type=\"text/html\" id=\"toolbarDemo\">\n" +
                "\n" +
                "                <div class=\"layui-btn-group  ml-1 mt-2\">\n" +
                "                    <button type=\"button\" class=\"layui-btn layui-btn-primary layui-btn-sm\"  lay-event=\"addData\"><i class=\"layui-icon\"></i>\n" +
                "                    </button>\n" +
                "                    <button type=\"button\" class=\"layui-btn layui-btn-primary layui-btn-sm\"  lay-event=\"editData\"><i class=\"layui-icon\"></i>\n" +
                "                    </button>\n" +
                "                    <button type=\"button\" class=\"layui-btn layui-btn-primary layui-btn-sm\"  lay-event=\"deleteData\"><i class=\"layui-icon\"></i>\n" +
                "                    </button>\n" +
                "                </div>\n" +
                "            </script>");
            //2.发送ajax.
            $.ajax({
                headers: {"X-Authentication-Token": globalService.tokenOfHeader},
                url: globalService.basePath + '/announcement',
                type: "get",
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                async: true,
                success: function (res) {
                    if (res.code == 200) {
                        table.render({
                            elem: '#demoId'//绑定元素
                            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                            ,toolbar: '#toolbarDemo'
                            , cols: [[
                                {type: 'checkbox', width: 70},
                                //{type:'radio'},
                                {field: 'id', width: 70, title: 'ID', show: false, sort: true}
                                , {field: 'title', width: 280, title: '标题'}
                                , {field: 'content', title: '内容'}
                            ]]
                            , skin: 'line' //表格风格
                            , even: true
                            , page: true //是否显示分页
                            , data: res.data
                            ,height:'full-200'
                            ,limit:30
                            ,done:function () {
                                //         // 表格渲染后，用JS覆盖一下layui表格中不好看的样式。
                                $('#demoId>.layui-table-view').css("margin","2px 0")

                                //alert( $('#demoId>.layui-table-view').css("margin"));
                            }
                        });
                    } else {
                        layer.msg(res.msg);
                    }



                },
                error: function () {
                    layer.msg("接口不可用！");
                }
            });

            // 表格渲染后，用JS覆盖一下layui表格中不好看的样式。
        // .layui-table-view {
        //         margin: 10px 0;
        //     }


            //绑定行点击事件。
            //   table.on('row(demoId)', AnnouncementService.lookOne);
                table.on('toolbar(demoId)', function(obj){

                    console.log(obj)

                    // 行事件
                    var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
                    switch(obj.event){
                        case 'addData':
                            var data = checkStatus.data;  //获取选中行数据
                            alert(JSON.stringify(data));
                            layer.msg("add");
                            //添加数据。
                            globalService.pop(100,100,100,100,"<p>helloword</p>")






                            break;
                        case 'editData':
                            var data = checkStatus.data;  //获取选中行数据
                           alert(JSON.stringify(data));
                            layer.msg("edit")
                            break;
                        case 'deleteData':
                            var data = checkStatus.data;  //获取选中行数据
                           alert(JSON.stringify(data));
                            layer.msg("delete")
                            break;
                    };
                });

        })
    },
    lookOne: function (obj) {
        let lineData = obj.data;

        // for( field in lineData){
        //     console.log(field + ' : ' + lineData[field])
        // }

        layer.open({
            title: lineData.title
            , content: lineData.content
            , area: ['1200px', '550px']
        });


    },
    addList: function () {

    },
    deleteOne: function () {

    },
    updateOne: function () {

    }

}