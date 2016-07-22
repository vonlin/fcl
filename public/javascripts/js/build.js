define(['#event','jquery'], function (evt,$) {
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
        initModels : function(){

        },
        initData : function(){

        }
    };



    return build;
});
