YUI.add("autocomplete-highlighters-accentfold",function(d){var e=d.Highlight,c=d.Array;d.mix(d.namespace("AutoCompleteHighlighters"),{charMatchFold:function(b,a){var f=c.unique(b.split(""));return c.map(a,function(b){return e.allFold(b.text,f)})},phraseMatchFold:function(b,a){return c.map(a,function(a){return e.allFold(a.text,[b])})},startsWithFold:function(b,a){return c.map(a,function(a){return e.allFold(a.text,[b],{startsWith:!0})})},subWordMatchFold:function(b,a){var f=d.Text.WordBreak.getUniqueWords(b);
return c.map(a,function(a){return e.allFold(a.text,f)})},wordMatchFold:function(b,a){return c.map(a,function(a){return e.wordsFold(a.text,b)})}})},"3.5.0",{requires:["array-extras","highlight-accentfold"]});
