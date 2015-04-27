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

  Generic 404 error handler

  Important note:  
  Since Sling uses the user from the request (depending on the authentication
  handler but typically HTTP basic auth) to login to the repository and JCR/CRX
  will simply say "resource not found" if the user does not have a right to
  access a certain node, everything ends up in this 404 handler, both access
  denied ("401", eg. for non-logged in, anonymous users) and really-not-existing
  scenarios ("404", eg. logged in, but does not exist in repository).
  
--%><%
%><%@ page session="false" %><%
%><%@include file="/apps/usga/global.jspx" %>404<%
%><%@include file="vanityCheck.jsp"%><%
if(!isError) { %><%
  %><%@include file="loadVanity.jsp" %><%
} else { %>not error<%
  %><%@include file="real404.jsp"%><%
} %>