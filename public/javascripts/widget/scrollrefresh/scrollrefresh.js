/**
 * Created by Administrator on 2016/10/27.
 */
define(['#event'],function(evt){
    var direction = '',//方向
        isTouchStart = false,
        isScale = false,
        bannerHeight,
        self,
        startX,
        startY,
        copyHeader,
        $copyHeader,
        container,
        pulldownEl,
        pulldownLabel,
        pulldownImg,
        pullupEl,
        pullupLabel,
        pullupImg,
        loadingTxt = '正在加载...',
        refreshTxt = '释放刷新',
        initTranslateY = 0;

    var topEffect = {};

    var copyHeaderEffect = {};

    function changeTopEffect(){
        container.style.transform = "translateY(" + topEffect.translateY + "px)";
    }

    function changeCopyHeaderEffect(){
        $copyHeader[0].style.transform = "scale(" + copyHeaderEffect.scaleX + "," + copyHeaderEffect.scaleY + ")";
    }

    //回弹动画
    function onChange(value){
        if(direction == 'down' && copyHeader){
            copyHeaderEffect.scaleX = copyHeaderEffect.scaleY = (value + bannerHeight) / bannerHeight;
            changeCopyHeaderEffect();
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
            changeTopEffect();
            tickID = requestAnimationFrame(toTick);
            onChange && onChange(el[property]);
        };
        toTick();
    }


    var scrollrefresh = {
        init : function(selector,options){
            copyHeader = document.querySelector(options.aniDom);
            container = document.querySelector(selector); //需要执行动效的dom
            //下拉图标
            pulldownEl = $("#pulldown");
            pulldownLabel = pulldownEl.find("label");
            pulldownImg = pulldownEl.find("img");
            //上拉图标
            pullupEl = $("#pullup");
            pullupLabel = pullupEl.find("label");
            pullupImg = pullupEl.find("img");

            //如果当前内容没有超出屏幕高度，隐藏上拉加载更多
            if($(container).height() + pullupEl.height() >= $(window).height()){
                pullupEl.removeClass("g-hide");
            }

            if(!copyHeader){
                topEffect.translateY = initTranslateY = -pulldownEl.height();
                changeTopEffect();
                pulldownEl.removeClass("g-hide");
                isScale = true;
            }else{
                //1，保持页面的原生滚动，只有在顶部下拉事件中，才触发动效执行;
                //2，用JS拷贝DOM结构，使动效结构与页面结构解耦，互不影响;
                $copyHeader = $(copyHeader).clone();
                $copyHeader.css({position:"absolute",zIndex:99999,display:"none",transformOrigin : "50% 0%"});
                bannerHeight = $copyHeader.height();
                $(container).before($copyHeader);
            }
            this.options = options;
            self = this;

            //开始触碰事件
            evt.regist("click",selector,function(e){
                e = e.originalEvent;   //获取原始js事件对象
                //    判断页面是否处于顶部
                var btoScrollTop = $(container).height() - $(window).height();  //计算页面滑到底部的距离
                if($(window).scrollTop() <= 0){
                    direction = 'down';
                }else if($(window).scrollTop() >= btoScrollTop){
                    direction = 'up';
                }else{
                    direction = '';
                }
                if(direction == 'down' || direction == 'up'){
                    isTouchStart = isScale = true;
                    //    记录滑屏起始坐标点的X,Y值
                    startX = e.changedTouches[0].pageX;
                    startY = e.changedTouches[0].pageY;
                }
            });
            //    move
            evt.regist("move",selector,function(e){
                e = e.originalEvent;
                if(isTouchStart){
                    //    获取滑屏方向
                    var dir = evt.getDir({x : startX,y : startY},{x : e.touches[0].pageX , y : e.touches[0].pageY});
                    if (dir == 'left' || dir == 'right') return false;

                    if(e.changedTouches[0].pageY - startY > 0 && isScale && direction == 'down'){
                        e.preventDefault();
                        self.pullDown(e);
                    }else if(e.changedTouches[0].pageY - startY < 0 && isScale && direction == 'up'){
                        e.preventDefault();
                        self.pullUp(e);
                    }
                }
            });

            //    touch end
            evt.regist("end",selector,function(e){
                e = e.originalEvent;
                self.end(e);
            });
        },
        pullDown : function(e){
            var disY = e.changedTouches[0].pageY - startY;
            //    下拉
            if(e.changedTouches[0].pageY - startY > 100){
                pulldownImg.css("transform","rotateZ(-180deg)");
                pulldownLabel.text(refreshTxt).addClass("flip");
            }
            if(copyHeader){
                //滑屏偏移量与动效缩放比例公式
                var scale = (1 + (disY) / (2 * bannerHeight)).toFixed(2);
                //开始执行动效，显示需要放大动效的DOM结构
                $copyHeader.show();
                //执行放大动效及主体内容下拉动效
                copyHeaderEffect.scaleX = copyHeaderEffect.scaleY = scale;
                topEffect.translateY = bannerHeight * (scale - 1);
                changeCopyHeaderEffect();
            }else{
                topEffect.translateY = disY + initTranslateY;
            }
            changeTopEffect();
        },
        pullUp : function(e){
            var currentY = -(startY - e.changedTouches[0].pageY)/2;
            if(currentY < -200) currentY = -200;//设置上滑最大距离
            if(currentY <= -100){
                pullupImg.css("transform","rotateZ(-180deg)");
                pullupLabel.text(refreshTxt).addClass("flip");
            }
            topEffect.translateY = currentY + initTranslateY;
            changeTopEffect();
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

                var pdflag = pulldownLabel.hasClass("flip"),
                    puflag = pullupLabel.hasClass("flip");
                //执行回弹动效和重置
                to(topEffect,'translateY',pdflag ? 0 : initTranslateY,time,iosEase,onChange,function(){
                    if(copyHeader){
                        //回弹动效结束，隐藏需要放大动效的DOM结构
                        $copyHeader.hide();
                        isScale = isTouchStart = false;
                        $(container).css("transform","translateY(0)");
                    }else{
                        if(pdflag){
                            pulldownImg.attr("src","loading.gif");
                            pulldownLabel.text(loadingTxt);
                            typeof self.options.pulldown === 'function' && self.options.pulldown(function(){
                                topEffect.translateY = initTranslateY;
                                changeTopEffect();
                                pulldownImg.attr("src","down.png").css("transform","rotateZ(0)");
                                pulldownLabel.text("下拉刷新").removeClass("flip");
                            });
                        }else if(puflag){
                            pullupImg.attr("src","loading.gif");
                            pullupLabel.text(loadingTxt);
                            typeof self.options.pullup === 'function' && self.options.pullup(function(){
                                pullupImg.attr("src","up.png").css("transform","rotateZ(0)");
                                pullupLabel.text("上拉加载更多").removeClass("flip");
                            });
                        }
                    }
                });
            }
        }

    };

    return scrollrefresh;
});