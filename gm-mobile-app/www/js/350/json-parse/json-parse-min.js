YUI.add("json-parse",function(c){function h(a,g){return"ok"===a?!0:g}var b=function(a){return(c.config.win||this||{})[a]}("JSON"),d="[object JSON]"===Object.prototype.toString.call(b)&&b,b=!!d,i=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,j=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,k=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l=/(?:^|:|,)(?:\s*\[)+/g,m=/[^\],:{}\s]/,n=function(a){return"\\u"+("0000"+(+a.charCodeAt(0)).toString(16)).slice(-4)},
o=function(a,g){var b=function(a,d){var f,c,e=a[d];if(e&&"object"===typeof e)for(f in e)e.hasOwnProperty(f)&&(c=b(e,f),void 0===c?delete e[f]:e[f]=c);return g.call(a,d,e)};return"function"===typeof g?b({"":a},""):a},p=function(a,b){a=a.replace(i,n);if(!m.test(a.replace(j,"@").replace(k,"]").replace(l,"")))return o(eval("("+a+")"),b);throw new SyntaxError("JSON.parse");};c.namespace("JSON").parse=function(a,b){"string"!==typeof a&&(a+="");return d&&c.JSON.useNativeParse?d.parse(a,b):p(a,b)};if(d)try{b=
d.parse('{"ok":false}',h).ok}catch(q){b=!1}c.JSON.useNativeParse=b},"3.5.0",{requires:["yui-base"]});
