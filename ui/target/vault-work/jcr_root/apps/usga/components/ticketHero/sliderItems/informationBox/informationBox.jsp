<%@ include file="/apps/usga/global.jspx" %>

<div class="slide__title slide__title_thin">
    <div class="slide__title__inner">
        <span>${properties.sectionTitle}</span>
    </div>
</div>
<div class="slide-box">
    <ul class="slide-box__slider">
        <div class="slide__content__inner">
            <div class="slide-box__slider__item">
                <div class="slide__content">

                    <c:set var="contentboxes" value="${widgets:getMultiFieldPanelValues(resource, 'contentboxes')}"/>

                    <c:forEach items="${contentboxes}" var="contentbox">
                        <div class="slide__content__item">
                            <usga:link path="${contentbox['contentLink']}" target="${contentbox['linkTarget']}" classes="slide__content__item__media">

                                <c:if test="${not empty contentbox['image']}">
                                    <div class="slide__content__item__media__inner">
                                        <usga:data-img src="${contentbox['image']}"/>
                                    </div>
                                </c:if>

                            </usga:link>
                            <usga:link path="${contentbox['contentLink']}" target="${contentbox['linkTarget']}" classes="slide__content__item__title">
                                <div class="va">${contentbox['contentTitle']}</div>
                            </usga:link>
                        </div>
                    </c:forEach>

                </div>
            </div>
        </div>
    </ul>
</div>


