<%@include file="/libs/foundation/global.jsp" %>

<div class="wrapper">
    <!-- content part-->
    <div class="content" <c:if test="${isEditMode}"> style="padding-top:150px"</c:if>>
        <cq:include path="contentPar" resourceType="usga/components/administration/eventAdmin"/>
    </div>
</div>

