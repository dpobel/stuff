YUI.add("node-deprecated",function(c){var a=c.Node;a.ATTRS.data={getter:function(){return this._dataVal},setter:function(b){return this._dataVal=b},value:null};c.get=a.get=function(){return a.one.apply(a,arguments)};c.mix(a.prototype,{query:function(b){return this.one(b)},queryAll:function(b){return this.all(b)},each:function(b,a){return b.call(a||this,this)},item:function(){return this},size:function(){return this._node?1:0}})},"3.5.0",{requires:["node-base"]});
