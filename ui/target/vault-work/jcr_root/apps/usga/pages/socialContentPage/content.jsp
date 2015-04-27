<%@include file="/libs/foundation/global.jsp" %>

<div class="wrapper ${pageProperties.isNotOverlap ? '' : 'top-nav-overflow'}">
    <div class="content">
		<cq:include path="socialAdmin" resourceType="usga/components/administration/socialAdmin"/>
		
        <cq:include path="contentPar" resourceType="foundation/components/parsys"/>        
    </div>
</div>

