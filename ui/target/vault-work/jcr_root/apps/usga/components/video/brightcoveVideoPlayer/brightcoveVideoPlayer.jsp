<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.video.VideoPlayer" var="videoPlayer"/>

<c:set var="autoPlay" value="${BRIGHTCOVE_REQUEST_AUTO_PLAY}"/>
<c:if test="${empty autoPlay}">
    <c:set var="autoPlay" value="${videoPlayer.autoPlay}"/>
</c:if>

<script type="text/stache" id="brightcovePlayerTemplate">
<video id="myPlayer" data-account="{{accountId}}" data-player="{{playerId}}" data-embed="default" data-video-id="{{videoId}}"
    class="brightcove-player" controls></video>
</script>
<div id="BrightcovePlayer"></div>
<script>
    var config = {
        "accountId": "1918791248001",
        "playerId": "1ffea472-fb5e-43d2-982c-6b2186ef38a9",
        "videoId": "${videoPlayer.videoid}",
        "autoplay" : ${autoPlay =='true'}
    };
    var brightcovePlayer = new usga.BrightcovePlayer('#BrightcovePlayer', config);
</script>

