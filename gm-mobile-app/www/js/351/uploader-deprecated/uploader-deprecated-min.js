YUI.add("uploader-deprecated",function(c){function f(a){f.superclass.constructor.apply(this,arguments);a.hasOwnProperty("boundingBox")&&this.set("boundingBox",a.boundingBox);a.hasOwnProperty("buttonSkin")&&this.set("buttonSkin",a.buttonSkin);a.hasOwnProperty("transparent")&&this.set("transparent",a.transparent);a.hasOwnProperty("swfURL")&&this.set("swfURL",a.swfURL)}var h=c.Node;c.extend(f,c.Base,{uploaderswf:null,_id:"",initializer:function(){this._id=c.guid("uploader");var a=h.one(this.get("boundingBox")),
b={version:"10.0.45",fixedAttributes:{allowScriptAccess:"always",allowNetworking:"all",scale:"noscale"},flashVars:{}};""!=this.get("buttonSkin")&&(b.flashVars.buttonSkin=this.get("buttonSkin"));this.get("transparent")&&(b.fixedAttributes.wmode="transparent");a=this.uploaderswf=new c.SWF(a,this.get("swfURL"),b);b=c.bind(this._relayEvent,this);a.on("swfReady",c.bind(this._initializeUploader,this));a.on("click",b);a.on("fileselect",b);a.on("mousedown",b);a.on("mouseup",b);a.on("mouseleave",b);a.on("mouseenter",
b);a.on("uploadcancel",b);a.on("uploadcomplete",b);a.on("uploadcompletedata",b);a.on("uploaderror",b);a.on("uploadprogress",b);a.on("uploadstart",b)},removeFile:function(a){return this.uploaderswf.callSWF("removeFile",[a])},clearFileList:function(){return this.uploaderswf.callSWF("clearFileList",[])},upload:function(a,b,g,d,e){if(c.Lang.isArray(a))return this.uploaderswf.callSWF("uploadThese",[a,b,g,d,e]);if(c.Lang.isString(a))return this.uploaderswf.callSWF("upload",[a,b,g,d,e])},uploadThese:function(a,
b,c,d,e){return this.uploaderswf.callSWF("uploadThese",[a,b,c,d,e])},uploadAll:function(a,b,c,d){return this.uploaderswf.callSWF("uploadAll",[a,b,c,d])},cancel:function(a){return this.uploaderswf.callSWF("cancel",[a])},setAllowLogging:function(a){this.uploaderswf.callSWF("setAllowLogging",[a])},setAllowMultipleFiles:function(a){this.uploaderswf.callSWF("setAllowMultipleFiles",[a])},setSimUploadLimit:function(a){this.uploaderswf.callSWF("setSimUploadLimit",[a])},setFileFilters:function(a){this.uploaderswf.callSWF("setFileFilters",
[a])},enable:function(){this.uploaderswf.callSWF("enable")},disable:function(){this.uploaderswf.callSWF("disable")},_initializeUploader:function(){this.publish("uploaderReady",{fireOnce:!0});this.fire("uploaderReady",{})},_relayEvent:function(a){this.fire(a.type,a)},toString:function(){return"Uploader "+this._id}},{ATTRS:{log:{value:!1,setter:"setAllowLogging"},multiFiles:{value:!1,setter:"setAllowMultipleFiles"},simLimit:{value:2,setter:"setSimUploadLimit"},fileFilters:{value:[],setter:"setFileFilters"},
boundingBox:{value:null,writeOnce:"initOnly"},buttonSkin:{value:null,writeOnce:"initOnly"},transparent:{value:!0,writeOnce:"initOnly"},swfURL:{value:c.Env.cdn+"uploader-deprecated/assets/uploader.swf",writeOnce:"initOnly"}}});c.Uploader=f},"3.5.1",{requires:["swf","base","node","event-custom"]});