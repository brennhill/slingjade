<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.championshipItem.ChampionshipItem"
               var="championshipLatest"/>

<c:if test="${championshipLatest.event!=null}">

    <div id="latestMiniLeaderBoard"></div>

    <cq:include script="templates.jsp"/>

    <script>
        var config = {
            module: 'latest',
            type: '${championshipLatest.event.championshipType}',
            name: '${championshipLatest.event.name}',
            miniLBUrl: '${championshipLatest.miniLBUrl}',
            fullLBUrl: '${championshipLatest.lbPagePath}',
            startDate: ${championshipLatest.event.tickerStartDate != null ? championshipLatest.event.tickerStartDate.time : championshipLatest.event.startDate.time}
        };
        var leaderboard = new usga.LeaderBoardMiniBaseControl('#latestMiniLeaderBoard', config);
    </script>
</c:if>

<c:if test="${not empty championshipLatest.event.rolexSrc}">
    <iframe id="latestMiniLeaderBoardRolex" src="${championshipLatest.event.rolexSrc}"
            style="width:270px;height:113px;border:0;margin:0;padding:0;overflow:hidden;scroll:none" SCROLLING=NO
            frameborder="NO"></iframe>
</c:if>