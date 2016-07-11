/**
 * Created by Administrator on 2016/7/4.
 */
require(['#grid','#service'],function(Grid,Service){
    var grid = new Grid({
        url : 'list',
        renderId : 'gridDemo',
        data : 'qss',
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
                format : function(data){
                    return "猴年马月";
                }
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
                    {key : 'view',value : '查看',action:function(data){console.log(data.month)}},
                    {key : 'modify',value : '修改',action:function(data){console.log(data.managerCode)}}
                ]
            }
        ]
    });


    //Service.get({
    //    url : 'list',
    //    data : {},
    //    success : function(data){
    //        console.log(data);
    //    }
    //});

    //$(document).on("click","a",function(){
    //    $("body").append("<div>adfadf</div>");
    //});
    //$("[e]").each(function(){
    //
    //});
});