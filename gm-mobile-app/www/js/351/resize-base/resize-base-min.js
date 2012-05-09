YUI.add("resize-base",function(d){function l(){l.superclass.constructor.apply(this,arguments)}var g=d.Lang,t=g.isArray,m=g.isBoolean,q=g.isNumber,u=g.isString,n=d.Array,v=g.trim,w=n.indexOf,g=function(){return Array.prototype.slice.call(arguments).join(" ")},h=function(a){return Math.round(parseFloat(a))||0},r=function(a){return a instanceof d.Node},x=d.cached(function(a){return a.substring(0,1).toUpperCase()+a.substring(1)}),j=d.cached(function(){var a=[],b=n(arguments,0,!0);n.each(b,function(b,
e){0<e&&(b=x(b));a.push(b)});return a.join("")}),f=d.ClassNameManager.getClassName,s=f("resize"),k=f("resize","handle"),o=f("resize","handle","active"),y=f("resize","handle","inner"),z=f("resize","handle","inner","{handle}"),A=f("resize","handle","{handle}"),p=f("resize","hidden","handles"),B=f("resize","handles","wrapper"),C=f("resize","wrapper");d.mix(l,{NAME:"resize",ATTRS:{activeHandle:{value:null,validator:function(a){return d.Lang.isString(a)||d.Lang.isNull(a)}},activeHandleNode:{value:null,
validator:r},autoHide:{value:!1,validator:m},defMinHeight:{value:15,validator:q},defMinWidth:{value:15,validator:q},handles:{setter:"_setHandles",value:"all"},handlesWrapper:{readOnly:!0,setter:d.one,valueFn:"_valueHandlesWrapper"},node:{setter:d.one},resizing:{value:!1,validator:m},wrap:{setter:"_setWrap",value:!1,validator:m},wrapTypes:{readOnly:!0,value:/^canvas|textarea|input|select|button|img|iframe|table|embed$/i},wrapper:{readOnly:!0,valueFn:"_valueWrapper",writeOnce:!0}},RULES:{b:function(a,
b,c){a.info.offsetHeight=a.originalInfo.offsetHeight+c},l:function(a,b){var c=a.info,e=a.originalInfo;c.left=e.left+b;c.offsetWidth=e.offsetWidth-b},r:function(a,b){a.info.offsetWidth=a.originalInfo.offsetWidth+b},t:function(a,b,c){b=a.info;a=a.originalInfo;b.top=a.top+c;b.offsetHeight=a.offsetHeight-c},tr:function(a,b,c){this.t.apply(this,arguments);this.r.apply(this,arguments)},bl:function(a,b,c){this.b.apply(this,arguments);this.l.apply(this,arguments)},br:function(a,b,c){this.b.apply(this,arguments);
this.r.apply(this,arguments)},tl:function(a,b,c){this.t.apply(this,arguments);this.l.apply(this,arguments)}},capitalize:j});d.Resize=d.extend(l,d.Base,{ALL_HANDLES:"t,tr,r,br,b,bl,l,tl".split(","),REGEX_CHANGE_HEIGHT:/^(t|tr|b|bl|br|tl)$/i,REGEX_CHANGE_LEFT:/^(tl|l|bl)$/i,REGEX_CHANGE_TOP:/^(tl|t|tr)$/i,REGEX_CHANGE_WIDTH:/^(bl|br|l|r|tl|tr)$/i,HANDLES_WRAP_TEMPLATE:'<div class="'+B+'"></div>',WRAP_TEMPLATE:'<div class="'+C+'"></div>',HANDLE_TEMPLATE:'<div class="'+g(k,A)+'"><div class="'+g(y,z)+
'">&nbsp;</div></div>',totalHSurrounding:0,totalVSurrounding:0,nodeSurrounding:null,wrapperSurrounding:null,changeHeightHandles:!1,changeLeftHandles:!1,changeTopHandles:!1,changeWidthHandles:!1,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){this.renderer()},renderUI:function(){this._renderHandles()},bindUI:function(){this._createEvents();this._bindDD();this._bindHandle()},syncUI:function(){this.get("node").addClass(s);this._setHideHandlesUI(this.get("autoHide"))},destructor:function(){var a=
this,b=a.get("node"),c=a.get("wrapper"),e=c.get("parentNode");d.Event.purgeElement(c,!0);a.eachHandle(function(b){a.delegate.dd.destroy();b.remove(!0)});a.get("wrap")&&(a._copyStyles(c,b),e&&e.insertBefore(b,c),c.remove(!0));b.removeClass(s);b.removeClass(p)},renderer:function(){this.renderUI();this.bindUI();this.syncUI()},eachHandle:function(a){var b=this;d.each(b.get("handles"),function(c,e){var d=b.get("handle"+c.toUpperCase());a.apply(b,[d,c,e])})},_bindDD:function(){this.delegate=new d.DD.Delegate({bubbleTargets:this,
container:this.get("handlesWrapper"),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:!0,move:!1},nodes:"."+k,target:!1});this.on("drag:drag",this._handleResizeEvent);this.on("drag:dropmiss",this._handleMouseUpEvent);this.on("drag:end",this._handleResizeEndEvent);this.on("drag:start",this._handleResizeStartEvent)},_bindHandle:function(){var a=this.get("wrapper");a.on("mouseenter",d.bind(this._onWrapperMouseEnter,this));a.on("mouseleave",d.bind(this._onWrapperMouseLeave,this));a.delegate("mouseenter",
d.bind(this._onHandleMouseEnter,this),"."+k);a.delegate("mouseleave",d.bind(this._onHandleMouseLeave,this),"."+k)},_createEvents:function(){var a=this,b=function(b,d){a.publish(b,{defaultFn:d,queuable:!1,emitFacade:!0,bubbles:!0,prefix:"resize"})};b("resize:start",this._defResizeStartFn);b("resize:resize",this._defResizeFn);b("resize:align",this._defResizeAlignFn);b("resize:end",this._defResizeEndFn);b("resize:mouseUp",this._defMouseUpFn)},_renderHandles:function(){var a=this.get("wrapper"),b=this.get("handlesWrapper");
this.eachHandle(function(a){b.append(a)});a.append(b)},_buildHandle:function(a){return d.Node.create(d.substitute(this.HANDLE_TEMPLATE,{handle:a}))},_calcResize:function(){var a=this.handle,b=this.info,c=this.originalInfo,e=b.actXY[0]-c.actXY[0],b=b.actXY[1]-c.actXY[1];if(a&&d.Resize.RULES[a])d.Resize.RULES[a](this,e,b)},_checkSize:function(a,b){var c=this.info,d=this.originalInfo,i="offsetHeight"==a?"top":"left";c[a]=b;if("left"==i&&this.changeLeftHandles||"top"==i&&this.changeTopHandles)c[i]=d[i]+
d[a]-b},_copyStyles:function(a,b){var c=a.getStyle("position").toLowerCase(),e=this._getBoxSurroundingInfo(a);"static"==c&&(c="relative");c={position:c,left:a.getComputedStyle("left"),top:a.getComputedStyle("top")};d.mix(c,e.margin);d.mix(c,e.border);b.setStyles(c);a.setStyles({border:0,margin:0});b.sizeTo(a.get("offsetWidth")+e.totalHBorder,a.get("offsetHeight")+e.totalVBorder)},_extractHandleName:d.cached(function(a){return(a=a.get("className").match(RegExp(f("resize","handle","(\\w{1,2})\\b"))))?
a[1]:null}),_getInfo:function(a,b){var c=[0,0],d=b.dragEvent.target,i=a.getXY(),f=i[0],i=i[1],g=a.get("offsetHeight"),h=a.get("offsetWidth");b&&(c=d.actXY.length?d.actXY:d.lastXY);return{actXY:c,bottom:i+g,left:f,offsetHeight:g,offsetWidth:h,right:f+h,top:i}},_getBoxSurroundingInfo:function(a){var b={padding:{},margin:{},border:{}};r(a)&&d.each(["top","right","bottom","left"],function(c){var d=j("padding",c),f=j("margin",c),g=j("border",c,"width"),h=j("border",c,"color"),c=j("border",c,"style");b.border[h]=
a.getComputedStyle(h);b.border[c]=a.getComputedStyle(c);b.border[g]=a.getComputedStyle(g);b.margin[f]=a.getComputedStyle(f);b.padding[d]=a.getComputedStyle(d)});b.totalHBorder=h(b.border.borderLeftWidth)+h(b.border.borderRightWidth);b.totalHPadding=h(b.padding.paddingLeft)+h(b.padding.paddingRight);b.totalVBorder=h(b.border.borderBottomWidth)+h(b.border.borderTopWidth);b.totalVPadding=h(b.padding.paddingBottom)+h(b.padding.paddingTop);return b},_syncUI:function(){var a=this.info,b=this.wrapperSurrounding,
c=this.get("wrapper"),e=this.get("node");c.sizeTo(a.offsetWidth,a.offsetHeight);(this.changeLeftHandles||this.changeTopHandles)&&c.setXY([a.left,a.top]);c.compareTo(e)||e.sizeTo(a.offsetWidth-b.totalHBorder,a.offsetHeight-b.totalVBorder);d.UA.webkit&&e.setStyle("resize","none")},_updateChangeHandleInfo:function(a){this.changeHeightHandles=this.REGEX_CHANGE_HEIGHT.test(a);this.changeLeftHandles=this.REGEX_CHANGE_LEFT.test(a);this.changeTopHandles=this.REGEX_CHANGE_TOP.test(a);this.changeWidthHandles=
this.REGEX_CHANGE_WIDTH.test(a)},_updateInfo:function(a){this.info=this._getInfo(this.get("wrapper"),a)},_updateSurroundingInfo:function(){var a=this.get("node"),b=this.get("wrapper"),a=this._getBoxSurroundingInfo(a),b=this._getBoxSurroundingInfo(b);this.nodeSurrounding=a;this.wrapperSurrounding=b;this.totalVSurrounding=a.totalVPadding+b.totalVBorder;this.totalHSurrounding=a.totalHPadding+b.totalHBorder},_setActiveHandlesUI:function(a){var b=this.get("activeHandleNode");b&&(a?(this.eachHandle(function(a){a.removeClass(o)}),
b.addClass(o)):b.removeClass(o))},_setHandles:function(a){var b=this,c=[];t(a)?c=a:u(a)&&("all"==a.toLowerCase()?c=b.ALL_HANDLES:d.each(a.split(","),function(a){a=v(a);-1<w(b.ALL_HANDLES,a)&&c.push(a)}));return c},_setHideHandlesUI:function(a){var b=this.get("wrapper");this.get("resizing")||(a?b.addClass(p):b.removeClass(p))},_setWrap:function(a){var b=this.get("node").get("nodeName");this.get("wrapTypes").test(b)&&(a=!0);return a},_defMouseUpFn:function(){this.set("resizing",!1)},_defResizeFn:function(a){this._resize(a)},
_resize:function(a){this._handleResizeAlignEvent(a.dragEvent);this._syncUI()},_defResizeAlignFn:function(a){this._resizeAlign(a)},_resizeAlign:function(a){var b,c;this.lastInfo=this.info;this._updateInfo(a);a=this.info;this._calcResize();this.con||(b=this.get("defMinHeight")+this.totalVSurrounding,c=this.get("defMinWidth")+this.totalHSurrounding,a.offsetHeight<=b&&this._checkSize("offsetHeight",b),a.offsetWidth<=c&&this._checkSize("offsetWidth",c))},_defResizeEndFn:function(a){this._resizeEnd(a)},
_resizeEnd:function(a){a.dragEvent.target.actXY=[];this._syncUI();this._setActiveHandlesUI(!1);this.set("activeHandle",null);this.set("activeHandleNode",null);this.handle=null},_defResizeStartFn:function(a){this._resizeStart(a)},_resizeStart:function(a){var b=this.get("wrapper");this.handle=this.get("activeHandle");this.set("resizing",!0);this._updateSurroundingInfo();this.originalInfo=this._getInfo(b,a);this._updateInfo(a)},_handleMouseUpEvent:function(a){this.fire("resize:mouseUp",{dragEvent:a,
info:this.info})},_handleResizeEvent:function(a){this.fire("resize:resize",{dragEvent:a,info:this.info})},_handleResizeAlignEvent:function(a){this.fire("resize:align",{dragEvent:a,info:this.info})},_handleResizeEndEvent:function(a){this.fire("resize:end",{dragEvent:a,info:this.info})},_handleResizeStartEvent:function(a){this.get("activeHandle")||this._setHandleFromNode(a.target.get("node"));this.fire("resize:start",{dragEvent:a,info:this.info})},_onWrapperMouseEnter:function(){this.get("autoHide")&&
this._setHideHandlesUI(!1)},_onWrapperMouseLeave:function(){this.get("autoHide")&&this._setHideHandlesUI(!0)},_setHandleFromNode:function(a){var b=this._extractHandleName(a);this.get("resizing")||(this.set("activeHandle",b),this.set("activeHandleNode",a),this._setActiveHandlesUI(!0),this._updateChangeHandleInfo(b))},_onHandleMouseEnter:function(a){this._setHandleFromNode(a.currentTarget)},_onHandleMouseLeave:function(){this.get("resizing")||this._setActiveHandlesUI(!1)},_valueHandlesWrapper:function(){return d.Node.create(this.HANDLES_WRAP_TEMPLATE)},
_valueWrapper:function(){var a=this.get("node"),b=a.get("parentNode"),c=a;this.get("wrap")&&(c=d.Node.create(this.WRAP_TEMPLATE),b&&b.insertBefore(c,a),c.append(a),this._copyStyles(a,c),a.setStyles({position:"static",left:0,top:0}));return c}});d.each(d.Resize.prototype.ALL_HANDLES,function(a){d.Resize.ATTRS["handle"+a.toUpperCase()]={setter:function(){return this._buildHandle(a)},value:null,writeOnce:!0}})},"3.5.1",{requires:"base,widget,substitute,event,oop,dd-drag,dd-delegate,dd-drop".split(","),
skinnable:!0});