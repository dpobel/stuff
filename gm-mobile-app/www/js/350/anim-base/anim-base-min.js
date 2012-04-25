YUI.add("anim-base",function(a){var o=Number,e={},l;a.Anim=function(){a.Anim.superclass.constructor.apply(this,arguments);a.Anim._instances[a.stamp(this)]=this};a.Anim.NAME="anim";a.Anim._instances={};a.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;a.Anim.DEFAULT_UNIT="px";a.Anim.DEFAULT_EASING=function(c,a,d,g){return d*c/g+a};a.Anim._intervalTime=20;a.Anim.behaviors={left:{get:function(a,b){return a._getOffset(b)}}};a.Anim.behaviors.top=a.Anim.behaviors.left;
a.Anim.DEFAULT_SETTER=function(c,b,d,g,e,i,h,k){var c=c._node,j=c._node,d=h(e,o(d),o(g)-o(d),i);j&&(j.style||j.attributes)?b in j.style||b in a.DOM.CUSTOM_STYLES?c.setStyle(b,d+(k||"")):j.attributes[b]&&c.setAttribute(b,d):c.set&&c.set(b,d)};a.Anim.DEFAULT_GETTER=function(c,b){var d=c._node,g=d._node,e="";g&&(g.style||g.attributes)?b in g.style||b in a.DOM.CUSTOM_STYLES?e=d.getComputedStyle(b):g.attributes[b]&&(e=d.getAttribute(b)):d.get&&(e=d.get(b));return e};a.Anim.ATTRS={node:{setter:function(c){if(c&&
("string"==typeof c||c.nodeType))c=a.one(c);return this._node=c}},duration:{value:1},easing:{value:a.Anim.DEFAULT_EASING,setter:function(c){if("string"===typeof c&&a.Easing)return a.Easing[c]}},from:{},to:{},startTime:{value:0,readOnly:!0},elapsedTime:{value:0,readOnly:!0},running:{getter:function(){return!!e[a.stamp(this)]},value:!1,readOnly:!0},iterations:{value:1},iterationCount:{value:0,readOnly:!0},direction:{value:"normal"},paused:{readOnly:!0,value:!1},reverse:{value:!1}};a.Anim.run=function(){var c=
a.Anim._instances,b;for(b in c)c[b].run&&c[b].run()};a.Anim.pause=function(){for(var c in e)e[c].pause&&e[c].pause();a.Anim._stopTimer()};a.Anim.stop=function(){for(var c in e)e[c].stop&&e[c].stop();a.Anim._stopTimer()};a.Anim._startTimer=function(){l||(l=setInterval(a.Anim._runFrame,a.Anim._intervalTime))};a.Anim._stopTimer=function(){clearInterval(l);l=0};a.Anim._runFrame=function(){var c=!0,b;for(b in e)e[b]._runFrame&&(c=!1,e[b]._runFrame());c&&a.Anim._stopTimer()};a.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;
a.extend(a.Anim,a.Base,{run:function(){this.get("paused")?this._resume():this.get("running")||this._start();return this},pause:function(){this.get("running")&&this._pause();return this},stop:function(a){(this.get("running")||this.get("paused"))&&this._end(a);return this},_added:!1,_start:function(){this._set("startTime",new Date-this.get("elapsedTime"));this._actualFrames=0;this.get("paused")||this._initAnimAttr();e[a.stamp(this)]=this;a.Anim._startTimer();this.fire("start")},_pause:function(){this._set("startTime",
null);this._set("paused",!0);delete e[a.stamp(this)];this.fire("pause")},_resume:function(){this._set("paused",!1);e[a.stamp(this)]=this;this._set("startTime",new Date-this.get("elapsedTime"));a.Anim._startTimer();this.fire("resume")},_end:function(c){var b=1E3*this.get("duration");c&&this._runAttrs(b,b,this.get("reverse"));this._set("startTime",null);this._set("elapsedTime",0);this._set("paused",!1);delete e[a.stamp(this)];this.fire("end",{elapsed:this.get("elapsedTime")})},_runFrame:function(){var a=
this._runtimeAttr.duration,b=new Date-this.get("startTime"),d=this.get("reverse"),g=b>=a;this._runAttrs(b,a,d);this._actualFrames+=1;this._set("elapsedTime",b);this.fire("tween");g&&this._lastFrame()},_runAttrs:function(c,b,d){var g=this._runtimeAttr,e=a.Anim.behaviors,i=g.easing,h=b,k=!1,j,f;c>=b&&(k=!0);d&&(c=b-c,h=0);for(f in g)g[f].to&&(d=g[f],j=f in e&&"set"in e[f]?e[f].set:a.Anim.DEFAULT_SETTER,k?j(this,f,d.from,d.to,h,b,i,d.unit):j(this,f,d.from,d.to,c,b,i,d.unit))},_lastFrame:function(){var a=
this.get("iterations"),b=this.get("iterationCount"),b=b+1;"infinite"===a||b<a?("alternate"===this.get("direction")&&this.set("reverse",!this.get("reverse")),this.fire("iteration")):(b=0,this._end());this._set("startTime",new Date);this._set("iterationCount",b)},_initAnimAttr:function(){var c=this.get("from")||{},b=this.get("to")||{},d={duration:1E3*this.get("duration"),easing:this.get("easing")},e=a.Anim.behaviors,l=this.get("node"),i,h,k;a.each(b,function(b,f){"function"===typeof b&&(b=b.call(this,
l));h=c[f];void 0===h?h=f in e&&"get"in e[f]?e[f].get(this,f):a.Anim.DEFAULT_GETTER(this,f):"function"===typeof h&&(h=h.call(this,l));var m=a.Anim.RE_UNITS.exec(h),n=a.Anim.RE_UNITS.exec(b);h=m?m[1]:h;k=n?n[1]:b;i=n?n[2]:m?m[2]:"";!i&&a.Anim.RE_DEFAULT_UNIT.test(f)&&(i=a.Anim.DEFAULT_UNIT);!h||!k?a.error('invalid "from" or "to" for "'+f+'"',"Anim"):d[f]={from:h,to:k,unit:i}},this);this._runtimeAttr=d},_getOffset:function(a){var b=this._node,d=b.getComputedStyle(a),e="left"===a?"getX":"getY",a="left"===
a?"setX":"setY";"auto"===d&&(d=b.getStyle("position"),"absolute"===d||"fixed"===d?(d=b[e](),b[a](d)):d=0);return d},destructor:function(){delete a.Anim._instances[a.stamp(this)]}})},"3.5.0",{requires:["base-base","node-style"]});
