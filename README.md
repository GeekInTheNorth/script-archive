# Script Archive

This is an archive of scripts I use.

# Tampermonkey

Tampermonkey is a plugin for Chrome and Firefox that allows you to execute additional scripts inside of the browser when loading specific pages.  Scripts for Tampermonkey have been stored in src/tampermonkey.

### Current Scripts

 | Script | Notes |
| ------ | ------ |
| Jira_ShowLabelsOnSwimlanes.js | When the Kanban board loads, this script will check every story visible on the board and request the labels from Jira before displaying them in the swimlane headers.  Jira won't do this itself. |
| Jira_SumRemainingTimeByActivityOnSearchScreen.js | Where subtasks have an activity type in Jira, it is hard to see what there is remaining by activity type in any given sprint or search. This looks at the results on screen and sums up the remaining time by activity type. |
| CascadeHR_FilterMyTeamOnPlanner.js | As a Team Leader, when viewing "My Team" on the planner screen in Cascade, every Developer and QA in HCM Engineering is displayed.  This script will hide away anyone except those you are interested in. |