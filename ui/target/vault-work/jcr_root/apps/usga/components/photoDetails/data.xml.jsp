<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.photodetails.PhotoDetails" var="photoDetails"/>

<%@page contentType="text/xml" pageEncoding="UTF-8"%>

<juiceboxgallery galleryTitle="Juicebox-Pro Gallery">
    <c:forEach var="photo" items="${photoDetails.photos}" varStatus="status">
    <image
            imageURL="${photo.cloudinaryImageURL}"
            thumbURL="${photo.cloudinaryThumbURL}"
            linkURL=""
            linkTarget="">
        <title><c:out value="${photoDetails.title}"/></title>
        <caption><c:out value="${photo.photoDescription}"/></caption>
    </image>
    </c:forEach>
</juiceboxgallery>