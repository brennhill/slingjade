<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <h1 id="title25" class="title">
        ${properties.sectionTitle}
        <span class="title__under">${properties.sectionDescription}</span>
    </h1>

    <div id="rulesResources" class="resources">
        <ul class="resources__slider">
            <c:forEach var="i" begin="1" end="${properties.numResources}" step="1">
                <li class="resources__slider__element">
                    <cq:include path="resource_${i}" resourceType="usga/components/rules/resourceItem"/>
                </li>
            </c:forEach>
        </ul>
    </div>
    <script>var resources = new usga.RulesResources('#rulesResources');</script>
</div>