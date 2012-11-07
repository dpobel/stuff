// ==UserScript==
// @name        jira improvements
// @namespace   https://jira.ez.no/
// @description Hide the announcement box, add the commit message in details so that it can be copy/paste, add background on private comments
// @include     https://jira.ez.no/browse/*
// @version     1
// ==/UserScript==


var $ = unsafeWindow.jQuery;

// Adds a button that display a prompt with the text to copy already selected
$('<ul class="first ops"><li class="first last"><a id="commit-msg-button" name="commit-msg-button" class="open-dialog button" href="#">Commit message</a></li></ul>').insertAfter($('#opsbar-opsbar-transitions'));
$('#commit-msg-button').bind(
    'click',
    function() {
        window.prompt("Copy to clipboard:", $('#key-val').text() + ": " + $('#summary-val').text().replace(/^\s+/g, '').replace(/\s+$/g, ''));
    }
)


$('.activity-comment').each(function (i, comment) {
    var $comment = $(comment);

    $comment.find('.icon-locked').each(function () {
        $comment.css('background', '#FCEDED');
    });

});
