<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.heroCarousel.HeroCarousel" var="hero"/>

<div id="hero" class="hero loading">
    <ul class="bxslider hero__slider">
        <cq:include script="iterateSlides.jsp"/>
    </ul>

    <div id="hero__pagination" class="slider-menu">
        <c:forEach items="${hero.slidesList}" var="slide" varStatus="status">
            <c:set var="pagerLiveClass" value="${not empty slide.championshipPath ? 'pager-link-live' : ''}"/>
            <div class="slider-menu__item ${pagerLiveClass}">
                <a data-slide-index="${status.index}" href="" class="slider-menu__item__link">${slide.navTitle}</a>
            </div>
        </c:forEach>
    </div>
</div>

<script>
    var hero = new usga.Hero('#hero', {
        <c:if test="${requestScope['com.day.cq.wcm.api.WCMMode']!='EDIT' && requestScope['com.day.cq.wcm.api.WCMMode']!='DESIGN'}">
        tickerStartDates: [${hero.startDates}],
        tickerEndDates: [${hero.endDates}],</c:if>
        live: ${not empty hero.showWelcomeWidget ? hero.showWelcomeWidget : 'false'}
        <c:if test="${hero.autoRotation && not empty hero.rotationSpeed}">, delay: ${hero.rotationSpeed}</c:if>
    });
</script>
