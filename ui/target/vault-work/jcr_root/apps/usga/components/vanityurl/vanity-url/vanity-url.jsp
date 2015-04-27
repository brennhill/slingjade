<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false"%>

<p style="padding:10px 0;">
	<b>Page: </b>${properties.pagePath}
	<br/>
    <c:forEach items="${properties.vanityUrls}" var="vanityUrl">
        <b>Vanity URL: </b>${vanityUrl}<br/>
    </c:forEach>
</p>
