/**
 * Created by Administrator on 2016/7/4.
 */
define(function(){
    var Util = {
        getTimestamp : function(){
            return 'fcl' + new Date().getTime();
        },
        generateUUID : function(){
            var d = new Date().getTime();
            var uuid = 'xxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
    };

    return Util;
});