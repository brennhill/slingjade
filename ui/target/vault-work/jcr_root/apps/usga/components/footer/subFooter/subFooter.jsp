<%@ include file="/apps/usga/global.jspx" %>

<c:set var="channels" value="${widgets:getMultiFieldPanelValues(resource, 'channels')}"/>

<ul class="footer__menu">
    <c:forEach items="${channels}" var="channel">

        <li class="footer__menu__item">
            <usga:link path="${channel['linkDestination']}"
                       classes="footer__menu__item__link"
                       target="${channel['newWindow']}" absolute="${JSONP}">
                ${channel['linkName']}
            </usga:link>
        </li>

    </c:forEach>
</ul>