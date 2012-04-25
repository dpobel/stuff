YUI.add("stylesheet",function(d){function k(a,b){var f,c,e,i={},n,l,m,s,r;if(!d.instanceOf(this,k))return new k(a,b);if(a){if(d.Node&&a instanceof d.Node)c=a._node;else if(a.nodeName)c=a;else if(o(a)){if(a&&p[a])return p[a];c=q.getElementById(a.replace(/^#/,g))}if(c&&p[d.stamp(c)])return p[d.stamp(c)]}if(!c||!/^(?:style|link)$/i.test(c.nodeName))c=q.createElement("style"),c.type="text/css";o(a)&&(-1!=a.indexOf("{")?c.styleSheet?c.styleSheet.cssText=a:c.appendChild(q.createTextNode(a)):b||(b=a));if(!c.parentNode||
"head"!==c.parentNode.nodeName.toLowerCase())f=(c.ownerDocument||q).getElementsByTagName("head")[0],f.appendChild(c);n=(e=c.sheet||c.styleSheet)&&"cssRules"in e?"cssRules":"rules";m="deleteRule"in e?function(a){e.deleteRule(a)}:function(a){e.removeRule(a)};l="insertRule"in e?function(a,b,c){e.insertRule(a+" {"+b+"}",c)}:function(a,b,c){e.addRule(a,b,c)};for(f=e[n].length-1;0<=f;--f)s=e[n][f],r=s.selectorText,i[r]?(i[r].style.cssText+=";"+s.style.cssText,m(f)):i[r]=s;k.register(d.stamp(c),this);b&&
k.register(b,this);d.mix(this,{getId:function(){return d.stamp(c)},enable:function(){e.disabled=false;return this},disable:function(){e.disabled=true;return this},isEnabled:function(){return!e.disabled},set:function(a,b){var c=i[a],d=a.split(/\s*,\s*/);if(d.length>1){for(c=d.length-1;c>=0;--c)this.set(d[c],b);return this}if(!k.isValidSelector(a))return this;if(c)c.style.cssText=k.toCssText(b,c.style.cssText);else{d=e[n].length;if(b=k.toCssText(b)){l(a,b,d);i[a]=e[n][d]}}return this},unset:function(a,
b){var c=i[a],f=a.split(/\s*,\s*/),g=!b,j;if(f.length>1){for(j=f.length-1;j>=0;--j)this.unset(f[j],b);return this}if(c){if(!g){b=d.Array(b);h.cssText=c.style.cssText;for(j=b.length-1;j>=0;--j)w(h,b[j]);h.cssText?c.style.cssText=h.cssText:g=true}if(g){f=e[n];for(j=f.length-1;j>=0;--j)if(f[j]===c){delete i[a];m(j);break}}}return this},getCssText:function(a){var b,c;if(o(a))return(a=i[a.split(/\s*,\s*/)[0]])?a.style.cssText:null;b=[];for(c in i)if(i.hasOwnProperty(c)){a=i[c];b.push(a.selectorText+" {"+
a.style.cssText+"}")}return b.join("\n")}})}var q=d.config.doc,m=q.createElement("p"),h=m.style,o=d.Lang.isString,t={},p={},l="cssFloat"in h?"cssFloat":"styleFloat",u,v,w,g="";v="opacity"in h?function(a){a.opacity=g}:function(a){a.filter=g};h.border="1px solid red";h.border=g;w=h.borderLeft?function(a,b){var d;b!==l&&-1!=b.toLowerCase().indexOf("float")&&(b=l);if(o(a[b]))switch(b){case "opacity":case "filter":v(a);break;case "font":a.font=a.fontStyle=a.fontVariant=a.fontWeight=a.fontSize=a.lineHeight=
a.fontFamily=g;break;default:for(d in a)0===d.indexOf(b)&&(a[d]=g)}}:function(a,b){b!==l&&-1!=b.toLowerCase().indexOf("float")&&(b=l);o(a[b])&&("opacity"===b?v(a):a[b]=g)};u=function(a,b){var f=a.styleFloat||a.cssFloat||a["float"],c=d.Lang.trim,e;try{h.cssText=b||g}catch(i){m=q.createElement("p"),h=m.style,h.cssText=b||g}f&&!a[l]&&(a=d.merge(a),delete a.styleFloat,delete a.cssFloat,delete a["float"],a[l]=f);for(e in a)if(a.hasOwnProperty(e))try{h[e]=c(a[e])}catch(k){}return h.cssText};d.mix(k,{toCssText:"opacity"in
h?u:function(a,b){"opacity"in a&&(a=d.merge(a,{filter:"alpha(opacity="+100*a.opacity+")"}),delete a.opacity);return u(a,b)},register:function(a,b){return!(!a||!(b instanceof k&&!p[a]&&(p[a]=b)))},isValidSelector:function(a){var b=!1;a&&o(a)&&(t.hasOwnProperty(a)||(t[a]=!/\S/.test(a.replace(/\s+|\s*[+~>]\s*/g," ").replace(/([^ ])\[.*?\]/g,"$1").replace(/([^ ])::?[a-z][a-z\-]+[a-z](?:\(.*?\))?/ig,"$1").replace(/(?:^| )[a-z0-6]+/ig," ").replace(/\\./g,g).replace(/[.#]\w[\w\-]*/g,g))),b=t[a]);return b}},
!0);d.StyleSheet=k},"3.5.0",{requires:["yui-base"]});
