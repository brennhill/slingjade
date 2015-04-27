<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.vanityurlsviewing.VanityUrlsViewing"
               var="vanityPages"/>

<style>
    .wrapper {
        background: none repeat scroll 0 0 #efefef;
    }
</style>

<h2>List of pages with vanity redirect:</h2>

<ol>
    <c:forEach var="page" items="${vanityPages.pagesList}" varStatus="status">
        <li><usga:link path="${page.path}" target="_blank">${page.path}</usga:link>
            <br>
            <c:set var="vanitylinks" value="${widgets:getMultiFieldPanelValues(page.contentResource, 'vanitylinks')}"/>

            <c:choose>
                <c:when test="${not empty vanitylinks}">
                    List of shortners and parameters for this page:
                    <br>
                    <ul>
                        <c:forEach items="${vanitylinks}" var="vanitylink">
                            <li>shortner: ${vanitylink['shortner']},
                                parameters: ${not empty vanitylink['params'] ? vanitylink['params'] : '--'}</li>
                        </c:forEach>
                    </ul>
                </c:when>
                <c:otherwise>
                    There are no shortners and parameters for this page yet.
                    <br>
                </c:otherwise>
            </c:choose>
        </li>
    </c:forEach>
</ol>