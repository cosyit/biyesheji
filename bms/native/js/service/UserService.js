var UserService = {
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
 /*               "                    <button type=\"button\" class=\"layui-btn layui-btn-primary layui-btn-sm\"  lay-event=\"editData\"><i class=\"layui-icon\"></i>\n" +
                "                    </button>\n" +*/
                "                    <button type=\"button\" class=\"layui-btn layui-btn-primary layui-btn-sm\"  lay-event=\"deleteData\"><i class=\"layui-icon\"></i>\n" +
                "                    </button>\n" +
                "                </div>\n" +
                "            </script>");

            //2.发送ajax.
            $.ajax({
                headers: {"X-Authentication-Token": globalService.tokenOfHeader},
                url: globalService.basePath + '/user/list',
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
                            , toolbar: '#toolbarDemo'
                            //            "id": 1,
                            //             "name": "王老师",
                            //             "gender": 1,
                            //             "age": 36,
                            //             "telephone": "123",
                            //             "password": "202CB962AC59075B964B07152D234B70"
                            , cols: [[
                                {type: 'checkbox', width: 70},
                                //{type:'radio'},
                                {field: 'id', width: 70, title: 'ID', show: false, sort: true}
                                , {field: 'name', width: 280, title: '姓名'}
                                , {field: 'gender', title: '性别'}
                                , {field: 'age', title: '年龄'}
                                , {field: 'telephone', title: '电话'}
                                , {field: 'password', title: '密码'}
                            ]]
                            , skin: 'line' //表格风格
                            , even: true
                            , page: true //是否显示分页
                            , data: res.data
                            , height: 'full-200'
                            , limit: 30
                            , done: function () {
                                //         // 表格渲染后，用JS覆盖一下layui表格中不好看的样式。
                                $('#demoId>.layui-table-view').css("margin", "2px 0")

                                //alert( $('#demoId>.layui-table-view').css("margin"));
                            }
                        });
                    } else {
                        layer.msg(res.msg);
                    }
                },
                beforeSend: function () {
                    this.layerIndex = layer.load(0, {shade: [0.5, '#393D49']});
                },
                complete: function () {
                    layer.close(this.layerIndex);
                }
                ,
                error: function () {
                    layer.msg("接口不可用！");
                }
            });

            // 表格渲染后，用JS覆盖一下layui表格中不好看的样式。
            // .layui-table-view {
            //         margin: 10px 0;
            //     }


            //绑定行点击事件。
            table.on('row(demoId)', UserService.lookOne);
            table.on('toolbar(demoId)', function (obj) {
                console.log(obj)

                // 行事件
                var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
                switch (obj.event) {
                    case 'addData':
                        UserService.addOperation(checkStatus);
                        break;
                    case 'editData':
                        UserService.editOperation(checkStatus);
                        break;
                    case 'deleteData':
                        UserService.deleteOperation(checkStatus);
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
    deleteRequest: function (telephone) {
        //发送ajax

        $.ajax({
            headers: {"X-Authentication-Token": globalService.tokenOfHeader},
            url: globalService.basePath + '/user/' + telephone,
            type: "delete",
            contentType: "application/json;charset=utf-8",
            cache: false,
            async: true,
            beforeSend: function () {
                this.layerIndex = layer.load(0, {shade: [0.5, '#393D49']});
            },
            success: function (res) {
                if (res.code == 200) {
                    layer.msg("删除成功")
                }
            },
            complete: function () {
                layer.close(this.layerIndex);
            }
        });

        UserService.showList();
    },
    editUserRequest: function (id) {
        layer.msg("edit id ：" + id);
        //根据id 查询当前id的信息，并绑定到页面上。
        //打开pop 进行数据绑定。
        globalService.pop();
    },
    //添加请求。
    addUserRequest: function () {
        let name = $('.name').val();
        let password = $('.password').val();
        let newTelephone = $('.newTelephone').val();
        let age = $('.age').val();
        let gender = $('.gender').val();

        let param = {name:name,password:password,newTelephone:newTelephone,age: age, gender: gender};
        $.ajax({
            headers: {"X-Authentication-Token": globalService.tokenOfHeader},
            url: globalService.basePath + '/user',
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(param),
            cache: false,
            async: true,
            beforeSend: function () {
                this.layerIndex = layer.load(0, {shade: [0.5, '#393D49']});
            },
            success: function (res) {
                if (res.code == 200) {
                    layer.msg("添加成功")
                }
            },
            complete: function () {
                layer.close(this.layerIndex);
            }
        });
        globalService.removePop();
        UserService.showList();
    },
    queryOneUser:function (id) {
        $.ajax({
            headers: {"X-Authentication-Token": globalService.tokenOfHeader},
            url: globalService.basePath + '/user',
            type: "get",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(param),
            cache: false,
            async: true,
            beforeSend: function () {
                this.layerIndex = layer.load(0, {shade: [0.5, '#393D49']});
            },
            success: function (res) {
                if (res.code == 200) {
                    layer.msg("添加成功")
                }
            },
            complete: function () {
                layer.close(this.layerIndex);
            }
        });
    },
    //添加操作
    addOperation(checkStatus) {
        var data = checkStatus.data;  //获取选中行数据
        // console.log(JSON.stringify(data));
        // layer.msg("add");
        //添加数据。
        globalService.pop("  <div class=\"layui-form-item p-all-20\">\n" +
            "    <label class=\"layui-form-label\">姓名</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" name=\"name\" lay-verify=\"name\" autocomplete=\"off\" placeholder=\"请输入用户姓名\" class=\"layui-input name\">\n" +
            "    </div>\n" +
            "  </div>" +


            "  <div class=\"layui-form-item p-all-20\">\n" +
            "    <label class=\"layui-form-label\">密码</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" name=\"password\" lay-verify=\"password\" autocomplete=\"off\" placeholder=\"请输入用户姓名\" class=\"layui-input password\">\n" +
            "    </div>\n" +
            "  </div>" +

            "  <div class=\"layui-form-item p-all-20\">\n" +
            "    <label class=\"layui-form-label\">年龄</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" name=\"age\" lay-verify=\"number\" autocomplete=\"off\" placeholder=\"请输入用户年龄\" class=\"layui-input age\">\n" +
            "    </div>\n" +
            "  </div>" +

            "  <div class=\"layui-form-item p-all-20\">\n" +
            "    <label class=\"layui-form-label\">电话</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" name=\"newTelephone\" lay-verify=\"number\" autocomplete=\"off\" placeholder=\"请输入用户电话\" class=\"layui-input newTelephone\">\n" +
            "    </div>\n" +
            "  </div>" +

            "  <div class=\"layui-form-item p-all-20\">\n" +
            "    <label class=\"layui-form-label\">性别</label>\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <input type=\"text\" name=\"gender\" lay-verify=\"text\" autocomplete=\"off\" placeholder=\"请输入用户性别\" class=\"layui-input gender\">\n" +
            "    </div>\n" +
            "  </div>" +


            "  <div class=\"layui-form-item  p-horizontal-direction-20\">\n" +
            "    <div class=\"layui-input-block\">\n" +
            "      <button onclick='UserService.addUserRequest()' type=\"submit\" class=\"layui-btn\" lay-submit=\"\" lay-filter=\"demo1\">立即提交</button>\n" +
            "    </div>\n" +
            "  </div>");
    },
    editOperation(checkStatus) {
        var data = checkStatus.data;  //获取选中行数据

        alert(JSON.stringify(data.length));

        if(data.length==0){
            layer.msg("当前未选择，请选择一个公告。");
            return;
        }else if(data.length>1){
            layer.msg("请选择唯一的公告进行编辑。");
            return;
        }else if(data.length == 1){
            UserService.editUserRequest(data[0].id);
        }
    },
    deleteOperation(checkStatus) {
        var data = checkStatus.data;  //获取选中行数据
        console.log(JSON.stringify(data.length));

        if(data.length==0){
            layer.msg("当前未选择，请选择一个用户。");
            return;
        }else if(data.length>1){
            layer.msg("请选择唯一的用户进行删除。");
            return;
        }else if(data.length == 1){
            UserService.deleteRequest(data[0].newTelephone);
        }
    }
}