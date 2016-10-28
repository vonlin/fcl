define(['#event','#filter','jquery','#core'], function (evt , filter , $, core) {
    var scope = core.registScope();

    var _fcls = {
        evtDoms : [],
        modelDoms : [],
        dataDoms : []
    };

    var build = {
        init : function(){
            _fcls["eventDoms"] = "[fcl-event]";
            _fcls["modelDoms"] = "[fcl-get]";
            _fcls["dataDoms"] = "[fcl-set]";

            build.initEvts(_fcls.evtDoms);
            build.initModels(_fcls.modelDoms);
            build.initData(_fcls.dataDoms);
        },
        initEvts : function(evts){
            evt.batchBinds(_fcls["eventDoms"]);
        },
        setModel : function(data){
            var dataDoms = $(_fcls.dataDoms);
            var i = 0,m=data;//m == Model
            for(;i<dataDoms.length;i++){
                var _dom = dataDoms[i],
                    attrValue = $(_dom).attr("fcl-set"),
                    attrIterator = attrValue.split("|")[0],
                    filterFn = attrValue.split("|")[1];
                try{
                    var attrs = attrIterator.split(".");
                    var concatObjs = "";
                    for(var j = 0;j<attrs.length;j++){
                        concatObjs += "['" + attrs[j] + "']";
                    }
                    switch(_dom.nodeName.toLowerCase()){
                        case "input":
                        case "textarea" :
                            var _value = eval("m" + concatObjs);
                            if(filterFn && typeof filter[filterFn] === 'function'){
                                _value = filter[filterFn](_value);
                            }
                            $(_dom).val(_value);
                    }
                }catch(e){
                    console.info(e);
                }
            }
        } ,
        initModels : function(modelDoms){
            evt.regist("input",modelDoms,function(evt){
                scope[$(this).attr("fcl-get")] = $(this).val();
            });    // 核心事件对象
        },
        initData : function(){

        }
    };



    return build;
});
