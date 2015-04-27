<%@ include file="/apps/usga/global.jspx" %>

<c:set var="IMG_BOX_MODULE_ID"><usga:unique-id varName="IMG_BOX_MODULE_ID"/></c:set>

<div class="inner">
    <div id="imagebox_${IMG_BOX_MODULE_ID}" class="image-box underline">
        <div class="clearfix">
            <c:forEach items="${properties.background}" var="background" varStatus="loop">

                <usga:set var="category" value="${properties.category}" loopIndex="${loop.index}"/>
                <usga:set var="linkDescription" value="${properties.linkDescription}" loopIndex="${loop.index}"/>
                <usga:set var="destination" value="${properties.destination}" loopIndex="${loop.index}"/>
                <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>

                <c:choose>
                    <c:when test="${not empty destination}">
                        <usga:link path="${destination}" classes="image-box__item" target="${newWindow eq 'yes' ? '_blank' : '_self'}">
                            <c:if test="${not empty background}">
                                <usga:data-img src="${background}" alt="" classes="image-box__item__image"/>
                            </c:if>
                            <div class="image-box__item__category">${category}</div>
                            <div class="image-box__item__description">${linkDescription}</div>
                        </usga:link>
                    </c:when>
                    <c:otherwise>
                        <div class="image-box__item">
                            <c:if test="${not empty background}">
                                <usga:data-img src="${background}" alt="" classes="image-box__item__image"/>
                            </c:if>
                            <div class="image-box__item__category">${category}</div>
                            <div class="image-box__item__description">${linkDescription}</div>
                        </div>
                    </c:otherwise>
                </c:choose>

            </c:forEach>
        </div>
    </div>
</div>
<script>var imagebox = new usga.BaseCloudinaryModule('#imagebox_${IMG_BOX_MODULE_ID}')</script>