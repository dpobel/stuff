YUI.add("autocomplete-highlighters",function(f){var e=f.Array,g=f.Highlight,d=f.mix(f.namespace("AutoCompleteHighlighters"),{charMatch:function(b,a,c){var h=e.unique((c?b:b.toLowerCase()).split(""));return e.map(a,function(b){return g.all(b.text,h,{caseSensitive:c})})},charMatchCase:function(b,a){return d.charMatch(b,a,!0)},phraseMatch:function(b,a,c){return e.map(a,function(a){return g.all(a.text,[b],{caseSensitive:c})})},phraseMatchCase:function(b,a){return d.phraseMatch(b,a,!0)},startsWith:function(b,
a,c){return e.map(a,function(a){return g.all(a.text,[b],{caseSensitive:c,startsWith:!0})})},startsWithCase:function(b,a){return d.startsWith(b,a,!0)},subWordMatch:function(b,a,c){var d=f.Text.WordBreak.getUniqueWords(b,{ignoreCase:!c});return e.map(a,function(a){return g.all(a.text,d,{caseSensitive:c})})},subWordMatchCase:function(b,a){return d.subWordMatch(b,a,!0)},wordMatch:function(b,a,c){return e.map(a,function(a){return g.words(a.text,b,{caseSensitive:c})})},wordMatchCase:function(b,a){return d.wordMatch(b,
a,!0)}})},"3.5.0",{requires:["array-extras","highlight-base"]});
