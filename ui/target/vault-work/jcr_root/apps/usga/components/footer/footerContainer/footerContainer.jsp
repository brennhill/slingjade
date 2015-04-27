<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <div class="footer__list table__row">
        <div class="footer__list__item table__row__cell footer__list__item_partners">
            <cq:include path="partners" resourceType="/apps/usga/components/footer/sponsorPartners"/>
        </div>
        <div class="footer__list__item table__row__cell">
            <cq:include path="socialChannels" resourceType="/apps/usga/components/footer/socialChannels"/>
        </div>
        <div class="footer__list__item footer__list__item_gmod1 table__row__cell">
            <cq:include path="mobileApps" resourceType="/apps/usga/components/footer/mobileApps"/>
        </div>
    </div>
    <cq:include path="subFooter" resourceType="/apps/usga/components/footer/subFooter"/>

    <cq:include path="subFooterPar" resourceType="foundation/components/parsys"/>

    <cq:include path="copyrightComponent" resourceType="/apps/usga/components/footer/copyright"/>
</div>

<script>
    var footer = new usga.Footer('#footer');
</script>
