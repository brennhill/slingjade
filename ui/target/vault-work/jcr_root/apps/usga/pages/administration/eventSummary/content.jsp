<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<%@page import="com.usga.services.schedule.ScheduleService" %>
<div class="wrapper">
    <!-- content part-->
    <div class="content" <c:if test="${isEditMode}"> style="padding-top:150px"</c:if>>
      <%
        ScheduleService scheduleService = sling.getService(ScheduleService.class);
        String pageName = pageProperties.get("jcr:title", String.class);
        pageName.subString

      %>
    </div>
</div>

