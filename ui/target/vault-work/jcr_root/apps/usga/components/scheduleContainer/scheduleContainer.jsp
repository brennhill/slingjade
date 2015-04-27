<%@ include file="/apps/usga/global.jspx" %>

<c:set var="isScheduleContainer" value="true" scope="request"/>

<div class="inner">
    <h1 id="title27" class="title title_mod1 title_full ${!properties.noSponsor ? 'title_with-partner' : ''}">

        <c:if test="${!properties.noSponsor}">
            <span class="title__partner">
                ${properties.sponsorText}
                 <usga:link path="${properties.logolink}" classes="title__partner__link" target="${properties.logoLinkTarget}">
                     <usga:data-img src="${properties.sponsorLogo}" classes="title__partner__logo" />
                 </usga:link>
            </span>
        </c:if>

        ${properties.sectionTitle}
        <span class="title__under">${properties.sectionDescription}</span>
    </h1>

    <script>new usga.BaseCloudinaryModule('#title27');</script>
</div>

<cq:include path="scheduleTable" resourceType="usga/components/scheduleTable"/>