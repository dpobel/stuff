YUI.add("get",function(a){var g=require("path"),j=require("vm"),h=require("fs"),k=require("request");a.Get=function(){};a.config.base=g.join(__dirname,"../");YUI.require=require;YUI.process=process;a.Get._exec=function(a,c,e){var d;d=g.dirname(c).replace(/\\/g,"\\\\");var f=c.replace(/\\/g,"\\\\");d.match(/^https?:\/\//)&&(d=".",f="remoteResource");a="(function(YUI) { var __dirname = '"+d+"'; var __filename = '"+f+"'; var process = YUI.process;var require = function(file) { if (file.indexOf('./') === 0) {   file = __dirname + file.replace('./', '/'); } return YUI.require(file); }; "+
a+" ;return YUI; })";YUI=j.createScript(a,c).runInThisContext(a)(YUI);e(null,c)};a.Get._include=function(b,c){if(b.match(/^https?:\/\//))k({url:b,timeout:this.timeout},function(d,f,e){d?c(d,b):a.Get._exec(e,b,c)});else if(a.config.useSync)if(g.existsSync(b)){var e=h.readFileSync(b,"utf8");a.Get._exec(e,b,c)}else c("Path does not exist: "+b,b);else h.readFile(b,"utf8",function(d,e){d?c(d,b):a.Get._exec(e,b,c)})};var i=function(b){a.Lang.isFunction(b.onSuccess)&&b.onSuccess.call(a,b);a.Lang.isFunction(b.onEnd)&&
b.onEnd.call(a,"success","success")};a.Get.js=function(b,c){var e=a.Array,e=e(b),d,f,g=e.length,h=0;for(f=0;f<g;f++)d=e[f],a.Lang.isObject(d)&&(d=d.url),d=d.replace(/'/g,"%27"),a.Get._include(d,function(b,d){if(!a.config)a.config={debug:true};c.onProgress&&c.onProgress.call(c.context||a,d);if(b){a.Lang.isFunction(c.onFailure)&&c.onFailure.call(a,b,c);a.Lang.isFunction(c.onEnd)&&c.onEnd.call(a,b,"fail")}else{h++;h===g&&i(c)}})};a.Get.script=a.Get.js;a.Get.css=function(a,c){i(c)}},"3.5.0",{requires:["yui-base"]});
