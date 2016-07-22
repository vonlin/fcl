/**
 * Created by Administrator on 2016/7/4.
 */
require(['#grid','#service','#core'],function(GridLoader,Service,core){
    var scope = core.registScope();

    var ops = {
        url : '/wg_grid/getList',
        renderId : 'gridDemo',
        data : 'list',
        params : {
            size : 11,
            page : 1
        },
        pagerSwitch : true,
        maps : [
            {
                key : 'managerCode',
                value : '编码'
            },
            {
                key : 'mangerName',
                value : '名称'
            },
            {
                key : 'year',
                value : '年'
            },
            {
                key : 'month',
                value : '月',
                //format : function(data){
                //    return "猴年马月";
                //}
            },
            {
                key : 'reportFileName',
                value : '文件名'
            },
            {
                key : 'operate',
                value : '操作',
                type : 'operate',
                operates : [
                    {key : 'view',value : '查看',action:function(data){
                        Service.get({
                            url : '/wg_grid/view',
                            data : {
                                id : data._id
                            },
                            success : function(data){
                                $("#_id").val(data.data._id);
                                $("#codeu").val(data.data.managerCode);
                                $("#nameu").val(data.data.mangerName);
                                $("#yearu").val(data.data.year);
                                $("#monthu").val(data.data.month);
                                $("#filenameu").val(data.data.reportFileName);
                                $("#update").removeClass("g-hide");
                            }
                        });
                    }},
                    {key : 'modify',value : '修改',action:function(data){
                        Service.get({
                            url : '/wg_grid/view',
                            data : {
                                id : data._id
                            },
                            success : function(data){
                                $("#_id").val(data.data._id);
                                $("#codeu").val(data.data.managerCode);
                                $("#nameu").val(data.data.mangerName);
                                $("#yearu").val(data.data.year);
                                $("#monthu").val(data.data.month);
                                $("#filenameu").val(data.data.reportFileName);
                                $("#update").removeClass("g-hide");
                            }
                        });
                    }},
                    {key : 'delete',value : '删除',action:function(data){
                        Service.post({
                            url : '/wg_grid/delete',
                            data : {
                                id : data._id
                            },
                            success : function(data){
                                GridLoader.load(ops);
                            }
                        });
                    }}
                ]
            }
        ]
    };

    scope.add = function(){
        Service.post({
            url : '/wg_grid/add',
            data : {
                code : $("#code").val(),
                name : $("#name").val(),
                year : $("#year").val(),
                month : $("#month").val(),
                filename : $("#filename").val()
            },
            success : function(data){
                GridLoader.load(ops);
            }
        });
    };

    scope.submitUpdate = function(){
        Service.post({
            url : '/wg_grid/update',
            data : {
                id : $("#_id").val(),
                code : $("#codeu").val(),
                name : $("#nameu").val(),
                year : $("#yearu").val(),
                month : $("#monthu").val(),
                filename : $("#filenameu").val()
            },
            success : function(data){
                $("#update").addClass("g-hide");
                GridLoader.load(ops);
            }
        });
    };

    scope["count"]=0;
    scope.addcount = function(){
        scope.count++ ;
    };

    core.Ready(function(){
        //GridLoader.load(ops);
    });
});