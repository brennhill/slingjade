<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<%@page trimDirectiveWhitespaces="true" %>
<div class="footer__list__item__title">${properties.sectionTitle}</div>
<div class="row">
    <c:forEach var="socialName" items="${properties.socialName}" varStatus="loop">
        <usga:set var="socialLinkDestination" value="${properties.socialLinkDestination}" loopIndex="${loop.index}"/>
        <usga:set var="socialImage" value="${properties.socialImage}" loopIndex="${loop.index}"/>
        <usga:set var="followIcon" value="${properties.followIcon}" loopIndex="${loop.index}"/>
        <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>
        <usga:set var="newWindowFollow" value="${properties.newWindowFollow}" loopIndex="${loop.index}"/>

        <div class="footer__list__item__item">
            <usga:link path="${socialLinkDestination}" classes="footer__list__item__item__link"
                       target="${newWindow eq 'yes' ? '_blank' : '_self'}" absolute="${JSONP}">
                <c:if test="${not empty socialImage}">
                    <span class="footer__list__item__item__link__img">
                        <usga:data-img src="${socialImage}" alt="" absolute="true"/>
                      </span>
                </c:if>
                <span class="footer__list__item__item__link__text">${socialName}</span>
            </usga:link>
            <div class="footer__list__item__item__link__follow">
                <c:choose>
                    <c:when test="${followIcon eq 'facebook'}">
                        <div data-href="http://www.usga.org/" data-layout="button" data-action="like"
                             data-show-faces="false" data-share="false" class="fb-like"></div>
                    </c:when>
                    <c:when test="${followIcon eq 'twitter'}">
                        <a href="https://twitter.com/usga" data-show-count="false" data-show-screen-name="false"
                           class="twitter-follow-button"></a>
                    </c:when>
                    <c:when test="${followIcon eq 'instagram'}">
                        <a href="http://instagram.com/usga?ref=badge" target="_blank" class="ig-follow ig-follow-medium">
                            <div class="ig-follow-bg">
                                <span class="ig-follow-icon"></span>
                                <span class="ig-follow-text">Follow</span>
                            </div>
                        </a>
                    </c:when>
                    <c:when test="${followIcon eq 'google'}">
                        <div data-annotation="none" data-height="20"
                             data-href="https://plus.google.com/101025757252712922342" data-rel="publisher"
                             class="g-follow"></div>
                    </c:when>
                    <c:when test="${followIcon eq 'linkedin'}">
                        <script type="IN/FollowCompany" data-id="2603581" data-counter="none"></script>
                    </c:when>
                    <c:when test="${followIcon eq 'youtube'}">
                        <div data-channel="TheUSGA" data-layout="default" data-count="hidden"
                             class="g-ytsubscribe"></div>
                    </c:when>
                </c:choose>
            </div>
        </div>

    </c:forEach>
    <script>
        $(window).bind("load", function () {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            !function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + '://platform.twitter.com/widgets.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'twitter-wjs');
        })
    </script>
</div>
