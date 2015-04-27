<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<div class="wrapper">
    <!-- content part-->
    <div class="content" <c:if test="${isEditMode}"> style="padding-top:150px"</c:if>>
        <cq:include path="rulesQuiz" resourceType="usga/components/administration/rulesQuizAdmin/rulesQuiz"/>
    </div>
</div>

