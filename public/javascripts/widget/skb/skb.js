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
            +'        <tr><td class="hide">'+numArr[9]+'</td><td>'+numArr[10]+'</td><td id="skb-del"></td></tr>'
            +'    </table>'
            +'</section>';
        $("body").append(_html);
    }

    //生成密码框的html结构
    function createPassword(num){
        var _html = '<table class="pw-table" width="100%" height="100%" cellspacing="0" cellpadding="0"><tr>';
        for(var i=0;i<num;i++){
            _html += '<td></td>';
        }
        _html += '</tr></table>';
        return _html;
    }

    //数组乱序
    function shuffle(arr){
        if (!Array.prototype.shuffle) {
            Array.prototype.shuffle = function() {
                for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
                return this;
            };
        }

        arr = [1,2,3,4,5,6,7,8,9,0].shuffle();
        arr.splice(9,0,"");
        arr.splice(11,0,"");
        return arr;
    }


    var SKB = function(options){
        var settings = {
            type        : "skb"        ,//键盘类型(默认：键盘 + 密码)
            fillTag     : ""           ,//接收键盘输入的标签
            isRandom    : false        ,//键盘数字位置是否随机排列
            num         : 6            ,//最大输入个数
            complete    : null         ,//输入完成的回调
            dataMap     : {}            //加密map串
        };
        this.options = $.extend(true,{},settings,options);
        var self = this;

        var type = self.options.type,
            num  = self.options.num,
            dataMap  = self.options.dataMap,
            complete = self.options.complete;

        var $fillTag = $(self.options.fillTag);
        var fillTagName = $fillTag[0] && $fillTag[0].nodeName.toUpperCase();
        //1、键盘 + 密码  type : "skb"
        if(type == "skb"){
            if(this.options.isRandom){
                NUMARR = shuffle(NUMARR);
            }
            createKeyBoard(NUMARR);
            $fillTag.append(createPassword(num)); //添加密码框

            //点击按键
            evt.regist("click",".kb-container td",function(e){
                var $filledEl = $fillTag.find("td.inputed"),//已经输入
                    $lastFilledEl = $(".pw-table td.inputed:last");//最后输入的那个密码框

                var $currEl = $(e.target);
                if($currEl.text()){
                    //输入
                    values.push(dataMap[$currEl.text()]);
                    $filledEl[0] ? $lastFilledEl.next().addClass("inputed") : $fillTag.find("td:first").addClass("inputed");
                    if(values.length == num){
                        typeof complete === 'function' && complete(values.toString());
                    }
                }else if($currEl.hasClass('hide')){
                    //隐藏键盘
                    self.close();
                }else{
                    //删除
                    values.pop();
                    $lastFilledEl[0] && $lastFilledEl.removeClass("inputed");
                }
            });

            //点击密码区域
            evt.regist("click",".pw-table td",function(){
                $(".kb-container").hasClass("g-hide") && $(".kb-container").removeClass("g-hide");
            });
        }

        //2、纯数字键盘   type : "number"
        if(type == "number"){
            createKeyBoard(NUMARR);
            //点击按键
            evt.regist("click",".kb-container td",function(e){
                var $currEl = $(e.target);
                if($currEl.text()){
                    //输入
                    values.push($currEl.text());
                }else{
                    //删除
                    values.pop();
                }
                if(fillTagName == "INPUT" || fillTagName == "textarea"){
                    $fillTag.val(values.join(""))
                }else{
                    $fillTag.text(values.join(""))
                }
            });

            //删除按键久按
            evt.regist("longTap","#skb-del",function(){
                values.length = 0 ;
                if(fillTagName == "INPUT" || fillTagName == "textarea"){
                    $fillTag.val("")
                }else{
                    $fillTag.text("")
                }
            });
        }

        //3、全键盘      type : "all"


    };

    SKB.prototype = {
        close : function(){
            //关闭键盘
            $(".kb-container").addClass("g-hide");
        },
        clear : function(){
            //清除目标输入框
            var fillTag = $(this.options.fillTag);
            if(fillTag[0].nodeName.toUpperCase() == "INPUT" || fillTag[0].nodeName.toUpperCase() == "textarea"){
                fillTag.val("");
                values.length = 0;
            }else{
                fillTag.text("");
                values.length = 0;
            }
        }
    };


    return SKB;
});