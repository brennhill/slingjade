<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.video.VideoPage" var="videoPage"/>

<div class="wrapper">
    <!-- content part-->
    <div class="content">

        <!-- main slider-->
        <div id="videoDetails" class="video-details">
            <div class="inner">
                <ul class="breadcrumbs">
                    <li class="breadcrumbs__current">
                        <c:if test="${videoPage.memberExclusivePage}">
                            <span class="unlocked">Member Exclusive</span>
                        </c:if>
                    </li>
                </ul>
                <div class="video-details__container">
                    <div class="video-details__container__content clearfix">
                        <div class="video-details__container__content__player">
                            <c:set var="BRIGHTCOVE_REQUEST_AUTO_PLAY" value="true" scope="request"/>
                            <cq:include path="videoPlayer" resourceType="usga/components/video/brightcoveVideoPlayer"/>
                        </div>
                    </div>
                    <div class="video-details__container__info clearfix">
                        <div class="video-details__container__info__title <c:if test="${videoPage.memberExclusivePage}">unlocked</c:if>">
                            <p>${videoPage.title}</p>
                        </div>
                        <div class="video-details__container__info__description">
                            <p>${videoPage.description}</p>
                        </div>
                        <div class="video-details__container__info__social">
                            <cq:include path="socialIcons" resourceType="usga/components/socialIcons"/>
                        </div>
                        <script>
                            var socialShare = new usga.SocialShare('.video-details__container__info__social');

                        </script>
                    </div>
                    <wcmmode:edit>
                    <style type="text/css">
                        .video-details__container .relatedVideosContainer {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 40%;
                        }

                        .video-details__container .relatedVideosContainer .video-details__container__sidebar {
                            width: 100% !important;
                            padding-top: 35px !important;
                        }
                    </style>
                    <div class="relatedVideosContainer">
                    </wcmmode:edit>

                        <cq:include path="relatedVideos" resourceType="usga/components/video/relatedVideos"/>

                    <wcmmode:edit></div></wcmmode:edit>
                </div>
            </div>
        </div>
        <script>var videoDetails = new usga.VideoDetails('#videoDetails');</script>
        <!-- end main slider-->
        <div class="inner">
            <h1 class="title title_underline">More&nbsp;in&nbsp;${videoPage.category}&nbsp;</h1>
            <cq:include path="latestModule" resourceType="foundation/components/iparsys"/>
            <cq:include path="contentPar1" resourceType="foundation/components/parsys"/>
        </div>
    </div>
</div>