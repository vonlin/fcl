define(function(){
    var event = {
        batchBinds : function(doms){
            doms.each(function(i,e){
                var type = $(e).attr("fcl-event").split("!")[0];
                var handler = $(e).attr("fcl-event").split("!")[1];
                $(e).off(type).on(type,function(evt){
                    scope[handler]($(this),evt);
                });
            });
        }
    };

    return event;
    //document.addEventListener("DOMNodeInserted",function(){console.log(111)},false)
});