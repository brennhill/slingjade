<%@ include file="/apps/usga/global.jspx" %>
<c:set var="level" value="${sling:adaptTo(resource, 'com.usga.components.models.membership.level.RenewLevel')}"
       scope="request"/>
<cq:include script="content.jsp"/>
