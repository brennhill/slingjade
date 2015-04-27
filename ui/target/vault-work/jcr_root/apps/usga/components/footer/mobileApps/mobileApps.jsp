<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="footer__list__item__title">
    ${properties.sectionTitle}
</div>
<div class="row">
    <c:forEach var="appTitle" items="${properties.appTitle}" varStatus="loop">
        <usga:set var="appDescription" value="${properties.appDescription}" loopIndex="${loop.index}"/>
        <usga:set var="appLinkDestination" value="${properties.appLinkDestination}" loopIndex="${loop.index}"/>
        <usga:set var="appImage" value="${properties.appImage}" loopIndex="${loop.index}"/>
        <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>
        <usga:set var="iosLinkDestination" value="${properties.iosLinkDestination}" loopIndex="${loop.index}"/>
        <usga:set var="androidLinkDestination" value="${properties.androidLinkDestination}" loopIndex="${loop.index}"/>

        <c:set var="data" value="data-href-android='${androidLinkDestination}' data-href-ios='${iosLinkDestination}'"/>

        <div class="footer__list__item__item">
            <div class="footer__list__item__item__link">

                <usga:link path="${appLinkDestination}" classes="footer__list__item__item__link__img" data="${data}"
                           target="${newWindow eq 'yes' ? '_blank' : '_self'}" absolute="true">
                    <c:if test="${not empty appImage}">
                        <usga:data-img src="${appImage}" alt="" absolute="true"/>
                    </c:if>
                </usga:link>

                <div class="footer__list__item__item__link__apps">
                    <div class="footer__list__item__item__link__apps__title">${appTitle}</div>
                    <div class="footer__list__item__item__link__apps__text">
                        ${appDescription}

                        <c:if test="${not empty androidLinkDestination || not empty iosLinkDestination}">
                            App for

                            <c:if test="${not empty iosLinkDestination}">
                                <a href="${iosLinkDestination}">iOS</a>
                            </c:if>

                            ${not empty androidLinkDestination && not empty iosLinkDestination ? ' and ' : ''}

                            <c:if test="${not empty androidLinkDestination}">
                                <a href="${androidLinkDestination}">Andriod</a>
                            </c:if>
                        </c:if>
                    </div>
                </div>
            </div>
        </div>
    </c:forEach>
    <div class="footer__list__item__item footer__list__item__item_common">
        <usga:link path="${properties.commonLinkDestination}" classes="footer__list__item__item__link"  absolute="${JSONP}">
            ${properties.commonText}
        </usga:link>
    </div>
</div>