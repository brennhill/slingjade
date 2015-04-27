<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="footer__list__item__title">${properties.sectionTitle}</div>
<div class="row">
    <c:forEach var="partnerName" items="${properties.partnerName}" varStatus="loop">
        <usga:set var="partnerLinkDestination" value="${properties.partnerLinkDestination}" loopIndex="${loop.index}"/>
        <usga:set var="partnerImage" value="${properties.partnerImage}" loopIndex="${loop.index}"/>
        <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>
        <usga:set var="content" value="${properties.content}" loopIndex="${loop.index}"/>

        <div class="footer__list__item__item">
            <a class="footer__list__item__item__link" data-partner-modal="partnerModal_${loop.index}" data-analytics-partner="${partnerName}">

                <c:if test="${not empty partnerImage}">
                    <span class="footer__list__item__item__link__img">
                        <usga:data-img src="${partnerImage}" alt="" absolute="true" data-crop="pad"/>
                    </span>
                </c:if>


                <span class="footer__list__item__item__link__text">${partnerName}</span>
            </a>
            <div class="modal modal_partner footer__partner__modal" data-partner="partnerModal_${loop.index}" style="display:none;">
                <div class="modal__body">
                    <div class="modal__body__close"></div>
                    <div class="modal__body__header">${partnerName}</div>
                    <div class="modal__body__content">
                        ${content}
                    </div>
                    <%--Removed in https://jira.omnigon.com/browse/USGAII-2656--%>
                    <%--<div class="modal__body__footer">--%>
                        <%--<usga:link path="${partnerLinkDestination}" classes="footer__list__item__item__link"--%>
                                   <%--target="${newWindow eq 'yes' ? '_blank' : '_self'}" absolute="true">--%>
                            <%--<c:if test="${not empty partnerImage}">--%>
                                <%--<usga:data-img src="${partnerImage}" alt="" absolute="true" data-crop="pad" classes="modal__body__footer__partner"/>--%>
                            <%--</c:if>--%>
                        <%--</usga:link>--%>
                    <%--</div>--%>
                </div>
            </div>
        </div>
    </c:forEach>
</div>

<script>
    var partnerModal = new usga.PartnerModal(".footer__partner__modal");
</script>
