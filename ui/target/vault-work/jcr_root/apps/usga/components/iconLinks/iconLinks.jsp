<%@ include file="/apps/usga/global.jspx" %>

<div class="live-events__bottom">
    <usga:link path="${properties.link1}" classes="live-events__bottom__item">
        <div class="media">
            <c:if test="${not empty properties.icon1}">
                <usga:data-img src="${properties.icon1}" alt="${properties.text1}"/>
            </c:if>
        </div>
        <c:out value="${properties.text1}"/>
    </usga:link>

    <usga:link path="${properties.link2}" classes="live-events__bottom__item">
        <div class="media">
            <c:if test="${not empty properties.icon2}">
                <usga:data-img src="${properties.icon2}" alt="${properties.text2}"/>
            </c:if>
        </div>
        <c:out value="${properties.text2}"/>
    </usga:link>

    <usga:link path="${properties.link3}" classes="live-events__bottom__item">
        <div class="media">
            <c:if test="${not empty properties.icon3}">
                <usga:data-img src="${properties.icon3}" alt="${properties.text3}"/>
            </c:if>
        </div>
        <c:out value="${properties.text3}"/>
    </usga:link>
</div>