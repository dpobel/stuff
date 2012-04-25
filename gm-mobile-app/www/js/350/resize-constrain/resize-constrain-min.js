YUI.add("resize-constrain",function(c){function h(){h.superclass.constructor.apply(this,arguments)}var i=c.Lang,l=i.isNumber,p=i.isString,o=c.Resize.capitalize,j=function(a){return parseFloat(a)||0};c.mix(h,{NAME:"resizeConstrained",NS:"con",ATTRS:{constrain:{setter:function(a){if(a&&(a instanceof c.Node||p(a)||a.nodeType))a=c.one(a);return a}},minHeight:{value:15,validator:l},minWidth:{value:15,validator:l},maxHeight:{value:Infinity,validator:l},maxWidth:{value:Infinity,validator:l},preserveRatio:{value:!1,
validator:i.isBoolean},tickX:{value:!1},tickY:{value:!1}}});c.extend(h,c.Plugin.Base,{constrainSurrounding:null,initializer:function(){var a=this.get("host");a.delegate.dd.plug(c.Plugin.DDConstrained,{tickX:this.get("tickX"),tickY:this.get("tickY")});a.after("resize:align",c.bind(this._handleResizeAlignEvent,this));a.on("resize:start",c.bind(this._handleResizeStartEvent,this))},_checkConstrain:function(a,b,d){var e,c,f=this.get("host").info;c=this.constrainSurrounding.border;var k=this._getConstrainRegion();
k&&(e=f[a]+f[d],b=k[b]-j(c[o("border",b,"width")]),e>=b&&(f[d]-=e-b),e=f[a],c=k[a]+j(c[o("border",a,"width")]),e<=c&&(f[a]+=c-e,f[d]-=c-e))},_checkHeight:function(){var a=this.get("host"),b=a.info,d=this.get("maxHeight")+a.totalVSurrounding,c=this.get("minHeight")+a.totalVSurrounding;this._checkConstrain("top","bottom","offsetHeight");b.offsetHeight>d&&a._checkSize("offsetHeight",d);b.offsetHeight<c&&a._checkSize("offsetHeight",c)},_checkRatio:function(){var a=this.get("host"),b=a.info,d=a.originalInfo,
e=d.offsetWidth,m=d.offsetHeight,f=d.top,k=d.left,h=d.bottom,d=d.right,g=a.changeHeightHandles,n,i;this.get("constrain")&&a.changeHeightHandles&&a.changeWidthHandles&&(n=this._getConstrainRegion(),g=this.constrainSurrounding.border,h=n.bottom-j(g.borderBottomWidth)-h,i=k-(n.left+j(g.borderLeftWidth)),d=n.right-j(g.borderRightWidth)-d,g=f-(n.top+j(g.borderTopWidth)),g=a.changeLeftHandles&&a.changeTopHandles?g<i:a.changeLeftHandles?h<i:a.changeTopHandles?g<d:h<d);g?(b.offsetWidth=e*(b.offsetHeight/
m),this._checkWidth(),b.offsetHeight=m*(b.offsetWidth/e)):(b.offsetHeight=m*(b.offsetWidth/e),this._checkHeight(),b.offsetWidth=e*(b.offsetHeight/m));a.changeTopHandles&&(b.top=f+(m-b.offsetHeight));a.changeLeftHandles&&(b.left=k+(e-b.offsetWidth));c.each(b,function(a,c){l(a)&&(b[c]=Math.round(a))})},_checkRegion:function(){var a=this.get("host"),b=this._getConstrainRegion();return c.DOM.inRegion(null,b,!0,a.info)},_checkWidth:function(){var a=this.get("host"),b=a.info,c=this.get("maxWidth")+a.totalHSurrounding,
e=this.get("minWidth")+a.totalHSurrounding;this._checkConstrain("left","right","offsetWidth");b.offsetWidth<e&&a._checkSize("offsetWidth",e);b.offsetWidth>c&&a._checkSize("offsetWidth",c)},_getConstrainRegion:function(){var a=this.get("host").get("node"),b=this.get("constrain"),d=null;b&&(d="view"==b?a.get("viewportRegion"):b instanceof c.Node?b.get("region"):b);return d},_handleResizeAlignEvent:function(){var a=this.get("host");this._checkHeight();this._checkWidth();this.get("preserveRatio")&&this._checkRatio();
this.get("constrain")&&!this._checkRegion()&&(a.info=a.lastInfo)},_handleResizeStartEvent:function(){var a=this.get("constrain");this.constrainSurrounding=this.get("host")._getBoxSurroundingInfo(a)}});c.namespace("Plugin");c.Plugin.ResizeConstrained=h},"3.5.0",{requires:["resize-base","plugin"],skinnable:!1});
