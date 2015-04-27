<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.title.Title" var="generalTitle"/>

<c:if test="${not empty generalTitle.title}">

    <c:set var="MODULE_ID"><usga:unique-id varName="MODULE_ID"/></c:set>

    <c:choose>
        <c:when test="${not empty generalTitle.sponsorIcon}">
            <h1 id="usgaTitle_${MODULE_ID}" class="title title_with-partner <c:if
                test="${generalTitle.hideUnderline != 'true'}">title_underline</c:if>">
                      <span class="title__partner">
                        IN PARTNERSHIP WITH
                         <usga:link path="${generalTitle.sponsorLink}" classes="title__partner__link">
                             <usga:data-img src="${generalTitle.sponsorIcon}" classes="title__partner__logo"/>
                         </usga:link>
                    </span>
        </c:when>
        <c:otherwise>
            <h1 id="usgaTitle_${MODULE_ID}" class="title <c:if
                test="${generalTitle.hideUnderline != 'true'}">title_underline</c:if>">
        </c:otherwise>
    </c:choose>
    ${generalTitle.title}
    <c:if test="${not empty generalTitle.titleUnder}">
        <span class="title__under">${generalTitle.titleUnder}</span>
    </c:if>
    </h1>

    <c:if test="${not empty generalTitle.sponsorIcon}">
        <script>new usga.BaseCloudinaryModule('#usgaTitle_${MODULE_ID}');</script>
    </c:if>

</c:if>
