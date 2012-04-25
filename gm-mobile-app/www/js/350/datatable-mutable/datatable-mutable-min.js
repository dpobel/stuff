YUI.add("datatable-mutable",function(g){var j=g.Array,i=g.Lang,m=i.isString,n=i.isArray,l=i.isObject,o=i.isNumber,p=g.Array.indexOf,k;g.namespace("DataTable").Mutable=k=function(){};k.ATTRS={autoSync:{value:!1,validator:i.isBoolean}};g.mix(k.prototype,{addColumn:function(a,d){m(a)&&(a={key:a});if(a){if(2>arguments.length||!o(d)&&!n(d))d=this.get("columns").length;this.fire("addColumn",{column:a,index:d})}return this},modifyColumn:function(a,d){m(d)&&(d={key:d});l(d)&&this.fire("modifyColumn",{column:a,
newColumnDef:d});return this},moveColumn:function(a,d){void 0!==a&&(o(d)||n(d))&&this.fire("moveColumn",{column:a,index:d});return this},removeColumn:function(a){void 0!==a&&this.fire("removeColumn",{column:a});return this},addRow:function(a,d){var c=d&&"sync"in d?d.sync:this.get("autoSync"),b,e,f,h;if(a&&this.data&&(b=this.data.add.apply(this.data,arguments),c)){b=j(b);h=j(arguments,1,!0);e=0;for(f=b.length;e<f;++e)c=b[e],c.isNew()&&b[e].save.apply(b[e],h)}return this},removeRow:function(a,d){var c=
this.data,b=d&&"sync"in d?d.sync:this.get("autoSync"),e,f,h;l(a)&&a instanceof this.get("recordType")?e=a:c&&void 0!==a&&(e=c.getById(a)||c.getByClientId(a)||c.item(a));if(e&&(h=j(arguments,1,!0),c=c.remove.apply(c,[e].concat(h)),b)){l(h[0])||h.unshift({});h[0]["delete"]=!0;c=j(c);b=0;for(f=c.length;b<f;++b)e=c[b],e.destroy.apply(e,h)}return this},modifyRow:function(a,d,c){var b=this.data,e=c&&"sync"in c?c.sync:this.get("autoSync"),f;l(a)&&a instanceof this.get("recordType")?f=a:b&&void 0!==a&&(f=
b.getById(a)||b.getByClientId(a)||b.item(a));f&&l(d)&&(b=j(arguments,1,!0),f.setAttrs.apply(f,b),e&&!f.isNew()&&f.save.apply(f,b));return this},_defAddColumnFn:function(a){var d=j(a.index),c=this.get("columns"),b=c,e,f;e=0;for(f=d.length-1;b&&e<f;++e)b=b[d[e]]&&b[d[e]].children;b&&(b.splice(d[e],0,a.column),this.set("columns",c,{originEvent:a}))},_defModifyColumnFn:function(a){var d=this.get("columns"),c=this.getColumn(a.column);c&&(g.mix(c,a.newColumnDef,!0),this.set("columns",d,{originEvent:a}))},
_defMoveColumnFn:function(a){var d=this.get("columns"),c=this.getColumn(a.column),b=j(a.index),e,f,h,g,i;if(c&&(e=c._parent?c._parent.children:d,f=p(e,c),-1<f)){h=d;g=0;for(i=b.length-1;h&&g<i;++g)h=h[b[g]]&&h[b[g]].children;h&&(i=h.length,e.splice(f,1),b=b[g],i>h.lenth&&f<b&&b--,h.splice(b,0,c),this.set("columns",d,{originEvent:a}))}},_defRemoveColumnFn:function(a){var d=this.get("columns"),c=this.getColumn(a.column),b;c&&(b=c._parent?c._parent.children:d,c=g.Array.indexOf(b,c),-1<c&&(b.splice(c,
1),this.set("columns",d,{originEvent:a})))},initializer:function(){this.publish({addColumn:{defaultFn:g.bind("_defAddColumnFn",this)},removeColumn:{defaultFn:g.bind("_defRemoveColumnFn",this)},moveColumn:{defaultFn:g.bind("_defMoveColumnFn",this)},modifyColumn:{defaultFn:g.bind("_defModifyColumnFn",this)}})}});k.prototype.addRows=k.prototype.addRow;i.isFunction(g.DataTable)&&g.Base.mix(g.DataTable,[k])},"3.5.0",{requires:["datatable-base"]});
