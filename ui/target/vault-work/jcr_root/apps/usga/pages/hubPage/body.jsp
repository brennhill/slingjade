<%--

    This is a simple page component using JSP that extends the foundation page component.

--%>

<%@ include file="/apps/usga/global.jspx" %>

<body>
    <cq:include script="analytics.jsp"/>
    <%
      com.day.cq.wcm.api.WCMMode mode = com.day.cq.wcm.api.WCMMode.fromRequest(request);
      com.day.cq.wcm.api.WCMMode.DISABLED.toRequest(request);
    %>
    <cq:include script="header.jsp"/>
    <% mode.toRequest(request); %>
    <cq:include script="content.jsp"/>
    <% com.day.cq.wcm.api.WCMMode.DISABLED.toRequest(request); %>
    <cq:include script="footer.jsp"/>
    <% mode.toRequest(request); %>
</body>
