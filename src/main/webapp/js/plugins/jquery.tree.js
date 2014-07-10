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
var _3=$(_2);
_3.addClass("tree");
return _3;
};
function _4(_5){
var _6=[];
_7(_6,$(_5));
function _7(aa,_8){
_8.children("li").each(function(){
var _9=$(this);
var _a={};
_a.text=_9.children("span").html();
if(!_a.text){
_a.text=_9.html();
}
_a.id=_9.attr("id");
_a.iconCls=_9.attr("iconCls")||_9.attr("icon");
_a.checked=_9.attr("checked")=="true";
_a.state=_9.attr("state")||"open";
var _b=_9.children("ul");
if(_b.length){
_a.children=[];
_7(_a.children,_b);
}
aa.push(_a);
});
};
return _6;
};
function _c(_d){
var _e=$.data(_d,"tree").options;
var _f=$.data(_d,"tree").tree;
$("div.tree-node",_f).unbind(".tree").bind("dblclick.tree",function(){
_ae(_d,this);
_e.onDblClick.call(_d,_8b(_d));
}).bind("click.tree",function(){
_ae(_d,this);
_e.onClick.call(_d,_8b(_d));
}).bind("mouseenter.tree",function(){
$(this).addClass("tree-node-hover");
return false;
}).bind("mouseleave.tree",function(){
$(this).removeClass("tree-node-hover");
return false;
}).bind("contextmenu.tree",function(e){
_e.onContextMenu.call(_d,e,_33(_d,this));
});
$("span.tree-hit",_f).unbind(".tree").bind("click.tree",function(){
var _10=$(this).parent();
_68(_d,_10[0]);
return false;
}).bind("mouseenter.tree",function(){
if($(this).hasClass("tree-expanded")){
$(this).addClass("tree-expanded-hover");
}else{
$(this).addClass("tree-collapsed-hover");
}
}).bind("mouseleave.tree",function(){
if($(this).hasClass("tree-expanded")){
$(this).removeClass("tree-expanded-hover");
}else{
$(this).removeClass("tree-collapsed-hover");
}
}).bind("mousedown.tree",function(){
return false;
});
$("span.tree-checkbox",_f).unbind(".tree").bind("click.tree",function(){
var _11=$(this).parent();
_2a(_d,_11[0],!$(this).hasClass("tree-checkbox1"));
return false;
}).bind("mousedown.tree",function(){
return false;
});
};
function _12(_13){
var _14=$.data(_13,"tree").options;
var _15=$.data(_13,"tree").tree;
if(!_14.dnd){
_15.find("div.tree-node").draggable("disable");
_15.find("div.tree-node").css("cursor","pointer");
return;
}
_15.find("div.tree-node").draggable({revert:true,cursor:"pointer",proxy:function(_16){
var p=$("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
p.html($(_16).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onStartDrag:function(){
$(this).draggable("proxy").css({left:-10000,top:-10000});
},onDrag:function(e){
$(this).draggable("proxy").show();
this.pageY=e.pageY;
}}).droppable({onDragOver:function(e,_17){
var _18=_17.pageY;
var top=$(this).offset().top;
var _19=top+$(this).outerHeight();
$(_17).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_18>top+(_19-top)/2){
if(_19-_18<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_18-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
},onDragLeave:function(e,_1a){
$(_1a).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
},onDrop:function(e,_1b){
var _1c=this;
var _1d,_1e;
if($(this).hasClass("tree-node-append")){
_1d=_1f;
}else{
_1d=_20;
_1e=$(this).hasClass("tree-node-top")?"top":"bottom";
}
setTimeout(function(){
_1d(_1b,_1c,_1e);
},0);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _1f(_21,_22){
if(_33(_13,_22).state=="closed"){
_5c(_13,_22,function(){
_23();
});
}else{
_23();
}
function _23(){
var _24=$(_13).tree("pop",_21);
$(_13).tree("append",{parent:_22,data:[_24]});
_14.onDrop.call(_13,_22,_24,"append");
};
};
function _20(_25,_26,_27){
var _28={};
if(_27=="top"){
_28.before=_26;
}else{
_28.after=_26;
}
var _29=$(_13).tree("pop",_25);
_28.data=_29;
$(_13).tree("insert",_28);
_14.onDrop.call(_13,_26,_29,_27);
};
};
function _2a(_2b,_2c,_2d){
var _2e=$.data(_2b,"tree").options;
if(!_2e.checkbox){
return;
}
var _2f=$(_2c);
var ck=_2f.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_2d){
ck.addClass("tree-checkbox1");
}else{
ck.addClass("tree-checkbox0");
}
if(_2e.cascadeCheck){
_30(_2f);
_31(_2f);
}
var _32=_33(_2b,_2c);
_2e.onCheck.call(_2b,_32,_2d);
function _31(_34){
var _35=_34.next().find(".tree-checkbox");
_35.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_34.find(".tree-checkbox").hasClass("tree-checkbox1")){
_35.addClass("tree-checkbox1");
}else{
_35.addClass("tree-checkbox0");
}
};
function _30(_36){
var _37=_73(_2b,_36[0]);
if(_37){
var ck=$(_37.target).find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_38(_36)){
ck.addClass("tree-checkbox1");
}else{
if(_39(_36)){
ck.addClass("tree-checkbox0");
}else{
ck.addClass("tree-checkbox2");
}
}
_30($(_37.target));
}
function _38(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox0")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")){
b=false;
}
});
return b;
};
function _39(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox1")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")){
b=false;
}
});
return b;
};
};
};
function _3a(_3b,_3c){
var _3d=$.data(_3b,"tree").options;
var _3e=$(_3c);
if(_3f(_3b,_3c)){
var ck=_3e.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_2a(_3b,_3c,true);
}else{
_2a(_3b,_3c,false);
}
}else{
if(_3d.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_3e.find(".tree-title"));
_c(_3b);
}
}
}else{
var ck=_3e.find(".tree-checkbox");
if(_3d.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_2a(_3b,_3c,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _40=true;
var _41=true;
var _42=_43(_3b,_3c);
for(var i=0;i<_42.length;i++){
if(_42[i].checked){
_41=false;
}else{
_40=false;
}
}
if(_40){
_2a(_3b,_3c,true);
}
if(_41){
_2a(_3b,_3c,false);
}
}
}
}
}
};
function _44(_45,ul,_46,_47){
var _48=$.data(_45,"tree").options;
if(!_47){
$(ul).empty();
}
var _49=[];
var _4a=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
_4b(ul,_46,_4a);
_c(_45);
_12(_45);
for(var i=0;i<_49.length;i++){
_2a(_45,_49[i],true);
}
var _4c=null;
if(_45!=ul){
var _4d=$(ul).prev();
_4c=_33(_45,_4d[0]);
}
_48.onLoadSuccess.call(_45,_4c,_46);
function _4b(ul,_4e,_4f){
for(var i=0;i<_4e.length;i++){
var li=$("<li></li>").appendTo(ul);
var _50=_4e[i];
if(_50.state!="open"&&_50.state!="closed"){
_50.state="open";
}
var _51=$("<div class=\"tree-node\"></div>").appendTo(li);
_51.attr("node-id",_50.id);
$.data(_51[0],"tree-node",{id:_50.id,text:_50.text,iconCls:_50.iconCls,attributes:_50.attributes});
$("<span class=\"tree-title\"></span>").html(_50.text).appendTo(_51);
if(_48.checkbox){
if(_48.onlyLeafCheck){
if(_50.state=="open"&&(!_50.children||!_50.children.length)){
if(_50.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_51);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_51);
}
}
}else{
if(_50.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_51);
_49.push(_51[0]);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_51);
}
}
}
if(_50.children&&_50.children.length){
var _52=$("<ul></ul>").appendTo(li);
if(_50.state=="open"){
$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(_50.iconCls).prependTo(_51);
$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_51);
}else{
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_50.iconCls).prependTo(_51);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_51);
_52.css("display","none");
}
_4b(_52,_50.children,_4f+1);
}else{
if(_50.state=="closed"){
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_50.iconCls).prependTo(_51);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_51);
}else{
$("<span class=\"tree-icon tree-file\"></span>").addClass(_50.iconCls).prependTo(_51);
$("<span class=\"tree-indent\"></span>").prependTo(_51);
}
}
for(var j=0;j<_4f;j++){
$("<span class=\"tree-indent\"></span>").prependTo(_51);
}
}
};
};
function _53(_54,ul,_55,_56){
var _57=$.data(_54,"tree").options;
_55=_55||{};
var _58=null;
if(_54!=ul){
var _59=$(ul).prev();
_58=_33(_54,_59[0]);
}
if(_57.onBeforeLoad.call(_54,_58,_55)==false){
return;
}
if(!_57.url){
return;
}
var _5a=$(ul).prev().children("span.tree-folder");
_5a.addClass("tree-loading");
$.ajax({type:_57.method,url:_57.url,data:_55,dataType:"json",success:function(_5b){
_5a.removeClass("tree-loading");
_44(_54,ul,_5b);
if(_56){
_56();
}
},error:function(){
_5a.removeClass("tree-loading");
_57.onLoadError.apply(_54,arguments);
if(_56){
_56();
}
}});
};
function _5c(_5d,_5e,_5f){
var _60=$.data(_5d,"tree").options;
var hit=$(_5e).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _61=_33(_5d,_5e);
if(_60.onBeforeExpand.call(_5d,_61)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_5e).next();
if(ul.length){
if(_60.animate){
ul.slideDown("normal",function(){
_60.onExpand.call(_5d,_61);
if(_5f){
_5f();
}
});
}else{
ul.css("display","block");
_60.onExpand.call(_5d,_61);
if(_5f){
_5f();
}
}
}else{
var _62=$("<ul style=\"display:none\"></ul>").insertAfter(_5e);
_53(_5d,_62[0],{id:_61.id},function(){
if(_60.animate){
_62.slideDown("normal",function(){
_60.onExpand.call(_5d,_61);
if(_5f){
_5f();
}
});
}else{
_62.css("display","block");
_60.onExpand.call(_5d,_61);
if(_5f){
_5f();
}
}
});
}
};
function _63(_64,_65){
var _66=$.data(_64,"tree").options;
var hit=$(_65).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _67=_33(_64,_65);
if(_66.onBeforeCollapse.call(_64,_67)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_65).next();
if(_66.animate){
ul.slideUp("normal",function(){
_66.onCollapse.call(_64,_67);
});
}else{
ul.css("display","none");
_66.onCollapse.call(_64,_67);
}
};
function _68(_69,_6a){
var hit=$(_6a).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_63(_69,_6a);
}else{
_5c(_69,_6a);
}
};
function _6b(_6c,_6d){
var _6e=_43(_6c,_6d);
if(_6d){
_6e.unshift(_33(_6c,_6d));
}
for(var i=0;i<_6e.length;i++){
_5c(_6c,_6e[i].target);
}
};
function _6f(_70,_71){
var _72=[];
var p=_73(_70,_71);
while(p){
_72.unshift(p);
p=_73(_70,p.target);
}
for(var i=0;i<_72.length;i++){
_5c(_70,_72[i].target);
}
};
function _74(_75,_76){
var _77=_43(_75,_76);
if(_76){
_77.unshift(_33(_75,_76));
}
for(var i=0;i<_77.length;i++){
_63(_75,_77[i].target);
}
};
function _78(_79){
var _7a=_7b(_79);
if(_7a.length){
return _7a[0];
}else{
return null;
}
};
function _7b(_7c){
var _7d=[];
$(_7c).children("li").each(function(){
var _7e=$(this).children("div.tree-node");
_7d.push(_33(_7c,_7e[0]));
});
return _7d;
};
function _43(_7f,_80){
var _81=[];
if(_80){
_82($(_80));
}else{
var _83=_7b(_7f);
for(var i=0;i<_83.length;i++){
_81.push(_83[i]);
_82($(_83[i].target));
}
}
function _82(_84){
_84.next().find("div.tree-node").each(function(){
_81.push(_33(_7f,this));
});
};
return _81;
};
function _73(_85,_86){
var ul=$(_86).parent().parent();
if(ul[0]==_85){
return null;
}else{
return _33(_85,ul.prev()[0]);
}
};
function _87(_88){
var _89=[];
$(_88).find(".tree-checkbox1").each(function(){
var _8a=$(this).parent();
_89.push(_33(_88,_8a[0]));
});
return _89;
};
function _8b(_8c){
var _8d=$(_8c).find("div.tree-node-selected");
if(_8d.length){
return _33(_8c,_8d[0]);
}else{
return null;
}
};
function _8e(_8f,_90){
var _91=$(_90.parent);
var ul;
if(_91.length==0){
ul=$(_8f);
}else{
ul=_91.next();
if(ul.length==0){
ul=$("<ul></ul>").insertAfter(_91);
}
}
if(_90.data&&_90.data.length){
var _92=_91.find("span.tree-icon");
if(_92.hasClass("tree-file")){
_92.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_92);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_44(_8f,ul[0],_90.data,true);
_3a(_8f,ul.prev());
};
function _93(_94,_95){
var ref=_95.before||_95.after;
var _96=_73(_94,ref);
var li;
if(_96){
_8e(_94,{parent:_96.target,data:[_95.data]});
li=$(_96.target).next().children("li:last");
}else{
_8e(_94,{parent:null,data:[_95.data]});
li=$(_94).children("li:last");
}
if(_95.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _97(_98,_99){
var _9a=_73(_98,_99);
var _9b=$(_99);
var li=_9b.parent();
var ul=li.parent();
li.remove();
if(ul.children("li").length==0){
var _9b=ul.prev();
_9b.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_9b.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_9b);
if(ul[0]!=_98){
ul.remove();
}
}
if(_9a){
_3a(_98,_9a.target);
}
};
function _9c(_9d,_9e){
function _9f(aa,ul){
ul.children("li").each(function(){
var _a0=$(this).children("div.tree-node");
var _a1=_33(_9d,_a0[0]);
var sub=$(this).children("ul");
if(sub.length){
_a1.children=[];
_9c(_a1.children,sub);
}
aa.push(_a1);
});
};
if(_9e){
var _a2=_33(_9d,_9e);
_a2.children=[];
_9f(_a2.children,$(_9e).next());
return _a2;
}else{
return null;
}
};
function _a3(_a4,_a5){
var _a6=$(_a5.target);
var _a7=$.data(_a5.target,"tree-node");
if(_a7.iconCls){
_a6.find(".tree-icon").removeClass(_a7.iconCls);
}
$.extend(_a7,_a5);
$.data(_a5.target,"tree-node",_a7);
_a6.attr("node-id",_a7.id);
_a6.find(".tree-title").html(_a7.text);
if(_a7.iconCls){
_a6.find(".tree-icon").addClass(_a7.iconCls);
}
var ck=_a6.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_a7.checked){
_2a(_a4,_a5.target,true);
}else{
_2a(_a4,_a5.target,false);
}
};
function _33(_a8,_a9){
var _aa=$.extend({},$.data(_a9,"tree-node"),{target:_a9,checked:$(_a9).find(".tree-checkbox").hasClass("tree-checkbox1")});
if(!_3f(_a8,_a9)){
_aa.state=$(_a9).find(".tree-hit").hasClass("tree-expanded")?"open":"closed";
}
return _aa;
};
function _ab(_ac,id){
var _ad=$(_ac).find("div.tree-node[node-id="+id+"]");
if(_ad.length){
return _33(_ac,_ad[0]);
}else{
return null;
}
};
function _ae(_af,_b0){
var _b1=$.data(_af,"tree").options;
var _b2=_33(_af,_b0);
if(_b1.onBeforeSelect.call(_af,_b2)==false){
return;
}
$("div.tree-node-selected",_af).removeClass("tree-node-selected");
$(_b0).addClass("tree-node-selected");
_b1.onSelect.call(_af,_b2);
};
function _3f(_b3,_b4){
var _b5=$(_b4);
var hit=_b5.children("span.tree-hit");
return hit.length==0;
};
$.fn.tree=function(_b6,_b7){
if(typeof _b6=="string"){
return $.fn.tree.methods[_b6](this,_b7);
}
var _b6=_b6||{};
return this.each(function(){
var _b8=$.data(this,"tree");
var _b9;
if(_b8){
_b9=$.extend(_b8.options,_b6);
_b8.options=_b9;
}else{
_b9=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_b6);
$.data(this,"tree",{options:_b9,tree:_1(this)});
var _ba=_4(this);
_44(this,this,_ba);
}
if(_b9.data){
_44(this,this,_b9.data);
}
if(_b9.url){
_53(this,this);
}
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,_bb){
return jq.each(function(){
_44(this,this,_bb);
});
},getNode:function(jq,_bc){
return _33(jq[0],_bc);
},getData:function(jq,_bd){
return _9c(jq[0],_bd);
},reload:function(jq,_be){
return jq.each(function(){
if(_be){
var _bf=$(_be);
var hit=_bf.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_bf.next().remove();
_5c(this,_be);
}else{
$(this).empty();
_53(this,this);
}
});
},getRoot:function(jq){
return _78(jq[0]);
},getRoots:function(jq){
return _7b(jq[0]);
},getParent:function(jq,_c0){
return _73(jq[0],_c0);
},getChildren:function(jq,_c1){
return _43(jq[0],_c1);
},getChecked:function(jq){
return _87(jq[0]);
},getSelected:function(jq){
return _8b(jq[0]);
},isLeaf:function(jq,_c2){
return _3f(jq[0],_c2);
},find:function(jq,id){
return _ab(jq[0],id);
},select:function(jq,_c3){
return jq.each(function(){
_ae(this,_c3);
});
},check:function(jq,_c4){
return jq.each(function(){
_2a(this,_c4,true);
});
},uncheck:function(jq,_c5){
return jq.each(function(){
_2a(this,_c5,false);
});
},collapse:function(jq,_c6){
return jq.each(function(){
_63(this,_c6);
});
},expand:function(jq,_c7){
return jq.each(function(){
_5c(this,_c7);
});
},collapseAll:function(jq,_c8){
return jq.each(function(){
_74(this,_c8);
});
},expandAll:function(jq,_c9){
return jq.each(function(){
_6b(this,_c9);
});
},expandTo:function(jq,_ca){
return jq.each(function(){
_6f(this,_ca);
});
},toggle:function(jq,_cb){
return jq.each(function(){
_68(this,_cb);
});
},append:function(jq,_cc){
return jq.each(function(){
_8e(this,_cc);
});
},insert:function(jq,_cd){
return jq.each(function(){
_93(this,_cd);
});
},remove:function(jq,_ce){
return jq.each(function(){
_97(this,_ce);
});
},pop:function(jq,_cf){
var _d0=jq.tree("getData",_cf);
jq.tree("remove",_cf);
return _d0;
},update:function(jq,_d1){
return jq.each(function(){
_a3(this,_d1);
});
}};
$.fn.tree.parseOptions=function(_d2){
var t=$(_d2);
return {url:t.attr("url"),checkbox:(t.attr("checkbox")?t.attr("checkbox")=="true":undefined),cascadeCheck:(t.attr("cascadeCheck")?t.attr("cascadeCheck")=="true":undefined),onlyLeafCheck:(t.attr("onlyLeafCheck")?t.attr("onlyLeafCheck")=="true":undefined),animate:(t.attr("animate")?t.attr("animate")=="true":undefined),dnd:(t.attr("dnd")?t.attr("dnd")=="true":undefined)};
};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,dnd:false,data:null,onBeforeLoad:function(_d3,_d4){
},onLoadSuccess:function(_d5,_d6){
},onLoadError:function(){
},onClick:function(_d7){
},onDblClick:function(_d8){
},onBeforeExpand:function(_d9){
},onExpand:function(_da){
},onBeforeCollapse:function(_db){
},onCollapse:function(_dc){
},onCheck:function(_dd,_de){
},onBeforeSelect:function(_df){
},onSelect:function(_e0){
},onContextMenu:function(e,_e1){
},onDrop:function(_e2,_e3,_e4){
}};
})(jQuery);

