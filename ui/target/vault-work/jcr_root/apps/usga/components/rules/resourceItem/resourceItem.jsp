<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>


<div class="resources__slider__element__container">
    <div class="resources__slider__element__container__title">
        <div class="resources__slider__element__container__title__inner">
            ${properties.titleLinkLabel}
        </div>
    </div>
    <div class="resources__slider__element__container__content">
        <c:if test="${properties.links > 0}">
            <c:forEach begin="0" end="${properties.links - 1}" step="1" var="title" varStatus="loop">
                <usga:set var="label" value="${properties.label}" loopIndex="${loop.index}"/>
                <usga:set var="destination" value="${properties.destination}" loopIndex="${loop.index}"/>
                <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>

                <div class="resources__slider__element__container__content__item">
                    <usga:link path="${destination}" target="${newWindow eq 'yes' ? '_blank' : '_self'}">
                        ${label}
                    </usga:link>
                </div>
            </c:forEach>
        </c:if>
    </div>
</div>

