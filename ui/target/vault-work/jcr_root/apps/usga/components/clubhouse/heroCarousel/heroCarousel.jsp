<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div id="hero" class="hero loading ${properties.showWelcomeWidget eq 'true' ? "live" : ""}">
    <ul class="bxslider hero__slider">
        <cq:include script="iterateSlides.jsp"/>
    </ul>

    <div id="hero__pagination" class="slider-menu">
        <c:if test="${properties.slides > 0}">
            <c:forEach var="i" begin="0" end="${properties.slides - 1}" step="1" varStatus="loop">
                <div class="slider-menu__item">
                    <c:choose>
                        <c:when test="${loop.first && loop.last}">
                            <a data-slide-index="${i}" href="" class="slider-menu__item__link">
                                ${properties.navTitle}
                            </a>
                        </c:when>
                        <c:otherwise>
                            <a data-slide-index="${i}" href="" class="slider-menu__item__link">
                                ${properties.navTitle[i]}
                            </a>
                        </c:otherwise>
                    </c:choose>
                </div>
            </c:forEach>
        </c:if>
    </div>
</div>

<script>
    var hero = new usga.Hero('#hero', { 
        live: ${properties.showWelcomeWidget}
        <c:if test="${properties.autoRotation && not empty properties.rotationSpeed}">, delay: ${properties.rotationSpeed}</c:if>
    });
</script>

<c:if test="${properties.showWelcomeWidget}">
    <cq:include path="welcomeWidget" resourceType="/apps/usga/components/clubhouse/welcomeWidget"/>
</c:if>