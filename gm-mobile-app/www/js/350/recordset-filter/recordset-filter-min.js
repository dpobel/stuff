YUI.add("recordset-filter",function(a){function c(a){c.superclass.constructor.apply(this,arguments)}var d=a.Array,f=a.Lang;a.mix(c,{NS:"filter",NAME:"recordsetFilter",ATTRS:{}});a.extend(c,a.Plugin.Base,{filter:function(b,c){var g=this.get("host").get("records"),e;c&&f.isString(b)&&(e=b,b=function(a){return a.getValue(e)===c});return new a.Recordset({records:d.filter(g,b)})},reject:function(b){return new a.Recordset({records:d.reject(this.get("host").get("records"),b)})},grep:function(b){return new a.Recordset({records:d.grep(this.get("host").get("records"),
b)})}});a.namespace("Plugin").RecordsetFilter=c},"3.5.0",{requires:["recordset-base","array-extras","plugin"]});
