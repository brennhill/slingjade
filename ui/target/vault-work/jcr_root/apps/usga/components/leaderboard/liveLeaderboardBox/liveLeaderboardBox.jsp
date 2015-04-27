<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.leaderboard.LiveLeaderboardBox"
               var="liveLeaderboardBox"/>

<c:if test="${liveLeaderboardBox.event!=null}">
    <c:set var="LIVE_LEADERBOARD_ID"><usga:unique-id varName="LIVE_LEADERBOARD_ID"/></c:set>

    <div id="liveEventLeaderBoard_${LIVE_LEADERBOARD_ID}" class="live-events__module">

        <cq:include script="templates.jsp"/>

        <script>
            var config = {
                module: 'live',
                type: '${liveLeaderboardBox.event.championshipType}',
                name: '${liveLeaderboardBox.event.name}',
                miniLBUrl: '${liveLeaderboardBox.miniLBUrl}',
                miniTeeTimesUrl: '${liveLeaderboardBox.miniTeeTimesUrl}',
                fullLBUrl: '${liveLeaderboardBox.lbPagePath}',
                fullStartingTimesUrl: '${liveLeaderboardBox.startingTimesPagePath}',
                startDate: ${liveLeaderboardBox.event.tickerStartDate != null ? liveLeaderboardBox.event.tickerStartDate.time : liveLeaderboardBox.event.startDate.time},
                sponsors: {
                    miniLB: {
                        imgUrl: '${liveLeaderboardBox.lbSponsorIcon}',
                        link: '${liveLeaderboardBox.lbSponsorLink}',
                        text: '${not empty liveLeaderboardBox.lbSponsorIcon ? 'IN PARTNERSHIP WITH' : ''}'
                    },
                    miniTeeTimes: {
                        imgUrl: '${liveLeaderboardBox.stSponsorIcon}',
                        link: '${liveLeaderboardBox.stSponsorLink}',
                        text: '${not empty liveLeaderboardBox.stSponsorIcon ? 'IN PARTNERSHIP WITH' : ''}'
                    }
                }
            };
            var leaderboard = new usga.LeaderBoardMiniBaseControl('#liveEventLeaderBoard_${LIVE_LEADERBOARD_ID}', config);
        </script>
    </div>
</c:if>
