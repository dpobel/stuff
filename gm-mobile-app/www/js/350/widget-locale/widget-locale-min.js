YUI.add("widget-locale",function(e){var g=e.Widget;g.ATTRS.locale={value:"en"};g.ATTRS.strings.lazyAdd=!1;e.mix(g.prototype,{_setStrings:function(b,a){var d=this._strs,a=a.toLowerCase();d[a]||(d[a]={});e.aggregate(d[a],b,!0);return d[a]},_getStrings:function(b){return this._strs[b.toLowerCase()]},getStrings:function(b){var b=(b||this.get("locale")).toLowerCase(),a=this.getDefaultLocale().toLowerCase(),d=this._getStrings(a),d=d?e.merge(d):{},c=b.split("-"),h,f;if(b!==a||1<c.length){f="";a=0;for(h=
c.length;a<h;++a)f+=c[a],(b=this._getStrings(f))&&e.aggregate(d,b,!0),f+="-"}return d},getString:function(b,a){var a=(a||this.get("locale")).toLowerCase(),d=this.getDefaultLocale().toLowerCase(),c=this._getStrings(d)||{},e=c[b],c=a.lastIndexOf("-");if(a!==d||-1!=c){do{if((c=this._getStrings(a))&&b in c){e=c[b];break}c=a.lastIndexOf("-");-1!=c&&(a=a.substring(0,c))}while(-1!=c)}return e},getDefaultLocale:function(){return this._state.get("locale","initValue")},_strSetter:function(b){return this._setStrings(b,
this.get("locale"))},_strGetter:function(){return this._getStrings(this.get("locale"))}},!0)},"3.5.0",{requires:["widget-base"]});
