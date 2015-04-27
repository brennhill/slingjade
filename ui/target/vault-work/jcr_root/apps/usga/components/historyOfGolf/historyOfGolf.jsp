<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <div id="history" class="history">
        <div class="history__envelope hidden-small">

            <usga:link path="${properties.destinationFirst}" classes="history__item" target="${properties.newWindowFirst}">
                <div class="history__item__media">
                    <usga:data-img src="${properties.tileImageFirst}"/>
                </div>
                <div class="history__item__gradient"></div>
                <div class="history__item__above">${properties.tileCategoryFirst}</div>
                <div class="history__item__title">${properties.tileDescriptionFirst}</div>
            </usga:link>

            <div class="history__item history__item_mod1">
                <usga:link path="${properties.logoLink}" classes="history__item__above-title" target="${properties.logoLinkNewWindow}">
                    <usga:data-img src="${properties.logo}"/>
                </usga:link>

                <div class="history__item__under-test">${properties.eventTitle}</div>

                <usga:data-img src="${properties.eventLogo}" classes="history__item__img" data-radius="max"/>


                <div class="history__item__line"></div>
                <div class="history__item__date">${properties.eventDate}</div>

                <usga:link path="${properties.eventDestination}" classes="history__item__place" target="${properties.eventNewWindow}">
                    ${properties.eventName}
                </usga:link>

                <div class="history__item__line2"></div>

                <c:if test="${not empty properties.museumLinkDestination && not empty properties.museumLinkLabel}">
                    <usga:link path="${properties.museumLinkDestination}" classes="history__item__link" target="${properties.museumNewWindow}">
                        ${properties.museumLinkLabel} <span class="roque">&raquo;</span>
                    </usga:link>
                </c:if>
            </div>
            <usga:link path="${properties.destinationLast}" classes="history__item" target="${properties.newWindowLast}">
                <div class="history__item__media">
                    <usga:data-img src="${properties.tileImageLast}"/>
                </div>
                <div class="history__item__gradient"></div>
                <div class="history__item__above">${properties.tileCategoryLast}</div>
                <div class="history__item__title">${properties.tileDescriptionLast}</div>
            </usga:link>
        </div>

        <div class="box-redirect">
            <div class="box-redirect-small">
                <div class="box-redirect-small__envelope">
                    <div class="va">
                        <div class="box-redirect-small__text">
                            <usga:link path="${properties.logoLink}" target="${properties.logoLinkNewWindow}">
                                <usga:data-img src="${properties.logo}" classes="box-redirect-small__text__logo"/>
                            </usga:link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>var store = new usga.History('#history');</script>
</div>