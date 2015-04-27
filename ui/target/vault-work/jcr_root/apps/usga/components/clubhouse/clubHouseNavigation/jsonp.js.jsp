<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" trimDirectiveWhitespaces="true" %>
<%@page import="org.apache.commons.codec.binary.Base64, com.day.cq.commons.Externalizer" %>
  <% request.setAttribute("JSONP", true); %>
  <cq:include script="clubHouseNavigation.jsp"/>
