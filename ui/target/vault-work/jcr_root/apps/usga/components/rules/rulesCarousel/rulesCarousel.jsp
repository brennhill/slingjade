<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<h1 id="title26" class="title title_mod1 title_full title_with-partner">
    <span class="title__partner">${properties.sponsorText}
        <usga:data-img src="${properties.sponsorLogo}" alt="" classes="title__partner__logo"/>
    </span>${properties.sectionTitle}
    <span class="title__under">${properties.sectionDescription}</span>
</h1>
<script>new usga.BaseCloudinaryModule('#title26');</script>

<c:if test="${properties.slides > 0}">
    <div id="championshipSlider" class="box-main_slider box-main_slider_media underline swiper-container">
        <div class="slider-wrapper">
            <ul class="main_slider main_slider_championships swiper-wrapper">
                <c:forEach var="i" begin="0" end="${properties.slides - 1}" step="1" varStatus="loop">
                    <usga:set var="ruleTitle" value="${properties.ruleTitle}" loopIndex="${loop.index}"/>
                    <usga:set var="ruleReference" value="${properties.ruleReference}" loopIndex="${loop.index}"/>
                    <usga:set var="destination" value="${properties.destination}" loopIndex="${loop.index}"/>
                    <usga:set var="slideNewWindow" value="${properties.slideNewWindow}" loopIndex="${loop.index}"/>
                    <usga:set var="background" value="${properties.background}" loopIndex="${loop.index}"/>

                    <li class="main_slider__item swiper-slide">
                        <usga:link path="${destination}" target="${slideNewWindow eq 'yes' ? '_blank' : '_self'}">

                            <c:if test="${not empty background}">
                                <usga:data-img src="${background}" classes="main_slider__item__bg"/>
                            </c:if>

                            <div class="main_slider__item__gradient"></div>
                            <div class="main_slider__item__video-icon"></div>
                            <div class="main_slider__item__box main_slider__item__box_gmod3">
                                <div class="main_slider__item__box__media-title">
                                    ${ruleTitle}
                                </div>
                                <div class="main_slider__item__box__media-rule">${ruleReference}</div>
                            </div>
                        </usga:link>
                    </li>
                </c:forEach>
            </ul>
            <div class="swiper-pagination"></div>
        </div>

        <a href="javascript:void(0)" class="swiper-button-prev swiper-direction"></a>
        <a href="javascript:void(0)" class="swiper-button-next swiper-direction"></a>

        <c:if test="${not empty properties.moreLinkDestination && not empty properties.moreLinkLabel}">
            <usga:link path="${properties.moreLinkDestination}" classes="box-main_slider__link"
                       target="${newWindow eq 'yes' ? '_blank' : '_self'}">
                ${properties.moreLinkLabel}<span class="raquo">&raquo;</span>
            </usga:link>
        </c:if>

    </div>
    <script>var championshipSlider = new usga.ChampionshipMediaSlider('#championshipSlider');</script>
</c:if>