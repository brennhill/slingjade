<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<%@ page import="org.apache.sling.servlets.post.HtmlResponse,
            com.usga.services.replication.ReplicationProcessor" %>
<%
    String path = slingRequest.getParameter("path");
    ReplicationProcessor replicationProcessor = sling.getService(ReplicationProcessor.class);
    HtmlResponse htmlResp = replicationProcessor.process(path, slingRequest.getResourceResolver());
    if (htmlResp != null) {
        htmlResp.send(response, true);
    }
%>