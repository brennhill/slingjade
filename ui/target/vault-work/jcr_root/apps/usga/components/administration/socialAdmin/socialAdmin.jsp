<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.admin.SocialAdmin" var="socialAdmin"/>

<div style="padding-left: 35px;">
    Source: <h3>${socialAdmin.source}</h3>
    Account name: <h3>${socialAdmin.accountName}</h3>
    Post date: <h3><fmt:formatDate pattern="MMMM dd, yyyy" value="${pageProperties.publishDate.time}"/></h3>
    Content: <h3>${socialAdmin.content}</h3>
    Image: <h3>${socialAdmin.image}<br><img src="${socialAdmin.image}" width="200"/></h3>
    Link: <h3>${socialAdmin.link}</h3>
    Tags: <h3>${socialAdmin.tags}</h3>
    Hash Tags: <h3>${socialAdmin.hashTagsString}</h3>
    References: <h3>${socialAdmin.referencesString}</h3>
</div>