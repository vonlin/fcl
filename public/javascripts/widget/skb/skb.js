/**
 * Created by Administrator on 2016/11/3.
 */
define(["#event","#core"],function(evt,core){
    var scope = core.registScope();
    var NUMARR = [1,2,3,4,5,6,7,8,9,".",0,""];

    var values = [];//存储输入的值

    //生成键盘的html结构
    function createKeyBoard(numArr,dataMap){
        var _html =
             '<section class="kb-container">'
            +'    <table width="100%" height="100%" cellspacing="0" cellpadding="0">'
            +'        <tr><td>'+numArr[0]+'</td><td>'+numArr[1]+'</td><td>'+numArr[2]+'</td></tr>'
            +'        <tr><td>'+numArr[3]+'</td><td>'+numArr[4]+'</td><td>'+numArr[5]+'</td></tr>'
            +'        <tr><td>'+numArr[6]+'</td><td>'+numArr[7]+'</td><td>'+numArr[8]+'</td></tr>'
            +'        <tr><td>'+numArr[9]+'</td><td>'+numArr[10]+'</td><td id="skb-del"></td></tr>'
            +'    </table>'
            +'</section>';
        $("body").append(_html);
    }

    //生成密码框的html结构
    function createPassword(){

    }


    var SKB = function(options){
        var settings = {
            type        : "skb"        ,//键盘类型(默认：键盘 + 密码)
            fillTag     : ""           ,//接收键盘输入的标签
            isRandom    : false        ,//键盘数字位置是否随机排列
            num         : 6            ,//最大输入个数
            dataMap     : []            //加密map串
        };
        this.options = $.extend(true,{},settings,options);

        var type = this.options.type;
        var fillTag = $(this.options.fillTag);
        var fillTagName = fillTag[0] && fillTag[0].nodeName.toUpperCase();
        //1、键盘 + 密码  type : "skb"
        if(type == "skb"){
            createKeyBoard(NUMARR);
            //点击按键
            evt.regist("click",".kb-container td",function(evt){
                var $currEl = $(evt.target);
                if($currEl.text()){
                    //输入
                    values.push($currEl.text());
                }else{
                    //删除
                    values.pop();
                }
                if(fillTagName == "INPUT" || fillTagName == "textarea"){
                    fillTag.val(values.join(""))
                }else{
                    fillTag.text(values.join(""))
                }
            });

            //删除按键久按
            evt.regist("longTap","#skb-del",function(evt){
                values.length = 0 ;
                if(fillTagName == "INPUT" || fillTagName == "textarea"){
                    fillTag.val("")
                }else{
                    fillTag.text("")
                }
            });
        }

        //2、纯数字键盘   type : "number"
        if(type == "number"){
            createKeyBoard(NUMARR);
            //点击按键
            evt.regist("click",".kb-container td",function(evt){
                var $currEl = $(evt.target);
                if($currEl.text()){
                    //输入
                    values.push($currEl.text());
                }else{
                    //删除
                    values.pop();
                }
                if(fillTagName == "INPUT" || fillTagName == "textarea"){
                    fillTag.val(values.join(""))
                }else{
                    fillTag.text(values.join(""))
                }
            });

            //删除按键久按
            evt.regist("longTap","#skb-del",function(evt){
                values.length = 0 ;
                if(fillTagName == "INPUT" || fillTagName == "textarea"){
                    fillTag.val("")
                }else{
                    fillTag.text("")
                }
            });
        }

        //3、全键盘      type : "all"


    };

    SKB.prototype = {
        close : function(){
            //关闭键盘
        },
        clear : function(){
            //清除目标输入框
        }
    };


    return SKB;
});