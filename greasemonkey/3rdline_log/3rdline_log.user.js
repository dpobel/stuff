// ==UserScript==
// @name           3rdline log
// @namespace      http://project.issues.ez.no/
// @include        https://github.com/*
// @grant          none
// ==/UserScript==

var scripts = document.getElementsByTagName('script');

for( var i=0; i!=scripts.length; i++) {
    scripts[i].onload = function () {
        if ( !unsafeWindow.jQuery || document.getElementById('ez-3rdline-log') ) {
            return;
        }

        $ = unsafeWindow.jQuery;

        $('<div id="ez-3rdline-log" style="box-shadow: 2px 2px 10px #555;padding:0;background:#fff;border:1px solid #888;border-radius:5px;z-index:1000;position:absolute;width:700px;height:230px;display:none;"><h2 style="margin-top: 0;padding:6px 10px;background:#eee;border-bottom:1px solid #aaa;font-size:12px;"></h2><p style="text-align:center"><textarea style="width:95%; height: 160px;" readonly></textarea></p></div>').appendTo('body');

        var commitsHash = {};

        function getIssueNr(commitLog) {
            var r = commitLog.match(/(Fixed|Fix|Implemented|Implement) ([a-z]+-\d+)/i);
            return r[2];
        }

        function getCommitUrl(blockquote) {
            return 'http://github.com' + $(blockquote).parent().parent().find('code a').attr('href');
        }

        function getBranch(blockquote) {
            var body = $(blockquote).parents('.body');
            var titleTxt = body.find('.title').text();
            var r = titleTxt.match(/([a-zA-Z0-9_\.-]+) at/i);
            return r[1];
        }

        function getRepo(blockquote) {
            var body = $(blockquote).parents('.body');
            return body.find('.title a[href^="/ezsystems"]').text().replace('ezsystems/', '');
        }

        $('.push').delegate('button', 'click', function (e) {
            var commits = commitsHash[$(this).attr('class')],
                area = $('#ez-3rdline-log'),
                msg = "",
                issueNr = $(this).attr('class').replace('issue', '');

            for( var repo in commits ) {
                var l = "Fixed in " + repo + ":\n",
                    fixedLines = [],
                    repoCommits = commits[repo];

                $(repoCommits).each(function (i, v) {
                    fixedLines.push(' - ' + v.branch + ': ' + v.url);
                });
                fixedLines.sort();
                msg += l + fixedLines.join("\n") + "\n\n";
            }

            $('#ez-3rdline-log').find('h2').html('<a style="display:block;float:right;color:#000;font-weight:normal;text-decoration:underline;color:#333" href="/" class="close">Close</a><a href="https://jira.ez.no/browse/' + issueNr + '">Issue ' + issueNr + '</a>');
            $('#ez-3rdline-log').find('textarea').val(msg);
            var x = Math.min(e.pageX + 10, $(document).width() - $('#ez-3rdline-log').width() - 10);
            $('#ez-3rdline-log').css('top', e.pageY + 'px').css('left', x + 'px');
            $('#ez-3rdline-log').fadeIn(600);
        });

        $('#ez-3rdline-log').delegate( '.close', 'click', function (e) {
            e.preventDefault();
            $('#ez-3rdline-log').fadeOut(400);
        });

        // looking for my commits
        $('.push .body').each(function (index, el) {

            if ( $(el).find('.title a:first').text() == 'ezrobot' ) {
                return;
            }

            $(el).find('.commits blockquote').each(function (index, blockquote) {

                var $blockquote = $(blockquote)
                    commitLog = $.trim($blockquote.text());
                if ( !commitLog.match(/^(Fixed|Fix|Implemented|Implement) [a-z]+-\d+/gi) ) {
                    return;
                }

                var issueNr = getIssueNr(commitLog),
                    repo = getRepo(blockquote);


                if ( repo === 'ezpublish-ee' )
                    repo = 'ezpublish';

                var commit = {
                    issue: issueNr,
                    url: getCommitUrl(blockquote),
                    branch: getBranch(blockquote),
                    repo: repo
                };
                if ( !commitsHash["issue" + issueNr] ) {
                    commitsHash["issue" + issueNr] = {};
                }
                if ( !commitsHash["issue"+ issueNr][repo] ) {
                    commitsHash["issue"+ issueNr][repo] = [];
                }
                commitsHash["issue" + issueNr][repo].push(commit);

                $(blockquote.parentNode).append('<button class="issue' + issueNr + '">3rdline comment</button>')
                    .css('whiteSpace', 'normal');

            });

        });

        
    }
}



