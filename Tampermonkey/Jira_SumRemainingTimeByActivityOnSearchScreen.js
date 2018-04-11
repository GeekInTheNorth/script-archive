// ==UserScript==
// @name         Jira: Sum Time Estimate v2
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Yay, totals!
// @author       Mark Stott
// @match        https://ngiris.atlassian.net/issues/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var strToSeconds = function(timeString){
        var timeInSeconds = 0;
        if (timeString.endsWith("m")) {
            var minutesStr = timeString.replace("m", "");
            var parsedMinutes = parseFloat(minutesStr);
            timeInSeconds = parsedMinutes * 60.0;
        } else if (timeString.endsWith("h")){
            var hoursStr = timeString.replace("h", "");
            var parsedHours = parseFloat(hoursStr);
            timeInSeconds = parsedHours * 60.0 * 60.0;
        } else if (timeString.endsWith("d")){
            var daysStr = timeString.replace("d", "");
            var parsedDays = parseFloat(daysStr);
            timeInSeconds = parsedDays * 60.0 * 60.0 * 8.0;
        }

        return timeInSeconds;
    };

    setInterval(function () {
        var results = [];
        var dataRows = $("table#issuetable tbody tr");
        $.each(dataRows, function (index){
            var dataRow = dataRows[index];
            var timeEstimateStr = "0h";
            var timeEstimateCells = $(dataRow).find(".timeestimate");
            if (timeEstimateCells.length > 0)
                timeEstimateStr = $(timeEstimateCells[0]).text();

            var timeEstimate = strToSeconds(timeEstimateStr);

            var activityType = "Unknown";
            var activityCells = $(dataRow).find(".customfield_13701");
            if (activityCells.length > 0)
                activityType = $(activityCells[0]).text().trim();

            var recorded = false;

            $.each(results, function (resultIndex) {
                var result = results[resultIndex];
                if (result.ActivityType === activityType)
                {
                    result.TimeRemaining += timeEstimate;
                    recorded = true;
                }
            });

            if (!recorded)
            {
                var newResult = {
                    ActivityType: activityType,
                    TimeRemaining: timeEstimate,
                };

                results.push(newResult);
            }
        });

        $("div#CascadeTimeRemaining2").remove();
        var markUp = "<div id='CascadeTimeRemaining2'><table>";
        $.each(results, function (resultIndex){
            var result = results[resultIndex];
            var resultHoursRemaining = result.TimeRemaining / 3600.0;
            markUp += "<tr><td>" + result.ActivityType + ":</td><td style='text-align: right;'>" + resultHoursRemaining.toFixed(2) + "h</td></tr>";
        });

        markUp += "</table></div>";

        $(markUp).insertBefore("div.issue-table-container");
    }, 5000);
})();