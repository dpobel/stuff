YUI.add("node-event-simulate",function(a){a.Node.prototype.simulate=function(b,c){a.Event.simulate(a.Node.getDOMNode(this),b,c)}},"3.5.0",{requires:["node-base","event-simulate"]});
