YUI.add("querystring-parse",function(f){var j=f.namespace("QueryString"),l=function(b){return function a(d,c){var g,h,i;if(2!==arguments.length)return d=d.split(b),a(j.unescape(d.shift()),j.unescape(d.join(b)));d=d.replace(/^\s+|\s+$/g,"");f.Lang.isString(c)&&(c=c.replace(/^\s+|\s+$/g,""),isNaN(c)||(h=+c,c===h.toString(10)&&(c=h)));g=/(.*)\[([^\]]*)\]$/.exec(d);if(!g)return i={},d&&(i[d]=c),i;h=g[2];g=g[1];if(!h)return a(g,[c]);i={};i[h]=c;return a(g,i)}},k=function(b,e){var a;if(b)if(f.Lang.isArray(b))a=
b.concat(e);else if(!f.Lang.isObject(b)||!f.Lang.isObject(e))a=[b].concat(e);else{for(a in e)a&&e.hasOwnProperty(a)&&(b[a]=k(b[a],e[a]));a=b}else a=e;return a};j.parse=function(b,e,a){return f.Array.reduce(f.Array.map(b.split(e||"&"),l(a||"=")),{},k)};j.unescape=function(b){return decodeURIComponent(b.replace(/\+/g," "))}},"3.5.0",{requires:["array-extras","yui-base"],supersedes:["querystring-parse-simple"]});
