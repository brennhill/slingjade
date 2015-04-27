<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<c:if test="${properties.boxes > 0 }">
    <c:forEach var="index" begin="0" end="${properties.boxes - 1}" step="1" varStatus="loop">
        <c:choose>
            <c:when test="${loop.first && loop.last}">
                <c:set var="link" value="${properties.link}"/>
                <c:set var="imgLink" value="${properties.imgLink}"/>
                <c:set var="descr" value="${properties.boxDescription}"/>
                <c:set var="category" value="${properties.category}"/>
            </c:when>
            <c:otherwise>
                <c:set var="link" value="${properties.link[index]}"/>
                <c:set var="imgLink" value="${properties.imgLink[index]}"/>
                <c:set var="descr" value="${properties.boxDescription[index]}"/>
                <c:set var="category" value="${properties.category[index]}"/>
            </c:otherwise>
        </c:choose>

        <c:choose>
            <c:when test="${not empty link}">
                <usga:link path="${link}" target="_blank" classes="image-box__item">
                    <c:if test="${not empty imgLink}">
                        <usga:data-img src="${imgLink}" classes="image-box__item__image"/>
                    </c:if>

                    <div class="image-box__item__category">${category}</div>
                    <div class="image-box__item__description">${descr}</div>
                </usga:link>
            </c:when>
            <c:otherwise>
                <div class="image-box__item">
                    <c:if test="${not empty imgLink}">
                        <usga:data-img src="${imgLink}" classes="image-box__item__image"/>
                    </c:if>

                    <div class="image-box__item__category">${category}</div>
                    <div class="image-box__item__description">${descr}</div>
                </div>
            </c:otherwise>
        </c:choose>

    </c:forEach>
</c:if>