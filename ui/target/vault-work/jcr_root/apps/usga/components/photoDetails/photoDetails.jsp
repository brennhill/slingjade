<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.photodetails.PhotoDetails" var="photoDetail"/>

<c:set var="galleriesCount"><usga:unique-id varName="galleriesCount"/></c:set>

<c:choose>
    <c:when test="${isArticlePage && !isPhotoDetailPage}">
        <cq:include script="articleGallery.jsp"/>
    </c:when>
    <c:otherwise>
        <div class="gallery-wrapper">
          <div id="GalleryContainer${galleriesCount}" class="gallery-container"></div>
        </div>
        <div class="photo-details__social">
            <cq:include path="socialIcons" resourceType="usga/components/socialIcons"/>
        </div>
        <script>var socialShare = new usga.SocialShare('.photo-details__social');</script>
        <c:set var="replace" value="'" />
        <c:set var="quote" value="%27"/>
        <script>
            var gallery = new usga.Gallery('#GalleryContainer${galleriesCount}', {
                title: '<c:out value="${fn:replace(photoDetail.title, replace, quote)}"/>',
                items: '${photoDetail.nodePath}.data.xml'
            });
            digitalData.photogallery = { "name": "<c:out value="${fn:replace(photoDetail.title, replace, quote)}" default="Photo Gallery" />" };
            _satellite.track("photo-gallery-launch");

        </script>
    </c:otherwise>
</c:choose>