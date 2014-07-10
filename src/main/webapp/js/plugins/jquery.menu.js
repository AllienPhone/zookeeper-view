/**
 * jQuery EasyUI 1.2.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
$(_2).appendTo("body");
$(_2).addClass("menu-top");
var _3=[];
_4($(_2));
var _5=null;
for(var i=0;i<_3.length;i++){
var _6=_3[i];
_7(_6);
_6.find(">div.menu-item").each(function(){
_8($(this));
});
_6.find("div.menu-item").click(function(){
if(!this.submenu){
_17(_2);
var _9=$(this).attr("href");
if(_9){
location.href=_9;
}
}
var _a=$(_2).menu("getItem",this);
$.data(_2,"menu").options.onClick.call(_2,_a);
});
_6.bind("mouseenter",function(){
if(_5){
clearTimeout(_5);
_5=null;
}
}).bind("mouseleave",function(){
_5=setTimeout(function(){
_17(_2);
},100);
});
}
function _4(_b){
_3.push(_b);
_b.find(">div").each(function(){
var _c=$(this);
var _d=_c.find(">div");
if(_d.length){
_d.insertAfter(_2);
_c[0].submenu=_d;
_4(_d);
}
});
};
function _8(_e){
_e.hover(function(){
_e.siblings().each(function(){
if(this.submenu){
_1a(this.submenu);
}
$(this).removeClass("menu-active");
});
_e.addClass("menu-active");
var _f=_e[0].submenu;
if(_f){
var _10=_e.offset().left+_e.outerWidth()-2;
if(_10+_f.outerWidth()>$(window).width()){
_10=_e.offset().left-_f.outerWidth()+2;
}
_1e(_f,{left:_10,top:_e.offset().top-3});
}
},function(e){
_e.removeClass("menu-active");
var _11=_e[0].submenu;
if(_11){
if(e.pageX>=parseInt(_11.css("left"))){
_e.addClass("menu-active");
}else{
_1a(_11);
}
}else{
_e.removeClass("menu-active");
}
});
_e.unbind(".menu").bind("mousedown.menu",function(){
return false;
});
};
function _7(_12){
_12.addClass("menu").find(">div").each(function(){
var _13=$(this);
if(_13.hasClass("menu-sep")){
_13.html("&nbsp;");
}else{
var _14=_13.addClass("menu-item").html();
_13.empty().append($("<div class=\"menu-text\"></div>").html(_14));
var _15=_13.attr("iconCls")||_13.attr("icon");
if(_15){
$("<div class=\"menu-icon\"></div>").addClass(_15).appendTo(_13);
}
if(_13[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(_13);
}
if($.boxModel==true){
var _16=_13.height();
_13.height(_16-(_13.outerHeight()-_13.height()));
}
}
});
_12.hide();
};
};
function _17(_18){
var _19=$.data(_18,"menu").options;
_1a($(_18));
$(document).unbind(".menu");
_19.onHide.call(_18);
return false;
};
function _1b(_1c,pos){
var _1d=$.data(_1c,"menu").options;
if(pos){
_1d.left=pos.left;
_1d.top=pos.top;
}
_1e($(_1c),{left:_1d.left,top:_1d.top},function(){
$(document).unbind(".menu").bind("mousedown.menu",function(){
_17(_1c);
$(document).unbind(".menu");
return false;
});
_1d.onShow.call(_1c);
});
};
function _1e(_1f,pos,_20){
if(!_1f){
return;
}
if(pos){
_1f.css(pos);
}
_1f.show(1,function(){
if(!_1f[0].shadow){
_1f[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(_1f);
}
_1f[0].shadow.css({display:"block",zIndex:$.fn.menu.defaults.zIndex++,left:_1f.css("left"),top:_1f.css("top"),width:_1f.outerWidth(),height:_1f.outerHeight()});
_1f.css("z-index",$.fn.menu.defaults.zIndex++);
if(_20){
_20();
}
});
};
function _1a(_21){
if(!_21){
return;
}
_22(_21);
_21.find("div.menu-item").each(function(){
if(this.submenu){
_1a(this.submenu);
}
$(this).removeClass("menu-active");
});
function _22(m){
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
$.fn.menu=function(_23,_24){
if(typeof _23=="string"){
return $.fn.menu.methods[_23](this,_24);
}
_23=_23||{};
return this.each(function(){
var _25=$.data(this,"menu");
if(_25){
$.extend(_25.options,_23);
}else{
_25=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,_23)});
_1(this);
}
$(this).css({left:_25.options.left,top:_25.options.top});
});
};
$.fn.menu.methods={show:function(jq,pos){
return jq.each(function(){
_1b(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_17(this);
});
},setText:function(jq,_26){
return jq.each(function(){
$(_26.target).children("div.menu-text").html(_26.text);
});
},setIcon:function(jq,_27){
return jq.each(function(){
var _28=$(this).menu("getItem",_27.target);
if(_28.iconCls){
$(_28.target).children("div.menu-icon").removeClass(_28.iconCls).addClass(_27.iconCls);
}else{
$("<div class=\"menu-icon\"></div>").addClass(_27.iconCls).appendTo(_27.target);
}
});
},getItem:function(jq,_29){
var _2a={target:_29,text:$(_29).children("div.menu-text").html()};
var _2b=$(_29).children("div.menu-icon");
if(_2b.length){
var cc=[];
var aa=_2b.attr("class").split(" ");
for(var i=0;i<aa.length;i++){
if(aa[i]!="menu-icon"){
cc.push(aa[i]);
}
}
_2a.iconCls=cc.join(" ");
}
return _2a;
}};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,onShow:function(){
},onHide:function(){
},onClick:function(_2c){
}};
})(jQuery);

