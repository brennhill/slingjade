<%@include file="/apps/usga/global.jspx" %>
<%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %>
<html>
<head>
    <link rel="stylesheet" href="/etc/designs/usga/styles/modules.min.css"/>
</head>
<body>
<h1>${properties['jcr:title']}</h1>
<table style="width: 600px;">
    <tr>
        <td colspan="2"><c:out value="${properties.longTitle}"/>
        </td>
    </tr>
    <tr>
        <td style="width: 50%; vertical-align: top"><cq:include path="left" resourceType="usga/components/text"/></td>
        <td style="width: 50%; vertical-align: top"><cq:include path="center" resourceType="usga/components/text"/></td>
    </tr>
</table>
<hr/>
</body>
</html>
