<%--
Detects if we really have a vanity url or not.
--%>
<%@ page import="org.apache.sling.api.resource.Resource, com.day.cq.wcm.api.Page" %><%
String pageType = "cq:Page";
String USGAroot = "/content/usga/";
Boolean isError = true;
String componentPath = "";
String pagetitle="";
String mappedPath = "";
Page targetPage;
String componentType = ""; 
Resource pageRes = resourceResolver.resolve(slingRequest.getRequestURI());

if(pageRes!=null && pageRes.getResourceType().equals(pageType)) { 
  String path =  pageRes.getPath(); 
  if(path.contains(USGAroot)) {
    isError=false;
    componentPath = "/"+path;
	  mappedPath = resourceResolver.map(componentPath);
	  targetPage = pageRes.adaptTo(Page.class);
    componentType = targetPage.getContentResource().getResourceType();
    pagetitle= targetPage.getTitle();
  }
}

%><%=mappedPath %>
