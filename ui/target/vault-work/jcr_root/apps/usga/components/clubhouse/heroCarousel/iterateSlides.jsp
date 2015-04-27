<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<c:if test="${properties.slides > 0}">
    <c:forEach var="index" begin="0" end="${properties.slides - 1}" step="1" varStatus="loop">
        <c:choose>
            <c:when test="${loop.first && loop.last}">
                <c:set var="slideType" value="${properties.slideType}"/>
                <c:set var="category" value="${properties.category}"/>
                <c:set var="slideDestination" value="${properties.slideDestination}"/>
                <c:set var="newWindow" value="${properties.newWindow}"/>
                <c:set var="title" value="${properties.title}"/>
                <c:set var="slideDescription" value="${properties.slideDescription}"/>
                <c:set var="background" value="${properties.background}"/>
                <c:set var="buttonLabel" value="${properties.buttonLabel}"/>
                <c:set var="buttonDestination" value="${properties.buttonDestination}"/>
                <c:set var="buttonCount" value="${properties.buttonCount}"/>
                <c:set var="secondButtonLabel" value="${properties.secondButtonLabel}"/>
                <c:set var="secondButtonDestination" value="${properties.secondButtonDestination}"/>
                <c:set var="showSmallScreenButtons" value="${properties.showSmallScreenButtons}"/>
            </c:when>
            <c:otherwise>
                <c:set var="slideType" value="${properties.slideType[index]}"/>
                <c:set var="category" value="${properties.category[index]}"/>
                <c:set var="slideDestination" value="${properties.slideDestination[index]}"/>
                <c:set var="newWindow" value="${properties.newWindow[index]}"/>
                <c:set var="title" value="${properties.title[index]}"/>
                <c:set var="slideDescription" value="${properties.slideDescription[index]}"/>
                <c:set var="background" value="${properties.background[index]}"/>
                <c:set var="buttonLabel" value="${properties.buttonLabel[index]}"/>
                <c:set var="buttonDestination" value="${properties.buttonDestination[index]}"/>
                <c:set var="buttonCount" value="${properties.buttonCount[index]}"/>
                <c:set var="secondButtonLabel" value="${properties.secondButtonLabel[index]}"/>
                <c:set var="secondButtonDestination" value="${properties.secondButtonDestination[index]}"/>
                <c:set var="showSmallScreenButtons" value="${properties.showSmallScreenButtons[index]}"/>
            </c:otherwise>
        </c:choose>

        <c:set var="protectedClass" value="${fn:containsIgnoreCase(slideDestination, '/protected') ? 'protected__link' : ''}"/>

        <li class="hero__slider__item hero__slider__item_bottom-align ${properties.showWelcomeWidget eq 'true' ? 'live' : ''}">
            <div class="hero__slider__item__bg">
                <div class="hero__slider__item__bg__inner">
                    <c:if test="${not empty background}">
                        <usga:data-img src="${background}"/>
                    </c:if>
                </div>
                <div class="gradient_l"></div>
            </div>
            <div class="outer">
                <div class="inner">
                    <div class="hero__slider__item__side"></div>
                    <div class="hero__slider__item__content">
                        <div class="hero__slider__item__content__inner">
                            <c:if test="${slideType eq 'video'}">
                                <usga:link path="${slideDestination}"
                                           target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                                           classes="hero__slider__item__content__video-icon ${protectedClass}"></usga:link>
                            </c:if>

                            <div class="hero__slider__item__content__category">
                                <div class="hero__slider__item__content__category__inner">${category}</div>
                            </div>
                            <div class="hero__slider__item__content__title">${title}</div>
                            <c:if test="${not empty slideDescription}">
                                <div class="hero__slider__item__content__description">${slideDescription}</div>
                            </c:if>
                            <c:if test="${not empty buttonLabel}">
                                <usga:link path="${slideDestination}"
                                           target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                                           classes="hero__slider__item__content__buttons ${'no' eq showSmallScreenButtons ? 'hidden-small' : ''} ${protectedClass}">
                                    <div class="button button_transparent">${buttonLabel}</div>
                                </usga:link>
                            </c:if>
                            <c:if test="${buttonCount eq 'two' && not empty secondButtonLabel}">
                                <c:set var="secondButtonProtectedClass" value="${fn:containsIgnoreCase(secondButtonDestination, '/protected') ? 'protected__link' : ''}"/>

                                <usga:link path="${secondButtonDestination}"
                                           target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                                           classes="hero__slider__item__content__buttons ${'no' eq showSmallScreenButtons ? 'hidden-small' : ''} ${secondButtonProtectedClass}">
                                    <div class="button button_transparent">${secondButtonLabel}</div>
                                </usga:link>
                            </c:if>
                        </div>
                    </div>
                </div>
                <usga:link path="${slideDestination}" target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                           classes="hero__slider__item__link ${protectedClass}">
                </usga:link>
            </div>
        </li>
    </c:forEach>
</c:if>
