<%@ page import="java.util.Calendar" %>
<%@ include file="/apps/usga/global.jspx" %>
<%
    if (Calendar.getInstance().after(properties.get("expires", Calendar.class))) {
%>

<wcmmode:disabled>
    <script>
        new usga.ClubhouseMembership('#membership', {
            delay: 10,
            expired: ${usga:toJson(properties)}
        });
    </script>
</wcmmode:disabled>
<%
} else {
%>
<cq:include path="teaser" resourceType="cq/personalization/components/teaser"/><%
    }
%>
