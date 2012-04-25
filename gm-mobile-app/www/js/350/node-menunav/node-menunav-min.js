YUI.add("node-menunav",function(g){var m=g.UA,p=g.later,h=g.ClassNameManager.getClassName,u=h("menu"),v=h("menu","hidden"),n=h("menu","horizontal"),k=h("menu","label"),D=h("menu","label","active"),q=h("menu","label","menuvisible"),w=h("menuitem"),s=h("menuitem","active"),i="."+u,x="."+h("menu","toggle"),y="."+h("menu","content"),E=">"+y+">ul>li>a",F=">"+y+">ul>li>"+("."+k)+">a:first-child",z=function(b){var a=!1;b&&(a="a"===b.get("nodeName").toLowerCase());return a},r=function(b,a,d){var c;b&&(b.hasClass(a)&&
(c=b),!c&&d&&(c=b.ancestor("."+a)));return c},A=function(b,a){var d;b&&(d=r(b,w,a));return d},t=function(b,a){var d;b&&(d=a?r(b,k,a):r(b,k)||b.one("."+k));return d},o=function(b,a){var d;b&&(d=A(b,a)||t(b,a));return d},j=function(b){return o(b.one("li"))},B=function(b,a){return b&&!b.handledMouseOver&&(b.compareTo(a)||b.contains(a))},C=function(b,a){return b&&!b.handledMouseOut&&!b.compareTo(a)&&!b.contains(a)},l=function(){l.superclass.constructor.apply(this,arguments)};l.NAME="nodeMenuNav";l.NS=
"menuNav";l.SHIM_TEMPLATE_TITLE="Menu Stacking Shim";l.SHIM_TEMPLATE='<iframe frameborder="0" tabindex="-1" class="'+h("shim")+'" title="'+l.SHIM_TEMPLATE_TITLE+'" src="javascript:false;"></iframe>';l.ATTRS={useARIA:{value:!0,writeOnce:!0,lazyAdd:!1,setter:function(b){var a=this.get("host"),d,c,e,f;b&&(a.set("role","menu"),a.all("ul,li,"+y).set("role","presentation"),a.all("."+h("menuitem","content")).set("role","menuitem"),a.all("."+k).each(function(a){d=a;if(c=a.one(x))c.set("role","presentation"),
d=c.previous();d.set("role","menuitem");d.set("aria-haspopup",!0);if(e=a.next())e.set("role","menu"),d=e.previous(),(c=d.one(x))&&(d=c),f=g.stamp(d),d.get("id")||d.set("id",f),e.set("aria-labelledby",f),e.set("aria-hidden",!0)}))}},autoSubmenuDisplay:{value:!0,writeOnce:!0},submenuShowDelay:{value:250,writeOnce:!0},submenuHideDelay:{value:250,writeOnce:!0},mouseOutHideDelay:{value:750,writeOnce:!0}};g.extend(l,g.Plugin.Base,{_rootMenu:null,_activeItem:null,_activeMenu:null,_hasFocus:!1,_blockMouseEvent:!1,
_currentMouseX:0,_movingToSubmenu:!1,_showSubmenuTimer:null,_hideSubmenuTimer:null,_hideAllSubmenusTimer:null,_firstItem:null,initializer:function(){var b=this.get("host"),a=[];b&&(this._rootMenu=b,b.all("ul:first-child").addClass("first-of-type"),b.all(i).addClass(v),a.push(b.on("mouseover",this._onMouseOver,this)),a.push(b.on("mouseout",this._onMouseOut,this)),a.push(b.on("mousemove",this._onMouseMove,this)),a.push(b.on("mousedown",this._toggleSubmenuDisplay,this)),a.push(g.on("key",this._toggleSubmenuDisplay,
b,"down:13",this)),a.push(b.on("click",this._toggleSubmenuDisplay,this)),a.push(b.on("keypress",this._onKeyPress,this)),a.push(b.on("keydown",this._onKeyDown,this)),b=b.get("ownerDocument"),a.push(b.on("mousedown",this._onDocMouseDown,this)),a.push(b.on("focus",this._onDocFocus,this)),this._eventHandlers=a,this._initFocusManager())},destructor:function(){var b=this._eventHandlers;b&&(g.Array.each(b,function(a){a.detach()}),this._eventHandlers=null);this.get("host").unplug("focusManager")},_isRoot:function(b){return this._rootMenu.compareTo(b)},
_getTopmostSubmenu:function(b){var a=b.ancestor(i);return a?this._isRoot(a)?b:this._getTopmostSubmenu(a):b},_clearActiveItem:function(){var b=this._activeItem;b&&b.removeClass(b.hasClass(w)?s:D);this._activeItem=null},_setActiveItem:function(b){b&&(this._clearActiveItem(),b.addClass(b.hasClass(w)?s:D),this._activeItem=b)},_focusItem:function(b){var a;b&&this._hasFocus&&(a=b.ancestor(i),b=z(b)?b:b.one("a"),a&&!a.compareTo(this._activeMenu)&&(this._activeMenu=a,this._initFocusManager()),this._focusManager.focus(b))},
_showMenu:function(b){var a=b.ancestor(i),d=b.get("parentNode"),c=d.getXY();this.get("useARIA")&&b.set("aria-hidden",!1);a.hasClass(n)?c[1]+=d.get("offsetHeight"):c[0]+=d.get("offsetWidth");b.setXY(c);8>m.ie&&(6===m.ie&&!b.hasIFrameShim&&(b.appendChild(g.Node.create(l.SHIM_TEMPLATE)),b.hasIFrameShim=!0),b.setStyles({height:"",width:""}),b.setStyles({height:b.get("offsetHeight")+"px",width:b.get("offsetWidth")+"px"}));b.previous().addClass(q);b.removeClass(v)},_hideMenu:function(b,a){var d=b.previous();
d.removeClass(q);a&&(this._focusItem(d),this._setActiveItem(d));(d=b.one("."+s))&&d.removeClass(s);b.setStyles({left:"",top:""});b.addClass(v);this.get("useARIA")&&b.set("aria-hidden",!0)},_hideAllSubmenus:function(b){var a=this;b.all(i).each(g.bind(function(b){a._hideMenu(b)},a))},_cancelShowSubmenuTimer:function(){var b=this._showSubmenuTimer;b&&(b.cancel(),this._showSubmenuTimer=null)},_cancelHideSubmenuTimer:function(){var b=this._hideSubmenuTimer;b&&(b.cancel(),this._hideSubmenuTimer=null)},
_initFocusManager:function(){var b=this._rootMenu,a=this._activeMenu||b,d=this._isRoot(a)?"":"#"+a.get("id"),c=this._focusManager;a.hasClass(n)?(d=d+E+","+d+F,a={next:"down:39",previous:"down:37"}):(d+=E,a={next:"down:40",previous:"down:38"});c?(c.set("activeDescendant",-1),c.set("descendants",d),c.set("keys",a)):(b.plug(g.Plugin.NodeFocusManager,{descendants:d,keys:a,circular:!0}),c=b.focusManager,a="#"+b.get("id")+i+" a,"+x,b.all(a).set("tabIndex",-1),c.on("activeDescendantChange",this._onActiveDescendantChange,
c,this),c.after("activeDescendantChange",this._afterActiveDescendantChange,c,this),this._focusManager=c)},_onActiveDescendantChange:function(b,a){"UI"===b.src&&a._activeMenu&&!a._movingToSubmenu&&a._hideAllSubmenus(a._activeMenu)},_afterActiveDescendantChange:function(b,a){var d;"UI"===b.src&&(d=o(this.get("descendants").item(b.newVal),!0),a._setActiveItem(d))},_onDocFocus:function(b){var a=this._activeItem,b=b.target;this._rootMenu.contains(b)?this._hasFocus?(a=b.ancestor(i),this._activeMenu.compareTo(a)||
(this._activeMenu=a,this._initFocusManager(),this._focusManager.set("activeDescendant",b),this._setActiveItem(o(b,!0)))):(this._hasFocus=!0,(a=o(b,!0))&&this._setActiveItem(a)):(this._clearActiveItem(),this._cancelShowSubmenuTimer(),this._hideAllSubmenus(this._rootMenu),this._activeMenu=this._rootMenu,this._initFocusManager(),this._focusManager.set("activeDescendant",0),this._hasFocus=!1)},_onMenuMouseOver:function(b){var a=this._hideAllSubmenusTimer;a&&(a.cancel(),this._hideAllSubmenusTimer=null);
this._cancelHideSubmenuTimer();b&&!b.compareTo(this._activeMenu)&&(this._activeMenu=b,this._hasFocus&&this._initFocusManager());this._movingToSubmenu&&b.hasClass(n)&&(this._movingToSubmenu=!1)},_hideAndFocusLabel:function(){var b=this._activeMenu;this._hideAllSubmenus(this._rootMenu);b&&(b=this._getTopmostSubmenu(b),this._focusItem(b.previous()))},_onMenuMouseOut:function(b,a){var d=this._activeMenu,c=a.relatedTarget,e=this._activeItem;d&&!d.contains(c)&&((d=d.ancestor(i))&&!d.contains(c)?0<this.get("mouseOutHideDelay")&&
(this._cancelShowSubmenuTimer(),this._hideAllSubmenusTimer=p(this.get("mouseOutHideDelay"),this,this._hideAndFocusLabel)):e&&(c=e.ancestor(i),this._isRoot(c)||this._focusItem(c.previous())))},_onMenuLabelMouseOver:function(b){var a=this,d=a._activeMenu,c=a._isRoot(d),c=a.get("autoSubmenuDisplay")&&c||!c,e=a.get("submenuShowDelay"),f,i=function(c){a._cancelHideSubmenuTimer();a._cancelShowSubmenuTimer();if(!b.hasClass(q)&&(f=b.next()))a._hideAllSubmenus(d),a._showSubmenuTimer=p(c,a,a._showMenu,f)};
a._focusItem(b);a._setActiveItem(b);c&&(a._movingToSubmenu?(g.message("Pause path"),a._hoverTimer=p(e,a,function(){i(0)})):i(e))},_onMenuLabelMouseOut:function(b,a){var d=this._isRoot(this._activeMenu),d=this.get("autoSubmenuDisplay")&&d||!d,c=a.relatedTarget,e=b.next(),f=this._hoverTimer;f&&f.cancel();this._clearActiveItem();if(d)if(this._movingToSubmenu&&!this._showSubmenuTimer&&e)this._hideSubmenuTimer=p(this.get("submenuHideDelay"),this,this._hideMenu,e);else if(!this._movingToSubmenu&&e&&(!c||
c&&!e.contains(c)&&!c.compareTo(e)))this._cancelShowSubmenuTimer(),this._hideMenu(e)},_onMenuItemMouseOver:function(b){var a=this._activeMenu,d=this._isRoot(a),d=this.get("autoSubmenuDisplay")&&d||!d;this._focusItem(b);this._setActiveItem(b);d&&!this._movingToSubmenu&&this._hideAllSubmenus(a)},_onMenuItemMouseOut:function(){this._clearActiveItem()},_onVerticalMenuKeyDown:function(b){var a=this._activeMenu,d=this._rootMenu,c=b.target,e=!1;switch(b.keyCode){case 37:if((d=a.ancestor(i))&&d.hasClass(n)){if(this._hideMenu(a),
d=a.get("parentNode"),a=d.previous(),a||(d=d.get("parentNode").get("children"),a=d.item(d.size()-1)),c=o(a))c.hasClass(k)?(a=c.next())?(this._showMenu(a),this._focusItem(j(a)),this._setActiveItem(j(a))):(this._focusItem(c),this._setActiveItem(c)):(this._focusItem(c),this._setActiveItem(c))}else this._isRoot(a)||this._hideMenu(a,!0);e=!0;break;case 39:if(c.hasClass(k)){if(a=c.next())this._showMenu(a),this._focusItem(j(a)),this._setActiveItem(j(a))}else d.hasClass(n)&&(a=this._getTopmostSubmenu(a),
a=a.get("parentNode"),(c=a.next())||(c=a.get("parentNode").get("children").item(0)),c=o(c),this._hideAllSubmenus(d),c&&(c.hasClass(k)?(a=c.next())?(this._showMenu(a),this._focusItem(j(a)),this._setActiveItem(j(a))):(this._focusItem(c),this._setActiveItem(c)):(this._focusItem(c),this._setActiveItem(c))));e=!0}e&&b.preventDefault()},_onHorizontalMenuKeyDown:function(b){var a=this._activeMenu,d=o(b.target,!0),c=!1;if(40===b.keyCode&&(this._hideAllSubmenus(a),d.hasClass(k))){if(a=d.next())this._showMenu(a),
this._focusItem(j(a)),this._setActiveItem(j(a));c=!0}c&&b.preventDefault()},_onMouseMove:function(b){var a=this;p(10,a,function(){a._currentMouseX=b.pageX})},_onMouseOver:function(b){var a,d,c,e;if(this._blockMouseEvent)this._blockMouseEvent=!1;else{a=b.target;d=r(a,u,!0);c=t(a,!0);e=A(a,!0);if(B(d,a)&&(this._onMenuMouseOver(d,b),d.handledMouseOver=!0,d.handledMouseOut=!1,d=d.ancestor(i)))d.handledMouseOut=!0,d.handledMouseOver=!1;B(c,a)&&(this._onMenuLabelMouseOver(c,b),c.handledMouseOver=!0,c.handledMouseOut=
!1);B(e,a)&&(this._onMenuItemMouseOver(e,b),e.handledMouseOver=!0,e.handledMouseOut=!1)}},_onMouseOut:function(b){var a=this._activeMenu,d=!1,c,e,f;this._movingToSubmenu=a&&!a.hasClass(n)&&b.pageX-5>this._currentMouseX;c=b.target;a=b.relatedTarget;e=r(c,u,!0);f=t(c,!0);c=A(c,!0);C(f,a)&&(this._onMenuLabelMouseOut(f,b),f.handledMouseOut=!0,f.handledMouseOver=!1);C(c,a)&&(this._onMenuItemMouseOut(c,b),c.handledMouseOut=!0,c.handledMouseOver=!1);if(f&&(f=f.next())&&a&&(a.compareTo(f)||f.contains(a)))d=
!0;if(C(e,a)||d)this._onMenuMouseOut(e,b),e.handledMouseOut=!0,e.handledMouseOver=!1},_toggleSubmenuDisplay:function(b){var a=this,d=b.target,c=t(d,!0),e=b.type,f,g,h;if(c&&(f=z(d)?d:d.ancestor(z)))if(f=f.getAttribute("href",2),g=f.indexOf("#"),h=f.length,0===g&&1<h&&(g=f.substr(1,h),(f=c.next())&&f.get("id")===g)){if("mousedown"===e||"keydown"===e){if((m.opera||m.gecko||m.ie)&&"keydown"===e&&!a._preventClickHandle)a._preventClickHandle=a._rootMenu.on("click",function(b){b.preventDefault();a._preventClickHandle.detach();
a._preventClickHandle=null});"mousedown"==e&&(b.preventDefault(),b.stopImmediatePropagation(),a._hasFocus=!0);a._isRoot(d.ancestor(i))?c.hasClass(q)?(a._hideMenu(f),a._focusItem(c),a._setActiveItem(c)):(a._hideAllSubmenus(a._rootMenu),a._showMenu(f),a._focusItem(j(f)),a._setActiveItem(j(f))):a._activeItem==c?(a._showMenu(f),a._focusItem(j(f)),a._setActiveItem(j(f))):c._clickHandle||(c._clickHandle=c.on("click",function(){a._hideAllSubmenus(a._rootMenu);a._hasFocus=false;a._clearActiveItem();c._clickHandle.detach();
c._clickHandle=null}))}"click"===e&&b.preventDefault()}},_onKeyPress:function(b){switch(b.keyCode){case 37:case 38:case 39:case 40:b.preventDefault()}},_onKeyDown:function(b){var a=this,d=a._activeItem,c=b.target.ancestor(i);c&&(a._activeMenu=c,c.hasClass(n)?a._onHorizontalMenuKeyDown(b):a._onVerticalMenuKeyDown(b),27===b.keyCode&&(a._isRoot(c)?d&&(d.hasClass(k)&&d.hasClass(q)?(b=d.next())&&a._hideMenu(b):(a._focusManager.blur(),a._clearActiveItem(),a._hasFocus=!1)):(m.opera?p(0,a,function(){a._hideMenu(c,
!0)}):a._hideMenu(c,!0),b.stopPropagation(),a._blockMouseEvent=m.gecko?!0:!1)))},_onDocMouseDown:function(b){var a=this._rootMenu,b=b.target;!a.compareTo(b)&&!a.contains(b)&&(this._hideAllSubmenus(a),m.webkit&&(this._hasFocus=!1,this._clearActiveItem()))}});g.namespace("Plugin");g.Plugin.NodeMenuNav=l},"3.5.0",{requires:["node","classnamemanager","node-focusmanager","plugin"]});
