<%--
  Copyright 2014- Omnigon/USGA

  ==============================================================================

  Config script.  Used to load settings from OSGI and set them as needed for the page and subcomponents..

  ==============================================================================

--%><%@page session="false"%>
<%@ include file="/apps/usga/global.jspx" %>

<%@page import="com.day.cq.wcm.api.WCMMode" %>
<%
    com.day.cq.wcm.api.WCMMode mode = com.day.cq.wcm.api.WCMMode.fromRequest(request);
    if((mode==com.day.cq.wcm.api.WCMMode.EDIT) ) { 
		pageContext.setAttribute("isEditMode", true, pageContext.REQUEST_SCOPE);
    } else {
        pageContext.setAttribute("isEditMode", false, pageContext.REQUEST_SCOPE);
    }
%>