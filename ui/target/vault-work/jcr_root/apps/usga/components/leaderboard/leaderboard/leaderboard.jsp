<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.leaderboard.Leaderboard"
               var="leaderboard"/>

<div id="leaderboard-base-module"></div>

<cq:include script="templates.jsp"/>


<script>
    var config = {
        type: '${leaderboard.type}',
        lbType: '${leaderboard.lbType}',
        playOffUrl: '${leaderboard.playOffUrl}',
        tabControlUrl: '${leaderboard.tabControlUrl}',
        strokeDataUrl: '${leaderboard.strokeDataUrl}',
        matchPlayDataUrls: ['${leaderboard.matchPlayDataUrlsString}'],
        bracketDataUrl: '${leaderboard.bracketDataUrl}'
    };
    var leaderboard = new usga.LeaderBoardInitialControl('#leaderboard-base-module', config);
</script>
