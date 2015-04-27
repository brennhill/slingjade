<%@ include file="/apps/usga/global.jspx" %>

<c:set var="sliders" value="${widgets:getMultiFieldPanelValues(resource, 'sliders')}"/>
    <!-- main slider-->
<div id="ticketSlider" class="box-main_slider box-main_slider_ticket">
    <ul class="main_slider main_slider_ticket">
        <c:forEach items="${sliders}" var="slider" varStatus="sliderStatus">
            <li class="main_slider__item">
                <div class="main_slider__item__bg">

                    <c:if test="${not empty slider['background']}">
                        <div class="main_slider__item__bg__inner">
                            <usga:data-img src="${slider['background']}"/>
                            <div class="gradient_blur"></div>
                        </div>
                    </c:if>

                    <div class="main_slider__item__bg__gradient"></div>
                </div>
                <div class="main_slider__item__box">
                    <div class="main_slider__item__box__title">
                        <c:if test="${not empty slider['logo']}">

                            <c:choose>
                                <c:when test="${'yes' == slider['roundedLogo']}">

                                    <c:set var="logoSrc" value="${slider['logo']}"/>
                                    <c:if test="${fn:contains(logoSrc, '.jpeg')}">
                                        <c:set var="logoSrc" value="${fn:replace(logoSrc, '.jpeg', '.jpg')}" />
                                    </c:if>

                                    <c:choose>
                                        <c:when test="${fn:contains(logoSrc, '.jpg')}">
                                            <usga:data-img src="${logoSrc}" classes="main_slider__item__box__title__img" data-radius="max" data-format="png"/>
                                        </c:when>
                                        <c:otherwise>
                                            <usga:data-img src="${logoSrc}" classes="main_slider__item__box__title__img" data-radius="max"/>
                                        </c:otherwise>
                                    </c:choose>

                                </c:when>
                                <c:otherwise>
                                    <usga:data-img src="${slider['logo']}" classes="main_slider__item__box__title__img"/>
                                </c:otherwise>
                            </c:choose>

                        </c:if>
                        ${slider['title']}
                    </div>

                    <div class="main_slider__item__box__text">
                        ${slider['location']}<br/>
                        <strong>${slider['date']}</strong>
                    </div>

                    <div class="slides">
                        <c:forEach begin="0" end="2" varStatus="currentStatus">
                            <div class="slides__item ${currentStatus.first ? 'slides__item_show' : ''}">
                                <c:set var="counter" value="sliderType${currentStatus.count}"/>
                                <cq:include path="${slider[counter]}${sliderStatus.index}${currentStatus.count}"
                                            resourceType="usga/components/ticketHero/sliderItems/${slider[counter]}"/>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </li>
        </c:forEach>
    </ul>

    <div id="slider-menu_ticket" class="slider-menu">
        <c:forEach items="${sliders}" var="slider" varStatus="status">
            <div class="slider-menu__item">
                <a data-slide-index="${status.index}" href="" class="slider-menu__item__link">
                    ${slider['year']}
                </a>
            </div>
        </c:forEach>
    </div>
    <div class="slick-nav">
        <div class="slick-nav__inner"></div>
    </div>
</div>

<script>var ticketSlider = new usga.TicketSlider('#ticketSlider');</script>
<!-- end of main slider-->