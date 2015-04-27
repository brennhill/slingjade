<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.livechampionssummary.LiveChampionsSummary"
               var="liveChampionsSummary"/>

<wcmmode:edit>
    <style> #championshipSliderLive {
        margin-bottom: 650px;
    } </style>
</wcmmode:edit>

<!-- title-->
<div class="inner">
    <h1 id="title8" class="title ${properties.showPartner ? 'title_with-partner' : ''}">

        <c:if test="${properties.showPartner}">
            <span class="title__partner">
                IN PARTNERSHIP WITH
                <usga:link path="${properties.logolink}" target="${properties.logoLinkTarget}" classes="title__partner__link">
                    <usga:data-img src="${properties.logo}" classes="title__partner__logo" />
                </usga:link>
            </span>
        </c:if>

        ${properties.title}
        <span class="title__under">
            ${properties.description}
        </span>
    </h1>
    <script>new usga.BaseCloudinaryModule('#title8');</script>
</div>
<!-- end title-->
<!-- slider champions-->

<div id="championshipSliderLive" class="box-main_slider box-main_slider_championships-live">
    <div class="inner">
        <ul class="bxslider main_slider main_slider_championships-live">

            <c:if test="${not empty properties.slidesNumber}">
                <c:forEach begin="1" end="${properties.slidesNumber}" varStatus="sliderStatus">
                    <li class="main_slider__item ${liveChampionsSummary.liveChampSummaryItems[sliderStatus.count - 1].childResourceName eq 'latestchampionshipsu' ? 'tabbable' : ''}">
                        <cq:include path="liveChampSummaryItems${sliderStatus.index}"
                                    resourceType="foundation/components/parsys"/>
                    </li>
                </c:forEach>
            </c:if>

        </ul>

        <usga:link path="${properties.linkUrl}" target="${properties.linkTarget}" classes="box-main_slider__link">
            ${properties.linkText}
        </usga:link>

    </div>
</div>

<script>
    var championshipSliderLive = new usga.ChampionshipSliderLive('#championshipSliderLive');
    var slideLatestNavUp = new usga.SlideLatestNavUp('#championshipSliderLive');
</script>
<!-- end slider champions-->

