/**
 * Created by Administrator on 2016/7/4.
 */
require.config({
    //baseUrl : 'jslib',
    paths : {
        'jquery' : '../jslib/jquery.min',
        '@core' : '@core',
        '@event' : '@event',
        '@service' : '@service',
        '@util' : '@util',
        '@grid' : '../widget/grid/grid'
    },
    shim : {
        '@service' : ['@util','@core']
    }
});

require(['@core','jquery'],function(Core,$){
    Core.config({
        localApi : {
            'list' : 'data.json'
        }
    });
});