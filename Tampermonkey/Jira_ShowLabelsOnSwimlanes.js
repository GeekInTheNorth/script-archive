// ==UserScript==
// @name         Show Labels In Jira
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Show labels on sprint board
// @author       Mark Stott
// @match        https://<jira-domain>.atlassian.net/secure/RapidBoard.jspa?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function showLabels() {
        $("span.stotty-label").remove();

        var jiraKeys = [];
        var $swimlanes = $(".ghx-swimlane-header");
        $.each($swimlanes, function (index, swimlane){
            jiraKeys.push($(swimlane).data("issue-key"));
        });

        var jql = "issueKey in (" + jiraKeys + ")";
        var url = "https://<jira-domain>.atlassian.net/rest/api/2/search?jql=" + encodeURI(jql) + "&fields=labels";

        $.get(url, function (data) {
            $.each(data.issues, function(index, issue){
                var key = issue.key;
                var labels = issue.fields.labels;

                if(labels.length > 0){
                    var markUp = "";
                    $.each(labels, function(labelIndex, label){
                      markUp += "<span class='stotty-label' style='display: inline-block; margin-left: 10px; padding: 3px; background-color: gold; border: solid 1px black;'>" + labels + "</span>";
                    });
                    var $targetSwimlane = $("div.ghx-swimlane-header[data-issue-key='" + key + "'] div.ghx-heading");
                    $($targetSwimlane).append(markUp);
                }
            });
        });
    }

    setTimeout(function() { showLabels(); setInterval(function(){ showLabels(); }, 30000); }, 2000);
})();