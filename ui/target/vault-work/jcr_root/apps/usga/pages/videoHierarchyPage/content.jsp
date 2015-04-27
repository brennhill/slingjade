<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.video.VideoPage" var="videoPage"/>

<div class="wrapper">
    <!-- content part-->
    <div class="content">
        <div class="inner">
            <cq:include path="latestModule" resourceType="foundation/components/iparsys"/>
        </div>
    </div>
</div>