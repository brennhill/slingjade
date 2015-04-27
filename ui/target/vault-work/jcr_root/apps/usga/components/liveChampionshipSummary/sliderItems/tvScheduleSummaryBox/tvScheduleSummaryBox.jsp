<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.tvschedulesummarybox.TvScheduleSummaryBox"
               var="tvScheduleSummaryBox"/>

<div class="slide__content slide__content_light">
    <div class="slide__content__title">${tvScheduleSummaryBox.title}</div>
    <div class="slide__content__list slide__content__list_schedule">

        <c:set var="rows" value="${widgets:getMultiFieldPanelValues(resource, 'rows')}"/>

        <c:forEach items="${rows}" var="row">
            <div class="slide__content__list__item">
                <div class="slide__content__list__item__media">

                    <c:if test="${not empty row['logo']}">
                        <div class="va">
                            <usga:data-img src="${row['logo']}" data-crop="fit"/>
                        </div>
                    </c:if>

                </div>
                <div class="slide__content__list__item__content">
                    <div class="va">${row['date']} <span>${row['timeRange']}</span></div>
                </div>
            </div>
        </c:forEach>

    </div>
</div>