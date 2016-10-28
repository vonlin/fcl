/**
 * Created by Administrator on 2016/9/20.
 */
require(["#core"],function(core){

    var scope = core.registScope();

    scope.test = function(){
        console.log(11111)
    }

    scope.test2 = function(){
        console.log(2222)
    }

    core.Ready(function(){

    });
});