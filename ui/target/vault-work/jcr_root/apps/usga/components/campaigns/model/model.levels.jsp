<%@ include file="/apps/usga/global.jspx" %>
${usga:toJson(sling:adaptTo(resource, 'com.usga.components.models.membership.model.MembershipModel').membershipLevels)}
