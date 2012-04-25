YUI.add("history-base",function(d){function e(){this._init.apply(this,arguments)}function i(a){return"object"===n.type(a)}var n=d.Lang,h=d.Object,g=YUI.namespace("Env.History"),j=d.Array,k=d.config.doc,l=k.documentMode,f=d.config.win,m={merge:!0};d.augment(e,d.EventTarget,null,null,{emitFacade:!0,prefix:"history",preventable:!1,queueable:!0});g._state||(g._state={});e.NAME="historyBase";e.SRC_ADD="add";e.SRC_REPLACE="replace";e.html5=!(!f.history||!f.history.pushState||!f.history.replaceState||!("onpopstate"in
f||2<=d.UA.gecko)||d.UA.android&&!(2.4<=d.UA.android));e.nativeHashChange=("onhashchange"in f||"onhashchange"in k)&&(!l||7<l);d.mix(e.prototype,{_init:function(a){a=this._config=a||{};this.force=!!a.force;a=this._initialState=this._initialState||a.initialState||null;this.publish("change",{broadcast:2,defaultFn:this._defChangeFn});a&&this.replace(a)},add:function(){var a=j(arguments,0,true);a.unshift("add");return this._change.apply(this,a)},addValue:function(a,b,c){var d={};d[a]=b;return this._change("add",
d,c)},get:function(a){var b=g._state,c=i(b);return a?c&&h.owns(b,a)?b[a]:void 0:c?d.mix({},b,true):b},replace:function(){var a=j(arguments,0,true);a.unshift("replace");return this._change.apply(this,a)},replaceValue:function(a,b,c){var d={};d[a]=b;return this._change("replace",d,c)},_change:function(a,b,c){c=c?d.merge(m,c):m;c.merge&&i(b)&&i(g._state)&&(b=d.merge(g._state,b));this._resolveChanges(a,b,c);return this},_fireEvents:function(a,b,c){this.fire("change",{_options:c,changed:b.changed,newVal:b.newState,
prevVal:b.prevState,removed:b.removed,src:a});h.each(b.changed,function(b,c){this._fireChangeEvent(a,c,b)},this);h.each(b.removed,function(b,c){this._fireRemoveEvent(a,c,b)},this)},_fireChangeEvent:function(a,b,c){this.fire(b+"Change",{newVal:c.newVal,prevVal:c.prevVal,src:a})},_fireRemoveEvent:function(a,b,c){this.fire(b+"Remove",{prevVal:c,src:a})},_resolveChanges:function(a,b,c){var d={},e,f=g._state,j={};b||(b={});c||(c={});if(i(b)&&i(f)){h.each(b,function(b,a){var c=f[a];if(b!==c){d[a]={newVal:b,
prevVal:c};e=true}},this);h.each(f,function(a,c){if(!h.owns(b,c)||b[c]===null){delete b[c];j[c]=a;e=true}},this)}else e=b!==f;(e||this.force)&&this._fireEvents(a,{changed:d,newState:b,prevState:f,removed:j},c)},_storeState:function(a,b){g._state=b||{}},_defChangeFn:function(a){this._storeState(a.src,a.newVal,a._options)}},!0);d.HistoryBase=e},"3.5.0",{requires:["event-custom-complex"]});
