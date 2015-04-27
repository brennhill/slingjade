<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<sling:adaptTo adaptable="${resource}" adaptTo="javax.jcr.Node" var="comp"/>

<c:choose>
    <c:when test="${'usga/components/links' eq usga:getPropertyString(comp.parent.parent, 'sling:resourceType')}">
        <div class="links__container__item">
            <usga:link path="${properties.destination}" classes="links__container__item__title" target="${properties.newWindow}">
                ${properties.sectionTitle}
            </usga:link>
            <div class="links__container__item__description clearfix">
                <c:if test="${properties.linkType && not empty properties.image}">
                    <usga:link path="${properties.destination}" target="${properties.newWindow}">
                        <usga:data-img src="${properties.image}" alt=""/>
                    </usga:link>
                </c:if>
                <p>${properties.sectionDescription}</p>
            </div>
        </div>
    </c:when>
    <c:otherwise>
        <wcmmode:edit>
            <span style="color: red; font-size: 20px;">Wrong parent container. Please, use links container</span>
        </wcmmode:edit>
    </c:otherwise>
</c:choose>





