YUI.add("event-resize",function(b){b.Event.define("windowresize",{on:b.UA.gecko&&1.91>b.UA.gecko?function(c,a,d){a._handle=b.Event.attach("resize",function(a){d.fire(a)})}:function(c,a,d){var e=b.config.windowResizeDelay||100;a._handle=b.Event.attach("resize",function(c){a._timer&&a._timer.cancel();a._timer=b.later(e,b,function(){d.fire(c)})})},detach:function(b,a){a._timer&&a._timer.cancel();a._handle.detach()}})},"3.5.0",{requires:["event-synthetic"]});
