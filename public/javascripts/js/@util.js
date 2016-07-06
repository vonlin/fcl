/**
 * Created by Administrator on 2016/7/4.
 */
define(function(){
    var Util = {
        getTimestamp : function(){
            return 'fcl' + new Date().getTime();
        }
    };

    return Util;
});