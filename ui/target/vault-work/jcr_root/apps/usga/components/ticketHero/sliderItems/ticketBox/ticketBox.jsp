<%@ include file="/apps/usga/global.jspx" %>

<div class="slide__title slide__title_thin">
    <div class="slide__title__inner">
        <span>${properties.sectionTitle}</span>
    </div>
</div>
<div class="slide__media">

    <c:if test="${not empty properties.media}">
        <usga:link path="${properties.link}" target="${properties.linkTarget}">

            <c:if test="${not empty properties.media}">
                <usga:data-img src="${properties.media}"/>
            </c:if>

            <c:if test="${properties.isVideoContent == 'on'}">
                <div class="video">
                    <div class="icon"></div>
                </div>
            </c:if>
        </usga:link>
    </c:if>

</div>

<c:set var="textlinks" value="${widgets:getMultiFieldPanelValues(resource, 'textlinks')}"/>

<c:set var="textClass" value="single"/>
<c:forEach items="${textlinks}" var="textlink" varStatus="status">
    <c:set var="textClass" value="${status.count > 1 ? '' : 'single'}"/>
</c:forEach>

<div class="slide__list ${textClass}">

    <c:forEach items="${textlinks}" var="textlink">
        <div class="slide__list__item">

            <c:choose>
                <c:when test="${not empty textlink['linkUrl']}">
                    <usga:link path="${textlink['linkUrl']}" target="${textlink['linkTarget']}">
                        ${textlink['linkText']}
                    </usga:link>
                </c:when>
                <c:otherwise>
                    <span>${textlink['linkText']}</span>
                </c:otherwise>
            </c:choose>

        </div>
    </c:forEach>

</div>
<div class="slide__but-box">

    <c:set var="ctalinks" value="${widgets:getMultiFieldPanelValues(resource, 'ctalinks')}"/>

    <c:set var="ctaClass" value="single"/>
    <c:forEach items="${ctalinks}" var="textlink" varStatus="status">
        <c:set var="ctaClass" value="${status.count > 1 ? '' : 'single'}"/>
    </c:forEach>

    <c:forEach items="${ctalinks}" var="ctalink" varStatus="status">

        <c:if test="${ctaClass ne 'single'}">
            <c:set var="ctaClass" value="${status.index == 0 ? 'left' : 'right'}"/>
        </c:if>

        <usga:link path="${ctalink['ctaUrl']}" target="${ctalink['ctaTarget']}"
                   classes="button button_color1 ${ctaClass}">
            ${ctalink['ctaText']}
        </usga:link>

    </c:forEach>

</div>

