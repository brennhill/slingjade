<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <div id="joinSlider" class="box-main_slider box-main_slider_join">
        <ul class="bxslider main_slider main_slider_join">
            <c:forEach items="${properties.title}" var="title" varStatus="loop">
                <usga:set var="logo" value="${properties.logo}" loopIndex="${loop.index}"/>
                <usga:set var="slideDescription" value="${properties.slideDescription}" loopIndex="${loop.index}"/>
                <usga:set var="buttonLabel" value="${properties.buttonLabel}" loopIndex="${loop.index}"/>
                <usga:set var="buttonDestination" value="${properties.buttonDestination}" loopIndex="${loop.index}"/>
                <usga:set var="background" value="${properties.background}" loopIndex="${loop.index}"/>

                <li class="main_slider__item">
                    <div class="main_slider__item__bg">

                        <c:if test="${not empty background}">
                            <div class="main_slider__item__bg__inner">
                                <usga:data-img src="${background}"/>
                            </div>
                        </c:if>

                        <div class="main_slider__item__bg__gradient"></div>
                    </div>
                    <div class="main_slider__item__box main_slider__item__box_mod1">

                        <c:if test="${not empty logo}">
                            <usga:data-img src="${logo}" alt="" classes="main_slider__item__box__img"/>
                        </c:if>

                        <div class="main_slider__item__box__title2">${title}</div>
                        <div class="main_slider__item__box__text">
                            ${slideDescription}
                        </div>
                        <div class="main_slider__item__box__but-box">
                            <usga:link path="${buttonDestination}" classes="button button_color1">
                                ${buttonLabel}
                            </usga:link>
                        </div>
                    </div>
                </li>

            </c:forEach>
        </ul>
        <div id="slider-menu_join" class="slider-menu">
            <c:if test="${properties.slides > 0}">
                <c:forEach var="i" begin="0" end="${properties.slides - 1}" step="1" varStatus="loop">
                    <div class="slider-menu__item">
                        <c:choose>
                            <c:when test="${loop.first && loop.last}">
                                <a data-slide-index="${i}" href=""
                                   class="slider-menu__item__link">${properties.navTitle}</a>
                            </c:when>
                            <c:otherwise>
                                <a data-slide-index="${i}" href=""
                                   class="slider-menu__item__link">${properties.navTitle[i]}</a>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </c:forEach>
            </c:if>
        </div>
    </div>
</div>

<c:choose>
    <c:when test="${properties.autoRotation && not empty properties.rotationSpeed}">
        <script>
            var joinSlider = new usga.JoinSlider('#joinSlider', {delay: ${properties.rotationSpeed}});
        </script>
    </c:when>
    <c:otherwise>
        <script>
            var joinSlider = new usga.JoinSlider('#joinSlider');
        </script>
    </c:otherwise>
</c:choose>
