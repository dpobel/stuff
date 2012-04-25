YUI.add("uploader-flash",function(b){function f(a){f.superclass.constructor.apply(this,arguments)}var g=b.substitute,e=b.Uploader.Queue,h=b.ClassNameManager.getClassName;h("uploader","selectfiles-button");b.UploaderFlash=b.extend(f,b.Widget,{_buttonState:"up",_buttonFocus:!1,_swfContainerId:null,_swfReference:null,queue:null,_tabElementBindings:null,initializer:function(){this._swfContainerId=b.guid("uploader");this.queue=this._swfReference=null;this._buttonState="up";this._tabElementBindings=this._buttonFocus=
null;this.publish("fileselect");this.publish("uploadstart");this.publish("fileuploadstart");this.publish("uploadprogress");this.publish("totaluploadprogress");this.publish("uploadcomplete");this.publish("alluploadscomplete");this.publish("uploaderror");this.publish("mouseenter");this.publish("mouseleave");this.publish("mousedown");this.publish("mouseup");this.publish("click")},renderUI:function(){var a=this.get("boundingBox"),d=this.get("contentBox"),c=this.get("selectFilesButton");a.setStyle("position",
"relative");c.setStyles({width:"100%",height:"100%"});d.append(c);d.append(b.Node.create(g(f.FLASH_CONTAINER,{swfContainerId:this._swfContainerId})));a=b.one("#"+this._swfContainerId);this._swfReference=new b.SWF(a,this.get("swfURL"),{version:"10.0.45",fixedAttributes:{wmode:"transparent",allowScriptAccess:"always",allowNetworking:"all",scale:"noscale"}})},bindUI:function(){this._swfReference.on("swfReady",function(){this._setMultipleFiles();this._setFileFilters();this._triggerEnabled();this.after("multipleFilesChange",
this._setMultipleFiles,this);this.after("fileFiltersChange",this._setFileFilters,this);this.after("enabledChange",this._triggerEnabled,this)},this);this._swfReference.on("fileselect",this._updateFileList,this);this.after("tabElementsChange",this._attachTabElements);this._attachTabElements();this._swfReference.on("mouseenter",function(){this.fire("mouseenter");this._setButtonClass("hover",!0);"down"==this._buttonState&&this._setButtonClass("active",!0)},this);this._swfReference.on("mouseleave",function(){this.fire("mouseleave");
this._setButtonClass("hover",!1);this._setButtonClass("active",!1)},this);this._swfReference.on("mousedown",function(){this.fire("mousedown");this._buttonState="down";this._setButtonClass("active",!0)},this);this._swfReference.on("mouseup",function(){this.fire("mouseup");this._buttonState="up";this._setButtonClass("active",!1)},this);this._swfReference.on("click",function(){this.fire("click");this._buttonFocus=!0;this._setButtonClass("focus",!0);b.one("body").focus();this._swfReference._swf.focus()},
this)},_attachTabElements:function(){if(null!==this.get("tabElements")&&null!==this.get("tabElements").from&&null!==this.get("tabElements").to){null!==this._tabElementBindings?(this._tabElementBindings.from.detach(),this._tabElementBindings.to.detach(),this._tabElementBindings.tabback.detach(),this._tabElementBindings.tabforward.detach(),this._tabElementBindings.focus.detach(),this._tabElementBindings.blur.detach()):this._tabElementBindings={};var a=b.one(this.get("tabElements").from),d=b.one(this.get("tabElements").to);
this._tabElementBindings.from=a.on("keydown",function(a){if(a.keyCode==9&&!a.shiftKey){a.preventDefault();this._swfReference._swf.setAttribute("tabindex",0);this._swfReference._swf.setAttribute("role","button");this._swfReference._swf.setAttribute("aria-label",this.get("selectButtonLabel"));this._swfReference._swf.focus()}},this);this._tabElementBindings.to=d.on("keydown",function(a){if(a.keyCode==9&&a.shiftKey){a.preventDefault();this._swfReference._swf.setAttribute("tabindex",0);this._swfReference._swf.setAttribute("role",
"button");this._swfReference._swf.setAttribute("aria-label",this.get("selectButtonLabel"));this._swfReference._swf.focus()}},this);this._tabElementBindings.tabback=this._swfReference.on("tabback",function(){this._swfReference._swf.blur();setTimeout(function(){a.focus()},30)},this);this._tabElementBindings.tabforward=this._swfReference.on("tabforward",function(){this._swfReference._swf.blur();setTimeout(function(){d.focus()},30)},this);this._tabElementBindings.focus=this._swfReference._swf.on("focus",
function(){this._buttonFocus=true;this._setButtonClass("focus",true)},this);this._tabElementBindings.blur=this._swfReference._swf.on("blur",function(){this._buttonFocus=false;this._setButtonClass("focus",false)},this)}else null!==this._tabElementBindings&&(this._tabElementBindings.from.detach(),this._tabElementBindings.to.detach(),this._tabElementBindings.tabback.detach(),this._tabElementBindings.tabforward.detach(),this._tabElementBindings.focus.detach(),this._tabElementBindings.blur.detach())},
_setButtonClass:function(a,b){b?this.get("selectFilesButton").addClass(this.get("buttonClassNames")[a]):this.get("selectFilesButton").removeClass(this.get("buttonClassNames")[a])},_setFileFilters:function(){this._swfReference&&null!==this.get("fileFilters")&&this._swfReference.callSWF("setFileFilters",[this.get("fileFilters")])},_setMultipleFiles:function(){this._swfReference&&this._swfReference.callSWF("setAllowMultipleFiles",[this.get("multipleFiles")])},_triggerEnabled:function(){this.get("enabled")?
(this._swfReference.callSWF("enable"),this._swfReference._swf.setAttribute("aria-disabled","false"),this._setButtonClass("disabled",!1)):(this._swfReference.callSWF("disable"),this._swfReference._swf.setAttribute("aria-disabled","true"),this._setButtonClass("disabled",!0))},_updateFileList:function(a){b.one("body").focus();this._swfReference._swf.focus();var d=[],c=[],e=this._swfReference;b.each(a.fileList,function(a){var b={};b.id=a.fileId;b.name=a.fileReference.name;b.size=a.fileReference.size;
b.type=a.fileReference.type;b.dateCreated=a.fileReference.creationDate;b.dateModified=a.fileReference.modificationDate;b.uploader=e;d.push(b)});b.each(d,function(a){c.push(new b.FileFlash(a))});this.fire("fileselect",{fileList:c});a=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?a.concat(c):c)},_uploadEventHandler:function(a){switch(a.type){case "file:uploadstart":this.fire("fileuploadstart",a);break;case "file:uploadprogress":this.fire("uploadprogress",a);break;case "uploaderqueue:totaluploadprogress":this.fire("totaluploadprogress",
a);break;case "file:uploadcomplete":this.fire("uploadcomplete",a);break;case "uploaderqueue:alluploadscomplete":this.queue=null;this.fire("alluploadscomplete",a);break;case "uploaderqueue:uploaderror":this.fire("uploaderror",a)}},upload:function(a,d,c){var d=d||this.get("uploadURL"),c=c||this.get("postVarsPerFile"),e=a.get("id"),c=c.hasOwnProperty(e)?c[e]:c;a instanceof b.FileFlash&&(a.on("uploadstart",this._uploadStartHandler,this),a.on("uploadprogress",this._uploadProgressHandler,this),a.on("uploadcomplete",
this._uploadCompleteHandler,this),a.on("uploaderror",this._uploadErrorHandler,this),a.startUpload(d,c,this.get("fileFieldName")))},uploadAll:function(a,b){this.uploadThese(this.get("fileList"),a,b)},uploadThese:function(a,b,c){this.queue||(b=b||this.get("uploadURL"),c=c||this.get("postVarsPerFile"),this.queue=new e({simUploads:this.get("simLimit"),errorAction:this.get("errorAction"),fileFieldName:this.get("fileFieldName"),fileList:a,uploadURL:b,perFileParameters:c}),this.queue.on("uploadstart",this._uploadEventHandler,
this),this.queue.on("uploadprogress",this._uploadEventHandler,this),this.queue.on("totaluploadprogress",this._uploadEventHandler,this),this.queue.on("uploadcomplete",this._uploadEventHandler,this),this.queue.on("alluploadscomplete",this._uploadEventHandler,this),this.queue.on("alluploadscancelled",function(){this.queue=null},this),this.queue.on("uploaderror",this._uploadEventHandler,this),this.queue.startUpload(),this.fire("uploadstart"))}},{FLASH_CONTAINER:"<div id='{swfContainerId}' style='position:absolute; top:0px; left: 0px; margin: 0; padding: 0; border: 0; width:100%; height:100%'></div>",
SELECT_FILES_BUTTON:"<button type='button' class='yui3-button' tabindex='-1'>{selectButtonLabel}</button>",TYPE:"flash",NAME:"uploader",ATTRS:{appendNewFiles:{value:!0},buttonClassNames:{value:{hover:"yui3-button-hover",active:"yui3-button-active",disabled:"yui3-button-disabled",focus:"yui3-button-selected"}},enabled:{value:!0},errorAction:{value:"continue",validator:function(a){return a===e.CONTINUE||a===e.STOP||a===e.RESTART_ASAP||a===e.RESTART_AFTER}},fileFilters:{value:null},fileFieldName:{value:"Filedata"},
fileList:{value:[]},multipleFiles:{value:!1},postVarsPerFile:{value:{}},selectButtonLabel:{value:"Select Files"},selectFilesButton:{valueFn:function(){return b.Node.create(g(b.UploaderFlash.SELECT_FILES_BUTTON,{selectButtonLabel:this.get("selectButtonLabel")}))}},simLimit:{value:2,validator:function(a){return 2<=a&&5>=a}},swfURL:{valueFn:function(){var a=b.Env.cdn+"uploader/assets/flashuploader.swf";return 0<b.UA.ie?a+"?t="+b.guid("uploader"):a}},tabElements:{value:null},uploadURL:{value:""}}});b.UploaderFlash.Queue=
e},"3.5.0",{requires:"swf,widget,substitute,base,cssbutton,node,event-custom,file-flash,uploader-queue".split(",")});
