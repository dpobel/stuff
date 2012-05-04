#! /usr/bin/env node 

var bars = require('yui/handlebars').Handlebars;
    fs = require('fs');

content = fs.readFileSync(process.argv[2], "utf-8");
console.log(bars.precompile(content));
