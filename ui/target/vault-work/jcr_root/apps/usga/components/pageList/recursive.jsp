<%@ include file="/apps/usga/global.jspx" %>
<ul>
  <c:forEach var="page" items="${page.subPages}">
	<c:set var="page" value="${page}" scope="request"/>
	  <li>
	    <c:choose>
	      <c:when test="${properties.leaves eq 'true'}">
          <c:choose>
            <c:when test="${page.hasChildren}">
              ${page.title}<c:if test="${page.hasChildren}"><cq:include script="recursive.jsp"/></c:if>
            </c:when>
            <c:otherwise>
              <usga:link path="${page.path}">${page.title}</usga:link> <c:if test="${page.hasChildren}"><cq:include script="recursive.jsp"/></c:if>
            </c:otherwise>
          </c:choose>
        </c:when>
        <c:otherwise>
          <usga:link path="${page.path}">${page.title}</usga:link> <c:if test="${page.hasChildren}"><cq:include script="recursive.jsp"/></c:if>
        </c:otherwise>
      </c:choose>
      </li>
  </c:forEach>
</ul>