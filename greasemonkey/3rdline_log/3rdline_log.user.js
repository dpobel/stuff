// ==UserScript==
// @name           3rdline log
// @namespace      http://project.issues.ez.no/
// @include        https://github.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$('<div id="ez-3rdline-log" style="box-shadow: 2px 2px 10px #555;padding:0;background:#fff;border:1px solid #888;border-radius:5px;z-index:1000;position:absolute;width:700px;height:180px;display:none;"><h2 style="margin-top: 0;padding:6px 10px;background:#eee;border-bottom:1px solid #aaa"></h2><p style="text-align:center"><textarea style="width:95%; height: 110px;"></textarea></p></div>').appendTo('body');


var commitsHash = {};

function getIssueNr(commitLog) {
    var r = commitLog.match(/Fixed #(\d+)/i);
    return r[1];
}

function getCommitUrl(blockquote) {
    return 'http://github.com/' + $(blockquote).parent().parent().find('code a').attr('href');
}

function getBranch(blockquote) {
    var body = $(blockquote).parents('.body');
    var titleTxt = body.find('.title').text();
    var r = titleTxt.match(/pushed to ([a-zA-Z0-9_\.-]+) at/i);
    return r[1];
}

function getRepo(blockquote) {
    var body = $(blockquote).parents('.body');
    return body.find('.title a[href^="/ezsystems"]').text().replace('ezsystems/', '');
}

$('.push button').live('click', function (e) {
    var commits = commitsHash[$(this).attr('class')],
        l = "Fixed in " + commits[0].repo + ":\n",
        area = $('#ez-3rdline-log');

    $(commits).each(function(i, v) {
        l += ' - ' + v.branch + ': ' + v.url + "\n";
    });

    $('#ez-3rdline-log').find('h2').html('<a style="display:block;float:right;color:#000;font-weight:normal;text-decoration:underline;color:#333" href="/" class="close">Close</a><a href="http://issues.ez.no/' + commits[0].issue + '">Issue #' + commits[0].issue + '</a>');
    $('#ez-3rdline-log').find('textarea').val(l);
    var x = Math.min(e.pageX + 10, $(document).width() - $('#ez-3rdline-log').width() - 10);
    $('#ez-3rdline-log').css('top', e.pageY + 'px').css('left', x + 'px');
    $('#ez-3rdline-log').fadeIn(600);
});

$('#ez-3rdline-log a.close').live('click', function (e) {
    e.preventDefault();
    $('#ez-3rdline-log').fadeOut(400);
});

// looking for my commits
$('.push .body').each(function (index, el) {

    $(el).find('.commits blockquote[title^="Fixed #"]').each(function (index, blockquote) {
        var commitLog = $(blockquote).attr('title'),
            issueNr = getIssueNr(commitLog);

        var commit = {
            issue: getIssueNr(commitLog),
            url: getCommitUrl(blockquote),
            branch: getBranch(blockquote),
            repo: getRepo(blockquote)
        }
        if ( !commitsHash["issue" + issueNr] ) {
            commitsHash["issue" + issueNr] = [];
        }
        commitsHash["issue" + issueNr].push(commit);

        $(blockquote.parentNode).append('<button class="issue' + issueNr + '">3rdline comment</button>');

    });

});
