let AchievementService = {

    showList: function () {
        globalService.setUIHtml(`
            <button id="newAchievement" style="margin-top: 32px;margin-left: 32px" onclick="AchievementService.addList()" type="button" class="layui-btn">新增成果</button>
            <table id="demoId" class="layui-hide" lay-filter="demoId"></table>
        `);
        $.ajax({
            headers: {
                "X-Authentication-Token": globalService.tokenOfHeader//此处放置请求到的用户token
            },
            url: `${globalService.basePath}/achievement/self`,
            type: "get",
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            async: true,
            success: function (res) {
                layui.use('table', function () {
                    layui.table.render({
                        elem: '#demoId'//绑定元素
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'title', width: '20%', title: '标题', show: false, sort: true}
                            , {field: 'firstAuthor', width: '10%', title: '第一作者'}
                            , {field: 'department', width: '15%', title: '所属部门'}
                            , {field: 'college', width: '10%', title: '学校署名'}
                            , {field: 'subject', width: '10%', title: '一级学科'}
                            , {field: 'publishType', width: '10%', title: '类别'}
                            , {field: 'publishTime', width: '15%', title: '发布日期', sort: true}
                            , {field: 'categories', width: '10%', title: '学课门类'}
                        ]]
                        , skin: 'line' //表格风格
                        , even: true
                        , data: res.data
                    });
                    //行内监听事件 ,点击行，出章节。
                    layui.table.on('row(demoId)', function (obj) {
                        // 清除数据
                        globalService.setUIHtml(`<table id="demoId" class="layui-hide"></table>`);
                        let id = obj.data.id;
                        $.ajax({
                            headers: {
                                "X-Authentication-Token": globalService.tokenOfHeader//此处放置请求到的用户token
                            },
                            // url: basePath + '/achievement/',
                            url: `${globalService.basePath}/achievement/${id}`,
                            type: "get",
                            contentType: "application/json",
                            dataType: 'json',
                            cache: false,
                            async: true,
                            success: function (res) {
                                console.log(res.data)
                                layui.use('table', function () {
                                    layui.table.render({
                                        elem: '#demoId'//绑定元素
                                        , cellMinWidth: 80
                                        , cols: [[
                                            {field: 'k1', width: '240', title: '标题', show: false, sort: true}
                                            , {field: 'v1', width: '150', title: '第一作者'}
                                            , {field: 'k2', width: '150', title: '所属部门'}
                                            , {field: 'k2', width: '150', title: '学校署名'}
                                        ]]
                                        , skin: 'line' //表格风格
                                        , even: true
                                        , data: [{
                                            k1: "论文题目",
                                            v1: "论文题目",
                                            k2: "论文题目",
                                            v2: "论文题目"
                                        }]
                                        , done: function (res, curr, count) {
                                            $('.layui-table .layui-table-cell > span').css({'font-weight': 'bold'});//表头字体样式
                                            /*$('th').css({'background-color': '#5792c6', 'color': '#fff','font-weight':'bold'}) 表头的样式 */
                                            $('th').hide();//表头隐藏的样式
                                            $('.layui-table-page').css('margin-top', '40px');//页码部分的高度调整
                                        }
                                    });
                                });
                            }
                        })
                    });
                });
            },
            error: function () {
                alert("请求失败！");
            }
        });
    },
    addList: function () {
        globalService.setUIHtml(`<object  data="achievement.html" style="height: 100%;width: 100%"></iframe> `);
    },
    deleteOne: function () {

    },
    updateOne: function () {

    }
};