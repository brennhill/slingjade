<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" trimDirectiveWhitespaces="true" %>


<div class="sub-main-menu">
    <ul class="sub-main-menu__inner">
        <c:forEach items="${properties.linkLabel}" var="linkLabel" varStatus="loop">
            <c:set var="data" value="" />

            <usga:set var="linkURL" value="${properties.linkURL}" loopIndex="${loop.index}"/>
            <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>
            <usga:set var="subMenu" value="${properties.subMenu}" loopIndex="${loop.index}"/>
            <usga:set var="membershipType" value="${properties.membershipType}" loopIndex="${loop.index}"/>
            <c:if test="${not empty membershipType}">
                <usga:set var="data" value="data-role='${membershipType}'" />
            </c:if>

            <c:set var="currentPagePath" value="<%=currentPage.getPath()%>"/>
            <li class="sub-main-menu__item ${fn:contains(currentPagePath, linkURL) ? 'active-page-item-submenu sub-main-menu__item_active' : ''} ${subMenu eq 'yes' ? ' sub-main-menu__item_sub' : ''}">
                <usga:link path="${linkURL}" target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                           classes="sub-main-menu__item__link" data="${data}" absolute="${JSONP}">
                    ${linkLabel}
                </usga:link>
                <c:if test="${subMenu eq 'yes' }">
                    <cq:include path="thirdLvlNav_${loop.index}"
                        resourceType="/apps/usga/components/navigation/thirdLevelNavigation"/>
                </c:if>
            </li>
        </c:forEach>
    </ul>
</div>
