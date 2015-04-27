<%@ include file="/apps/usga/global.jspx" %>

<c:set var="isPhotoDetailPage" value="true" scope="request"/>

<div class="wrapper">
    <!-- content part-->
    <div class="content">
        <div id="PhotoDetails" class="photo-details">
            <div class="inner">
                <ul class="breadcrumbs">
                </ul>
                <cq:include path="photoDetails" resourceType="usga/components/photoDetails"/>
            </div>
        </div>
        <script>var photoDetails = new usga.BaseCloudinaryModule('#PhotoDetails');</script>
        <div class="inner">
            <cq:include path="innerIPar1" resourceType="foundation/components/iparsys"/>

            <cq:include path="contentPar1" resourceType="foundation/components/parsys"/>
        </div>
    </div>
</div>