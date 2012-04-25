(function(){var a=YUI.Env;a._ready||(a._ready=function(){a.DOMReady=!0;a.remove(YUI.config.doc,"DOMContentLoaded",a._ready)},a.add(YUI.config.doc,"DOMContentLoaded",a._ready))})();
YUI.add("event-base",function(a){a.publish("domready",{fireOnce:!0,async:!0});YUI.Env.DOMReady?a.fire("domready"):a.Do.before(function(){a.fire("domready")},YUI.Env,"_ready");var w=a.UA,y={},u={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},k=function(i){if(!i)return i;try{i&&3==i.nodeType&&(i=i.parentNode)}catch(d){return null}return a.one(i)},s=function(a,d,m){this._event=a;this._currentTarget=d;this._wrapper=m||y;this.init()};a.extend(s,Object,{init:function(){var a=
this._event,d=this._wrapper.overrides,m=a.pageX,p=a.pageY,n=this._currentTarget;this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.metaKey=a.metaKey;this.shiftKey=a.shiftKey;this.type=d&&d.type||a.type;this.clientX=a.clientX;this.clientY=a.clientY;this.pageX=m;this.pageY=p;d=a.keyCode||a.charCode;w.webkit&&d in u&&(d=u[d]);this.charCode=this.keyCode=d;this.button=this.which=a.which||a.charCode||d;this.target=k(a.target);this.currentTarget=k(n);this.relatedTarget=k(a.relatedTarget);if("mousewheel"==
a.type||"DOMMouseScroll"==a.type)this.wheelDelta=a.detail?-1*a.detail:Math.round(a.wheelDelta/80)||(0>a.wheelDelta?-1:1);this._touch&&this._touch(a,n,this._wrapper)},stopPropagation:function(){this._event.stopPropagation();this.stopped=this._wrapper.stopped=1},stopImmediatePropagation:function(){var a=this._event;a.stopImmediatePropagation?a.stopImmediatePropagation():this.stopPropagation();this.stopped=this._wrapper.stopped=2},preventDefault:function(a){var d=this._event;d.preventDefault();d.returnValue=
a||!1;this.prevented=this._wrapper.prevented=1},halt:function(a){a?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});s.resolve=k;a.DOM2EventFacade=s;a.DOMEventFacade=s;(function(){a.Env.evt.dom_wrappers={};a.Env.evt.dom_map={};var i=a.Env.evt,d=a.config,m=d.win,p=YUI.Env.add,n=YUI.Env.remove,k=function(){YUI.Env.windowLoaded=!0;a.Event._load();n(m,"load",k)},s=function(){a.Event._unload()},x=function(e){try{return e&&"string"!==typeof e&&a.Lang.isNumber(e.length)&&!e.tagName&&
!e.alert}catch(d){return!1}},u=a.CustomEvent.prototype._delete,w=function(e){var d=u.apply(this,arguments);!this.subCount&&!this.afterCount&&a.Event._clean(this);return d},e=function(){var d=!1,k=0,q=[],t=i.dom_wrappers,r=i.dom_map;return{POLL_RETRYS:1E3,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:!1,startInterval:function(){e._interval||(e._interval=setInterval(e._poll,e.POLL_INTERVAL))},onAvailable:function(b,g,c,l,f,h){for(var d=a.Array(b),j,b=0;b<d.length;b+=1)q.push({id:d[b],
fn:g,obj:c,override:l,checkReady:f,compat:h});k=this.POLL_RETRYS;setTimeout(e._poll,0);return j=new a.EventHandle({_delete:function(){if(j.handle)j.handle.detach();else{var a,b;for(a=0;a<d.length;a++)for(b=0;b<q.length;b++)d[a]===q[b].id&&q.splice(b,1)}}})},onContentReady:function(a,g,c,l,f){return e.onAvailable(a,g,c,l,!0,f)},attach:function(b,g,c,l){return e._attach(a.Array(arguments,0,!0))},_createWrapper:function(b,g,c,l,f){var h,d=a.stamp(b),j="event:"+d+g;!1===f&&(j+="native");c&&(j+="capture");
h=t[j];h||(h=a.publish(j,{silent:!0,bubbles:!1,contextFn:function(){if(l)return h.el;h.nodeRef=h.nodeRef||a.one(h.el);return h.nodeRef}}),h.overrides={},h.el=b,h.key=j,h.domkey=d,h.type=g,h.fn=function(a){h.fire(e.getEvent(a,b,l||!1===f))},h.capture=c,b==m&&"load"==g&&(h.fireOnce=!0),h._delete=w,t[j]=h,r[d]=r[d]||{},r[d][j]=h,p(b,g,h.fn,c));return h},_attach:function(b,g){var c,d,f,h=!1,v,j=b[0],i=b[1],o=b[2]||m,k=g&&g.facade,n=g&&g.capture,p=g&&g.overrides;"~yui|2|compat~"===b[b.length-1]&&(c=!0);
if(!i||!i.call)return!1;if(x(o))return d=[],a.each(o,function(a){b[2]=a;d.push(e._attach(b.slice(),g))}),new a.EventHandle(d);if(a.Lang.isString(o)){if(c)f=a.DOM.byId(o);else switch(f=a.Selector.query(o),f.length){case 0:f=null;break;case 1:f=f[0];break;default:return b[2]=f,e._attach(b,g)}if(f)o=f;else return v=e.onAvailable(o,function(){v.handle=e._attach(b,g)},e,!0,!1,c)}if(!o)return!1;a.Node&&a.instanceOf(o,a.Node)&&(o=a.Node.getDOMNode(o));f=e._createWrapper(o,j,n,c,k);p&&a.mix(f.overrides,p);
o==m&&"load"==j&&YUI.Env.windowLoaded&&(h=!0);c&&b.pop();v=f._on(i,b[3],4<b.length?b.slice(4):null);h&&f.fire();return v},detach:function(b,g,c,d){var f=a.Array(arguments,0,!0),h,i,j;"~yui|2|compat~"===f[f.length-1]&&(h=!0);if(b&&b.detach)return b.detach();"string"==typeof c&&(h?c=a.DOM.byId(c):(c=a.Selector.query(c),h=c.length,1>h?c=null:1==h&&(c=c[0])));if(!c)return!1;if(c.detach)return f.splice(2,1),c.detach.apply(c,f);if(x(c)){i=!0;j=0;for(h=c.length;j<h;++j)f[2]=c[j],i=a.Event.detach.apply(a.Event,
f)&&i;return i}if(!b||!g||!g.call)return e.purgeElement(c,!1,b);f="event:"+a.stamp(c)+b;return(f=t[f])?f.detach(g):!1},getEvent:function(b,g,c){var d=b||m.event;return c?d:new a.DOMEventFacade(d,g,t["event:"+a.stamp(g)+b.type])},generateId:function(b){return a.DOM.generateID(b)},_isValidCollection:x,_load:function(){d||(d=!0,a.fire&&a.fire("domready"),e._poll())},_poll:function(){if(!e.locked)if(a.UA.ie&&!YUI.Env.DOMReady)e.startInterval();else{e.locked=!0;var b,g,c,l,f,h,i=!d;i||(i=0<k);f=[];h=function(b,
c){var g,d=c.override;try{c.compat?(g=c.override?!0===d?c.obj:d:b,c.fn.call(g,c.obj)):(g=c.obj||a.one(b),c.fn.apply(g,a.Lang.isArray(d)?d:[]))}catch(f){}};b=0;for(g=q.length;b<g;++b)if((c=q[b])&&!c.checkReady)(l=c.compat?a.DOM.byId(c.id):a.Selector.query(c.id,null,!0))?(h(l,c),q[b]=null):f.push(c);b=0;for(g=q.length;b<g;++b)if((c=q[b])&&c.checkReady)if(l=c.compat?a.DOM.byId(c.id):a.Selector.query(c.id,null,!0)){if(d||l.get&&l.get("nextSibling")||l.nextSibling)h(l,c),q[b]=null}else f.push(c);k=0===
f.length?0:k-1;i?e.startInterval():(clearInterval(e._interval),e._interval=null);e.locked=!1}},purgeElement:function(b,g,c){var d=a.Lang.isString(b)?a.Selector.query(b,null,!0):b,b=e.getListeners(d,c),f,h;if(g&&d){b=b||[];f=a.Selector.query("*",d);g=0;for(d=f.length;g<d;++g)(h=e.getListeners(f[g],c))&&(b=b.concat(h))}if(b){g=0;for(d=b.length;g<d;++g)b[g].detachAll()}},_clean:function(b){var d=b.key,c=b.domkey;n(b.el,b.type,b.fn,b.capture);delete t[d];delete a._yuievt.events[d];r[c]&&(delete r[c][d],
a.Object.size(r[c])||delete r[c])},getListeners:function(b,d){var c=a.stamp(b,!0),e=r[c],f=[],c=d?"event:"+c+d:null,h=i.plugins;if(!e)return null;c?(h[d]&&h[d].eventDef&&(c+="_synth"),e[c]&&f.push(e[c]),c+="native",e[c]&&f.push(e[c])):a.each(e,function(a){f.push(a)});return f.length?f:null},_unload:function(b){a.each(t,function(a){"unload"==a.type&&a.fire(b);a.detachAll()});n(m,"unload",s)},nativeAdd:p,nativeRemove:n}}();a.Event=e;d.injected||YUI.Env.windowLoaded?k():p(m,"load",k);if(a.UA.ie)a.on("domready",
e._poll);p(m,"unload",s);e.Custom=a.CustomEvent;e.Subscriber=a.Subscriber;e.Target=a.EventTarget;e.Handle=a.EventHandle;e.Facade=a.EventFacade;e._poll()})();a.Env.evt.plugins.available={on:function(i,d,m,k){var n=4<arguments.length?a.Array(arguments,4,!0):null;return a.Event.onAvailable.call(a.Event,m,d,k,n)}};a.Env.evt.plugins.contentready={on:function(i,d,k,p){var n=4<arguments.length?a.Array(arguments,4,!0):null;return a.Event.onContentReady.call(a.Event,k,d,p,n)}}},"3.5.0",{requires:["event-custom-base"]});
