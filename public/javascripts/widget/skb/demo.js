/**
 * Created by Administrator on 2016/9/20.
 */
require(["#core","#skb"],function(core,SKB){

    var scope = core.registScope();
    var skb = new SKB({
        type : "skb",
        isRandom : true,
        fillTag : '.pw-container',
        num : 6,
        dataMap : {1:"qazwsx",2:"edcrfv",3:"tgbyhn",4:"ujmik,",5:"qweasd",6:"edcrfv",7:"rtgfbd",8:"yuihjk",9:"bnmghj",0:"wdfcvvb"},
        complete : function(data){
            console.log(data);
        }
    });

    scope.test = function(){
        console.log(11111)
    }

    scope.test2 = function(){
        console.log(2222)
    }
    scope.clear = function(){
        skb.clear();
    }

    core.Ready(function(){
    });
});