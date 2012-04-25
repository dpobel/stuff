YUI.add("clickable-rail",function(a){a.ClickableRail=a.mix(function(){this._initClickableRail()},{prototype:{_initClickableRail:function(){this._evtGuid=this._evtGuid||a.guid()+"|";this.publish("railMouseDown",{defaultFn:this._defRailMouseDownFn});this.after("render",this._bindClickableRail);this.on("destroy",this._unbindClickableRail)},_bindClickableRail:function(){this._dd.addHandle(this.rail);this.rail.on(this._evtGuid+a.DD.Drag.START_EVENT,a.bind(this._onRailMouseDown,this))},_unbindClickableRail:function(){this.get("rendered")&&
this.get("contentBox").one("."+this.getClassName("rail")).detach(this.evtGuid+"*")},_onRailMouseDown:function(b){this.get("clickableRail")&&!this.get("disabled")&&(this.fire("railMouseDown",{ev:b}),this.thumb.focus())},_defRailMouseDownFn:function(b){var b=b.ev,a=this._resolveThumb(b),d=this._key.xyIndex,e=parseFloat(this.get("length"),10),c,f;a&&(c=a.get("dragNode"),f=parseFloat(c.getStyle(this._key.dim),10),c=this._getThumbDestination(b,c),c=c[d]-this.rail.getXY()[d],c=Math.min(Math.max(c,0),e-
f),this._uiMoveThumb(c,{source:"rail"}),b.target=this.thumb.one("img")||this.thumb,a._handleMouseDownEvent(b))},_resolveThumb:function(){return this._dd},_getThumbDestination:function(b,a){var d=a.get("offsetWidth"),e=a.get("offsetHeight");return[b.pageX-Math.round(d/2),b.pageY-Math.round(e/2)]}},ATTRS:{clickableRail:{value:!0,validator:a.Lang.isBoolean}}},!0)},"3.5.0",{requires:["slider-base"]});
