/**
 * Created by Administrator on 2016/6/22.
 */
define(['#service','#util'],function(s,util){
    'use strict';
    var Grid = function(options){
        var _defaults = {
            draggable : true,
            search : true,
            dbclick : false
        };
        this.options = $.extend({},true,options);
        generator.generate(this.options);
    };

    var generator = {
        generate : function(options){
            var self = this;
            s.get({
                url : options.url,
                data : options.params,
                type : "json",
                success : function(data){
                    var tpl = '<table>';
                    tpl += self.thead(options.maps);
                    tpl += self.tbody(options.maps,data[options.data]);
                    tpl += '</table>';

                    $("#" + options.renderId).html(tpl);
                },
                error : function(XMLHttpRequest,textStatus,errorThrown){

                }
            });

        },
        tbody : function(maps,dataList){
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

                    tpl += '<td>' + tdtxt + '</td>'
                }
                tpl += '</tr>';
            }
            tpl += '</tbody>';
            return tpl;
        },
        thead : function(maps){
            var tpl = '<thead><tr>';
            for(var i=0;i < maps.length;i++){
                tpl += '<th title="' + maps[i].value + '">' + maps[i].value + '</th>';
            }
            tpl += '</tr></thead>';
            return tpl;
        },
        operate : function(ops,data){
            var rtnText = '';
            for(var i=0;i < ops.length; i++){
                var op = ops[i];
                var temp = {};
                var uuid = util.generateUUID();
                temp[uuid] = op.action;
                rtnText += '<a href="#" fcl-event="click!optClick_' + op.key + '_' + uuid + '">' + op.value + '</a>';
                scope["optClick_" + op.key + "_" + uuid] = function(dom,evt){
                    temp[uuid](data);
                };
            }

            return rtnText;
        },
        bindEvent : function(){
            //scope.action =
        }
    };

    Grid.prototype = {
        constructor : Grid,
        search : function(){
        },
        drag : function(){},
        dbchide : function(){},
        dbcasc : function(){},
        dbcdesc : function(){}
    };


    return Grid;
});