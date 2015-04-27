<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <h1 id="title2" class="title title_underline">
        ${properties.sectionTitle}
        <span class="title__under">
            ${properties.sectionDescription}
        </span>
    </h1>
    <div id="championshipsSlider" class="championships clearfix">
        <ul class="championships__slider">
            <c:forEach var="index" begin="1" end="${properties.numberChamps}">
                <li class="championships__slider__item">
                    <cq:include path="championshipItem_${index}"
                                resourceType="usga/components/usgaChampionships/championshipItem"/>
                </li>
            </c:forEach>
        </ul>
    </div>
    <script>var championships = new usga.Championships('#championshipsSlider');</script>
</div>