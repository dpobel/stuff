YUI.add("widget-child",function(e){function f(){e.after(this._syncUIChild,this,"syncUI");e.after(this._bindUIChild,this,"bindUI")}var g=e.Lang;f.ATTRS={selected:{value:0,validator:g.isNumber},index:{readOnly:!0,getter:function(){var c=this.get("parent"),b=-1;c&&(b=c.indexOf(this));return b}},parent:{readOnly:!0},depth:{readOnly:!0,getter:function(){for(var c=this.get("parent"),b=this.get("root"),a=-1;c;){a+=1;if(c==b)break;c=c.get("parent")}return a}},root:{readOnly:!0,getter:function(){var c=function(b){var a=
b.get("parent"),d=b.ROOT_TYPE,f=a;d&&(f=a&&e.instanceOf(a,d));return f?c(a):b};return c(this)}}};f.prototype={ROOT_TYPE:null,_getUIEventNode:function(){var c=this.get("root"),b;c&&(b=c.get("boundingBox"));return b},next:function(c){var b=this.get("parent"),a;b&&(a=b.item(this.get("index")+1));!a&&c&&(a=b.item(0));return a},previous:function(c){var b=this.get("parent"),a=this.get("index"),d;b&&0<a&&(d=b.item([a-1]));!d&&c&&(d=b.item(b.size()-1));return d},remove:function(c){var b,a;g.isNumber(c)?a=
e.WidgetParent.prototype.remove.apply(this,arguments):(b=this.get("parent"))&&(a=b.remove(this.get("index")));return a},isRoot:function(){return this==this.get("root")},ancestor:function(c){var b=this.get("root"),a;if(this.get("depth")>c)for(a=this.get("parent");a!=b&&a.get("depth")>c;)a=a.get("parent");return a},_uiSetChildSelected:function(c){var b=this.get("boundingBox"),a=this.getClassName("selected");0===c?b.removeClass(a):b.addClass(a)},_afterChildSelectedChange:function(c){this._uiSetChildSelected(c.newVal)},
_syncUIChild:function(){this._uiSetChildSelected(this.get("selected"))},_bindUIChild:function(){this.after("selectedChange",this._afterChildSelectedChange)}};e.WidgetChild=f},"3.5.0",{requires:["base-build","widget"]});
