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
        '#filter' : 'filter',
        '#grid' : '../widget/grid/grid!CSS'
    },
    shim : {
        //'fcl.service' : ['#util','#core']
    }
});

require(['#core','jquery','#build'],function(Core,$,build){
    build.init();
    Core.config({
        localApi : {
            'list' : 'data.json'
        }
    });
});