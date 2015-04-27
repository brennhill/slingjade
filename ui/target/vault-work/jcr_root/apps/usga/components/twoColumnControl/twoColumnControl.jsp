<%@ include file="/apps/usga/global.jspx" %>

<div class="${properties.isNotLatest ? 'article-frame clearfix' : 'frame'}">
    <div class="${properties.isNotLatest ? 'article-frame__left' : 'frame__left'}" <wcmmode:edit>style="width: 900px;"</wcmmode:edit>>
        <cq:include path="leftColumn" resourceType="foundation/components/parsys"/>
    </div>
    <div class="${properties.isNotLatest ? 'article-frame__right' : 'frame__right'}" <wcmmode:edit>style="width: 270px;"</wcmmode:edit>>
        <cq:include path="rightColumn" resourceType="foundation/components/parsys"/>
    </div>
</div>