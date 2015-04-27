<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.livechampionssummary.LiveChampSummaryItems"
               var="liveChampSummaryItems"/>

<wcmmode:edit>
    <style> .slider-menu_light {
        margin: 50px 29px 31px;
    } </style>
</wcmmode:edit>

<c:set var="contenttypes" value="${widgets:getMultiFieldPanelValues(resource, 'contenttypes')}"/>

<ul class="slider-menu slider-menu_light">

    <c:forEach items="${contenttypes}" var="contenttype" varStatus="status">
        <c:if test="${contenttype['hideCurrentTab'] != 'yes'}">
            <li class="slider-menu__item">
                <a href="#"
                   data-toggle-class="tab-${contenttype['contentType']}"
                   class="slider-menu__item__link ${status.first ? 'active' : ''}">
                   ${contenttype['contentType']}
                </a>
            </li>
        </c:if>
    </c:forEach>

</ul>

<div class="slide__content slide__content_light tab-content">

    <c:forEach items="${contenttypes}" var="contenttype" varStatus="status">
        <c:if test="${contenttype['hideCurrentTab'] != 'yes'}">
            <div class="slide__content__inner tab-pane tab-${contenttype['contentType']}${status.first ? ' active' : ''}">
                <cq:include path="${contenttype['contentType']}${status.index}"
                            resourceType="usga/components/liveChampionshipSummary/sliderItems/latestChampionshipSummaryBox/contentBoxItems"/>
            </div>
        </c:if>
    </c:forEach>

</div>