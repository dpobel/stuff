YUI.add("history-hash",function(b){function c(){c.superclass.constructor.apply(this,arguments)}var i=b.HistoryBase,k=b.Lang,l=b.Array,n=b.Object,j=YUI.namespace("Env.HistoryHash"),f,g,h,m=b.config.win,o=b.config.useHistoryHTML5;b.extend(c,i,{_init:function(a){var d=c.parseHash(),a=a||{};this._initialState=a.initialState?b.merge(a.initialState,d):d;b.after("hashchange",b.bind(this._afterHashChange,this),m);c.superclass._init.apply(this,arguments)},_change:function(a,d,e){n.each(d,function(a,c){k.isValue(a)&&
(d[c]=a.toString())});return c.superclass._change.call(this,a,d,e)},_storeState:function(a,d){var e=c.decode,b=c.createHash(d);c.superclass._storeState.apply(this,arguments);if("hash"!==a&&e(c.getHash())!==e(b))c[a===i.SRC_REPLACE?"replaceHash":"setHash"](b)},_afterHashChange:function(a){this._resolveChanges("hash",c.parseHash(a.newHash),{})}},{NAME:"historyHash",SRC_HASH:"hash",hashPrefix:"",_REGEX_HASH:/([^\?#&]+)=([^&]+)/g,createHash:function(a){var d=c.encode,e=[];n.each(a,function(a,c){k.isValue(a)&&
e.push(d(c)+"="+d(a))});return e.join("&")},decode:function(a){return decodeURIComponent(a.replace(/\+/g," "))},encode:function(a){return encodeURIComponent(a).replace(/%20/g,"+")},getHash:b.UA.gecko?function(){var a=/#(.*)$/.exec(b.getLocation().href),a=a&&a[1]||"",d=c.hashPrefix;return d&&0===a.indexOf(d)?a.replace(d,""):a}:function(){var a=b.getLocation().hash.substring(1),d=c.hashPrefix;return d&&0===a.indexOf(d)?a.replace(d,""):a},getUrl:function(){return location.href},parseHash:function(a){var d=
c.decode,e,b,f,g={};e=c.hashPrefix;a=k.isValue(a)?a:c.getHash();if(e&&(b=a.indexOf(e),0===b||1===b&&"#"===a.charAt(0)))a=a.replace(e,"");b=a.match(c._REGEX_HASH)||[];a=0;for(e=b.length;a<e;++a)f=b[a].split("="),g[d(f[0])]=d(f[1]);return g},replaceHash:function(a){var d=b.getLocation(),e=d.href.replace(/#.*$/,"");"#"===a.charAt(0)&&(a=a.substring(1));d.replace(e+"#"+(c.hashPrefix||"")+a)},setHash:function(a){var d=b.getLocation();"#"===a.charAt(0)&&(a=a.substring(1));d.hash=(c.hashPrefix||"")+a}});
f=j._notifiers;f||(f=j._notifiers=[]);b.Event.define("hashchange",{on:function(a,d,c){(a.compareTo(m)||a.compareTo(b.config.doc.body))&&f.push(c)},detach:function(a,d,c){a=l.indexOf(f,c);a!==-1&&f.splice(a,1)}});g=c.getHash();h=c.getUrl();i.nativeHashChange?b.Event.attach("hashchange",function(a){var d=c.getHash(),b=c.getUrl();l.each(f.concat(),function(c){c.fire({_event:a,oldHash:g,oldUrl:h,newHash:d,newUrl:b})});g=d;h=b},m):j._hashPoll||(j._hashPoll=b.later(50,null,function(){var a=c.getHash(),
b,e;if(g!==a){e=c.getUrl();b={oldHash:g,oldUrl:h,newHash:a,newUrl:e};g=a;h=e;l.each(f.concat(),function(a){a.fire(b)})}},null,!0));b.HistoryHash=c;if(!1===o||!b.History&&!0!==o&&(!i.html5||!b.HistoryHTML5))b.History=c},"3.5.0",{requires:["event-synthetic","history-base","yui-later"]});
