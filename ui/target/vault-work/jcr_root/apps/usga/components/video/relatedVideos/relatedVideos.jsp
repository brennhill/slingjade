<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.video.RelatedVideos" var="relatedVideos"/>

<div class="video-details__container__sidebar">
    <div class="video-details__container__sidebar__inner">
        <div class="related-title">
            ${empty relatedVideos.title ? 'Related Content': relatedVideos.title}
        </div>
        <ul class="related-list">
            <c:forEach items="${relatedVideos.pages}" var="video" varStatus="i" begin="0">
                <c:if test="${i.index == 0}">
                    <li>
                </c:if>

                <div class="related-list__item clearfix">
                    <usga:link path="${video.pagePath}" classes="related-list__item__img video">
                        <c:if test="${not empty video.videoImagePath}">
                            <usga:data-img src="${video.videoImagePath}" alt="${video.videoTitle}"/>
                        </c:if>
                    </usga:link>
                    <usga:link classes="related-list__item__title" path="${video.pagePath}">${video.videoTitle}</usga:link>
                </div>

                <c:choose>
                    <c:when test="${i.last}">
                        </li>
                    </c:when>
                    <c:otherwise>
                        <c:if test="${(i.index+1) % 3 == 0}">
                        </li>
                        <li>
                        </c:if>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </ul>
    </div>
</div>