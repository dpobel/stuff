YUI.add("cache-base",function(c){var e=c.Lang,g=c.Lang.isDate,f=function(){f.superclass.constructor.apply(this,arguments)};c.mix(f,{NAME:"cache",ATTRS:{max:{value:0,setter:"_setMax"},size:{readOnly:!0,getter:"_getSize"},uniqueKeys:{value:!1},expires:{value:0,validator:function(a){return c.Lang.isDate(a)||c.Lang.isNumber(a)&&0<=a}},entries:{readOnly:!0,getter:"_getEntries"}}});c.extend(f,c.Base,{_entries:null,initializer:function(){this.publish("add",{defaultFn:this._defAddFn});this.publish("flush",
{defaultFn:this._defFlushFn});this._entries=[]},destructor:function(){this._entries=[]},_setMax:function(a){var b=this._entries;if(0<a){if(b)for(;b.length>a;)b.shift()}else a=0,this._entries=[];return a},_getSize:function(){return this._entries.length},_getEntries:function(){return this._entries},_defAddFn:function(a){var b=this._entries,d=a.entry,c=this.get("max");this.get("uniqueKeys")&&(a=this._position(a.entry.request),e.isValue(a)&&b.splice(a,1));for(;c&&b.length>=c;)b.shift();b[b.length]=d},
_defFlushFn:function(a){var b=this._entries;(a=a.details[0])&&e.isValue(a.request)?(a=this._position(a.request),e.isValue(a)&&b.splice(a,1)):this._entries=[]},_isMatch:function(a,b){return!b.expires||new Date<b.expires?a===b.request:!1},_position:function(a){var b=this._entries,d=b.length-1;if(null===this.get("max")||0<this.get("max"))for(;0<=d;d--)if(this._isMatch(a,b[d]))return d;return null},add:function(a,b){var d=this.get("expires");if(this.get("initialized")&&(null===this.get("max")||0<this.get("max"))&&
(e.isValue(a)||e.isNull(a)||e.isUndefined(a)))this.fire("add",{entry:{request:a,response:b,cached:new Date,expires:g(d)?d:d?new Date((new Date).getTime()+this.get("expires")):null}})},flush:function(a){this.fire("flush",{request:e.isValue(a)?a:null})},retrieve:function(a){var b=this._entries,d=b.length,c=null;if(0<d&&(null===this.get("max")||0<this.get("max")))if(this.fire("request",{request:a}),a=this._position(a),e.isValue(a))return c=b[a],this.fire("retrieve",{entry:c}),a<d-1&&(b.splice(a,1),b[b.length]=
c),c;return null}});c.Cache=f},"3.5.0",{requires:["base"]});
