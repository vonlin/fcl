define(function(){
    var _configs = null;
    var timestamp = new Date().getTime();
    window[timestamp] = {};

    var Core = {
        Ready : function(cb){
            $(document).ready(function(){
                if(typeof cb === 'function'){
                    cb();
                }
            });
        },
        registScope : function(){
            return window[timestamp];
        },
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
    return Core;
});