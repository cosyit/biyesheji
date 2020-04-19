let AchievementService = {

    showList: function () {
        globalService.setUIHtml(`<form class="layui-form" style="margin-top: 32px;">
    <label style="margin: 50px;font-size: 32px;width: 300px">基本信息</label>
    <div class="layui-form-item" style="margin-top: 24px;">
        <label class="layui-form-label">论文题目</label>
        <div class="layui-input-inline">
            <input type="text" name="title" required lay-verify="required"
                   autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">第一作者</label>
        <div class="layui-input-inline">
            <input type="text" name="firstAuthor" required lay-verify="required"
                   autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">所属单位</label>
        <div class="layui-input-inline">
            <select name="department" lay-verify="required">
                <option value="其他">其他</option>
                <option value="计算机学院">计算机学院</option>
                <option value="软件学院">软件学院</option>
            </select>
        </div>

        <label class="layui-form-label">学校署名</label>
        <div class="layui-input-inline">
            <select name="college" lay-verify="required">
                <option value="一级单位">一级单位</option>
                <option value="非一级单位">非一级单位</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">一级学科</label>
        <div class="layui-input-inline">
            <select name="subject" lay-verify="required">
                <option value="其他">其他</option>
                <option value="计算机科学技术">计算机科学技术</option>
            </select>
        </div>

        <label class="layui-form-label">学课门类</label>
        <div class="layui-input-inline">
            <select name="categories" lay-verify="required">
                <option value="其他">其他</option>
                <option value="社科类">社科类</option>
                <option value="教育类">教育类</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">刊物类型</label>
        <div class="layui-input-inline">
            <select name="publishType" lay-verify="required">
                <option value="其他">其他</option>
                <option value="中文普通期刊">中文普通期刊</option>
                <option value="CSSCI">CSSCI</option>
                <option value="外文期刊">外文期刊</option>
            </select>
        </div>

        <label class="layui-form-label" style="width: 90px">发表/出版时间</label>
        <div class="layui-input-inline">
            <input name="publishTime" type="text" class="layui-input" id="timeSelector">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">发表范围</label>
        <div class="layui-input-inline">
            <select name="publishScope" lay-verify="required">
                <option value="国内公开发行">国内公开发行</option>
                <option value="国外公开发行">国外公开发行</option>
                <option value="国内外公开发行">国内外公开发行</option>
            </select>
        </div>

        <label class="layui-form-label">字数(万)</label>
        <div class="layui-input-inline">
            <input type="number" name="wordCount" required lay-verify="required" autocomplete="off"
                   min="0.0001"
                   step="0.01" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">CN/ISSN号</label>
        <div class="layui-input-inline">
            <input type="text" name="cnIssn" required lay-verify="required" autocomplete="off"
                   class="layui-input">
        </div>
        <label class="layui-form-label">是否为译文</label>
        <div class="layui-input-inline">
            <input type="radio" name="translation" value="1" title="是">
            <input type="radio" name="translation" value="0" title="否" checked>
        </div>
    </div>
    <label style="margin: 50px;font-size: 32px;width: 300px">作者信息</label>
    <table class="layui-table" style="width: 50%" lay-filter="authors">
        <thead>
        <tr>
            <th style="width: 70px">署名顺序</th>
            <th>作者姓名</th>
            <th style="width: 70px">性别</th>
            <th>所属单位</th>
            <th style="width: 70px">贡献率(%)</th>
            <th style="width: 70px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <input type="number" name="seq" required lay-verify="required" autocomplete="off"
                       class="layui-input">
            </td>
            <td>
                <input type="text" name="authorName" required lay-verify="required" autocomplete="off"
                       class="layui-input">
            </td>
            <td>
                <select name="gender" lay-verify="required">
                    <option value="0">其他</option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
            </td>
            <td>
                <input type="text" name="department" required lay-verify="required" autocomplete="off"
                       class="layui-input">
            </td>
            <td>
                <input type="number" name="contribution" required lay-verify="required" autocomplete="off"
                       class="layui-input">
            </td>
            <td>
                <a href="javascript:void(0)" onclick="insert(this)">新增</a>
            </td>
        </tr>
        </tbody>
    </table>
    <label style="margin: 80px 50px 50px;font-size: 32px;width: 300px">附件信息</label>
    <div class="layui-input-inline">
        <button type="button" class="layui-btn" id="fileUpload" style="margin-top: -15px;">
            <i class="layui-icon">&#xe67c;</i>上传图片
        </button>
        <form enctype="multipart/form-data">
            <input id="fileUploadInput" type="file" name="file" hidden>
        </form>
    </div>
    <button id="submit" type="button" class="layui-btn">提交</button>
</form>`);
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