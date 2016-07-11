/**
 * Created by Administrator on 2016/7/4.
 */

require.config({
    //baseUrl : 'jslib',
    paths : {
        'jquery' : '../jslib/jquery.min',
        '#core' : 'core',
        '#event' : 'event',
        '#service' : 'service',
        '#util' : 'util',
        '#build' : 'build',
        '#grid' : '../widget/grid/grid'
    },
    shim : {
        //'fcl.service' : ['#util','#core']
    }
});

require(['#core','jquery','#event','#build'],function(Core,$){
    Core.config({
        localApi : {
            'list' : 'data.json'
        }
    });
});