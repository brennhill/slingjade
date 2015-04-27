<%@ include file="/apps/usga/global.jspx" %>
<%@ page import="com.day.cq.commons.Externalizer" %>
<%
    Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);

%>
<c:set var="currentPagePath" value="<%=currentPage.getPath()%>"/>
<div class="inner">

      <usga:link path="${properties.logoDestination}" classes="logo" absolute="${JSONP}">
          <usga:data-img src="/usga/cutups/logo/usga-clubhouse.png" data-crop="fit" absolute="${JSONP}"/>
      </usga:link>
      <usga:link path="${properties.logoDestination}" classes="logo-2" absolute="${JSONP}">
          <usga:data-img src="/usga/cutups/logo/usga-clubhouse.png" data-crop="fit" absolute="${JSONP}"/>
      </usga:link>

    <a href="javascript:void( 0 );" class="navigation__search"></a>
    <a href="javascript:void( 0 );" class="navigation__toggle"></a>
    <div class="navigation__box">
        <div class="main-menu">
            <div class="main-menu__envelope">
                <ul class="main-menu__inner">
                    <c:forEach items="${properties.linkLabel}" var="linkLabel" varStatus="loop">

                        <usga:set var="linkURL" value="${properties.linkURL}" loopIndex="${loop.index}"/>
                        <usga:set var="showSubNavigation" value="${properties.showSubNavigation}" loopIndex="${loop.index}"/>
                        <usga:set var="newWindow" value="${properties.newWindow}" loopIndex="${loop.index}"/>

                        <c:choose>
                            <c:when test="${showSubNavigation eq 'yes'}">
                                <li class="main-menu__item main-menu__item_sub ${fn:contains(currentPagePath, linkURL) ? ' active ' : ''}">
                                    <usga:link path="${linkURL}" target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                                    classes="main-menu__item__link" absolute="${JSONP}">
                                        ${linkLabel}
                                    </usga:link>
                                    <cq:include path="subNav_${loop.index}"
                                                resourceType="/apps/usga/components/navigation/subNavigation"/>
                                </li>
                            </c:when>
                            <c:otherwise>
                                 <li class="main-menu__item  ${fn:contains(currentPagePath, linkURL) ? ' active ' : ''}">
                                    <usga:link path="${linkURL}" target="${newWindow eq 'yes' ? '_blank' : '_self'}"
                                    classes="main-menu__item__link" absolute="${JSON}">
                                        ${linkLabel}
                                    </usga:link>
                                </li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <li class="main-menu__item main-menu__dropdown hide">
                        <a href="#" class="main-menu__dropdown-toggle">
                            <span>More&nbsp;</span>
                        </a>
                        <ul class="main-menu__dropdown_menu"></ul>
                    </li>
                </ul>
            </div>
        </div>
        <cq:include path="secondaryNav" resourceType="/apps/usga/components/navigation/secondaryNavigation"/>
    </div>
</div>

<%--pulled from parent component --%>
<cq:include script="navSearch.jsp"/>

<c:choose>
    <c:when test="${JSONP}">
        <script>
            var navigation = new usga.Navigation('#navigation', {fixed: true, baseSearchPageUrl: '${rootPage}', highlightActiveItem:true});
        </script>
    </c:when>
    <c:otherwise>
        <script>
            var navigation = new usga.Navigation('#navigation', {fixed: true, highlightActiveItem:true});
        </script>
    </c:otherwise>
</c:choose>

<div id="protectedContentModal" style="display: none" class="modal">
  <div class="modal__body">
    <div class="modal__body__close"></div>
    <div class="modal__body__header">Exclusive Content</div>
    <div class="modal__body__content sign-in">
      <p>Please sign in or create an account to access the exclusive member content</p><a class="button button_color1 sign-in-button">Sign In</a><a class="button button_color1 register-button">Create an account</a><a href="/clubhouse/campaigns/members-join.html" class="button button_color1">View Membership Benefits</a>
    </div>
    <div class="modal__body__content non-member">
      <p>This content is exclusive to USGA Members. If you are not a USGA Member but would like to learn more about how you can support the USGA, click below:</p><a href="/clubhouse/campaigns/members-join.html" class="button button_color1">View Membership Benefits</a><a class="button button_color1 connect-button">Verify Your Membership</a>
    </div>
    <div class="modal__body__content expired">
      <p>Your Membership has expired! Renew your Membership today to restore your access to the Member Clubhouse - your source for exclusive content, special offers and invitations</p><a href="/clubhouse/campaigns/members-renew-offer.html" class="button button_color1">Renew your Membership</a>
    </div>
  </div>
</div>

<wcmmode:edit>
    <style>
        .sub-main-menu, .sub-main-menu__item__submenu {
            display: block !important;
        }
    </style>
</wcmmode:edit>