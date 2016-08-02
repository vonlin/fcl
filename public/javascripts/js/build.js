define(['#event','#filter','jquery','#core'], function (evt , filter , $, core) {
    var scope = core.registScope();

    var _fcls = {
        evtDoms : [],
        modelDoms : [],
        dataDoms : []
    };

    var build = {
        init : function(){
            document.addEventListener("DOMNodeInserted", function () {
                _fcls["eventDoms"] = $("[fcl-event]");
                _fcls["controlDoms"] = $("[fcl-control]");
                _fcls["modelDoms"] = $("[fcl-model]");
                _fcls["dataDoms"] = $("[fcl-data]");


                _fcls.evtDoms = [{
                    attr : 'fcl-event',
                    doms : _fcls.eventDoms
                },{
                    attr : 'fcl-control',
                    doms : _fcls.controlDoms
                }];


                build.initEvts(_fcls.evtDoms);
                build.initModels(_fcls.modelDoms);
                build.initData(_fcls.dataDoms);
            }, false);
        },
        initEvts : function(evts){
            for(var i=0;i<evts.length;i++){
                evt.batchBinds(evts[i]);
            }
        },
        setModel : function(data){
            //data = {
            //    a : {
            //        c : {
            //            d : {
            //                mangerName : "fouth"
            //            }
            //        },
            //        mangerName : 'inner',
            //        b : {
            //            mangerName : "thrid"
            //        }
            //    },
            //    _id : "adfasfasfdasfasdfasfd",
            //    mangerName  : "outer"
            //};

            var dataDoms = _fcls.dataDoms;
            var i = 0,m=data;//m == Model
            for(;i<dataDoms.length;i++){
                var _dom = dataDoms[i],
                    attrValue = $(_dom).attr("fcl-data"),
                    attrIterator = attrValue.split("|")[0],
                    filterFn = attrValue.split("|")[1];

                try{
                    var dataValue = eval(attrIterator);
                    switch(_dom.nodeName.toLowerCase()){
                        case "input":
                        case "textarea" :
                            if(filterFn && typeof filter[filterFn] === 'function'){
                                dataValue = filter[filterFn](dataValue);
                            }
                            $(_dom).val(dataValue);
                    }
                }catch(e){
                    console.info(e);
                }
            }
        } ,
        initModels : function(modelDoms){
            evt.regist("input",modelDoms,function(evt){
                scope[$(this).attr("fcl-model")] = $(this).val();
            });    // 核心事件对象
        },
        initData : function(){

        }
    };



    return build;
});
