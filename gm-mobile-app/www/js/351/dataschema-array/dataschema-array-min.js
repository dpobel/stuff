YUI.add("dataschema-array",function(g){var b=g.Lang,h={apply:function(e,f){var c={results:[],meta:{}};b.isArray(f)?e&&b.isArray(e.resultFields)?c=h._parseResults.call(this,e.resultFields,f,c):c.results=f:c.error=Error("Array schema parse failure");return c},_parseResults:function(e,f,c){var h=[],k,a,d,l,m,i,j;for(i=f.length-1;-1<i;i--){k={};a=f[i];d=b.isObject(a)&&!b.isFunction(a)?2:b.isArray(a)?1:b.isString(a)?0:-1;if(0<d)for(j=e.length-1;-1<j;j--)d=e[j],l=!b.isUndefined(d.key)?d.key:d,m=!b.isUndefined(a[l])?
a[l]:a[j],k[l]=g.DataSchema.Base.parse.call(this,m,d);else k=0===d?a:null;h[i]=k}c.results=h;return c}};g.DataSchema.Array=g.mix(h,g.DataSchema.Base)},"3.5.1",{requires:["dataschema-base"]});