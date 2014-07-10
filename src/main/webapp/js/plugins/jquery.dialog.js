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
var t=$(_2);
t.wrapInner("<div class=\"dialog-content\"></div>");
var _3=t.find(">div.dialog-content");
_3.css("padding",t.css("padding"));
t.css("padding",0);
_3.panel({border:false,doSize:false});
return _3;
};
function _4(_5){
var _6=$.data(_5,"dialog").options;
var _7=$.data(_5,"dialog").contentPanel;
$(_5).find("div.dialog-toolbar").remove();
$(_5).find("div.dialog-button").remove();
if(_6.toolbar){
var _8=$("<div class=\"dialog-toolbar\"></div>").prependTo(_5);
for(var i=0;i<_6.toolbar.length;i++){
var p=_6.toolbar[i];
if(p=="-"){
_8.append("<div class=\"dialog-tool-separator\"></div>");
}else{
var _9=$("<a href=\"javascript:void(0)\"></a>").appendTo(_8);
_9.css("float","left");
_9[0].onclick=eval(p.handler||function(){
});
_9.linkbutton($.extend({},p,{plain:true}));
}
}
_8.append("<div style=\"clear:both\"></div>");
}
if(_6.buttons){
var _a=$("<div class=\"dialog-button\"></div>").appendTo(_5);
for(var i=0;i<_6.buttons.length;i++){
var p=_6.buttons[i];
var _b=$("<a href=\"javascript:void(0)\"></a>").appendTo(_a);
if(p.handler){
_b[0].onclick=p.handler;
}
_b.linkbutton(p);
}
}
var _c=_6.href;
_6.href=null;
$(_5).window($.extend({},_6,{onResize:function(_d,_e){
var _f=$(_5).panel("panel").find(">div.panel-body");
_7.panel("resize",{width:_f.width(),height:(_e=="auto")?"auto":_f.height()-_f.find(">div.dialog-toolbar").outerHeight()-_f.find(">div.dialog-button").outerHeight()});
if(_6.onResize){
_6.onResize.call(_5,_d,_e);
}
}}));
_7.panel({href:_c,onLoad:function(){
if(_6.height=="auto"){
$(_5).window("resize");
}
_6.onLoad.apply(_5,arguments);
}});
_6.href=_c;
};
function _10(_11){
var _12=$.data(_11,"dialog").contentPanel;
_12.panel("refresh");
};
$.fn.dialog=function(_13,_14){
if(typeof _13=="string"){
var _15=$.fn.dialog.methods[_13];
if(_15){
return _15(this,_14);
}else{
return this.window(_13,_14);
}
}
_13=_13||{};
return this.each(function(){
var _16=$.data(this,"dialog");
if(_16){
$.extend(_16.options,_13);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_13),contentPanel:_1(this)});
}
_4(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _17=$.data(jq[0],"dialog").options;
var _18=jq.panel("options");
$.extend(_17,{closed:_18.closed,collapsed:_18.collapsed,minimized:_18.minimized,maximized:_18.maximized});
var _19=$.data(jq[0],"dialog").contentPanel;
return _17;
},dialog:function(jq){
return jq.window("window");
},refresh:function(jq){
return jq.each(function(){
_10(this);
});
}};
$.fn.dialog.parseOptions=function(_1a){
var t=$(_1a);
return $.extend({},$.fn.window.parseOptions(_1a),{});
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);

