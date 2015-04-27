<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.reigningchampions.ReigningChampions" var="reigningChampions"/>

<h1 id="title4" class="title title_underline title_full">
    ${reigningChampions.moduleTitle}
    <span class="title__under">${reigningChampions.moduleDescription}</span>
</h1>
<!-- reigning champions module-->
<div id="reigningChampionsResources" class="reigning-champions clearfix underline">
    <ul class="reigning-champions__slider">
        <c:forEach var="item" items="${reigningChampions.reigningChampionsItems}" varStatus="status">
            ${status.index % 2 == 0 ? '<li>' : ''}

            <div class="reigning-champions__slider__item">
                <c:choose>
                    <c:when test="${not empty item.linkUrl}">
                    <usga:link path="${item.linkUrl}" target="${item.linkTarget}" classes="reigning-champions__slider__item__image">
                        <c:if test="${not empty item.image}">
                            <usga:data-img src="${item.image}"/>
                        </c:if>
                    </usga:link>
                    </c:when>
                    <c:otherwise>
                        <div class="reigning-champions__slider__item__image">
                        <c:if test="${not empty item.image}">
                            <usga:data-img src="${item.image}"/>
                        </c:if>
						</div>
                    </c:otherwise>
                </c:choose>
                <div class="reigning-champions__slider__item__content">
                    <c:choose>
                    <c:when test="${not empty item.linkUrl}">
                    <usga:link path="${item.linkUrl}" target="${item.linkTarget}" classes="reigning-champions__slider__item__content__logo">
                        <c:if test="${not empty item.logo}">
                            <usga:data-img src="${item.logo}" data-crop="fit"/>
                        </c:if>
                    </usga:link>
                    </c:when>
                    <c:otherwise>
                      <div  class="reigning-champions__slider__item__content__logo">
                      <c:if test="${not empty item.logo}">
                          <usga:data-img src="${item.logo}" data-crop="fit"/>
                      </c:if>
                      </div>
                    </c:otherwise>
                    </c:choose>
                    <div class="reigning-champions__slider__item__content__info">
                        <div class="reigning-champions__slider__item__content__info__championship">${item.championship}</div>
                        <div class="reigning-champions__slider__item__content__info__name">${item.name}</div>
                        <div class="reigning-champions__slider__item__content__info__location">
                            <span>${item.courseName}${not empty item.location ? ',' : ''}</span>
                            <span>${item.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            ${status.index % 2 == 0 ? '' : '</li>'}
        </c:forEach>
    </ul>
    <div class="show-more">
        <div class="show-more__button">SHOW MORE</div>
    </div>
</div>

<script>var reigningChampions = new usga.ReigningChampions('#reigningChampionsResources');</script>
<!-- end reigning champions module-->
