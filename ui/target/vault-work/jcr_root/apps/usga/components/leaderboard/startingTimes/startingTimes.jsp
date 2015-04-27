<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.leaderboard.StartingTimes" var="startingTimes"/>

<div id="starting-times-base-module"></div>

<cq:include script="templates.jsp"/>

<script>
    var config = {
        type: '${startingTimes.type}',
        lbType: '${startingTimes.lbType}',
        tabControlUrl: '${startingTimes.tabControlUrl}',
        strokeDataUrls: ['${startingTimes.strokeDataUrlsString}'],
        matchPlayDataUrls: ['${startingTimes.matchPlayDataUrlsString}']
    };
    var startingTimes = new usga.StartingTimesInitialControl('#starting-times-base-module', config);
</script>