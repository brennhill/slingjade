<%--

    This is a simple page component using JSP that extends the foundation page component.

--%>

<%@ include file="/apps/usga/global.jspx" %>

<body>
    <div id="fb-root"></div>
    <cq:include script="analytics.jsp"/>
    <cq:include script="header.jsp"/>
    <cq:include script="content.jsp"/>
    <cq:include script="footer.jsp"/>
</body>
<wcmmode:edit>
<cq:include path="timing" resourceType="foundation/components/timing"/>
</wcmmode:edit>