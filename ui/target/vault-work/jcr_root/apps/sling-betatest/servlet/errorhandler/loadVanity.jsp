<%--
load page.
--%>
<html lang="en-US">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=<%= mappedPath+".html" %>">
    <script type="text/javascript">
        document.location.replace("<%= mappedPath+".html" %>");
    </script>
    <title>Page Redirection</title>
</head>
<body>
<p class="cq-redirect-notice">If you are not redirected automatically, follow the
        <a href="<%=mappedPath+".html" %>"><%= xssAPI.filterHTML(pagetitle) %>
    </a></p>
</body>
</html>