YUI.add("sortable-scroll",function(b){var a=function(){a.superclass.constructor.apply(this,arguments)};b.extend(a,b.Base,{initializer:function(){var a=this.get("host");a.plug(b.Plugin.DDNodeScroll,{node:a.get("container")});a.delegate.on("drop:over",function(a){this.dd.nodescroll&&a.drag.nodescroll&&a.drag.nodescroll.set("parentScroll",b.one(this.get("container")))})}},{ATTRS:{host:{value:""}},NAME:"SortScroll",NS:"scroll"});b.namespace("Y.Plugin");b.Plugin.SortableScroll=a},"3.5.1",{requires:["sortable",
"dd-scroll"]});