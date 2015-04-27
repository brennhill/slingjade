<%@ include file="/apps/usga/global.jspx" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.latest.Latest" var="latest"/>
<%@page contentType="application/json"%>
{
    "items": [
        <c:forEach var="item" items="${latest.overrideFeedItems}" varStatus="status">
        {
            "id": "${item.id}",
            "type": "${item.type}",
            "title": "${item.title}",
            "description": "${item.description}",
            "link": "${item.link}",
            "image": "${item.image}",
            "categories": [
                <c:forEach items="${item.categories}" var="categoryTag" varStatus="categoryStatus">
                "${categoryTag}"${!categoryStatus.last ? ", " : ""}
                </c:forEach>
            ],
            "subCategories":[
             <c:forEach items="${item.subCategories}" var="subcategoryTag" varStatus="subcategoryStatus">
                "${subcategoryTag}"${!subcategoryStatus.last ? ", " : ""}
             </c:forEach>
            ]
            <c:if test="${item.publishDate!=null}">,
            "publishDate": ${item.publishDate.time}
             </c:if>
        }${!status.last ? ", " : ""}
        </c:forEach>
    ]
}