define(['#core'],function(core){
    var scope = core.registScope();

    var event = {
        regist : function(type, doms, handle){
            //之所以不直接用jquery绑定，可以做一些特殊处理，封装一些额外的事件
            $(doms).on(type,handle || function(){});
        },
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