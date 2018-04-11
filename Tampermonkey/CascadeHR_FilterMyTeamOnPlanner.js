// ==UserScript==
// @name         Cascade Team
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Filter "My Team" on the Cascade Planner to scrum team members
// @author       You
// @match        https://iris.cascadecloud.co.uk/planner.asp?planneropts=3&bookmode=undefined
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideUnwantedRows()
    {
		// Populate this array with the EmployeeDesc for each member of your team
        var teamMates = [];
        teamMates.push("(1234) Joe Bloggs");

        var plannerRows = $("div#planner_content table tr");
        $.each(plannerRows, function (dataIndex) {
            var firstCell = $(plannerRows[dataIndex]).find("td")[0];
            var employee = $(firstCell).text();

            if (employee !== undefined && employee !== "" && teamMates.indexOf(employee) === -1)
            {
                $(plannerRows[dataIndex]).hide();
            }
        });
    }

    setInterval(function(){ hideUnwantedRows(); }, 5000);
})();