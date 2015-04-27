<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" trimDirectiveWhitespaces="true" %>
<%@page import="org.apache.commons.codec.binary.Base64" %>

  <%-- Set attribute to let components know throughout navigation that this is a JSONP request and to use full URIs if needed --%>
  <% request.setAttribute("JSONP", true); %>
  <cq:include script="footerContainer.jsp"/>
