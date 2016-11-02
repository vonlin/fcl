/**
 * Created by Administrator on 2016/10/31.
 */

require(['#scrollrefresh'],function(sr){
    new sr("#scroll",{
        //aniDom : "img",
        pulldown : function(cb){
            setTimeout(function(){
                cb();
            },3000);
        },
        pullup : function(cb){
            setTimeout(function(){
                cb();
            },3000);
        }
    });
});