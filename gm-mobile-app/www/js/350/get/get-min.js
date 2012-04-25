YUI.add("get",function(h){var n=h.Lang,k,i,j;h.Get=i={cssOptions:{attributes:{rel:"stylesheet"},doc:h.config.linkDoc||h.config.doc,pollInterval:50},jsOptions:{autopurge:!0,doc:h.config.scriptDoc||h.config.doc},options:{attributes:{charset:"utf-8"},purgethreshold:20},REGEX_CSS:/\.css(?:[?;].*)?$/i,REGEX_JS:/\.js(?:[?;].*)?$/i,_insertCache:{},_pending:null,_purgeNodes:[],_queue:[],abort:function(a){var b,c,d,g;if(!a.abort)if(c=a,b=this._pending,a=null,b&&b.transaction.id===c)a=b.transaction,this._pending=
null;else{b=0;for(g=this._queue.length;b<g;++b)if(d=this._queue[b].transaction,d.id===c){a=d;this._queue.splice(b,1);break}}a&&a.abort()},css:function(a,b,c){return this._load("css",a,b,c)},js:function(a,b,c){return this._load("js",a,b,c)},load:function(a,b,c){return this._load(null,a,b,c)},_autoPurge:function(a){a&&this._purgeNodes.length>=a&&this._purge(this._purgeNodes)},_getEnv:function(){var a=h.config.doc,b=h.UA;return this._env={async:a&&!0===a.createElement("script").async,cssFail:9<=b.gecko||
535.24<=b.webkit,cssLoad:(!b.gecko&&!b.webkit||9<=b.gecko||535.24<=b.webkit)&&!(b.chrome&&18>=b.chrome),preservesScriptOrder:!(!b.gecko&&!b.opera)}},_getTransaction:function(a,b){var c=[],d,g,e,f;n.isArray(a)||(a=[a]);b=h.merge(this.options,b);b.attributes=h.merge(this.options.attributes,b.attributes);d=0;for(g=a.length;d<g;++d){f=a[d];e={attributes:{}};if("string"===typeof f)e.url=f;else if(f.url)h.mix(e,f,!1,null,0,!0),f=f.url;else continue;h.mix(e,b,!1,null,0,!0);e.type||(this.REGEX_CSS.test(f)?
e.type="css":(this.REGEX_JS.test(f),e.type="js"));h.mix(e,"js"===e.type?this.jsOptions:this.cssOptions,!1,null,0,!0);e.attributes.id||(e.attributes.id=h.guid());e.win?e.doc=e.win.document:e.win=e.doc.defaultView||e.doc.parentWindow;e.charset&&(e.attributes.charset=e.charset);c.push(e)}return new j(c,b)},_load:function(a,b,c,d){"function"===typeof c&&(d=c,c={});c||(c={});c.type=a;this._env||this._getEnv();a=this._getTransaction(b,c);this._queue.push({callback:d,transaction:a});this._next();return a},
_next:function(){var a;if(!this._pending&&(a=this._queue.shift()))this._pending=a,a.transaction.execute(function(){a.callback&&a.callback.apply(this,arguments);i._pending=null;i._next()})},_purge:function(a){for(var b=this._purgeNodes,c=a!==b,d;d=a.pop();)d._yuiget_finished&&(d.parentNode&&d.parentNode.removeChild(d),c&&(d=h.Array.indexOf(b,d),-1<d&&b.splice(d,1)))}};i.script=i.js;i.Transaction=j=function(a,b){this.id=j._lastId+=1;this.data=b.data;this.errors=[];this.nodes=[];this.options=b;this.requests=
a;this._callbacks=[];this._queue=[];this._waiting=0;this.tId=this.id;this.win=b.win||h.config.win};j._lastId=0;j.prototype={_state:"new",abort:function(a){this._pendingCSS=this._pending=null;this._pollTimer=clearTimeout(this._pollTimer);this._queue=[];this._waiting=0;this.errors.push({error:a||"Aborted"});this._finish()},execute:function(a){var b=this,c=b.requests,d=b._state,g;if("done"===d)a&&a(b.errors.length?b.errors:null,b);else if(a&&b._callbacks.push(a),"executing"!==d){b._state="executing";
b._queue=d=[];b.options.timeout&&(b._timeout=setTimeout(function(){b.abort("Timeout")},b.options.timeout));a=0;for(c=c.length;a<c;++a)g=b.requests[a],g.async||"css"===g.type?b._insert(g):d.push(g);b._next()}},purge:function(){i._purge(this.nodes)},_createNode:function(a,b,c){var a=c.createElement(a),d;k||(c=c.createElement("div"),c.setAttribute("class","a"),k="a"===c.className?{}:{"for":"htmlFor","class":"className"});for(d in b)b.hasOwnProperty(d)&&a.setAttribute(k[d]||d,b[d]);return a},_finish:function(){var a=
this.errors.length?this.errors:null,b=this.options,c=b.context||this,d,g;if("done"!==this._state){this._state="done";d=0;for(g=this._callbacks.length;d<g;++d)this._callbacks[d].call(c,a,this);d=this._getEventData();a?(b.onTimeout&&"Timeout"===a[a.length-1].error&&b.onTimeout.call(c,d),b.onFailure&&b.onFailure.call(c,d)):b.onSuccess&&b.onSuccess.call(c,d);b.onEnd&&b.onEnd.call(c,d)}},_getEventData:function(a){return a?h.merge(this,{abort:this.abort,purge:this.purge,request:a,url:a.url,win:a.win}):
this},_getInsertBefore:function(a){var b=a.doc,a=a.insertBefore,c,d;if(a)return"string"===typeof a?b.getElementById(a):a;c=i._insertCache;d=h.stamp(b);return(a=c[d])?a:(a=b.getElementsByTagName("base")[0])?c[d]=a:(a=b.head||b.getElementsByTagName("head")[0])?(a.appendChild(b.createTextNode("")),c[d]=a.lastChild):c[d]=b.getElementsByTagName("script")[0]},_insert:function(a){function b(){j._progress("Failed to load "+a.url,a)}function c(){k&&clearTimeout(k);j._progress(null,a)}var d=i._env,g=this._getInsertBefore(a),
e="js"===a.type,f=a.node,j=this,l=h.UA,k,m;f||(m=e?"script":!d.cssLoad&&l.gecko?"style":"link",f=a.node=this._createNode(m,a.attributes,a.doc));if(e)if(f.setAttribute("src",a.url),a.async)f.async=!0;else{if(d.async&&(f.async=!1),!d.preservesScriptOrder)this._pending=a}else!d.cssLoad&&l.gecko?f.innerHTML=(a.attributes.charset?'@charset "'+a.attributes.charset+'";':"")+'@import "'+a.url+'";':f.setAttribute("href",a.url);e&&l.ie&&9>l.ie?f.onreadystatechange=function(){if(/loaded|complete/.test(f.readyState)){f.onreadystatechange=
null;c()}}:!e&&!d.cssLoad?this._poll(a):(f.onerror=b,f.onload=c,!d.cssFail&&!e&&(k=setTimeout(b,a.timeout||3E3)));this._waiting+=1;this.nodes.push(f);g.parentNode.insertBefore(f,g)},_next:function(){this._pending||(this._queue.length?this._insert(this._queue.shift()):this._waiting||this._finish())},_poll:function(a){var b=this,c=b._pendingCSS,d=h.UA.webkit,g,e,f,i;if(a&&(c||(c=b._pendingCSS=[]),c.push(a),b._pollTimer))return;b._pollTimer=null;for(a=0;a<c.length;++a)if(f=c[a],d){i=f.doc.styleSheets;
g=i.length;for(e=f.node.href;0<=--g;)if(i[g].href===e){c.splice(a,1);a-=1;b._progress(null,f);break}}else try{c.splice(a,1),a-=1,b._progress(null,f)}catch(j){}c.length&&(b._pollTimer=setTimeout(function(){b._poll.call(b)},b.options.pollInterval))},_progress:function(a,b){var c=this.options;a&&(b.error=a,this.errors.push({error:a,request:b}));b.node._yuiget_finished=b.finished=!0;c.onProgress&&c.onProgress.call(c.context||this,this._getEventData(b));b.autopurge&&(i._autoPurge(this.options.purgethreshold),
i._purgeNodes.push(b.node));this._pending===b&&(this._pending=null);this._waiting-=1;this._next()}}},"3.5.0",{requires:["yui-base"]});
