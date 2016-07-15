/**
 * Created by Administrator on 2016/7/4.
 */
define(function(){
    var _configs = null;
    var scope = {};
    var Core = {
        config : function(configs){
            _configs = configs;
            this.loadJS();
        },
        getConfig : function(){
            return _configs;
        },
        getLocalApi : function(){
            return _configs.localApi;
        },
        loadJS : function(){
            var _script = document.getElementById("require");
            var pageJS = _script.getAttribute("data-js");
            if(pageJS){
                var script = document.createElement("script");
                script.src = pageJS;
                script.type = 'text/javascript';
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };

    window.scope = scope;
    return Core;
});