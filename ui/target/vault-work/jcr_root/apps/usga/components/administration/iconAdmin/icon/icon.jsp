<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.admin.Icon" var="icon"/>
<span class="iconKey">Key: ${icon.iconKey}</span>
<span class="iconUrl">AEM path: ${icon.iconAEMPath}</span>
<span class="cloudinaryUrl">Cloudinary URL: ${icon.iconCloudinaryURL}</span>