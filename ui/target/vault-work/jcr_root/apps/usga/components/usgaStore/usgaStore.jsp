<%@ include file="/apps/usga/global.jspx" %>

<h1 id="title28" class="title module-store hidden-small">
    ${properties.sectionTitle}
    <span class="title__under">${properties.sectionDescription}</span>
</h1>

<div id="store" class="simple-list underline hidden-small store">
    <c:forEach var="productTitle" items="${properties.productTitle}" varStatus="loop">
        <usga:set var="productImage" value="${properties.productImage}" loopIndex="${loop.index}"/>
        <usga:set var="categoryDestination" value="${properties.categoryDestination}" loopIndex="${loop.index}"/>
        <usga:set var="categoryNewWindow" value="${properties.categoryNewWindow}" loopIndex="${loop.index}"/>
        <usga:set var="linkDestination" value="${properties.linkDestination}" loopIndex="${loop.index}" />
        <usga:set var="linkTitle" value="${properties.linkTitle}" loopIndex="${loop.index}"/>
        <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>

        <usga:link path="${categoryDestination}" classes="simple-list__item"
                   target="${categoryNewWindow eq 'yes' ? '_blank' : '_self'}" linkChecker="skip">

            <c:if test="${not empty productImage}">
                <usga:data-img src="${productImage}" alt="" classes="simple-list__item__img" data-radius="max"
                               data-border="4px_solid_rgb:fff" data-format="png"/>
            </c:if>

            <div class="simple-list__item__title">${productTitle}</div>
            <div class="simple-list__item__more">${linkTitle}</div>
        </usga:link>
    </c:forEach>
</div>

<div class="box-redirect box-redirect_underline">
    <div class="box-redirect-small">
        <div class="box-redirect-small__envelope">
            <div class="va">
                <div class="box-redirect-small__text">${properties.sectionTitle}</div>

                <c:if test="${not empty properties.smallScreenLinkDest && not empty properties.smallScreenText}">
                    <usga:link path="${properties.smallScreenLinkDest}" classes="box-redirect-small__link">
                        ${properties.smallScreenText} <span class="raquo">&raquo;</span>
                    </usga:link>
                </c:if>
            </div>
        </div>
    </div>
</div>

<script>var store = new usga.Store('#store');</script>