define(['#core'],function(core){
    var scope = core.registScope();

    var event = {
        batchBinds : function(evts){
            var doms = evts.doms;
            var attr = evts.attr;
            doms.each(function(i,e){
                var type = $(e).attr(attr).split("!")[0];
                var handler = $(e).attr(attr).split("!")[1];
                $(e).off(type).on(type,function(evt){
                    scope[handler]($(this),evt);

                    //if the control
                    if(attr.indexOf("control") != -1){
                        var models = $("[fcl-model]");

                        models.each(function(i,e){
                            var model = $(e).attr("fcl-model");
                            switch($(e)[0].nodeName.toLowerCase()){
                                case 'input' : $(e).val(scope[model]);
                            }
                        });

                    }
                });
            });
        }
    };

    return event;
});