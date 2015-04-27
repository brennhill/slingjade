<%@include file="/libs/foundation/global.jsp" %>

<div class="wrapper ${pageProperties.isNotOverlap ? '' : 'top-nav-overflow'}">
    <!-- content part-->
    <div class="content">
        <cq:include path="contentPar" resourceType="foundation/components/parsys"/>
        <div class="inner">
            <cq:include path="innerPar1" resourceType="foundation/components/parsys"/>
        </div>
        <cq:include path="contentPar2" resourceType="foundation/components/parsys"/>
        <div class="inner">
            <cq:include path="innerPar2" resourceType="foundation/components/parsys"/>
        </div>
    </div>
</div>

