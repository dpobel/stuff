YUI.add("datasource-textschema",function(a){var b=function(){b.superclass.constructor.apply(this,arguments)};a.mix(b,{NS:"schema",NAME:"dataSourceTextSchema",ATTRS:{schema:{}}});a.extend(b,a.Plugin.Base,{initializer:function(){this.doBefore("_defDataFn",this._beforeDefDataFn)},_beforeDefDataFn:function(c){var b=this.get("schema"),d=c.details[0],c=c.data.responseText||c.data;d.response=a.DataSchema.Text.apply.call(this,b,c)||{meta:{},results:c};this.get("host").fire("response",d);return new a.Do.Halt("DataSourceTextSchema plugin halted _defDataFn")}});
a.namespace("Plugin").DataSourceTextSchema=b},"3.5.0",{requires:["datasource-local","plugin","dataschema-text"]});
