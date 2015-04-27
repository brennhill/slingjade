<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.championshipscarousel.ChampionshipsCarousel"
               var="champCarousel"/>

<div class="inner">
    <h1 id="title27" class="title title_mod1 title_full ${!champCarousel.noSponsor ? 'title_with-partner' : ''}">

        <c:if test="${!champCarousel.noSponsor}">
            <span class="title__partner">
                ${champCarousel.sponsorText}
                 <usga:link path="${properties.logolink}" classes="title__partner__link" target="${properties.logoLinkTarget}">
                     <usga:data-img src="${properties.sponsorLogo}" classes="title__partner__logo" />
                 </usga:link>
            </span>
        </c:if>

        ${champCarousel.sectionTitle}
        <span class="title__under">${champCarousel.sectionDescription}</span>
    </h1>

    <script>new usga.BaseCloudinaryModule('#title27');</script>
</div>

<c:if test="${champCarousel.ticketsCarousel}">
    <div class="inner">
</c:if>
        <div id="championshipSlider" class="box-main_slider box-main_slider_championships swiper-container">
            <div class="slider-wrapper">
                <ul class="main_slider main_slider_championships swiper-wrapper">

                    <c:forEach items="${champCarousel.championshipsCarouselItems}" var="item">

                        <li class="main_slider__item swiper-slide">
                            <c:if test="${not empty item.background}">
                                <usga:data-img src="${item.background}" classes="main_slider__item__bg"/>
                            </c:if>

                            <div class="main_slider__item__gradient"></div>
                            <div class="main_slider__item__box main_slider__item__box_gmod2">
                                <c:if test="${not empty item.logo}">
                                    <usga:data-img src="${item.logo}" alt="" classes="main_slider__item__box__img" dataRadius="max"/>
                                </c:if>
                                <br/>

                                <div class="main_slider__item__box__date">${item.datesText}</div>
                                <div class="main_slider__item__box__text">${item.championshipName}</div>
                                <c:choose>
                                    <c:when test="${champCarousel.ticketsCarousel}">
                                        <usga:link path="${item.ticketButtonDestination}" classes="button button_transparent">
                                            ${item.ticketButtonLabel}
                                        </usga:link>
                                    </c:when>
                                    <c:otherwise>
                                        <usga:link path="${item.buttonDestination}" classes="button button_transparent">
                                            ${item.buttonLabel}
                                        </usga:link>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </li>

                    </c:forEach>

                </ul>
                <div class="swiper-pagination"></div>
            </div><a href="javascript:void(0)" class="swiper-button-prev swiper-direction"></a><a href="javascript:void(0)" class="swiper-button-next swiper-direction"></a>
        </div>
<c:if test="${champCarousel.ticketsCarousel}">
    </div>
</c:if>

<script>var championshipSlider = new usga.ChampionshipMediaSlider('#championshipSlider');</script>
