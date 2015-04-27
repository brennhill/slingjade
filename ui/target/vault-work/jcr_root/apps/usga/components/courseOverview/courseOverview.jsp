<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<c:set var="champResourcePath" value="${properties.championshipPath}/jcr:content/event"/>
<c:set var="championshipResource" value="${sling:getResource(resourceResolver, champResourcePath)}"/>
<sling:adaptTo adaptable="${championshipResource}" adaptTo="com.usga.components.models.schedule.Event"
               var="championshipEvent"/>

<div class="box-inner">
    <h1 id="title21" class="title title_full">${properties.sectionTitle}
        <span class="title__under">${properties.sectionDescription}</span>
    </h1>

    <c:set var="slides" value="${widgets:getMultiFieldPanelValues(resource, 'slides')}"/>

    <div id="courseOverviewSlider" class="course-overview clearfix">
        <ul class="course-overview__slider">
            <c:forEach items="${slides}" var="slide">
                <li class="course-overview__slider__item">
                    <c:if test="${not empty slide['background']}">
                        <usga:data-img src="${slide['background']}" alt=""/>
                    </c:if>
                    <div class="course-overview__slider__item__content">
                        <c:choose>
                            <c:when test="${not empty championshipEvent}">
                                <c:if test="${not empty championshipEvent.logo}">
                                    <usga:data-img src="${championshipEvent.logo}" alt="" data-radius="max" data-crop="fit"/>
                                </c:if>
                                <div class="course-overview__slider__item__content__info">
                                    <div class="course-overview__slider__item__content__info__title">${championshipEvent.courseName}</div>
                                    <div class="course-overview__slider__item__content__info__description">
                                        ${properties.courseDescription}
                                    </div>
                                </div>
                            </c:when>
                            <c:otherwise>
                                <div class="course-overview__slider__item__content__info">
                                    <div class="course-overview__slider__item__content__info__title">INCORRECT CHAMPIONSHIP PATH</div>
                                </div>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </li>
            </c:forEach>
        </ul>
        <!-- more link-->
        <div class="more">
            <c:if test="${not empty properties.moreDest && not empty properties.moreText}">
                <usga:link path="${properties.moreDest}" target="${properties.moreTarget}" classes="more__link">
                    <span>MORE IN </span>${properties.moreText} <span>&raquo;</span>
                </usga:link>
            </c:if>
        </div>
    </div>
    <script>var courseOverview = new usga.CourseOverview('#courseOverviewSlider');</script>
    <!-- End Curse Overview-->
</div>