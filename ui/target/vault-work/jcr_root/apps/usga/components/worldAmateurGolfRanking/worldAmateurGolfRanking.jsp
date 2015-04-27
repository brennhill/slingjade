<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.worldamateurgolfranking.WorldAmateurGolfRanking" var="worldAmateurGolfRanking"/>

<h1 id="title5" class="title ${!worldAmateurGolfRanking.noSponsor ? 'title_with-partner' : ''}">

    <c:if test="${!worldAmateurGolfRanking.noSponsor}">
            <span class="title__partner">
                IN PARTNERSHIP WITH
                <usga:link path="${worldAmateurGolfRanking.logolink}" classes="title__partner__link" target="${worldAmateurGolfRanking.logoLinkTarget}">
                    <usga:data-img src="${worldAmateurGolfRanking.sponsorLogo}" classes="title__partner__logo" />
                </usga:link>
            </span>
    </c:if>

    World Amateur Golf Rankings

    <span class="title__under">${worldAmateurGolfRanking.sectionDescription}</span>
</h1>
<script>new usga.BaseCloudinaryModule('#title5');</script>
<!-- world ranking module-->
<div id="worldRankingSlider" class="world-ranking underline">
    <ul class="world-ranking__slider clearfix">
        <li class="world-ranking__slider__item">
            <div class="world-ranking__slider__item__header">MEN'S RANKINGS
            </div>
            <div class="world-ranking__slider__item__body">
                <div class="world-ranking__slider__item__body__head">
                    <table>
                        <thead>
                        <tr>
                            <th class="position">pos</th>
                            <th class="player">player</th>
                            <th class="country">country</th>
                            <th class="points">pts avg</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="world-ranking__slider__item__body__content">
                    <div class="world-ranking__slider__item__body__content__table">
                        <table>
                            <tbody>

                                <c:forEach var="meninfo" items="${worldAmateurGolfRanking.playersInfoMen}" end="4">
                                    <tr>
                                        <td class="position">${meninfo.position}</td>
                                        <td class="player">${meninfo.player.name}</td>
                                        <td class="country">
                                            <span class="flag ${meninfo.player.country}"></span>
                                        </td>
                                        <td class="points">${meninfo.points}</td>
                                    </tr>
                                </c:forEach>

                            </tbody>
                        </table>
                    </div>
                    <usga:link path="${worldAmateurGolfRanking.mensLinkUrl}" target="${worldAmateurGolfRanking.mensLinkTarget}" classes="button button_color1">
                        View Full MEN'S RANKINGS
                    </usga:link>
                </div>
            </div>
        </li>
        <li class="world-ranking__slider__item">
            <div class="world-ranking__slider__item__header">WOMEN'S RANKINGS
            </div>
            <div class="world-ranking__slider__item__body">
                <div class="world-ranking__slider__item__body__head">
                    <table>
                        <thead>
                        <tr>
                            <th class="position">pos</th>
                            <th class="player">player</th>
                            <th class="country">country</th>
                            <th class="points">pts avg</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="world-ranking__slider__item__body__content">
                    <div class="world-ranking__slider__item__body__content__table">
                        <table>
                            <tbody>

                            <c:forEach var="womeninfo" items="${worldAmateurGolfRanking.playersInfoWomen}" end="4">
                                <tr>
                                    <td class="position">${womeninfo.position}</td>
                                    <td class="player">${womeninfo.player.name}</td>
                                    <td class="country">
                                        <span class="flag ${womeninfo.player.country}"></span>
                                    </td>
                                    <td class="points">${womeninfo.points}</td>
                                </tr>
                            </c:forEach>

                            </tbody>
                        </table>
                    </div>
                    <usga:link path="${worldAmateurGolfRanking.womensLinkUrl}" target="${worldAmateurGolfRanking.womensLinkTarget}" classes="button button_color1">
                        View Full WOMEN'S RANKINGS
                    </usga:link>
                </div>
            </div>
        </li>
    </ul>
</div>
<script>var worldRanking = new usga.WorldRanking('#worldRankingSlider');</script>
<!-- end world ranking module-->