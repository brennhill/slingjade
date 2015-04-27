<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.heroCarousel.HeroCarousel" var="hero"/>

<c:forEach items="${hero.slidesList}" var="slide" varStatus="status">
        <c:set var="liveClass" value="${not empty slide.championshipPath ? 'live' : ''}"/>

        <li class="hero__slider__item ${liveClass}">
            <div class="hero__slider__item__bg">
                <c:if test="${not empty slide.background}">
                    <div class="hero__slider__item__bg__inner">
                        <usga:data-img src="${slide.background}"/>
                    </div>
                </c:if>

                <div class="gradient_l"></div>
            </div>
            <div class="outer">
                <div class="inner">
                    <c:if test="${not empty slide.championshipPath}">
                        <div class="hero__slider__item__side">
                            <div class="live-events">
                                <cq:include path="live-events_${status.count}" resourceType="foundation/components/parsys"/>
                            </div>
                        </div>
                    </c:if>
                    <c:choose>
                        <c:when test="${slide.slideType eq 'video'}">
                            <div class="hero__slider__item__content">
                                <div class="hero__slider__item__content__inner">
                                    <div class="hero__slider__item__content__video-icon"></div>
                                    <div class="hero__slider__item__content__category">
                                        <div class="hero__slider__item__content__category__inner">${slide.category}</div>
                                    </div>
                                    <div class="hero__slider__item__content__title">${slide.title}</div>
                                    <div class="hero__slider__item__content__description">${slide.slideDescription}</div>
                                </div>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <div class="hero__slider__item__content">
                                <div class="hero__slider__item__content__inner">
                                    <c:if test="${not empty slide.sponsorTitle && not empty slide.sponsorIcon}">
                                        <div class="hero__slider__item__content__partner">${slide.sponsorTitle}
                                            <usga:data-img src="${slide.sponsorIcon}" dataCrop="fit"/>
                                        </div>
                                    </c:if>

                                    <div class="hero__slider__item__content__category">
                                        <div class="hero__slider__item__content__category__inner">${slide.category}</div>
                                    </div>
                                    <div class="hero__slider__item__content__title">${slide.title}</div>
                                    <div class="hero__slider__item__content__description">${slide.slideDescription}</div>

                                    <div class="hero__slider__item__content__buttons">
                                        <c:set var="buttonProtectedClass" value="${fn:containsIgnoreCase(slide.buttonDestination, '/protected') ? 'protected__link' : ''}"/>

                                        <usga:link path="${slide.buttonDestination}" classes="${buttonProtectedClass}">
                                            <div class="button button_transparent">${slide.buttonLabel}</div>
                                        </usga:link>
                                        <c:if test="${slide.buttonCount eq 'two'}">
                                            <c:set var="secondButtonProtectedClass"
                                                   value="${fn:containsIgnoreCase(slide.secondButtonDestination, '/protected') ? 'protected__link' : ''}"/>

                                            <usga:link path="${slide.secondButtonDestination}" classes="${secondButtonProtectedClass}">
                                                <div class="button button_transparent">${slide.secondButtonLabel}</div>
                                            </usga:link>
                                        </c:if>
                                    </div>
                                </div>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </div>

                <c:set var="protectedClass" value="${fn:containsIgnoreCase(slide.slideDestination, '/protected') ? 'protected__link' : ''}"/>
                <usga:link path="${slide.slideDestination}" target="${slide.newWindow}" classes="hero__slider__item__link ${protectedClass}"/>
            </div>
        </li>
</c:forEach>