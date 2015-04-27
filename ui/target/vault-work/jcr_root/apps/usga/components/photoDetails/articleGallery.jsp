<%@ include file="/apps/usga/global.jspx" %>

<c:choose>
    <c:when test="${properties.isOpenGallery}">
        <div data-gallery-target="#GalleryContainer${galleriesCount}" data-gallery-title="${properties.title}" data-gallery-url="${currentNode.path}.data.xml" class="article-media article-media_gallery">

            <usga:data-img src="${properties.coverImage}"/>

            <div class="article-media__gradient"></div>
            <div class="article-media__discription">
                ${properties.description}
                <div class="article-media__discription__date">${properties.subDescription}</div>
            </div>

            <div class="gallery-wrapper">
                <div id="GalleryContainer${galleriesCount}" class="gallery-container"></div>
            </div>
        </div>
    </c:when>
    <c:otherwise>

        <c:choose>
            <c:when test="${not empty properties.linkedPage}">
                <usga:link path="${properties.linkedPage}" target="${properties.linkTarget}" classes="article-media section">
                    <usga:data-img src="${properties.coverImage}"/>

                    <div class="article-media__gradient"></div>
                    <div class="article-media__discription">
                            ${properties.description}
                        <div class="article-media__discription__date">${properties.subDescription}</div>
                    </div>
                </usga:link>
            </c:when>
            <c:otherwise>
                <div class="article-media section">
                    <usga:data-img src="${properties.coverImage}"/>

                    <div class="article-media__gradient"></div>
                    <div class="article-media__discription">
                            ${properties.description}
                        <div class="article-media__discription__date">${properties.subDescription}</div>
                    </div>
                </div>
            </c:otherwise>
        </c:choose>

    </c:otherwise>
</c:choose>