YUI.add("node-screen",function(a){a.each("winWidth,winHeight,docWidth,docHeight,docScrollX,docScrollY".split(","),function(b){a.Node.ATTRS[b]={getter:function(){var c=Array.prototype.slice.call(arguments);c.unshift(a.Node.getDOMNode(this));return a.DOM[b].apply(this,c)}}});a.Node.ATTRS.scrollLeft={getter:function(){var b=a.Node.getDOMNode(this);return"scrollLeft"in b?b.scrollLeft:a.DOM.docScrollX(b)},setter:function(b){var c=a.Node.getDOMNode(this);c&&("scrollLeft"in c?c.scrollLeft=b:(c.document||
9===c.nodeType)&&a.DOM._getWin(c).scrollTo(b,a.DOM.docScrollY(c)))}};a.Node.ATTRS.scrollTop={getter:function(){var b=a.Node.getDOMNode(this);return"scrollTop"in b?b.scrollTop:a.DOM.docScrollY(b)},setter:function(b){var c=a.Node.getDOMNode(this);c&&("scrollTop"in c?c.scrollTop=b:(c.document||9===c.nodeType)&&a.DOM._getWin(c).scrollTo(a.DOM.docScrollX(c),b))}};a.Node.importMethod(a.DOM,"getXY,setXY,getX,setX,getY,setY,swapXY".split(","));a.Node.ATTRS.region={getter:function(){var b=this.getDOMNode();
b&&!b.tagName&&9===b.nodeType&&(b=b.documentElement);return a.DOM.isWindow(b)?a.DOM.viewportRegion(b):a.DOM.region(b)}};a.Node.ATTRS.viewportRegion={getter:function(){return a.DOM.viewportRegion(a.Node.getDOMNode(this))}};a.Node.importMethod(a.DOM,"inViewportRegion");a.Node.prototype.intersect=function(b,c){var d=a.Node.getDOMNode(this);a.instanceOf(b,a.Node)&&(b=a.Node.getDOMNode(b));return a.DOM.intersect(d,b,c)};a.Node.prototype.inRegion=function(b,c,d){var e=a.Node.getDOMNode(this);a.instanceOf(b,
a.Node)&&(b=a.Node.getDOMNode(b));return a.DOM.inRegion(e,b,c,d)}},"3.5.1",{requires:["node-base","dom-screen"]});