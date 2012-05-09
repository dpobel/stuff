YUI.add("cache-offline",function(e){function f(){f.superclass.constructor.apply(this,arguments)}var d=null,g=e.JSON;try{d=e.config.win.localStorage}catch(h){}e.mix(f,{NAME:"cacheOffline",ATTRS:{sandbox:{value:"default",writeOnce:"initOnly"},expires:{value:864E5},max:{value:null,readOnly:!0},uniqueKeys:{value:!0,readOnly:!0,setter:function(){return!0}}},flushAll:function(){var a=d,b;if(a)if(a.clear)a.clear();else for(b in a)a.hasOwnProperty(b)&&(a.removeItem(b),delete a[b])}});e.extend(f,e.Cache,d?
{_setMax:function(){return null},_getSize:function(){for(var a=0,b=0,c=d.length;b<c;++b)0===d.key(b).indexOf(this.get("sandbox"))&&a++;return a},_getEntries:function(){for(var a=[],b=0,c=d.length,e=this.get("sandbox");b<c;++b)0===d.key(b).indexOf(e)&&(a[b]=g.parse(d.key(b).substring(e.length)));return a},_defAddFn:function(a){var a=a.entry,b=a.request,c=a.expires;a.cached=a.cached.getTime();a.expires=c?c.getTime():c;try{d.setItem(this.get("sandbox")+g.stringify({request:b}),g.stringify(a))}catch(e){this.fire("error",
{error:e})}},_defFlushFn:function(){for(var a,b=d.length-1;-1<b;--b)a=d.key(b),0===a.indexOf(this.get("sandbox"))&&d.removeItem(a)},retrieve:function(a){this.fire("request",{request:a});var b,c;try{c=this.get("sandbox")+g.stringify({request:a});try{b=g.parse(d.getItem(c))}catch(e){}}catch(f){}return b&&(b.cached=new Date(b.cached),c=b.expires,c=!c?null:new Date(c),b.expires=c,this._isMatch(a,b))?(this.fire("retrieve",{entry:b}),b):null}}:{_setMax:function(){return null}});e.CacheOffline=f},"3.5.1",
{requires:["cache-base","json"]});