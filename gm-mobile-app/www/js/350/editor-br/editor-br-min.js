YUI.add("editor-br",function(b){var c=function(){c.superclass.constructor.apply(this,arguments)};b.extend(c,b.Base,{_onKeyDown:function(a){if(a.stopped)a.halt();else if(13==a.keyCode){var e=this.get("host"),c=e.getInstance(),d=new c.EditorSelection;if(d){if(b.UA.ie&&(!d.anchorNode||!d.anchorNode.test("li")&&!d.anchorNode.ancestor("li")))e=this.get("host"),e.execCommand("inserthtml",c.EditorSelection.CURSOR),a.halt();b.UA.webkit&&!d.anchorNode.test("li")&&!d.anchorNode.ancestor("li")&&(e.frame._execCommand("insertlinebreak",
null),a.halt())}}},_afterEditorReady:function(){var a=this.get("host").getInstance();try{a.config.doc.execCommand("insertbronreturn",null,!0)}catch(e){}if(b.UA.ie||b.UA.webkit)a.on("keydown",b.bind(this._onKeyDown,this),a.config.doc)},_onNodeChange:function(a){switch(a.changedType){case "backspace-up":case "backspace-down":case "delete-up":var b=this.get("host").getInstance(),a=a.changedNode,b=b.config.doc.createTextNode(" ");a.appendChild(b);a.removeChild(b)}},initializer:function(){var a=this.get("host");
if(a.editorPara)b.error("Can not plug EditorBR and EditorPara at the same time.");else if(a.after("ready",b.bind(this._afterEditorReady,this)),b.UA.gecko)a.on("nodeChange",b.bind(this._onNodeChange,this))}},{NAME:"editorBR",NS:"editorBR",ATTRS:{host:{value:!1}}});b.namespace("Plugin");b.Plugin.EditorBR=c},"3.5.0",{skinnable:!1,requires:["editor-base"]});
