<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.article.ArticleSplash" var="articleSplash"/>

<c:if test="${!isArticlePage}"><c:set var="articleImage"><usga:unique-id varName="articleImage"/></c:set></c:if>

<div <c:if test="${!isArticlePage}">id="articleImage${articleImage}"</c:if> class="article__inner">
    <c:choose>
        <c:when test="${articleSplash.mediaType eq 'video'}">
            <div class="media">
                <cq:include path="videoPlayer" resourceType="usga/components/video/brightcoveVideoPlayer"/>
            </div>
        </c:when>
        <c:otherwise>
            <c:choose>
                <c:when test="${not empty articleSplash.media}">
                    <div class="article-media article-media_mod${'vertical' eq properties.imagePlacement ? '2' : '1'}">
                        <wcmmode:edit>
                            <usga:data-img src="${articleSplash.media}" classes="${articleSplash.ddImageClassName}"/>
                        </wcmmode:edit>
                        <wcmmode:edit not="true">
                            <usga:data-img src="${articleSplash.media}"/>
                        </wcmmode:edit>

                        <c:if test="${not empty articleSplash.caption}">
                            <c:choose>
                                <c:when test="${'vertical' eq properties.imagePlacement}">
                                    <div class="article-media__gradient"></div>
                                    <div class="article-media__discription">${articleSplash.caption}</div>
                                </c:when>
                                <c:otherwise>
                                    <div class="article-media__tip">
                                        <span class="article-media__tip__text">${articleSplash.caption}</span>
                                    </div>
                                </c:otherwise>
                            </c:choose>
                        </c:if>
                    </div>
                </c:when>
                <c:otherwise>
                    <wcmmode:edit>
                        <img class="${articleSplash.ddImageClassName} cq-image-placeholder" src="/etc/designs/default/0.gif" >
                    </wcmmode:edit>
                </c:otherwise>
            </c:choose>
        </c:otherwise>
    </c:choose>

    <c:if test="${articleSplash.showSocialIcons == 'true'}">
        <cq:include path="side-social ${'vertical' eq properties.imagePlacement ? '' : 'side-social_mod1'}" resourceType="usga/components/article/socialSlide"/>
    </c:if>

    <cq:include path="contentPar" resourceType="foundation/components/parsys"/>
</div>

<c:if test="${!isArticlePage}">
    <script>var articleImage = new usga.BaseCloudinaryModule('#articleImage${articleImage}')</script>
</c:if>