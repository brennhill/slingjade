<%@ include file="/apps/usga/global.jspx" %>

<div id="leaderBoardTicker" class="leader-board liveLeaderBoard_fixed"></div>

<cq:include script="templates.jsp"/>

<script>
    var lbTicker = new usga.LeaderboardTickerControl('#leaderBoardTicker', {
        tickerUrl: '/bin/data/feeds/ticker.json'
    });
</script>