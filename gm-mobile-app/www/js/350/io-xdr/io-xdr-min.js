YUI.add("io-xdr",function(d){function l(b,a,c){b='<object id="io_swf" type="application/x-shockwave-flash" data="'+b+'" width="0" height="0"><param name="movie" value="'+b+'"><param name="FlashVars" value="yid='+a+"&uid="+c+'"><param name="allowScriptAccess" value="always"></object>';a=e.createElement("div");e.body.appendChild(a);a.innerHTML=b}function k(b,a,c){"flash"===a&&(b.c.responseText=decodeURI(b.c.responseText));"xml"===c&&(b.c.responseXML=d.DataType.XML.parse(b.c.responseText));return b}
var m=d.publish("io:xdrReady",{fireOnce:!0}),h={},f={},e=d.config.doc,g=d.config.win,i=g&&g.XDomainRequest;d.mix(d.IO.prototype,{_transport:{},_ieEvt:function(b,a){var c=this,d=b.id;b.c.onprogress=function(){f[d]=3};b.c.onload=function(){f[d]=4;c.xdrResponse("success",b,a)};b.c.onerror=function(){f[d]=4;c.xdrResponse("failure",b,a)};a.timeout&&(b.c.ontimeout=function(){f[d]=4;c.xdrResponse("timeout",b,a)},b.c.timeout=a.timeout)},xdr:function(b,a,c){var j=this;"flash"===c.xdr.use?(h[a.id]=c,g.setTimeout(function(){try{a.c.send(b,
{id:a.id,uid:a.uid,method:c.method,data:c.data,headers:c.headers})}catch(d){j.xdrResponse("transport error",a,c),delete h[a.id]}},d.io.xdr.delay)):i?(j._ieEvt(a,c),a.c.open(c.method||"GET",b),a.c.send(c.data)):a.c.send(b,a,c);return{id:a.id,abort:function(){return a.c?a.c.abort(a.id,c):false},isInProgress:function(){return a.c?i?f[a.id.id]!==4:a.id.c.isInProgress(a.id.id):false},io:j}},xdrResponse:function(b,a,c){var c=h[a.id]?h[a.id]:c,d=i?f:h,e=c.xdr.use,g=c.xdr.dataType;switch(b){case "start":this.start(a,
c);break;case "success":this.success(k(a,e,g),c);delete d[a.id];break;case "timeout":case "abort":case "transport error":a.c={status:0,statusText:b};case "failure":this.failure(k(a,e,g),c),delete d[a.id]}},_xdrReady:function(b,a){d.fire(m,b,a)},transport:function(b){"flash"===b.id&&(l(d.UA.ie?b.src+"?d="+(new Date).valueOf().toString():b.src,d.id,b.uid),d.IO.transports.flash=function(){return e.getElementById("io_swf")})}});d.io.xdrReady=function(b,a){var c=d.io._map[a];d.io.xdr.delay=0;c._xdrReady.apply(c,
[b,a])};d.io.xdrResponse=function(b,a,c){var e=d.io._map[a.uid];e.xdrResponse.apply(e,[b,a,c])};d.io.transport=function(b){var a=d.io._map["io:0"]||new d.IO;b.uid=a._uid;a.transport.apply(a,[b])};d.io.xdr={delay:100}},"3.5.0",{requires:["io-base","datatype-xml-parse"]});
