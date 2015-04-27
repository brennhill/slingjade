<%@ include file="/apps/usga/global.jspx" %>

<!-- latest block-->
<div class="block__card ${properties.enlarged}">
    <div class="block__card__inner">
        <usga:link path="${properties.contentLink}" classes="block__card__media"
                   target="${properties.newWindow eq 'yes' ? '_blank' : '_self'}">
            <div class="block__card__media__inner">
                <usga:data-img src="${properties.contentImg}"/>
            </div>
            <div class="block__card__media__gradient"></div>
            <div class="video">
                <c:if test="${properties.video}">
                    <usga:data-img src="/etc/designs/usga/images/icon-video.png"/>
                </c:if>
            </div>
        </usga:link>
        <span class="block__card__title-above">${properties.categoryTag}</span>
        <usga:link path="${properties.contentLink}" classes="block__card__title"
                   target="${properties.newWindow eq 'yes' ? '_blank' : '_self'}">
            ${properties.contentTitle}
        </usga:link>
    </div>
</div>
<!-- end latest block-->


