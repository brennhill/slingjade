<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.relatedcontent.RelatedContent" var="relatedContent"/>

<c:if test="${not empty relatedContent.relatedContentItems}">
    <h1 id="title24" class="title underline_top">${empty relatedContent.sectionTitle ? 'Related Content' : relatedContent.sectionTitle}
        <span class="title__under"><span class="title__under__by"></span></span>
    </h1>

    <div id="relatedContent" class="related-content">
        <div class="card-box frame">
            <div class="card-box__inner">

                <c:forEach var="relatedContentItem" items="${relatedContent.relatedContentItems}" end="${relatedContent.auto ? relatedContent.numItems : relatedContent.itemsSize - 1}">
                    <div class="block__card">
                        <div class="block__card__inner">
                            <usga:link path="${relatedContentItem.link}"
                                       target="${relatedContentItem.openInNewWindow? '_blank' : '_self'}"
                                       classes="block__card__media">
                                <c:if test="${not empty relatedContentItem.thumbnail}">
                                    <div class="block__card__media__inner">
                                        <usga:data-img src="${relatedContentItem.thumbnail}"/>
                                    </div>
                                </c:if>
                                <div class="block__card__media__gradient"></div>

                                <c:if test="${relatedContentItem.video}">
                                    <div class="video"><div class="icon"></div></div>
                                </c:if>

                            </usga:link>
                            <span class="block__card__title-above">${relatedContentItem.shortTitle}</span>
                            <usga:link path="${relatedContentItem.link}"
                                       target="${relatedContentItem.openInNewWindow? '_blank' : '_self'}"
                                       classes="block__card__title">
                                ${relatedContentItem.subtitle}
                            </usga:link>
                        </div>
                    </div>
                </c:forEach>

            </div>
        </div>
    </div>

    <script>var relatedContent = new usga.BaseCloudinaryModule('#relatedContent');</script>
    <!-- end section latest-->
</c:if>