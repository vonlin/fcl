/**
 * Created by Administrator on 2016/10/27.
 */
define(['#event'],function(evt){
    var direction = 'down',//方向
        isTouchStart = false,
        isScale = false,
        startX,
        startY,
        copyHeader,
        $copyHeader,
        container;

    var bannerHeight = headHeight = 200;

    function $scroll(selector,options){
        var _default = {

        };

        copyHeader = document.querySelector(options.aniDom);
        $copyHeader = $(copyHeader).clone(true);
        container = document.querySelector(selector); //需要执行动效的dom

        var self = this;

    //开始触碰事件
        evt.regist("click",selector,function(e){
            e = e.originalEvent;   //获取原始js事件对象
        //    判断页面是否处于顶部
        //    记录滑屏起始坐标点的X,Y值
            if($(window).scrollTop() <= 0){
                direction = 'down';
            }

            if(direction){
                isTouchStart = isScale = true;
                startX = e.changedTouches[0].pageX;
                startY = e.changedTouches[0].pageY;
            }
        });
    //    move
        evt.regist("move",selector,function(e){
            e = e.originalEvent;
            e.preventDefault();
            if(isTouchStart){
            //    获取滑屏方向
                var dir = evt.getDir({x : startX,y : startY},{x : e.touches[0].pageX , y : e.touches[0].pageY});
                if (dir == 'left' || dir == 'right') return false;

                if(e.changedTouches[0].pageY - startY > 0 && isScale && direction == 'down'){
                    //    下拉
                    self.pullDown(e);
                }
            }
        });

    //    touch end
        evt.regist("end",selector,function(e){
            e = e.originalEvent;
            self.end(e);
        });
    }

    $scroll.prototype = {
        constructor : $scroll,
        pullDown : function(e){
            //滑屏偏移量与动效缩放比例公式
            var scale = (1 + (e.changedTouches[0].pageY - startY) / (2  * bannerHeight)).toFixed(2);
            //开始执行动效，显示需要放大动效的DOM结构
            $(copyHeader).addClass("g-show");
            //执行放大动效及主体内容下拉动效
            copyHeader.style.transform = "scale(" + scale + ")";
            container.style.transform = "translateY(" + bannerHeight * (scale - 1) + "px)";
        },
        pullUp : function(){

        },
        end : function(e){
            if(isTouchStart && isScale){
                //根据滑动距离计算回弹时间
                var distanceY = e.changedTouches[0].pageY - startY;
                var time = distanceY;
                if(time < 150){
                    time = 150;
                }else if(time > 250){
                    time = 250;
                }

                //执行回弹动效和重置
                to(container,'translateY',0,time,iosEase,onChange,function(){
                    //回弹动效结束，隐藏需要放大动效的DOM结构
                    $(copyHeader).removeClass("g-show");
                    isScale = false;
                });
            }
        }
    };

    //回弹动画
    function onChange(value){
        if(direction == 'down'){
            copyHeader.scaleX = copyHeader.scaleY = (headHeight + value) / headHeight;
        }
    }

    //曲线运动函数
    function iosEase(x){
        return Math.sqrt(1 - Math.pow(x-1 , 2));
    }

    var tickID = 0;

    function to(el, property, value, time, ease, onChange, onEnd){
        var current = el[property];
        var dv = value - current;
        var beginTime = new Date();
        var toTick = function(){
            var dt = new Date() - beginTime;
            if(dt >= time){
                el[property] = value;
                onChange && onChange(value);
                onEnd && onEnd(value);
                return;
            }
            el[property] = dv * ease(dt/time) + current;
            tickID = requestAnimationFrame(toTick);
            onChange && onChange(el[property]);
        };
        toTick();
    }


    return $scroll;
});