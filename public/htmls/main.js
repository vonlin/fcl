/**
 * Created by Administrator on 2016/7/5.
 */
require.config({
    paths : {
        'a' : 'a/a'
    }
});

require(['a'],function(a){
    a();
});