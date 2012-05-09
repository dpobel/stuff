YUI.add("tabview",function(c){var e=c.TabviewBase._queries,d=c.TabviewBase._classNames,g=c.Base.create("tabView",c.Widget,[c.WidgetParent],{_afterChildAdded:function(){this.get("contentBox").focusManager.refresh()},_defListNodeValueFn:function(){return c.Node.create(g.LIST_TEMPLATE)},_defPanelNodeValueFn:function(){return c.Node.create(g.PANEL_TEMPLATE)},_afterChildRemoved:function(a){var a=a.index,b=this.get("selection");b||(b=this.item(a-1)||this.item(0))&&b.set("selected",1);this.get("contentBox").focusManager.refresh()},
_initAria:function(){var a=this.get("contentBox").one(e.tabviewList);a&&a.setAttrs({role:"tablist"})},bindUI:function(){this.get("contentBox").plug(c.Plugin.NodeFocusManager,{descendants:"."+d.tabLabel,keys:{next:"down:39",previous:"down:37"},circular:!0});this.after("render",this._setDefSelection);this.after("addChild",this._afterChildAdded);this.after("removeChild",this._afterChildRemoved)},renderUI:function(){var a=this.get("contentBox");this._renderListBox(a);this._renderPanelBox(a);this._childrenContainer=
this.get("listNode");this._renderTabs(a)},_setDefSelection:function(){var a=this.get("selection")||this.item(0);this.some(function(b){if(b.get("selected"))return a=b,!0});a&&(this.set("selection",a),a.set("selected",1))},_renderListBox:function(a){var b=this.get("listNode");b.inDoc()||a.append(b)},_renderPanelBox:function(a){var b=this.get("panelNode");b.inDoc()||a.append(b)},_renderTabs:function(a){var b=a.all(e.tab),c=this.get("panelNode")?this.get("panelNode").get("children"):null,f=this;b&&(b.addClass(d.tab),
a.all(e.tabLabel).addClass(d.tabLabel),a.all(e.tabPanel).addClass(d.tabPanel),b.each(function(a,b){var e=c?c.item(b):null;f.add({boundingBox:a,contentBox:a.one("."+d.tabLabel),label:a.one("."+d.tabLabel).get("text"),panelNode:e})}))}},{LIST_TEMPLATE:'<ul class="'+d.tabviewList+'"></ul>',PANEL_TEMPLATE:'<div class="'+d.tabviewPanel+'"></div>',ATTRS:{defaultChildType:{value:"Tab"},listNode:{setter:function(a){(a=c.one(a))&&a.addClass(d.tabviewList);return a},valueFn:"_defListNodeValueFn"},panelNode:{setter:function(a){(a=
c.one(a))&&a.addClass(d.tabviewPanel);return a},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null}},HTML_PARSER:{listNode:e.tabviewList,panelNode:e.tabviewPanel}});c.TabView=g;var h=c.Lang,e=c.TabviewBase._queries,d=c.TabviewBase._classNames;c.Tab=c.Base.create("tab",c.Widget,[c.WidgetChild],{BOUNDING_TEMPLATE:'<li class="'+d.tab+'"></li>',CONTENT_TEMPLATE:'<a class="'+d.tabLabel+'"></a>',PANEL_TEMPLATE:'<div class="'+d.tabPanel+'"></div>',_uiSetSelectedPanel:function(a){this.get("panelNode").toggleClass(d.selectedPanel,
a)},_afterTabSelectedChange:function(a){this._uiSetSelectedPanel(a.newVal)},_afterParentChange:function(a){a.newVal?this._add():this._remove()},_initAria:function(){var a=this.get("contentBox"),b=a.get("id"),d=this.get("panelNode");b||(b=c.guid(),a.set("id",b));a.set("role","tab");a.get("parentNode").set("role","presentation");d.setAttrs({role:"tabpanel","aria-labelledby":b})},syncUI:function(){this.set("label",this.get("label"));this.set("content",this.get("content"));this._uiSetSelectedPanel(this.get("selected"))},
bindUI:function(){this.after("selectedChange",this._afterTabSelectedChange);this.after("parentChange",this._afterParentChange)},renderUI:function(){this._renderPanel();this._initAria()},_renderPanel:function(){this.get("parent").get("panelNode").appendChild(this.get("panelNode"))},_add:function(){var a=this.get("parent").get("contentBox"),b=a.get("listNode"),a=a.get("panelNode");b&&b.appendChild(this.get("boundingBox"));a&&a.appendChild(this.get("panelNode"))},_remove:function(){this.get("boundingBox").remove();
this.get("panelNode").remove()},_onActivate:function(a){a.target===this&&(a.domEvent.preventDefault(),a.target.set("selected",1))},initializer:function(){this.publish(this.get("triggerEvent"),{defaultFn:this._onActivate})},_defLabelSetter:function(a){this.get("contentBox").setContent(a);return a},_defContentSetter:function(a){this.get("panelNode").setContent(a);return a},_defContentGetter:function(){return this.get("panelNode").getContent()},_defPanelNodeValueFn:function(){var a=this.get("contentBox").get("href")||
"",b=this.get("parent"),e=a.indexOf("#"),f,a=a.substr(e);"#"===a.charAt(0)&&(f=c.one(a))&&f.addClass(d.tabPanel);!f&&b&&(f=b.get("panelNode").get("children").item(this.get("index")));f||(f=c.Node.create(this.PANEL_TEMPLATE));return f}},{ATTRS:{triggerEvent:{value:"click"},label:{setter:"_defLabelSetter",validator:h.isString},content:{setter:"_defContentSetter",getter:"_defContentGetter"},panelNode:{setter:function(a){(a=c.one(a))&&a.addClass(d.tabPanel);return a},valueFn:"_defPanelNodeValueFn"},tabIndex:{value:null,
validator:"_validTabIndex"}},HTML_PARSER:{selected:function(){return this.get("boundingBox").hasClass(d.selectedTab)?1:0}}})},"3.5.1",{requires:"node-pluginhost,node-focusmanager,tabview-base,widget,widget-parent,widget-child".split(",")});