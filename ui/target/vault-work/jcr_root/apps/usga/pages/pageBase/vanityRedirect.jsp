<%@page session="false" %>
<%--
  Copyright 1997-2008 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Redirect content script.

  Displays the redirected url as link if present.

  ==============================================================================

--%><%@page session="false"
            contentType="text/html; charset=utf-8"
            import="com.day.cq.commons.Doctype,
                    com.day.cq.wcm.api.WCMMode,
      				      com.day.cq.wcm.api.Page,
      				      com.usga.services.rewriters.LinkRewriter,
                    org.apache.commons.lang.StringUtils,
                    com.day.cq.wcm.foundation.ELEvaluator" %>
<%@ include file="/apps/usga/global.jspx" %>
<%	String path = slingRequest.getRequestURI();
    String[] pathArr = path.split("/");
    if (pathArr.length > 0) {
        pageContext.setAttribute("shortner", pathArr[pathArr.length-1]);
    }
    String pagePath = currentPage.getPath();
 	  Page target = pageManager.getPage(currentPage.getPath());
 	  LinkRewriter rewriter = sling.getService(LinkRewriter.class);
 	  pagePath = rewriter.rewrite(pagePath, slingRequest) + ".html";
    String title = target == null ? pagePath : target.getTitle();
%>

<c:set var="vanitylinks" value="${widgets:getMultiFieldPanelValues(resource, 'vanitylinks')}"/>

<c:set var="params" value=""/>

<c:if test="${not empty shortner}">
    <c:forEach items="${vanitylinks}" var="vanitylink">
        <c:if test="${shortner eq vanitylink['shortner']}">
            <c:if test="${not empty vanitylink['params']}">
                <c:set var="params" value="?${vanitylink['params']}"/>
            </c:if>
            </script>
        </c:if>
    </c:forEach>
</c:if>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=<%= xssAPI.getValidHref(pagePath) %>${params}">

    <script type="text/javascript">
        document.location.replace("<%= xssAPI.getValidHref(pagePath) %>${params}");
    </script>

    <title>Page Redirection</title>
</head>
<body>
<p class="cq-redirect-notice">If you are not redirected automatically, follow the
    <a href="<%= xssAPI.getValidHref(pagePath) %>${params}"><%= xssAPI.filterHTML(title) %>
    </a></p>
</body>
</html>
