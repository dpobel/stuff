YUI.add("attribute-base",function(a){var b=function(){this._yuievt=this._ATTR_E_FACADE=null;a.AttributeCore.apply(this,arguments);a.AttributeEvents.apply(this,arguments);a.AttributeExtras.apply(this,arguments)};a.mix(b,a.AttributeCore,!1,null,1);a.mix(b,a.AttributeExtras,!1,null,1);a.mix(b,a.AttributeEvents,!0,null,1);b.INVALID_VALUE=a.AttributeCore.INVALID_VALUE;b._ATTR_CFG=a.AttributeCore._ATTR_CFG.concat(a.AttributeEvents._ATTR_CFG);a.Attribute=b},"3.5.1",{requires:["attribute-core","attribute-events",
"attribute-extras"]});