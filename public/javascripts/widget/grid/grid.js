/**
 * Created by Administrator on 2016/6/22.
 */
define(['#service','#util','#core'],function(s,util,core){
    'use strict';
    var scope = core.registScope();

    var model = {
        opts : [],
        evts : {},
        datas : {}
    };
    var grid;
    var Grid = function(options){
        var _defaults = {
            params : {
                page : 1,
                size : 10
            },
            draggable : true,
            search : true,
            dbclick : false
        };
        this.options = $.extend(true,{},_defaults,options);
        generator.generate(this.options);
    };

    var generator = {
        generate : function(options){
            var self = this;
            s.get({
                url : options.url,
                data : $.extend(true,{},options.params,options.pager),
                type : "json",
                success : function(data){
                    var tpl = '<table border="0" cellpadding="0" cellspacing="0" class="wg-grid-table">';
                    var list = data[options.data];
                    if(list.length){
                        tpl += self.thead(options);
                        tpl += self.tbody(options,list);
                        tpl += '</table>';
                        tpl += self.pager(options,data);
                        self.bindEvents(list);
                    }else{
                        tpl += '<tr><td>找不到符合条件的记录</td></tr></table>';
                    }
                    $("#" + options.renderId).html(tpl);
                },
                error : function(XMLHttpRequest,textStatus,errorThrown){

                }
            });

        },
        tbody : function(options,dataList){
            var maps = options.maps;
            var draggableAttr = options.draggable ? 'draggable="true"' : '';
            var tpl = '<tbody>';
            for(var rowIndex = 0;rowIndex < dataList.length;rowIndex++){
                var rowData = dataList[rowIndex];
                tpl += '<tr>';
                for(var headIndex = 0;headIndex < maps.length;headIndex++){
                    var head = maps[headIndex];
                    var tdtxt = '';
                    if(head.type && head.type === 'operate'){
                        //operate cols
                        tdtxt = this.operate(head.operates,rowData);
                    }else{
                        //standard cols
                        tdtxt = rowData[head.key];
                        if(head.format && typeof head.format === 'function'){
                            tdtxt = head.format(rowData);
                        }
                    }

                    tpl += '<td ' + draggableAttr + '>' + tdtxt + '</td>'
                }
                tpl += '</tr>';
            }
            tpl += '</tbody>';
            return tpl;
        },
        thead : function(options){
            var maps = options.maps;
            var draggableAttr = options.draggable ? 'draggable="true"' : '';
            var tpl = '<thead><tr>';
            for(var i=0;i < maps.length;i++){
                tpl += '<th title="' + maps[i].value + '" class="' + (maps[i].cls || "") + '" ' + draggableAttr +'>' + maps[i].value + '</th>';
            }
            tpl += '</tr></thead>';
            return tpl;
        },
        pager : function(ops,data){
            var pager = ops.params;
            var pagerHtml = "";
            var total = data.total;//总页数
            var totalItems = data.totalRecord;//总条数
            var currentPage = pager.page;//当前页
            var size = pager.size;
            var pageNum = totalItems%size == 0 ? totalItems/size : Math.floor(totalItems/size) + 1;
            if(ops.pagerSwitch){
                pagerHtml += '<section class="wg-grid-pager g-ta-right"><div class="pager-area-num">';
                if(pageNum <= 8){
                    //只有一页情况
                    if(currentPage == 1){
                        pagerHtml += '<div class="pager-prev wg-g-disabled">上一页</div>';
                    }else{
                        pagerHtml += '<div class="pager-prev" fcl-event="click!prevClick">上一页</div>';
                    }

                    for(var i= 1;i<=pageNum;i++){
                        if(i == currentPage){
                            pagerHtml += '<div class="pager-num pager-current" fcl-event="click!currentClick">'+i+'</div>';
                        }else{
                            pagerHtml += '<div class="pager-num" fcl-event="click!currentClick">'+i+'</div>';
                        }
                    }
                    if(pageNum == 1){
                        pagerHtml += '<div class="pager-next wg-g-disabled">下一页</div>'
                    }else{
                        if(pageNum == currentPage){
                            pagerHtml += '<div class="pager-next wg-g-disabled">下一页</div>'
                        }else{
                            pagerHtml += '<div class="pager-next" fcl-event="click!nextClick">下一页</div>'
                        }
                    }

                }else if(pageNum > 8){
                    if(currentPage == 1){
                        pagerHtml += '<div class="pager-prev wg-g-disabled">上一页</div>';
                    }else{
                        pagerHtml += '<div class="pager-prev" fcl-event="click!prevClick">上一页</div>';
                    }
                    if(currentPage >= 7 && currentPage <= pageNum -6){
                        pagerHtml += '<div class="pager-num" fcl-event="click!currentClick">1</div><div class="pager-ellipsis">...</div>';
                        for(var i= currentPage-1;i<=currentPage+2;i++){
                            if(i == currentPage){
                                pagerHtml += '<div class="pager-num pager-current" fcl-event="click!currentClick">'+i+'</div>';
                            }else{
                                pagerHtml += '<div class="pager-num" fcl-event="click!currentClick">'+i+'</div>';
                            }
                        }
                        pagerHtml += '<div class="pager-ellipsis">...</div><div class="pager-num" fcl-event="click!currentClick">' + pageNum + '</div>';
                    }else if(currentPage > pageNum -6){
                        pagerHtml += '<div class="pager-num" fcl-event="click!currentClick">1</div><div class="pager-ellipsis">...</div>';
                        for(var i= pageNum-5;i<=pageNum;i++){
                            if(i == currentPage){
                                pagerHtml += '<div class="pager-num pager-current" fcl-event="click!currentClick">'+i+'</div>';
                            }else{
                                pagerHtml += '<div class="pager-num" fcl-event="click!currentClick">'+i+'</div>';
                            }
                        }
                    }else{
                        for(var i= 1;i<=6;i++){
                            if(i == currentPage){
                                pagerHtml += '<div class="pager-num pager-current" fcl-event="click!currentClick">'+i+'</div>';
                            }else{
                                pagerHtml += '<div class="pager-num" fcl-event="click!currentClick">'+i+'</div>';
                            }
                        }
                        pagerHtml += '<div class="pager-ellipsis">...</div><div class="pager-num" fcl-event="click!currentClick"">' + pageNum + '</div>';
                    }


                    if(pageNum == currentPage){
                        pagerHtml += '<div class="pager-next wg-g-disabled">下一页</div>'
                    }else{
                        pagerHtml += '<div class="pager-next" fcl-event="click!nextClick">下一页</div>'
                    }
                }
                pagerHtml += '</div><div class="pager-area-opt"><span>共<em>'+total+'</em>页，<em>'+totalItems+'</em>条，到</span><input type="text"/><span>页</span><input type="button" value="确定" fcl-event="click!toPageIndex"/></div></section>';
            }

            return pagerHtml;
        },
        operate : function(ops,data){
            var rtnText = '';
            for(var i=0;i < ops.length; i++){
                var op = ops[i];
                var uuid = util.generateUUID();
                rtnText += '<a href="#" fcl-event="click!optClick" data-eid="' + uuid + '">' + op.value + '</a>';
                model.evts[uuid] = op.action;
            }
            return rtnText;
        },
        bindEvents : function(data){
            scope.optClick = function(dom,evt){
                var index = (dom.closest("tr"))[0].rowIndex;
                model.evts[dom.attr("data-eid")](data[index-1]);
            };

            scope.nextClick = function(dom,evt){
                grid.reload(parseInt($(".pager-current").text()) + 1);
            };

            scope.prevClick = function(dom,evt){
                grid.reload(parseInt($(".pager-current").text()) - 1);
            };

            scope.currentClick = function(dom,evt){
                grid.reload(parseInt(dom.text()));
            };

            scope.toPageIndex = function(dom,evt){
                var index = $(".pager-area-opt [type='text']").val();
                grid.reload(parseInt(index));
            };
        }
    };

    Grid.prototype = {
        constructor : Grid,
        reload : function(index){
            generator.generate($.extend(true,{},this.options,{params : {page : index}}));
        },
        search : function(){
        },
        drag : function(){},
        dbchide : function(){},
        dbcasc : function(){},
        dbcdesc : function(){}
    };

    var GridLoader = {
        load : function(ops){
            grid = new Grid(ops);
        }
    };

    return GridLoader;
});