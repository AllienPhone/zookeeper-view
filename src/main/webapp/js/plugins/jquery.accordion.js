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
var _3=$.data(_2,"accordion").options;
var _4=$.data(_2,"accordion").panels;
var cc=$(_2);
if(_3.fit==true){
var p=cc.parent();
_3.width=p.width();
_3.height=p.height();
}
if(_3.width>0){
cc.width($.boxModel==true?(_3.width-(cc.outerWidth()-cc.width())):_3.width);
}
var _5="auto";
if(_3.height>0){
cc.height($.boxModel==true?(_3.height-(cc.outerHeight()-cc.height())):_3.height);
var _6=_4.length?_4[0].panel("header").css("height",null).outerHeight():"auto";
var _5=cc.height()-(_4.length-1)*_6;
}
for(var i=0;i<_4.length;i++){
var _7=_4[i];
var _8=_7.panel("header");
_8.height($.boxModel==true?(_6-(_8.outerHeight()-_8.height())):_6);
_7.panel("resize",{width:cc.width(),height:_5});
}
};
function _9(_a){
var _b=$.data(_a,"accordion").panels;
for(var i=0;i<_b.length;i++){
var _c=_b[i];
if(_c.panel("options").collapsed==false){
return _c;
}
}
return null;
};
function _d(_e,_f,_10){
var _11=$.data(_e,"accordion").panels;
for(var i=0;i<_11.length;i++){
var _12=_11[i];
if(_12.panel("options").title==_f){
if(_10){
_11.splice(i,1);
}
return _12;
}
}
return null;
};
function _13(_14){
var cc=$(_14);
cc.addClass("accordion");
if(cc.attr("border")=="false"){
cc.addClass("accordion-noborder");
}else{
cc.removeClass("accordion-noborder");
}
if(cc.find(">div[selected=true]").length==0){
cc.find(">div:first").attr("selected","true");
}
var _15=[];
cc.find(">div").each(function(){
var pp=$(this);
_15.push(pp);
_17(_14,pp,{});
});
cc.bind("_resize",function(){
var _16=$.data(_14,"accordion").options;
if(_16.fit==true){
_1(_14);
}
return false;
});
return {accordion:cc,panels:_15};
};
function _17(_18,pp,_19){
pp.panel($.extend({},_19,{collapsible:false,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:pp.attr("selected")!="true",tools:[{iconCls:"accordion-collapse",handler:function(){
var _1a=$.data(_18,"accordion").options.animate;
if(pp.panel("options").collapsed){
pp.panel("expand",_1a);
}else{
pp.panel("collapse",_1a);
}
return false;
}}],onBeforeExpand:function(){
var _1b=_9(_18);
if(_1b){
var _1c=$(_1b).panel("header");
_1c.removeClass("accordion-header-selected");
_1c.find(".accordion-collapse").triggerHandler("click");
}
var _1c=pp.panel("header");
_1c.addClass("accordion-header-selected");
_1c.find("div.accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
pp.panel("body").find(">div").triggerHandler("_resize");
var _1d=$.data(_18,"accordion").options;
_1d.onSelect.call(_18,pp.panel("options").title);
},onBeforeCollapse:function(){
var _1e=pp.panel("header");
_1e.removeClass("accordion-header-selected");
_1e.find("div.accordion-collapse").addClass("accordion-expand");
}}));
pp.panel("body").addClass("accordion-body");
pp.panel("header").addClass("accordion-header").click(function(){
$(this).find(".accordion-collapse").triggerHandler("click");
return false;
});
};
function _1f(_20,_21){
var _22=$.data(_20,"accordion").options;
var _23=$.data(_20,"accordion").panels;
var _24=_9(_20);
if(_24&&_24.panel("options").title==_21){
return;
}
var _25=_d(_20,_21);
if(_25){
_25.panel("header").triggerHandler("click");
}else{
if(_24){
_24.panel("header").addClass("accordion-header-selected");
_22.onSelect.call(_20,_24.panel("options").title);
}
}
};
function add(_26,_27){
var _28=$.data(_26,"accordion").options;
var _29=$.data(_26,"accordion").panels;
var pp=$("<div></div>").appendTo(_26);
_29.push(pp);
_17(_26,pp,_27);
_1(_26);
_28.onAdd.call(_26,_27.title);
_1f(_26,_27.title);
};
function _2a(_2b,_2c){
var _2d=$.data(_2b,"accordion").options;
var _2e=$.data(_2b,"accordion").panels;
if(_2d.onBeforeRemove.call(_2b,_2c)==false){
return;
}
var _2f=_d(_2b,_2c,true);
if(_2f){
_2f.panel("destroy");
if(_2e.length){
_1(_2b);
var _30=_9(_2b);
if(!_30){
_1f(_2b,_2e[0].panel("options").title);
}
}
}
_2d.onRemove.call(_2b,_2c);
};
$.fn.accordion=function(_31,_32){
if(typeof _31=="string"){
return $.fn.accordion.methods[_31](this,_32);
}
_31=_31||{};
return this.each(function(){
var _33=$.data(this,"accordion");
var _34;
if(_33){
_34=$.extend(_33.options,_31);
_33.opts=_34;
}else{
_34=$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_31);
var r=_13(this);
$.data(this,"accordion",{options:_34,accordion:r.accordion,panels:r.panels});
}
_1(this);
_1f(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq){
return jq.each(function(){
_1(this);
});
},getSelected:function(jq){
return _9(jq[0]);
},getPanel:function(jq,_35){
return _d(jq[0],_35);
},select:function(jq,_36){
return jq.each(function(){
_1f(this,_36);
});
},add:function(jq,_37){
return jq.each(function(){
add(this,_37);
});
},remove:function(jq,_38){
return jq.each(function(){
_2a(this,_38);
});
}};
$.fn.accordion.parseOptions=function(_39){
var t=$(_39);
return {width:(parseInt(_39.style.width)||undefined),height:(parseInt(_39.style.height)||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)};
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,onSelect:function(_3a){
},onAdd:function(_3b){
},onBeforeRemove:function(_3c){
},onRemove:function(_3d){
}};
})(jQuery);

