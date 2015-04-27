<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="definition__item">
    <div class="definition__item__title">
        <div class="definition__item__title__container">
            <div class="definition__item__title__container__inner">${properties.sectionTitle}</div>
        </div>
        <%--<c:if test="${properties.showLogo}">
            <div class="definition__item__title__partner">
                <usga:link path="${properties.sponsorDest}" classes="definition__item__title__partner__inner"
                        target="${properties.newWindow eq 'yes' ? '_blank' : '_self'}">
                    <usga:data-img src="${properties.sponsorLogo}" alt=""/>
                </usga:link>
            </div>
        </c:if>--%>
    </div>
    <div class="definition__item__slider">
        <ul class="slider">
            <c:if test="${properties.slides > 0}">
                <c:forEach begin="0" end="${properties.slides - 1}" step="1" var="title" varStatus="loop">
                    <usga:set var="title" value="${properties.title}" loopIndex="${loop.index}"/>
                    <usga:set var="slideDescription" value="${properties.slideDescription}" loopIndex="${loop.index}"/>
                    <usga:set var="buttonLabel" value="${properties.buttonLabel}" loopIndex="${loop.index}"/>
                    <usga:set var="buttonDestination" value="${properties.buttonDestination}" loopIndex="${loop.index}"/>

                    <li>
                        <div class="definition__item__slider__container">
                            <c:if test="${not empty title}">
                                <p class="title">${title}</p>
                            </c:if>
                            <p>${slideDescription}</p>
                        </div>
                        <usga:link path="${buttonDestination}" classes="button button_color2">
                            ${buttonLabel}
                        </usga:link>
                    </li>
                </c:forEach>
            </c:if>
        </ul>
    </div>
</div>
