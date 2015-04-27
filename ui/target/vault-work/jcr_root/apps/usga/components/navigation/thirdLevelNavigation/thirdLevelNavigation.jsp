<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" trimDirectiveWhitespaces="true" %>

<ul class="sub-main-menu__item__submenu">
    <c:forEach items="${properties.linkLabel}" var="linkLabel" varStatus="loop">
        <c:set var="data" value="" />

        <usga:set var="linkURL" value="${properties.linkURL}" loopIndex="${loop.index}"/>
        <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>
        <usga:set var="membershipType" value="${properties.membershipType}" loopIndex="${loop.index}"/>
        <c:if test="${not empty membershipType}">
            <usga:set var="data" value="data-role='${membershipType}'" />
        </c:if>

        <c:set var="currentPage" value="<%=currentPage.getPath()%>"/>
        <li class="sub-main-menu__item__submenu__item ${fn:contains(currentPage, linkURL) ? ' sub-main-menu__item_active active active-page-item' : ''}">
            <usga:link path="${linkURL}" target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                       classes="sub-main-menu__item__submenu__item__link" absolute="${JSONP}"
                       data="${data}">
                ${linkLabel}
            </usga:link>
        </li>
    </c:forEach>
</ul>

