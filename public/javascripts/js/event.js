define(['#core'],function(core){
    var scope = core.registScope();

    var isTouch = "ontouchstart" in window;

    var eventTypes = {
        "click" :   isTouch ? "touchstart" : "click",
        "tap" :   isTouch ? "touchstart" : "click",
        "move" : isTouch ? "touchmove" : "mousemove",
        "end" : isTouch ? "touchend" : "mouseout"
    };

    function eventAdapter(eventType,selector,handle){
        var _e = eventTypes[eventType] || eventType;
        $(document).off(_e).on(_e,selector,handle || function(){});
    }

    var Event = {
        regist : function(type, selector, handle){
            //之所以不直接用jquery绑定，可以做一些特殊处理，封装一些额外的事件(H5(touch&tap) & PC(click) 端事件)
            eventAdapter(type, selector, handle);
        },
        batchBinds : function(selectors){
            var doms = $(selectors);
            var attr = selectors;
            var self = this;
            doms.each(function(i,e){
                var _attr = attr.replace(/\[|\]/g,"");
                var type = $(e).attr(_attr).split("!")[0];
                self.regist(type,attr,function(evt){
                    var handler = $(this).attr("fcl-event").split("!")[1];
                    scope[handler]($(this),evt);
                })
            });
        },
        getDir : function(p1,p2){
            //获取页面滑动方向
            var _dir = (Math.abs(p2.x - p1.x) - Math.abs(p2.y - p1.y)),
                _dirX = p2.x - p1.x,
                _dirY = p2.y - p1.y;

            var dir;
            if(_dir > 0 && _dirX > 0){
                dir = "right";
            }else if(_dir > 0 && _dirX < 0){
                dir = "left";
            }else if(_dir <= 0 && _dirY > 0){
                dir = "down";
            }else if(_dir <= 0 && _dirY < 0){
                dir = "up";
            }

            return dir;
        }
    };

    return Event;
});