<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.page.HeadMetaData" var="headMeta"/>

<!-- google plus-->
<meta itemprop="name" content="${headMeta.title}">
<meta itemprop="description" content="${headMeta.description}">
<meta itemprop="image" content="${headMeta.imageCloudinary}">
<!-- twitter-->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@USGA">
<meta name="twitter:title" content="${headMeta.title}">
<meta name="twitter:description" content="${headMeta.description}">
<meta name="twitter:image:src" content="${headMeta.imageCloudinary}">
<!-- facebook, linkedin and other-->
<meta property="og:title" content="${headMeta.title}"/>
<meta property="og:type" content="article"/>
<meta property="og:image" content="${headMeta.imageCloudinary}"/>

<c:set var="ogPageDescription" value="${headMeta.description}"/>
<c:if test="${empty ogPageDescription}">
    <c:set var="ogPageDescription" value="${currentPage != null ? (not empty currentPage.description ? currentPage.description : currentPage.title) : '@USGA'}"/>
</c:if>
<meta property="og:description" content="${ogPageDescription}"/>
<meta property="og:site_name" content="USGA"/>

<!--<meta property="fb:admins" content="Facebook numberic ID" />-->
