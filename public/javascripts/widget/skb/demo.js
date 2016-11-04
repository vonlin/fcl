/**
 * Created by Administrator on 2016/9/20.
 */
require(["#core","#skb"],function(core,SKB){

    var scope = core.registScope();
    var skb = new SKB({
        type : "number",
        fillTag : '#targetInput'
    });

    scope.test = function(){
        console.log(11111)
    }

    scope.test2 = function(){
        console.log(2222)
    }

    core.Ready(function(){
    });
});