<%@ include file="/apps/usga/global.jspx" %>

<c:set var="actionLinks" value="${widgets:getMultiFieldPanelValues(resource, 'actionLinks')}"/>

<c:forEach items="${actionLinks}" var="actionLink" varStatus="sliderStatus">
    <%-- Define variables --%>
    <c:set var="sleshdot" value=""/>
    <c:set var="itemClasses" value="" />
    <c:set var="linkData" value="" />
    <c:set var="itemClasses_2" value="" />
    <c:set var="linkData_2" value="" />
    <c:set var="extraContent" value="" />

    <c:set var="image">
        <usga:data-img src="${actionLink['linkIcon']}" absolute="${JSONP}"/>
    </c:set>

    <%-- Sub menu for "My Account" item --%>
    <c:set var="profileSubMenu">
        <ul class="secondary_main-menu__item__submenu">
            <li class="secondary_main-menu__item__submenu__item">
                <a href="javascript:void(0);" data-action="profile" class="secondary_main-menu__item__submenu__item__link">My Profile</a>
            </li>
            <li class="secondary_main-menu__item__submenu__item">
                <a href="javascript:void(0);" data-action="logout" class="secondary_main-menu__item__submenu__item__link">Log Out</a>
            </li>
        </ul>
    </c:set>

    <%-- Link 1 --%>
    <c:set var="linkLabel" value="${actionLink['linkLabel']}"/>
    <c:choose>
        <%-- If Type for link1 is defined in dialog box --%>
        <c:when test="${empty actionLink['linkURL'] && not empty actionLink['linkType1']}">
            <%-- Use empty url --%>
            <c:set var="linkUrl" value="javascript:void(0);"/>
            <c:choose>
                <%-- Type is  `Profile/Log out` --%>
                <c:when test="${'profileLogout' eq actionLink['linkType1']}">
                    <c:set var="itemClasses" value="secondary_main-menu__item_sub login-item" />
                    <c:set var="extraContent" value="${profileSubMenu}" />
                    <%-- Add extra image --%>
                    <c:set var="image">
                        <usga:data-img src="${actionLink['linkIcon']}" absolute="${JSONP}"/>
                        <usga:data-img src="/usga/images/icons/service-close.png"  alt="" classes="hide-icon" absolute="${JSONP}"/>
                    </c:set>
                </c:when>
                <%-- Type is 'Search' --%>
                <c:when test="${'search' eq actionLink['linkType1']}">
                     <c:set var="searchClasses" value="secondary_main-menu__item__link search search-inactive" />
                </c:when>
                <%-- Other types (login/register) --%>
                <c:otherwise>
                    <c:set var="itemClasses" value="secondary_main-menu__item_few-links logout-item" />
                    <c:set var="linkData" value="data-action='${actionLink['linkType1']}'" />
                </c:otherwise>
            </c:choose>
        </c:when>
        <%-- Common link --%>
        <c:otherwise>
            <c:set var="linkUrl" value="${actionLink['linkURL']}"/>
        </c:otherwise>
    </c:choose>

    <%--If Clubhouse home button --%>
    <c:if test="${'home' eq actionLink['linkType1']}">
        <c:set var="itemClasses" value="${actionLink['linkType1']}" />
    </c:if>

    <%-- Link 2  (if filled in dialog box) --%>
    <c:if test="${not empty actionLink['linkLabel_2']}">
        <c:set var="sleshdot" value=" sleshdot"/>
        <c:set var="linkLabel_2" value="${actionLink['linkLabel_2']}"/>
        <c:choose>
            <%-- Selected Type for Link2 --%>
            <c:when test="${empty actionLink['linkURL_2'] && not empty actionLink['linkType2']}">
                <c:set var="linkUrl_2" value="javascript:void(0);"/>
                <c:choose>
                    <%-- Type of link2 is 'Profile/Log out' --%>
                    <c:when test="${'profileLogout' eq actionLink['linkType2']}">
                        <c:set var="itemClasses_2" value="secondary_main-menu__item_few-links login-item" />
                        <c:set var="extraContent" value="${profileSubMenu}" />
                    </c:when>
                    <%-- Other types --%>
                    <c:otherwise>
                        <c:set var="itemClasses_2" value="secondary_main-menu__item_few-links logout-item" />
                        <c:set var="linkData_2" value="data-action='${actionLink['linkType2']}'" />
                    </c:otherwise>
                </c:choose>
            </c:when>
            <%-- Common link (type for link2 is not selected) --%>
            <c:otherwise>
                <c:set var="linkUrl_2" value="${actionLink['linkURL_2']}"/>
            </c:otherwise>
        </c:choose>
    </c:if>

    <%-- Show secondary menu item --%>
    <li class="secondary_main-menu__item ${itemClasses}">
     <c:choose>
        <c:when test="${'search' eq actionLink['linkType1']}">


          <%-- Search dropdowns --%>
            <usga:link path="javascript:void(0);" target="_self" classes="secondary_main-menu__item__link search search-inactive" data="${linkData}">
              <span class="secondary_main-menu__item__link__img search-closed"><usga:data-img src="usga/cutups/icons/service-search.png" alt="Search"/></span>
              <span class="secondary_main-menu__item__link__img search-open"><usga:data-img src="usga/cutups/icons/service-close.png" alt="Close search" /></span>
              <span class="secondary_main-menu__item__link__text${sleshdot}">${linkLabel}</span>
            </usga:link>
          </c:when>
          <c:otherwise>
            <usga:link path="${linkUrl}" target="${actionLink['newWindow']}" classes="secondary_main-menu__item__link" absolute="${JSONP}" data="${linkData}">
              <span class="${'home' eq actionLink['linkType1'] ? 'span' : ''} secondary_main-menu__item__link__img">
                  ${image}
              </span>
              <span class="secondary_main-menu__item__link__text${sleshdot}">${linkLabel}</span>
            </usga:link>
        </c:otherwise>
      </c:choose>


        <c:if test="${not empty sleshdot}">
            <usga:link path="${linkUrl_2}" target="${actionLink['newWindow']}" classes="secondary_main-menu__item__link" absolute="${JSONP}" data="${linkData_2}">
                <span class="secondary_main-menu__item__link__text">${linkLabel_2}</span>
            </usga:link>
        </c:if>
        ${extraContent}
    </li>
</c:forEach>
