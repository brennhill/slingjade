<%@page session="false" %><%--
  Copyright 1997-2010 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default head script.

  Draws the HTML head with some default content:
  - includes the WCML init script
  - includes the head libs script
  - includes the favicons
  - sets the HTML title
  - sets some meta data

  ==============================================================================

--%><%@ include file="/apps/usga/global.jspx" %><%
%><%@ page import="com.day.cq.commons.Doctype" %><%
    String xs = Doctype.isXHTML(request) ? "/" : "";
    String favIcon = currentDesign.getPath() + "/favicon.ico";
    if (resourceResolver.getResource(favIcon) == null) {
        favIcon = null;
    }
%>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <script>
        ;(function (window) {
            var hostname = window.document.location.hostname;
            var isProd = (hostname === 'www.usga.org' || hostname === 'new.usga.org');
            window.usga = window.usga || {};
            window.usga.isProd = function () {
                return isProd;
            };
        })(window);
    </script>

    <script>
        ;(function (window) {
            var dtmSrc = '//assets.adobedtm.com/be647daa0868f11f8113c7fb433bafc636024ba2/satelliteLib-83349796437417787abc21e3f4ac547f4e6c55e0' +
                    ((window.usga && window.usga.isProd()) ? '' : '-staging') + '.js';
            window.document.write('<scr' + 'ipt type="text/javascript" src="' + dtmSrc + '"></scr' + 'ipt>')
        })(window);
    </script>

    <meta http-equiv="content-type" content="text/html; charset=UTF-8"<%=xs%>>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="keywords" content="<%= xssAPI.encodeForHTMLAttr(WCMUtils.getKeywords(currentPage, false)) %>"<%=xs%>>
    <meta name="description" content="<%= xssAPI.encodeForHTMLAttr(properties.get("jcr:description", "")) %>"<%=xs%>>
    <cq:include script="headMeta.jsp"/>
    <cq:includeClientLib categories="usga.embedded"/>
    <wcmmode:disabled not="true">
     <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    </wcmmode:disabled>
    <% if (favIcon != null) { %>
    <link rel="icon" type="image/vnd.microsoft.icon" href="<%= xssAPI.getValidHref(favIcon) %>"<%=xs%>>
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%= xssAPI.getValidHref(favIcon) %>"<%=xs%>>
    <% } %>
    <!--config-->
    <cq:include script="config.jsp"/>

    <title><%= currentPage.getTitle() == null ? xssAPI.encodeForHTML(currentPage.getName()) : xssAPI.encodeForHTML(currentPage.getTitle()) %></title>

    <%--<cq:include path="redirect" resourceType="foundation/components/redirect"/>--%>


    <cq:include script="headCommons.jsp"/>

</head>
