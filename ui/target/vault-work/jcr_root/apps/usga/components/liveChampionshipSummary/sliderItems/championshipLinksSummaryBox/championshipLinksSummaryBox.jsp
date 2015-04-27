<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.championshiplinkssummarybox.ChampionshipLinksSummaryBox"
               var="champLinksSummBox"/>

<div class="slide__head">
    <div class="slide__head__media">
        <div class="va">
            <c:if test="${not empty champLinksSummBox.logo}">
                <usga:data-img src="${champLinksSummBox.logo}"/>
            </c:if>
        </div>
    </div>
    <div class="slide__head__discription">
        <div class="slide__head__discription__title">${champLinksSummBox.title}</div>
        <div class="slide__head__discription__date">${champLinksSummBox.date}</div>
        <div class="slide__head__discription__text">${champLinksSummBox.description}</div>
        <div class="slide__head__discription__state">${champLinksSummBox.location}</div>
    </div>
</div>
<div class="slide__roster">

    <c:set var="textlinks" value="${widgets:getMultiFieldPanelValues(resource, 'textlinks')}"/>

    <c:forEach items="${textlinks}" var="textlink">
        <usga:link path="${textlink['linkUrl']}" target="${textlink['linkTarget']}" classes="slide__roster__item">
            ${textlink['linkText']}
        </usga:link>
    </c:forEach>
</div>

<c:set var="ctalinks" value="${widgets:getMultiFieldPanelValues(resource, 'ctalinks')}"/>

<c:forEach items="${ctalinks}" var="ctalink">
    <usga:link path="${ctalink['ctaUrl']}" target="${ctalink['ctaTarget']}" classes="button button_color1 alone">
        ${ctalink['ctaText']}
    </usga:link>
</c:forEach>