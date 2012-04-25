YUI.add("widget-base",function(f){function c(a){var b,e=this.constructor;this._strs={};this._cssPrefix=e.CSS_PREFIX||i(e.NAME.toLowerCase());a=a||{};c.superclass.constructor.call(this,a);if(a=this.get(l))a!==d&&(b=a),this.render(b)}var m=f.Lang,h=f.Node,o=f.ClassNameManager,i=o.getClassName,j,q=f.cached(function(a){return a.substring(0,1).toUpperCase()+a.substring(1)}),l="render",p=function(){},d=!0,n,g={},r="visible,disabled,height,width,focused,tabIndex".split(","),s=f.UA.webkit,k={};c.NAME="widget";
n=c.UI_SRC="ui";c.ATTRS=g;g.id={valueFn:"_guid",writeOnce:d};g.rendered={value:!1,readOnly:d};g.boundingBox={value:null,setter:"_setBB",writeOnce:d};g.contentBox={valueFn:"_defaultCB",setter:"_setCB",writeOnce:d};g.tabIndex={value:null,validator:"_validTabIndex"};g.focused={value:!1,readOnly:d};g.disabled={value:!1};g.visible={value:d};g.height={value:""};g.width={value:""};g.strings={value:{},setter:"_strSetter",getter:"_strGetter"};g[l]={value:!1,writeOnce:d};c.CSS_PREFIX=i(c.NAME.toLowerCase());
c.getClassName=function(){return i.apply(o,[c.CSS_PREFIX].concat(f.Array(arguments),!0))};j=c.getClassName;c.getByNode=function(a){var b,e=j();if(a=h.one(a))if(a=a.ancestor("."+e,!0))a=a.get("id"),b=k[a];return b||null};f.extend(c,f.Base,{getClassName:function(){return i.apply(o,[this._cssPrefix].concat(f.Array(arguments),!0))},initializer:function(a){var b=this.get("boundingBox");b instanceof h&&this._mapInstance(b.get("id"));this._applyParser&&this._applyParser(a)},_mapInstance:function(a){k[a]||
(k[a]=this)},destructor:function(){var a=this.get("boundingBox");a instanceof h&&(a=a.get("id"),a in k&&delete k[a],this._destroyBox())},destroy:function(a){this._destroyAllNodes=a;return c.superclass.destroy.apply(this)},_destroyBox:function(){var a=this.get("boundingBox"),b=this.get("contentBox"),e=this._destroyAllNodes,c;c=a&&a.compareTo(b);this.UI_EVENTS&&this._destroyUIEvents();this._unbindUI(a);e?(a.empty(),a.remove(d)):(b&&b.remove(d),c||a.remove(d))},render:function(a){!this.get("destroyed")&&
!this.get("rendered")&&(this.publish(l,{queuable:!1,fireOnce:d,defaultTargetOnly:d,defaultFn:this._defRenderFn}),this.fire(l,{parentNode:a?h.one(a):null}));return this},_defRenderFn:function(a){this._parentNode=a.parentNode;this.renderer();this._set("rendered",d);this._removeLoadingClassNames()},renderer:function(){this._renderUI();this.renderUI();this._bindUI();this.bindUI();this._syncUI();this.syncUI()},bindUI:p,renderUI:p,syncUI:p,hide:function(){return this.set("visible",!1)},show:function(){return this.set("visible",
d)},focus:function(){return this._set("focused",d)},blur:function(){return this._set("focused",!1)},enable:function(){return this.set("disabled",!1)},disable:function(){return this.set("disabled",d)},_uiSizeCB:function(a){this.get("contentBox").toggleClass(j("content","expanded"),a)},_renderBox:function(a){var b=this.get("contentBox"),e=this.get("boundingBox"),c=this.get("srcNode"),d=this.DEF_PARENT_NODE,f=c&&c.get("ownerDocument")||e.get("ownerDocument")||b.get("ownerDocument");c&&!c.compareTo(b)&&
!b.inDoc(f)&&c.replace(b);!e.compareTo(b.get("parentNode"))&&!e.compareTo(b)&&(b.inDoc(f)&&b.replace(e),e.appendChild(b));(a=a||d&&h.one(d))?a.appendChild(e):e.inDoc(f)||h.one("body").insert(e,0)},_setBB:function(a){return this._setBox(this.get("id"),a,this.BOUNDING_TEMPLATE)},_setCB:function(a){return null===this.CONTENT_TEMPLATE?this.get("boundingBox"):this._setBox(null,a,this.CONTENT_TEMPLATE)},_defaultCB:function(){return this.get("srcNode")||null},_setBox:function(a,b,e){b=h.one(b)||h.create(e);
b.get("id")||b.set("id",a||f.guid());return b},_renderUI:function(){this._renderBoxClassNames();this._renderBox(this._parentNode)},_renderBoxClassNames:function(){var a=this._getClasses(),b,e=this.get("boundingBox"),c;e.addClass(j());for(c=a.length-3;0<=c;c--)b=a[c],e.addClass(b.CSS_PREFIX||i(b.NAME.toLowerCase()));this.get("contentBox").addClass(this.getClassName("content"))},_removeLoadingClassNames:function(){var a=this.get("boundingBox"),b=this.get("contentBox"),c=this.getClassName("loading"),
d=j("loading");a.removeClass(d).removeClass(c);b.removeClass(d).removeClass(c)},_bindUI:function(){this._bindAttrUI(this._UI_ATTRS.BIND);this._bindDOM()},_unbindUI:function(a){this._unbindDOM(a)},_bindDOM:function(){var a=this.get("boundingBox").get("ownerDocument"),b=c._hDocFocus;b?b.listeners++:(b=c._hDocFocus=a.on("focus",this._onDocFocus,this),b.listeners=1);s&&(this._hDocMouseDown=a.on("mousedown",this._onDocMouseDown,this))},_unbindDOM:function(){var a=c._hDocFocus,b=this._hDocMouseDown;a&&
(0<a.listeners?a.listeners--:(a.detach(),c._hDocFocus=null));s&&b&&b.detach()},_syncUI:function(){this._syncAttrUI(this._UI_ATTRS.SYNC)},_uiSetHeight:function(a){this._uiSetDim("height",a);this._uiSizeCB(""!==a&&"auto"!==a)},_uiSetWidth:function(a){this._uiSetDim("width",a)},_uiSetDim:function(a,b){this.get("boundingBox").setStyle(a,m.isNumber(b)?b+this.DEF_UNIT:b)},_uiSetVisible:function(a){this.get("boundingBox").toggleClass(this.getClassName("hidden"),!a)},_uiSetDisabled:function(a){this.get("boundingBox").toggleClass(this.getClassName("disabled"),
a)},_uiSetFocused:function(a,b){var c=this.get("boundingBox");c.toggleClass(this.getClassName("focused"),a);b!==n&&(a?c.focus():c.blur())},_uiSetTabIndex:function(a){var b=this.get("boundingBox");m.isNumber(a)?b.set("tabIndex",a):b.removeAttribute("tabIndex")},_onDocMouseDown:function(a){this._domFocus&&this._onDocFocus(a)},_onDocFocus:function(a){var a=c.getByNode(a.target),b=c._active;b&&b!==a&&(b._domFocus=!1,b._set("focused",!1,{src:n}),c._active=null);a&&(a._domFocus=!0,a._set("focused",!0,{src:n}),
c._active=a)},toString:function(){return this.name+"["+this.get("id")+"]"},DEF_UNIT:"px",DEF_PARENT_NODE:null,CONTENT_TEMPLATE:"<div></div>",BOUNDING_TEMPLATE:"<div></div>",_guid:function(){return f.guid()},_validTabIndex:function(a){return m.isNumber(a)||m.isNull(a)},_bindAttrUI:function(a){var b,c=a.length;for(b=0;b<c;b++)this.after(a[b]+"Change",this._setAttrUI)},_syncAttrUI:function(a){var b,c=a.length,d;for(b=0;b<c;b++)d=a[b],this["_uiSet"+q(d)](this.get(d))},_setAttrUI:function(a){if(a.target===
this)this["_uiSet"+q(a.attrName)](a.newVal,a.src)},_strSetter:function(a){return f.merge(this.get("strings"),a)},getString:function(a){return this.get("strings")[a]},getStrings:function(){return this.get("strings")},_UI_ATTRS:{BIND:r,SYNC:r}});f.Widget=c},"3.5.0",{requires:"attribute,event-focus,base-base,base-pluginhost,node-base,node-style,classnamemanager".split(","),skinnable:!0});
