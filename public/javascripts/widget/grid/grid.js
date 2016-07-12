/**
 * Created by Administrator on 2016/6/22.
 */
define(['#service','#util'],function(s,util){
    'use strict';
    var optevts = [];
    var evts = {};
    var datas = {};
    var model = {
        opts : [],
        evts : {},
        datas : {}
    };
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
                    self.bindEvents(model.opts);
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
                        var dataId = util.generateUUID();
                        model.datas[dataId] = rowData;
                        tdtxt = this.operate(head.operates,rowData,dataId);
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
        operate : function(ops,data,dataId){
            var rtnText = '';
            var cbs = {};
            var tempArr = [];
            for(var i=0;i < ops.length; i++){
                var temp = {};
                var op = ops[i];

                var uuid = util.generateUUID();
                rtnText += '<a href="#" fcl-event="click!optClick_' + op.key + '_' + uuid + '" data-eid="' + uuid + '" data-dataid="' + dataId + '">' + op.value + '</a>';
                temp["uuid"] = uuid;
                var s = op.key;
                model.evts[uuid] = op.action;
                cbs[s] = temp;

            }
            model.opts.push(cbs);
            return rtnText;
        },
        bindEvents : function(opts){
            for(var i=0;i<opts.length;i++){
                var opt = opts[i];
                for(var p in opt){
                    var _o = opt[p];
                    scope["optClick_" + p + "_" + _o.uuid] = function(dom,evt){
                        model.evts[dom.attr("data-eid")](model.datas[dom.attr("data-dataid")]);
                    };
                }
            }
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