YUI.add("autocomplete-filters",function(e){var d=e.Array,i=e.Object,h=e.Text.WordBreak,g=e.mix(e.namespace("AutoCompleteFilters"),{charMatch:function(a,b,c){if(!a)return b;var f=d.unique((c?a:a.toLowerCase()).split(""));return d.filter(b,function(a){a=a.text;c||(a=a.toLowerCase());return d.every(f,function(b){return-1!==a.indexOf(b)})})},charMatchCase:function(a,b){return g.charMatch(a,b,!0)},phraseMatch:function(a,b,c){if(!a)return b;c||(a=a.toLowerCase());return d.filter(b,function(b){return-1!==
(c?b.text:b.text.toLowerCase()).indexOf(a)})},phraseMatchCase:function(a,b){return g.phraseMatch(a,b,!0)},startsWith:function(a,b,c){if(!a)return b;c||(a=a.toLowerCase());return d.filter(b,function(b){return 0===(c?b.text:b.text.toLowerCase()).indexOf(a)})},startsWithCase:function(a,b){return g.startsWith(a,b,!0)},subWordMatch:function(a,b,c){if(!a)return b;var f=h.getUniqueWords(a,{ignoreCase:!c});return d.filter(b,function(a){var b=c?a.text:a.text.toLowerCase();return d.every(f,function(a){return-1!==
b.indexOf(a)})})},subWordMatchCase:function(a,b){return g.subWordMatch(a,b,!0)},wordMatch:function(a,b,c){if(!a)return b;var f={ignoreCase:!c},e=h.getUniqueWords(a,f);return d.filter(b,function(a){var b=d.hash(h.getUniqueWords(a.text,f));return d.every(e,function(a){return i.owns(b,a)})})},wordMatchCase:function(a,b){return g.wordMatch(a,b,!0)}})},"3.5.0",{requires:["array-extras","text-wordbreak"]});
