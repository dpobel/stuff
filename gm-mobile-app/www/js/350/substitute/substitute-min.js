YUI.add("substitute",function(f){var g=f.Lang,n=/(~-(\d+)-~)/g,o=/\{LBRACE\}/g,p=/\{RBRACE\}/g,i=function(d,i,k,q){for(var e,h,a,c,b,j=[],l,m=d.length;;){e=d.lastIndexOf("{",m);if(0>e)break;h=d.indexOf("}",e);if(e+1>=h)break;c=l=d.substring(e+1,h);b=null;a=c.indexOf(" ");-1<a&&(b=c.substring(a+1),c=c.substring(0,a));a=i[c];k&&(a=k(c,a,b));g.isObject(a)?f.dump?g.isArray(a)?a=f.dump(a,parseInt(b,10)):(b=b||"",c=b.indexOf("dump"),-1<c&&(b=b.substring(4)),a=a.toString===Object.prototype.toString||-1<
c?f.dump(a,parseInt(b,10)):a.toString()):a=a.toString():g.isUndefined(a)&&(a="~-"+j.length+"-~",j.push(l));d=d.substring(0,e)+a+d.substring(h+1);q||(m=e-1)}return d.replace(n,function(a,c,b){return"{"+j[parseInt(b,10)]+"}"}).replace(o,"{").replace(p,"}")};f.substitute=i;g.substitute=i},"3.5.0",{optional:["dump"],requires:["yui-base"]});
