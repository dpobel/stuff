YUI.add("graphics-canvas",function(c){function C(){}function t(a){t.superclass.constructor.apply(this,arguments)}var x=c.config.doc,y=c.Lang,E=c.AttributeLite,m,p,n,q,r,s,u=c.Color,z=parseInt,D=parseFloat,v=y.isNumber,A=RegExp,w=u.toRGB,F=u.toHex;C.prototype={_toRGBA:function(a,b){b=void 0!==b?b:1;u.re_RGB.test(a)||(a=F(a));u.re_hex.exec(a)&&(a="rgba("+[z(A.$1,16),z(A.$2,16),z(A.$3,16)].join()+","+b+")");return a},_toRGB:function(a){return w(a)},setSize:function(a,b){if(this.get("autoSize")&&(a>this.node.getAttribute("width")&&
(this.node.style.width=a+"px",this.node.setAttribute("width",a)),b>this.node.getAttribute("height")))this.node.style.height=b+"px",this.node.setAttribute("height",b)},_updateCoords:function(a,b){this._xcoords.push(a);this._ycoords.push(b)},_clearAndUpdateCoords:function(){var a=this._xcoords.pop()||0,b=this._ycoords.pop()||0;this._updateCoords(a,b)},_updateNodePosition:function(){var a=this.get("node"),b=this.get("x"),e=this.get("y");a.style.position="absolute";a.style.left=b+this._left+"px";a.style.top=
e+this._top+"px"},_updateDrawingQueue:function(a){this._methods.push(a)},lineTo:function(a,b,e){var d=arguments,f=0,g,c,i,h=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._lineToMethods||(this._lineToMethods=[]);if("string"===typeof a||"number"===typeof a)d=[[a,b]];for(g=d.length;f<g;++f)d[f]&&(c=d[f][0],i=d[f][1],this._updateDrawingQueue(["lineTo",c,i]),this._lineToMethods[this._lineToMethods.length]=this._methods[this._methods.length-1],this._trackSize(c-h,i-h),this._trackSize(c+h,i+
h),this._updateCoords(c,i));this._drawingComplete=!1;return this},moveTo:function(a,b){var e=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._updateDrawingQueue(["moveTo",a,b]);this._trackSize(a-e,b-e);this._trackSize(a+e,b+e);this._updateCoords(a,b);this._drawingComplete=!1;return this},curveTo:function(a,b,e,d,f,g){var c,i;this._updateDrawingQueue(["bezierCurveTo",a,b,e,d,f,g]);this._drawingComplete=!1;c=Math.max(f,Math.max(a,e));i=Math.max(g,Math.max(b,d));a=Math.min(f,Math.min(a,e));
b=Math.min(g,Math.min(b,d));this._trackSize(c,i);this._trackSize(a,b);this._updateCoords(c,i);return this},quadraticCurveTo:function(a,b,e,d){var f,g,c=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._updateDrawingQueue(["quadraticCurveTo",a,b,e,d]);this._drawingComplete=!1;f=Math.max(e,a);g=Math.max(d,b);a=Math.min(e,a);b=Math.min(d,b);this._trackSize(f+c,g+c);this._trackSize(a-c,b-c);this._updateCoords(f,g);return this},drawCircle:function(a,b,e){var d=2*Math.PI,f=this._stroke&&this._strokeWeight?
this._strokeWeight:0,c;c=2*e+f;this._drawingComplete=!1;this._trackSize(a+c,b+c);this._trackSize(a-f,b-f);this._updateCoords(a,b);this._updateDrawingQueue(["arc",a+e,b+e,e,0,d,!1]);return this},drawDiamond:function(a,b,e,d){var f=0.5*e,c=0.5*d;this.moveTo(a+f,b);this.lineTo(a+e,b+c);this.lineTo(a+f,b+d);this.lineTo(a,b+c);this.lineTo(a+f,b);return this},drawEllipse:function(a,b,e,d){var f=-0.25*Math.PI,c=0,j,i=e/2,h=d/2,l=0,k=a+i,B=b+h,o,m,p,n=this._stroke&&this._strokeWeight?this._strokeWeight:0;
o=k+Math.cos(0)*i;m=B+Math.sin(0)*h;for(this.moveTo(o,m);8>l;l++)c+=f,j=c-f/2,o=k+Math.cos(c)*i,m=B+Math.sin(c)*h,p=k+Math.cos(j)*(i/Math.cos(f/2)),j=B+Math.sin(j)*(h/Math.cos(f/2)),this._updateDrawingQueue(["quadraticCurveTo",p,j,o,m]);this._trackSize(a+e+n,b+d+n);this._trackSize(a-n,b-n);this._updateCoords(a,b);return this},drawRect:function(a,b,e,d){var f=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._drawingComplete=!1;this._updateDrawingQueue(["moveTo",a,b]);this._updateDrawingQueue(["lineTo",
a+e,b]);this._updateDrawingQueue(["lineTo",a+e,b+d]);this._updateDrawingQueue(["lineTo",a,b+d]);this._updateDrawingQueue(["lineTo",a,b]);this._trackSize(a-f,b-f);this._trackSize(a+e+f,b+d+f);return this},drawRoundRect:function(a,b,e,d,f,c){var j=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._drawingComplete=!1;this._updateDrawingQueue(["moveTo",a,b+c]);this._updateDrawingQueue(["lineTo",a,b+d-c]);this._updateDrawingQueue(["quadraticCurveTo",a,b+d,a+f,b+d]);this._updateDrawingQueue(["lineTo",
a+e-f,b+d]);this._updateDrawingQueue(["quadraticCurveTo",a+e,b+d,a+e,b+d-c]);this._updateDrawingQueue(["lineTo",a+e,b+c]);this._updateDrawingQueue(["quadraticCurveTo",a+e,b,a+e-f,b]);this._updateDrawingQueue(["lineTo",a+f,b]);this._updateDrawingQueue(["quadraticCurveTo",a,b,a,b+c]);this._trackSize(a-j,b-j);this._trackSize(a+e+j,b+d+j);this._updateCoords(e,d);return this},drawWedge:function(a,b,e,d,c,g){var j,i,h,l,k,m=0,g=g||c;this._drawingComplete=!1;this._updateDrawingQueue(["moveTo",a,b]);g=g||
c;360<Math.abs(d)&&(d=360);j=Math.ceil(Math.abs(d)/45);d=-(d/j/180)*Math.PI;i=e/180*Math.PI;if(0<j){l=a+Math.cos(e/180*Math.PI)*c;e=b+Math.sin(e/180*Math.PI)*g;for(this.lineTo(l,e);m<j;++m)i+=d,h=i-d/2,e=a+Math.cos(i)*c,l=b+Math.sin(i)*g,k=a+Math.cos(h)*(c/Math.cos(d/2)),h=b+Math.sin(h)*(g/Math.cos(d/2)),this._updateDrawingQueue(["quadraticCurveTo",k,h,e,l]);this._updateDrawingQueue(["lineTo",a,b])}this._trackSize(0,0);this._trackSize(2*c,2*c);return this},end:function(){this._closePath();return this},
closePath:function(){this._updateDrawingQueue(["closePath"]);this._updateDrawingQueue(["beginPath"])},_getLinearGradient:function(){var a=c.Lang.isNumber,b=this.get("fill"),e=b.stops,d,f,g=0,j=e.length,i;f=this.get("width");var h=this.get("height"),l=b.rotation||0,k,b=0+f/2;i=0+h/2;d=parseFloat(parseFloat(Math.tan(l*(Math.PI/180))).toFixed(8));Math.abs(d)*f/2>=h/2?(180>l?(f=0,k=0+h):(f=0+h,k=0),h=b-(i-f)/d,l=b-(i-k)/d):(90<l&&270>l?(h=0+f,l=0):(h=0,l=0+f),f=-1*(d*(b-h)-i),k=-1*(d*(b-l)-i));for(i=
this._context.createLinearGradient(h,f,l,k);g<j;++g)f=e[g],d=f.opacity,b=f.color,a(d)?(d=Math.max(0,Math.min(1,d)),b=this._toRGBA(b,d)):b=w(b),d=f.offset||g/(j-1),i.addColorStop(d,b);return i},_getRadialGradient:function(){var a=c.Lang.isNumber,b=this.get("fill"),e=b.r,d=b.fx,f=b.fy,b=b.stops,g,j=0,i=b.length,h;h=this.get("width");var l=this.get("height"),k,m,o,n;o=0+h/2;g=0+l/2;d*=h;k=l*f;f=0+h/2;l=0+l/2;m=h*e;n=Math.sqrt(Math.pow(Math.abs(o-d),2)+Math.pow(Math.abs(g-k),2));n>=m&&(m=n/m,1===m&&(m=
1.01),d=(d-o)/m,k=(k-g)/m,d=0<d?Math.floor(d):Math.ceil(d),k=0<k?Math.floor(k):Math.ceil(k),d=o+d,k=g+k);0.5<=e?(h=this._context.createRadialGradient(d,k,e,f,l,e*h),o=1):(h=this._context.createRadialGradient(d,k,e,f,l,h/2),o=2*e);for(;j<i;++j)d=b[j],g=d.opacity,e=d.color,a(g)?(g=Math.max(0,Math.min(1,g)),e=this._toRGBA(e,g)):e=w(e),g=d.offset||j/(i-1),g*=o,1>=g&&h.addColorStop(g,e);return h},_initProps:function(){this._methods=[];this._lineToMethods=[];this._xcoords=[0];this._ycoords=[0];this._bottom=
this._right=this._top=this._left=this._height=this._width=0},_drawingComplete:!1,_createGraphic:function(){return c.config.doc.createElement("canvas")},_trackSize:function(a,b){a>this._right&&(this._right=a);a<this._left&&(this._left=a);b<this._top&&(this._top=b);b>this._bottom&&(this._bottom=b);this._width=this._right-this._left;this._height=this._bottom-this._top}};c.CanvasDrawing=C;m=function(a){this._transforms=[];this.matrix=new c.Matrix;m.superclass.constructor.apply(this,arguments)};m.NAME=
"canvasShape";c.extend(m,c.GraphicBase,c.mix({init:function(){this.initializer.apply(this,arguments)},initializer:function(a){a=a.graphic;this._initProps();this.createNode();this._xcoords=[0];this._ycoords=[0];a&&this._setGraphic(a);this._updateHandler()},_setGraphic:function(a){a instanceof c.CanvasGraphic||(a=c.one(a),a=new c.CanvasGraphic({render:a}),a._appendShape(this));this._graphic=a},addClass:function(a){c.one(this.get("node")).addClass(a)},removeClass:function(a){c.one(this.get("node")).removeClass(a)},
getXY:function(){var a=this.get("graphic").getXY(),b=this.get("x"),e=this.get("y");return[a[0]+b,a[1]+e]},setXY:function(a){var b=this.get("graphic").getXY(),e=a[0]-b[0],a=a[1]-b[1];this._set("x",e);this._set("y",a);this._updateNodePosition(e,a)},contains:function(a){return a===c.one(this.node)},test:function(a){return c.one(this.get("node")).test(a)},compareTo:function(a){return this.node===a},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5}},_getDefaultStroke:function(){return{weight:1,
dashstyle:"none",color:"#000",opacity:1}},_left:0,_right:0,_top:0,_bottom:0,createNode:function(){var a=c.config.doc.createElement("canvas"),b=this.get("id");this._context=a.getContext("2d");a.setAttribute("overflow","visible");a.style.overflow="visible";this.get("visible")||(a.style.visibility="hidden");a.setAttribute("id",b);this.node=a;this.addClass("yui3-canvasShape yui3-"+this.name)},on:function(a,b){return c.Node.DOM_EVENTS[a]?c.one("#"+this.get("id")).on(a,b):c.on.apply(this,arguments)},_setStrokeProps:function(a){var b=
a.color,e=D(a.weight),d=D(a.opacity),f=a.linejoin||"round",g=a.linecap||"butt",a=a.dashstyle;this._miterlimit=null;this._dashstyle=a&&c.Lang.isArray(a)&&1<a.length?a:null;this._strokeWeight=e;this._stroke=v(e)&&0<e?1:0;this._strokeStyle=v(d)?this._toRGBA(b,d):b;this._linecap=g;"round"==f||"square"==f?this._linejoin=f:(f=parseInt(f,10),v(f)&&(this._miterlimit=Math.max(f,1),this._linejoin="miter"))},set:function(){E.prototype.set.apply(this,arguments);this.initialized&&this._updateHandler()},_setFillProps:function(a){var b=
a.color,e=a.type;"linear"==e||"radial"==e?this._fillType=e:b?(a=a.opacity,v(a)?(a=Math.max(0,Math.min(1,a)),b=this._toRGBA(b,a)):b=w(b),this._fillColor=b,this._fillType="solid"):this._fillColor=null},translate:function(a,b){this._translateX+=a;this._translateY+=b;this._addTransform("translate",arguments)},translateX:function(a){this._translateX+=a;this._addTransform("translateX",arguments)},translateY:function(a){this._translateY+=a;this._addTransform("translateY",arguments)},skew:function(a,b){this._addTransform("skew",
arguments)},skewX:function(a){this._addTransform("skewX",arguments)},skewY:function(a){this._addTransform("skewY",arguments)},rotate:function(a){this._rotation=a;this._addTransform("rotate",arguments)},scale:function(a,b){this._addTransform("scale",arguments)},_rotation:0,_transform:"",_addTransform:function(a,b){b=c.Array(b);this._transform=y.trim(this._transform+" "+a+"("+b.join(", ")+")");b.unshift(a);this._transforms.push(b);this.initialized&&this._updateTransform()},_updateTransform:function(){var a=
this.node,b,e=this.get("transformOrigin"),d=this.matrix,c=0,g=this._transforms.length;if(this._transforms&&0<this._transforms.length){for(;c<g;++c)(b=this._transforms[c].shift())&&d[b].apply(d,this._transforms[c]);b=d.toCSSText()}this._graphic.addToRedrawQueue(this);e=100*e[0]+"% "+100*e[1]+"%";a.style.MozTransformOrigin=e;a.style.webkitTransformOrigin=e;a.style.msTransformOrigin=e;a.style.OTransformOrigin=e;b&&(a.style.MozTransform=b,a.style.webkitTransform=b,a.style.msTransform=b,a.style.OTransform=
b);this._transforms=[]},_updateHandler:function(){this._draw();this._updateTransform()},_draw:function(){var a=this.node;this.clear();this._closePath();a.style.left=this.get("x")+"px";a.style.top=this.get("y")+"px"},_closePath:function(){if(this._methods){var a=this.get("node"),b=this._right-this._left,e=this._bottom-this._top,d=this._context,c=[],g=this._methods.concat(),j=0,i,h,l,k=0;this._context.clearRect(0,0,a.width,a.height);if(this._methods&&(k=g.length)&&!(1>k)){for(;j<k;++j){c[j]=g[j].concat();
h=c[j];l="quadraticCurveTo"==h[0]?h.length:3;for(i=1;i<l;++i)h[i]=0===i%2?h[i]-this._top:h[i]-this._left}a.setAttribute("width",Math.min(b,2E3));a.setAttribute("height",Math.min(2E3,e));d.beginPath();for(j=0;j<k;++j)if((h=c[j].concat())&&0<h.length)if(a=h.shift())"closePath"==a&&this._strokeAndFill(d),a&&"lineTo"==a&&this._dashstyle?(h.unshift(this._xcoords[j]-this._left,this._ycoords[j]-this._top),this._drawDashedLine.apply(this,h)):d[a].apply(d,h);this._strokeAndFill(d);this._drawingComplete=!0;
this._clearAndUpdateCoords();this._updateNodePosition();this._methods=g}}},_strokeAndFill:function(a){this._fillType&&(a.fillStyle="linear"==this._fillType?this._getLinearGradient():"radial"==this._fillType?this._getRadialGradient():this._fillColor,a.closePath(),a.fill());this._stroke&&(this._strokeWeight&&(a.lineWidth=this._strokeWeight),a.lineCap=this._linecap,a.lineJoin=this._linejoin,this._miterlimit&&(a.miterLimit=this._miterlimit),a.strokeStyle=this._strokeStyle,a.stroke())},_drawDashedLine:function(a,
b,c,d){for(var f=this._context,g=this._dashstyle[0],j=g+this._dashstyle[1],i=c-a,h=d-b,l=Math.sqrt(Math.pow(i,2)+Math.pow(h,2)),l=Math.floor(Math.abs(l/j)),k=Math.atan2(h,i),i=Math.cos(k)*j,h=Math.sin(k)*j,j=0;j<l;++j)f.moveTo(a,b),f.lineTo(a+Math.cos(k)*g,b+Math.sin(k)*g),a+=i,b+=h;f.moveTo(a,b);l=Math.sqrt((c-a)*(c-a)+(d-b)*(d-b));l>g?f.lineTo(a+Math.cos(k)*g,b+Math.sin(k)*g):0<l&&f.lineTo(a+Math.cos(k)*l,b+Math.sin(k)*l);f.moveTo(c,d)},clear:function(){this._initProps();this.node&&this._context.clearRect(0,
0,this.node.width,this.node.height);return this},getBounds:function(){var a=this.get("stroke"),b=this.get("width"),c=this.get("height"),d=this.get("x"),f=this.get("y"),g=0;a&&a.weight&&(g=a.weight);b=d+b+g-(d-g);c=f+c+g-(f-g);return this.matrix.getContentRect(b,c,d-g,f-g)},destroy:function(){var a=this.get("graphic");a?a.removeShape(this):this._destroy()},_destroy:function(){this.node&&(c.one(this.node).remove(!0),this.node=this._context=null)}},c.CanvasDrawing.prototype));m.ATTRS={transformOrigin:{valueFn:function(){return[0.5,
0.5]}},transform:{setter:function(a){this.matrix.init();this._transforms=this.matrix.getTransformArray(a);return this._transform=a},getter:function(){return this._transform}},node:{readOnly:!0,getter:function(){return this.node}},id:{valueFn:function(){return c.guid()},setter:function(a){var b=this.node;b&&b.setAttribute("id",a);return a}},width:{value:0},height:{value:0},x:{value:0},y:{value:0},visible:{value:!0,setter:function(a){var b=this.get("node");b&&(b.style.visibility=a?"visible":"hidden");
return a}},fill:{valueFn:"_getDefaultFill",setter:function(a){var b=this.get("fill")||this._getDefaultFill();if((a=a?c.merge(b,a):null)&&a.color&&(void 0===a.color||"none"==a.color))a.color=null;this._setFillProps(a);return a}},stroke:{valueFn:"_getDefaultStroke",setter:function(a){var b=this.get("stroke")||this._getDefaultStroke(),e;a&&a.hasOwnProperty("weight")&&(e=parseInt(a.weight,10),isNaN(e)||(a.weight=e));a=a?c.merge(b,a):null;this._setStrokeProps(a);return a}},autoSize:{value:!1},pointerEvents:{value:"visiblePainted"},
graphic:{readOnly:!0,getter:function(){return this._graphic}}};c.CanvasShape=m;p=function(a){p.superclass.constructor.apply(this,arguments)};p.NAME="canvasPath";c.extend(p,c.CanvasShape,{_type:"path",_draw:function(){this._closePath()},createNode:function(){var a=c.config.doc.createElement("canvas"),b=this.get("id");this._context=a.getContext("2d");a.setAttribute("overflow","visible");a.setAttribute("pointer-events","none");a.style.pointerEvents="none";a.style.overflow="visible";a.setAttribute("id",
b);this.node=a;this.addClass("yui3-canvasShape yui3-"+this.name)},end:function(){this._draw()}});p.ATTRS=c.merge(c.CanvasShape.ATTRS,{width:{getter:function(){return this._width-(this._stroke&&this._strokeWeight?2*this._strokeWeight:0)},setter:function(a){return this._width=a}},height:{getter:function(){return this._height-(this._stroke&&this._strokeWeight?2*this._strokeWeight:0)},setter:function(a){return this._height=a}},path:{readOnly:!0,getter:function(){return this._path}}});c.CanvasPath=p;n=
function(){n.superclass.constructor.apply(this,arguments)};n.NAME="canvasRect";c.extend(n,c.CanvasShape,{_type:"rect",_draw:function(){var a=this.get("width"),b=this.get("height");this.clear();this.drawRect(0,0,a,b);this._closePath()}});n.ATTRS=c.CanvasShape.ATTRS;c.CanvasRect=n;q=function(a){q.superclass.constructor.apply(this,arguments)};q.NAME="canvasEllipse";c.extend(q,m,{_type:"ellipse",_draw:function(){var a=this.get("width"),b=this.get("height");this.clear();this.drawEllipse(0,0,a,b);this._closePath()}});
q.ATTRS=m.ATTRS;c.CanvasEllipse=q;r=function(a){r.superclass.constructor.apply(this,arguments)};r.NAME="canvasCircle";c.extend(r,c.CanvasShape,{_type:"circle",_draw:function(){var a=this.get("radius");a&&(this.clear(),this.drawCircle(0,0,a),this._closePath())}});r.ATTRS=c.merge(c.CanvasShape.ATTRS,{width:{setter:function(a){this.set("radius",a/2);return a},getter:function(){return 2*this.get("radius")}},height:{setter:function(a){this.set("radius",a/2);return a},getter:function(){return 2*this.get("radius")}},
radius:{lazyAdd:!1}});c.CanvasCircle=r;s=function(){s.superclass.constructor.apply(this,arguments)};s.NAME="canvasPieSlice";c.extend(s,c.CanvasShape,{_type:"path",_draw:function(){var a=this.get("cx"),b=this.get("cy"),c=this.get("startAngle"),d=this.get("arc"),f=this.get("radius");this.clear();this._left=a;this._right=f;this._top=b;this._bottom=f;this.drawWedge(a,b,c,d,f);this.end()}});s.ATTRS=c.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},c.CanvasShape.ATTRS);
c.CanvasPieSlice=s;t.NAME="canvasGraphic";t.ATTRS={render:{},id:{valueFn:function(){return c.guid()},setter:function(a){var b=this._node;b&&b.setAttribute("id",a);return a}},shapes:{readOnly:!0,getter:function(){return this._shapes}},contentBounds:{readOnly:!0,getter:function(){return this._contentBounds}},node:{readOnly:!0,getter:function(){return this._node}},width:{setter:function(a){this._node&&(this._node.style.width=a+"px");return a}},height:{setter:function(a){this._node&&(this._node.style.height=
a+"px");return a}},autoSize:{value:!1},resizeDown:{getter:function(){return this._resizeDown},setter:function(a){this._resizeDown=a;this._node&&this._redraw();return a}},x:{getter:function(){return this._x},setter:function(a){this._x=a;this._node&&(this._node.style.left=a+"px");return a}},y:{getter:function(){return this._y},setter:function(a){this._y=a;this._node&&(this._node.style.top=a+"px");return a}},autoDraw:{value:!0},visible:{value:!0,setter:function(a){this._toggleVisible(a);return a}}};
c.extend(t,c.GraphicBase,{_x:0,_y:0,getXY:function(){var a=c.one(this._node),b;a&&(b=a.getXY());return b},_resizeDown:!1,initializer:function(){var a=this.get("render"),b=this.get("width")||0,c=this.get("height")||0;this._shapes={};this._redrawQueue={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._node=x.createElement("div");this._node.style.position="absolute";this.set("width",b);this.set("height",c);a&&this.render(a)},render:function(a){var a=c.one(a),b=this._node,e=this.get("width")||
parseInt(a.getComputedStyle("width"),10),d=this.get("height")||parseInt(a.getComputedStyle("height"),10),a=a||x.body;a.appendChild(b);b.style.display="block";b.style.position="absolute";b.style.left="0px";b.style.top="0px";this.set("width",e);this.set("height",d);this.parentNode=a;return this},destroy:function(){this.removeAllShapes();this._node&&(this._removeChildren(this._node),c.one(this._node).destroy())},addShape:function(a){a.graphic=this;a=new (this._getShapeClass(a.type))(a);this._appendShape(a);
return a},_appendShape:function(a){var a=a.node,b=this._frag||this._node;this.get("autoDraw")?b.appendChild(a):this._getDocFrag().appendChild(a)},removeShape:function(a){a instanceof m||y.isString(a)&&(a=this._shapes[a]);a&&a instanceof m&&(a._destroy(),delete this._shapes[a.get("id")]);this.get("autoDraw")&&this._redraw();return a},removeAllShapes:function(){var a=this._shapes,b;for(b in a)a.hasOwnProperty(b)&&a[b].destroy();this._shapes={}},_removeChildren:function(a){if(a&&a.hasChildNodes())for(var b;a.firstChild;)b=
a.firstChild,this._removeChildren(b),a.removeChild(b)},_toggleVisible:function(a){var b,c=this._shapes,d=a?"visible":"hidden";if(c)for(b in c)c.hasOwnProperty(b)&&c[b].set("visible",a);this._node.style.visibility=d},_getShapeClass:function(a){var b=this._shapeClass[a];return b?b:a},_shapeClass:{circle:c.CanvasCircle,rect:c.CanvasRect,path:c.CanvasPath,ellipse:c.CanvasEllipse,pieslice:c.CanvasPieSlice},getShapeById:function(a){return this._shapes[a]},batch:function(a){var b=this.get("autoDraw");this.set("autoDraw",
!1);a();this._redraw();this.set("autoDraw",b)},_getDocFrag:function(){this._frag||(this._frag=x.createDocumentFragment());return this._frag},_redraw:function(){var a=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds;this.get("autoSize")&&(this.set("width",a.right),this.set("height",a.bottom));this._frag&&(this._node.appendChild(this._frag),this._frag=null)},addToRedrawQueue:function(a){var b;this._shapes[a.get("id")]=a;this.get("resizeDown")||(a=a.getBounds(),b=this._contentBounds,
b.left=b.left<a.left?b.left:a.left,b.top=b.top<a.top?b.top:a.top,b.right=b.right>a.right?b.right:a.right,b.bottom=b.bottom>a.bottom?b.bottom:a.bottom,b.width=b.right-b.left,b.height=b.bottom-b.top,this._contentBounds=b);this.get("autoDraw")&&this._redraw()},_getUpdatedContentBounds:function(){var a,b,c=this._shapes,d={left:0,top:0,right:0,bottom:0};for(b in c)c.hasOwnProperty(b)&&(a=c[b],a=a.getBounds(),d.left=Math.min(d.left,a.left),d.top=Math.min(d.top,a.top),d.right=Math.max(d.right,a.right),d.bottom=
Math.max(d.bottom,a.bottom));d.width=d.right-d.left;d.height=d.bottom-d.top;return this._contentBounds=d}});c.CanvasGraphic=t},"3.5.1",{skinnable:!1,requires:["graphics"]});