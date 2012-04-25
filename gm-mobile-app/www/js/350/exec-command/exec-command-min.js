YUI.add("exec-command",function(g){var h=function(){h.superclass.constructor.apply(this,arguments)};g.extend(h,g.Base,{_lastKey:null,_inst:null,command:function(d,c){var a=h.COMMANDS[d];return a?a.call(this,d,c):this._command(d,c)},_command:function(d,c){var a=this.getInstance();try{try{a.config.doc.execCommand("styleWithCSS",null,1)}catch(b){try{a.config.doc.execCommand("useCSS",null,0)}catch(g){}}a.config.doc.execCommand(d,null,c)}catch(i){}},getInstance:function(){this._inst||(this._inst=this.get("host").getInstance());
return this._inst},initializer:function(){g.mix(this.get("host"),{execCommand:function(d,c){return this.exec.command(d,c)},_execCommand:function(d,c){return this.exec._command(d,c)}});this.get("host").on("dom:keypress",g.bind(function(d){this._lastKey=d.keyCode},this))},_wrapContent:function(d,c){return d=this.getInstance().host.editorPara&&!c?"<p>"+d+"</p>":d+"<br>"}},{NAME:"execCommand",NS:"exec",ATTRS:{host:{value:!1}},COMMANDS:{wrap:function(d,c){return(new (this.getInstance().EditorSelection)).wrapContent(c)},
inserthtml:function(d,c){var a=this.getInstance();if(a.EditorSelection.hasCursor()||g.UA.ie)return(new a.EditorSelection).insertContent(c);this._command("inserthtml",c)},insertandfocus:function(d,c){var a=this.getInstance(),b;a.EditorSelection.hasCursor()?(c+=a.EditorSelection.CURSOR,b=this.command("inserthtml",c),a=new a.EditorSelection,a.focusCursor(!0,!0)):this.command("inserthtml",c);return b},insertbr:function(){var d=this.getInstance(),c=new d.EditorSelection,a=null,b=g.UA.webkit?"span.Apple-style-span,var":
"var";c._selection.pasteHTML?c._selection.pasteHTML("<var>|</var>"):this._command("inserthtml","<var>|</var>");var m=function(a){var c=d.Node.create("<br>");a.insert(c,"before");return c};d.all(b).each(function(c){var b=!0;g.UA.webkit&&(b=!1,"|"===c.get("innerHTML")&&(b=!0));if(b){a=m(c);if((!a.previous()||!a.previous().test("br"))&&g.UA.gecko)b=a.cloneNode(),a.insert(b,"after"),a=b;c.remove()}});g.UA.webkit&&a&&(m(a),c.selectNode(a))},insertimage:function(d,c){return this.command("inserthtml",'<img src="'+
c+'">')},addclass:function(d,c){return(new (this.getInstance().EditorSelection)).getSelected().addClass(c)},removeclass:function(d,c){return(new (this.getInstance().EditorSelection)).getSelected().removeClass(c)},forecolor:function(d,c){var a=this.getInstance(),b=new a.EditorSelection;g.UA.ie||this._command("useCSS",!1);if(a.EditorSelection.hasCursor())return b.isCollapsed?(b.anchorNode&&"&nbsp;"===b.anchorNode.get("innerHTML")?(b.anchorNode.setStyle("color",c),a=b.anchorNode):(a=this.command("inserthtml",
'<span style="color: '+c+'">'+a.EditorSelection.CURSOR+"</span>"),b.focusCursor(!0,!0)),a):this._command(d,c);this._command(d,c)},backcolor:function(d,c){var a=this.getInstance(),b=new a.EditorSelection;if(g.UA.gecko||g.UA.opera)d="hilitecolor";g.UA.ie||this._command("useCSS",!1);if(a.EditorSelection.hasCursor())return b.isCollapsed?(b.anchorNode&&"&nbsp;"===b.anchorNode.get("innerHTML")?(b.anchorNode.setStyle("backgroundColor",c),a=b.anchorNode):(a=this.command("inserthtml",'<span style="background-color: '+
c+'">'+a.EditorSelection.CURSOR+"</span>"),b.focusCursor(!0,!0)),a):this._command(d,c);this._command(d,c)},hilitecolor:function(){return h.COMMANDS.backcolor.apply(this,arguments)},fontname2:function(d,c){this._command("fontname",c);var a=new (this.getInstance().EditorSelection);a.isCollapsed&&32!=this._lastKey&&a.anchorNode.test("font")&&a.anchorNode.set("face",c)},fontsize2:function(d,c){this._command("fontsize",c);var a=this.getInstance(),b=new a.EditorSelection;b.isCollapsed&&b.anchorNode&&32!=
this._lastKey&&(g.UA.webkit&&b.anchorNode.getStyle("lineHeight")&&b.anchorNode.setStyle("lineHeight",""),b.anchorNode.test("font")?b.anchorNode.set("size",c):g.UA.gecko&&(a=b.anchorNode.ancestor(a.EditorSelection.DEFAULT_BLOCK_TAG))&&a.setStyle("fontSize",""))},insertunorderedlist:function(){this.command("list","ul")},insertorderedlist:function(){this.command("list","ol")},list:function(d,c){var a=this.getInstance(),b,m=this,i,f,e,j,h,l,k=a.host.editorPara?!0:!1;f=new a.EditorSelection;d="insert"+
("ul"===c?"un":"")+"orderedlist";if(g.UA.ie&&!f.isCollapsed)f=f._selection,b=f.htmlText,e=a.Node.create(b)||a.one("body"),e.test("li")||e.one("li")?this._command(d,null):(e.test(c)?(j=f.item?f.item(0):f.parentElement(),e=a.one(j),j=e.all("li"),h="<div>",j.each(function(a){h=m._wrapContent(a.get("innerHTML"))}),h+="</div>",j=a.Node.create(h),e.get("parentNode").test("div")&&(e=e.get("parentNode")),e&&e.hasAttribute("dir")&&(k?j.all("p").setAttribute("dir",e.getAttribute("dir")):j.setAttribute("dir",
e.getAttribute("dir"))),k?e.replace(j.get("innerHTML")):e.replace(j),f.moveToElementText&&f.moveToElementText(j._node)):(e=g.one(f.parentElement()),e.test(a.EditorSelection.BLOCKS)||(e=e.ancestor(a.EditorSelection.BLOCKS)),e&&e.hasAttribute("dir")&&(i=e.getAttribute("dir")),-1<b.indexOf("<br>")?b=b.split(/<br>/i):(k=(k=a.Node.create(b))?k.all("p"):null)&&k.size()?(b=[],k.each(function(a){b.push(a.get("innerHTML"))})):b=[b],l="<"+c+' id="ie-list">',g.each(b,function(c){var b=a.Node.create(c);if(b&&
b.test("p")){b.hasAttribute("dir")&&(i=b.getAttribute("dir"));c=b.get("innerHTML")}l=l+("<li>"+c+"</li>")}),l+="</"+c+">",f.pasteHTML(l),j=a.config.doc.getElementById("ie-list"),j.id="",i&&j.setAttribute("dir",i),f.moveToElementText&&f.moveToElementText(j)),f.select());else if(g.UA.ie)e=a.one(f._selection.parentElement()),e.test("p")?(e&&e.hasAttribute("dir")&&(i=e.getAttribute("dir")),b=g.EditorSelection.getText(e),""===b?(k="",i&&(k=' dir="'+i+'"'),l=a.Node.create(g.Lang.sub("<{tag}{dir}><li></li></{tag}>",
{tag:c,dir:k})),e.replace(l),f.selectNode(l.one("li"))):this._command(d,null)):this._command(d,null);else{a.all(c).addClass("yui3-touched");(e=f.anchorNode.test(a.EditorSelection.BLOCKS)?f.anchorNode:f.anchorNode.ancestor(a.EditorSelection.BLOCKS))||(e=f.anchorNode.one(a.EditorSelection.BLOCKS));e&&e.hasAttribute("dir")&&(i=e.getAttribute("dir"));if(e&&e.test(c)){var n=e.ancestor("p");b=a.Node.create("<div/>");j=e.all("li");j.each(function(a){b.append(m._wrapContent(a.get("innerHTML"),n))});i&&(k?
b.all("p").setAttribute("dir",i):b.setAttribute("dir",i));k&&(b=a.Node.create(b.get("innerHTML")));k=b.get("firstChild");e.replace(b);f.selectNode(k)}else this._command(d,null);l=a.all(c);i&&l.size()&&l.each(function(a){a.hasClass("yui3-touched")||a.setAttribute("dir",i)});l.removeClass("yui3-touched")}},justify:function(d,c){if(g.UA.webkit){var a=this.getInstance(),b=new a.EditorSelection,h=b.anchorNode.getStyle("backgroundColor");this._command(c);b=new a.EditorSelection;b.anchorNode.test("div")&&
(a="<span>"+b.anchorNode.get("innerHTML")+"</span>",b.anchorNode.set("innerHTML",a),b.anchorNode.one("span").setStyle("backgroundColor",h),b.selectNode(b.anchorNode.one("span")))}else this._command(c)},justifycenter:function(){this.command("justify","justifycenter")},justifyleft:function(){this.command("justify","justifyleft")},justifyright:function(){this.command("justify","justifyright")},justifyfull:function(){this.command("justify","justifyfull")}}});var n=function(d,c,a){var b=this.getInstance(),
h=b.config.doc,i=h.selection.createRange(),f,e,j;if(h.queryCommandValue(d)&&(f=i.htmlText,e=f.match(RegExp(a,"g"))))f=f.replace(a+";","").replace(a,""),i.pasteHTML('<var id="yui-ie-bs">'),a=h.getElementById("yui-ie-bs"),e=h.createElement("div"),j=h.createElement(c),e.innerHTML=f,a.parentNode!==b.config.doc.body&&(a=a.parentNode),c=e.childNodes,a.parentNode.replaceChild(j,a),g.each(c,function(a){j.appendChild(a)}),i.collapse(),i.moveToElementText&&i.moveToElementText(j),i.select();this._command(d)};
g.UA.ie&&(h.COMMANDS.bold=function(){n.call(this,"bold","b","FONT-WEIGHT: bold")},h.COMMANDS.italic=function(){n.call(this,"italic","i","FONT-STYLE: italic")},h.COMMANDS.underline=function(){n.call(this,"underline","u","TEXT-DECORATION: underline")});g.namespace("Plugin");g.Plugin.ExecCommand=h},"3.5.0",{skinnable:!1,requires:["frame"]});
