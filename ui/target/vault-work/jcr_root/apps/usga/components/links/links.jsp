<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <c:if test="${not empty properties.sectionTitle}">
    <h1 id="title22" class="title title_top">
        ${properties.sectionTitle}
        <c:if test="${not empty properties.sectionDescription}">
        <span class="title__under">
            ${properties.sectionDescription}
            <span class="title__under__by"></span>
        </span>
        </c:if>
    </h1>
    </c:if>
    <div class="links" id="links">
        <div class="links__container">
            <c:if test="${not empty properties.contentText}">
            <div class="links__container__rules">
                ${properties.contentText}
            </div>
            </c:if>
            <%request.setAttribute("restrictedParsysAllowedChildren", new String[]{"*/linkBox"});%>
            <%request.setAttribute("restrictedParsysEmptyText", "Drag or add Link components here.");%>
            <cq:include path="linksPar" resourceType="usga/components/restrictedParsys"/>
        </div>
    </div>
</div>

<script>
var links = new usga.BaseCloudinaryModule('#links');
</script>