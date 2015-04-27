<%--
  updated new.jsp to show emptyText.

--%><%@ page session="false" import="
    com.day.cq.wcm.api.components.EditContext,
    com.day.text.Text,
    org.apache.sling.api.resource.Resource,
    com.day.cq.wcm.commons.WCMUtils" %><%

     EditContext editContext = WCMUtils.getComponentContext(request).getEditContext();
    if (editContext != null) {
        if (editContext.getParent() != null) {
            Resource curRes = (Resource) editContext.getParent().getAttribute("currentResource");
            if (curRes != null) {
                String prev = Text.getName(curRes.getPath());
                editContext.getEditConfig().setInsertBehavior("before " + prev);
            }
        } 
        editContext.getEditConfig().setEmpty(true);

    }

%>
