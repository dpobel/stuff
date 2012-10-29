// ==UserScript==
// @name        jira improvements
// @namespace   https://jira.ez.no/
// @description Hide the announcement box, add the commit message in details so that it can be copy/paste, add background on private comments
// @include     https://jira.ez.no/browse/*
// @version     1
// ==/UserScript==


var $ = unsafeWindow.jQuery;


$('#announcement-banner').remove();


var title = $('#summary-val').text(),
    id = $('#key-val').text(),
    $item = $('<li class="item full-width"><div class="wrap"><strong class="name">Commit message</strong><b>' + id + ': ' + title + '</b></div></li>');
$('#issuedetails').prepend($item);


$('.activity-comment').each(function (i, comment) {
    var $comment = $(comment);

    $comment.find('.icon-locked').each(function () {
        $comment.css('background', '#FCEDED');
    });

});
