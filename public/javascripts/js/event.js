define(['#core'],function(core){
    var scope = core.registScope();
    var _startTime = 0,_endTime,longTime;
    var isTouch = "ontouchstart" in window;

    var eventTypes = {
        "click" :   isTouch ? "touchstart" : "click",
        "tap" :   isTouch ? "touchstart" : "click",
        "move" : isTouch ? "touchmove" : "mousemove",
        "end" : isTouch ? "touchend" : "mouseup",
        "longTap" : "longTap"
    };

    function eventAdapter(eventType,selector,handle){
        var _e = eventTypes[eventType] || eventType;
        if(_e == 'longTap'){
            //久按
            Event.regist("end",selector,function(){
                _endTime = new Date().getTime();
                longTime = (_endTime - _startTime) / 1000;
                if(longTime >=0.5 ){
                    handle();
                }
            });
        }else{
            $(document).off(_e).on(_e,selector,function(e){
                if(_e == eventTypes.click){
                    _startTime = new Date().getTime();//记录开始点击时间
                }

                handle(e);
            });
        }
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
                    var _attr = $(this).attr("fcl-event");
                    var _hander = _attr.split("!")[1];
                    var _type = _attr.split("!")[0];
                    if(_type.indexOf(":") != -1){
                        //绑定后代元素事件
                        var subType = type.split(":");
                        self.regist(subType[1],"[fcl-event='" + _attr + "'] " + subType[0],function(evt){
                            scope[_hander]($(this),evt);
                        })
                    }else{
                        scope[_hander]($(this),evt);
                    }
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