<%@ include file="/apps/usga/global.jspx" %>
<%@ page import="com.usga.services.config.SSOConfigService,com.usga.services.config.ClientlibVersionService,com.day.cq.commons.Externalizer" %>
<%
  ClientlibVersionService versionConfig = sling.getService(ClientlibVersionService.class);
  String version = "undefined";
  if(versionConfig!=null){
    version = versionConfig.getVersion();
    pageContext.setAttribute("clientlibVersion", version);
  }
%>
<%
  SSOConfigService ssoConfig = sling.getService(SSOConfigService.class);
  String gigyaApiKey;
  if(ssoConfig!=null){
    gigyaApiKey = ssoConfig.getGigyaKey();
    pageContext.setAttribute("gigyaKey", gigyaApiKey);
  }
%>