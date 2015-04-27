<%@ include file="/apps/usga/global.jspx" %>

<c:set var="blockitems" value="${widgets:getMultiFieldPanelValues(resource, 'blockitems')}"/>

<c:forEach items="${blockitems}" var="blockitem">
    <div class="slide__content__item">
        <usga:link path="${blockitem['url']}" target="${blockitem['target']}" classes="video slide__content__item__media">

            <c:if test="${not empty blockitem['thumbnail']}">
                <div class="slide__content__item__media__inner">
                    <usga:data-img src="${blockitem['thumbnail']}"/>
                </div>
            </c:if>

        </usga:link>
        <usga:link path="${blockitem['url']}" target="${blockitem['target']}" classes="slide__content__item__title">
            <div class="va">${blockitem['text']}</div>
        </usga:link>
    </div>
</c:forEach>
