var AnnouncementService = {

    getToken:function(){
       return  localStorage.getItem("token");
    },

    showList:function(){

      //  lauui.use(["jquery","layer","form",'table'],function(){});
        layui.use(["jquery","layer","form",'table'],function () {
            var layUi_$ = layui.$,  layer = layui.layer,    form = layui.form,  table=layui.table;

            //1.清楚上一次展示的数据。
            $('section').html("");

            //2.发送ajax.
            $.ajax({
                url: basePath+"/announcement",


            })


            //3.数据绑定。

            //4.展示ui.




              // 测试lay-ui 引入 //
            // layer.msg("公告显示");

            $('section').html("            <div class=\"announcement-table-area\">\n" +
                "                <table id=\"demoId\" class=\"layui-hide\" lay-filter=\"demoId\"></table>\n" +
                "            </div>");

            layui.use('table', function () {
                layui.table.render({
                    elem: '#demoId', //绑定元素
                    url: basePath+"/announcement"
                    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                         {field: 'id', width: 70, title: 'ID', sort: true}
                        , {field: 'title', width: 280, title: '小说名'}
                        , {field: 'author', width: 100, title: '作者', sort: true}
                        , {field: 'publish_date', width: 80, title: '时间'}
                        , {field: 'word_count', title: '字数', width: '10%', minWidth: 50} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                        , {field: 'novel_link', title: '链接', sort: true}
                        , {field: 'operator_time', title: '更新时间', sort: true}
                    ]]
                    ,request:{
                        pageName:"pageNo",
                        limitName:"pageSize",
                        request:{
                            beforeSend:function(xhr){

                                alert(1)
                                layer.msg("公告显示");
                                xhr.setRequestHeader("X-Authentication-Token:'"+localStorage.getItem("token")+"'");

                            }
                        }
                    }
                    //数据重新绑定。
                    ,parseData:function(dataFromServer){
                        console.log(dataFromServer);
                        return {
                            "code":0,
                            "count":dataFromServer.data.length,
                            data:dataFromServer.data

                        }
                    }
                    , skin: 'line' //表格风格
                    , even: true
                    , page: true //是否显示分页
                    , page: true //开启分页
                    , limit: 10
                    , limits: [5, 10, 15]

                });

                //行内监听事件 ,点击行，出章节。
                layui.table.on('row(demoId)', function(obj){
                    let lineData = obj.data;
                    //alert(JSON.stringify(lineData))
                    //{"id":1,"title":"落难千金，别嚣张","author":"颜紫欣","publish_date":"2020-02-04 00:00:00","word_count":0,"novel_link":"https://www.hunhun520.com/book/luonanqianjin_biexiaozhang/","status":1,"operator_time":"2020-03-31 19:45:01"}

                    let novelId = lineData.id;
                    //发送ajax. 根据 小说的id查询小说的章节。
                    //chapter/getChapter/{novelId}
                    // localhost:6013/chapter/getChapters/1
                    //视图如何展示？
                    layui.table.render({
                        elem: '#demoId' //绑定元素
                        , url: '/chapter/getChapters/'+novelId //接口
                        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        , cols: [[
                            {field: 'id', width: 70, title: 'ID', sort: true}
                            , {field: 'title', width: 280, title: '章节标题'}
                            , {field: 'publish_date', width: 80, title: '时间'}
                            , {field: 'word_count', title: '字数', width: '10%', minWidth: 50} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                            , {field: 'chapter_link', title: '链接', sort: true}
                            , {field: 'operator_time', title: '更新时间', sort: true}
                        ]]
                        ,request:{
                            pageName:"pageNo",
                            limitName:"pageSize"
                        }
                        //数据重新绑定。
                        ,parseData:function(dataFromServer){
                            // console.log(dataFromServer);
                            return {
                                "code":0,
                                "count":dataFromServer.data.total,
                                data:dataFromServer.data.data
                            }
                        }
                        , skin: 'line' //表格风格
                        , even: true
                        , page: true //是否显示分页
                        , page: true //开启分页
                        , limit: 10
                        , limits: [5, 10, 15]
                    });
                    //标注选中样式
                    obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');

                    //添加行内事件。点击章节出内容。
                    //localhost:6013/content/hunhun/getContentByHref?chapterLink=
                    layui.table.on('row(demoId)', function(obj){
                        let lineData = obj.data;
                        //alert(JSON.stringify(lineData))
                        //{"id":1,"title":"落难千金，别嚣张","author":"颜紫欣","publish_date":"2020-02-04 00:00:00","word_count":0,"novel_link":"https://www.hunhun520.com/book/luonanqianjin_biexiaozhang/","status":1,"operator_time":"2020-03-31 19:45:01"}

                        let chapterLink = lineData.chapter_link;

                        // alert(chapterLink)
                        //视图如何展示？
                        //document.getElementById("demoId").style.display = "none";
                        // obj.addClass('layui-hide');
                        //alert(layui.layUi_$) layui只能在use之后才能进行进行点$（layui.layUi_$）的使用。
                        let $ = layui.jquery;
                        $.ajax({
                            url: "/content/hunhun/getContentByHref",
                            type: 'post',
                            data:{chapterLink:chapterLink},
                            beforeSend: function () {
                                console.log(this)
                                this.layerIndex = layer.load(1, {
                                    shade: [0.5, '#8d8166']
                                    //, content:"正在爬取...",
                                });
                            },
                            success: function (res) {
                                let content = res.data;
                                //console.log(JSON.stringify(res))

                                layer.open({
                                    title: '爬取结果'
                                    ,content: content
                                    ,area: ['1200px', '550px']
                                });

                                //  layer.msg(content)
                            },
                            complete: function () {
                                layer.close(this.layerIndex);
                            },
                        });
                    });
                });


            });


        })
    },
    addList:function(){

    },
    deleteOne:function(){

    },
    updateOne:function(){

    }



}