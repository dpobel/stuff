// ==UserScript==
// @name           Fix issues title
// @namespace      http://issues.ez.no/
// @include        http://issues.ez.no/*
// @include        http://project.issues.ez.no/*
// ==/UserScript==

// just makes the issue number the first word in the title
if ( document.title.match(/#\d+/) ) {
    document.title = document.title.replace('eZ Issue Tracker: Issue ', '');
}

