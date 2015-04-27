<%@ include file="/apps/usga/global.jspx" %>
<c:set var="membershipLevel" value="${level.membershipLevel}"/>
<img alt="" class="member-level__item__image" src="${level.image}"/>
<div class="member-level__item__title"><c:out
        value="${empty membershipLevel ? level.id : membershipLevel.shortTitle}"/></div>
