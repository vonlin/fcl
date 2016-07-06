/**
 * Created by Administrator on 2016/7/4.
 */
define(['@util','@core'],function(Util,Core){
    var headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept-Language' : 'en;q=1, fr;q=0.9, de;q=0.8, zh-Hans;q=0.7, zh-Hant;q=0.6, ja;q=0.5',
        'fcl-timestamp' : Util.getTimestamp(),
        'fcl-version' : 'fcl_1.0'
    };

    var send = function(type,obj){
        if(Core.getLocalApi && (Core.getLocalApi())[obj.url]){
            var _obj = $.extend({},true,obj,{headers : headers,type : type,url : (Core.getLocalApi())[obj.url],dataType : 'json'});
            $.ajax(_obj);
        }else{
            var _obj = $.extend({},true,obj,{headers : headers,type : type,dataType : 'json'});
            $.ajax(_obj);
        }
    };

    var Service = {
        post : function(settings){
            send('POST',settings);
        },
        get : function(settings){
            send('GET',settings);
        },
        put : function(){

        }
    };

    return Service;
});