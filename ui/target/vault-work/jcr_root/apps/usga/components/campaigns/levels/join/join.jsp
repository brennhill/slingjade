<%@ include file="/apps/usga/global.jspx" %>
<c:set var="level" value="${sling:adaptTo(resource, 'com.usga.components.models.membership.level.JoinLevel')}"
       scope="request"/>
<cq:include script="content.jsp"/>
<c:set var="membershipLevel" value="${level.membershipLevel}"/>
<div class="member-level__item__line"></div>
<c:if test="${not empty level.price}">
    <div class="member-level__item__price">$${level.price}<br/>
    <div class="member-level__item__price__tip">per year</div>
</div>
</c:if>
