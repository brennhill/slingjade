<%@page session="false" trimDirectiveWhitespaces="true" %>
<%-- Creates analytics code across all pages --%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/apps/usga/global.jspx" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.analytics.Analytics" var="analytics"/>
<script type="text/javascript">
    var digitalData = (typeof digitalData !== 'undefined') ? digitalData : {};
    //Page level analytics.
    digitalData.page = {
        "pageInfo": {
            "pageName": "${analytics.title}"
        },
        "category": {
            "primaryCategory": "${analytics.primaryTags}",
            "secondaryCategory": "${analytics.secondaryTags}",
            "pageType": "${analytics.pageType}"
        }
    };

    <c:if test="${not empty analytics.championshipName}">
        digitalData.page.attributes = {
            "championshipname" : "${analytics.championshipName}"
        };
    </c:if>

    _satellite.track("page-view");
</script>