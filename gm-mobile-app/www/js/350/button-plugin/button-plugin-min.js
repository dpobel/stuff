YUI.add("button-plugin",function(b){function d(a){d.superclass.constructor.apply(this,arguments)}b.extend(d,b.ButtonCore,{_afterNodeGet:function(a){var c=this.constructor.ATTRS;if(c=c[a]&&c[a].getter&&this[c[a].getter])return new b.Do.AlterReturn("get "+a,c.call(this))},_afterNodeSet:function(a,c){var b=this.constructor.ATTRS;(b=b[a]&&b[a].setter&&this[b[a].setter])&&b.call(this,c)},_initNode:function(a){this._host=a=a.host;b.Do.after(this._afterNodeGet,a,"get",this);b.Do.after(this._afterNodeSet,
a,"set",this)},destroy:function(){}},{ATTRS:b.merge(b.ButtonCore.ATTRS),NAME:"buttonPlugin",NS:"button"});d.createNode=function(a,c){var d;if(a&&!c&&!a.nodeType&&!(a.getDOMNode||"string"==typeof a))c=a,a=c.srcNode;c=c||{};d=c.template||b.Plugin.Button.prototype.TEMPLATE;a=a||c.srcNode||b.DOM.create(d);return b.one(a).plug(b.Plugin.Button,c)};b.namespace("Plugin").Button=d},"3.5.0",{requires:["button-core","cssbutton","node-pluginhost"]});
