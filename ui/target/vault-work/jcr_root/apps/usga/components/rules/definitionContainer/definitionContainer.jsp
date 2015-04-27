<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="inner">
    <div id="definitionSliders" class="definition clearfix">
        <div class="definition__item__outer">
            <cq:include path="rulesOfTheDay" resourceType="/apps/usga/components/rules/definitionSlider"/>
        </div>
        <div class="definition__item__outer">
            <cq:include path="trendingDefinitions" resourceType="/apps/usga/components/rules/definitionSlider"/>
        </div>
    </div>
    <script>var definitions = new usga.Definitions('#definitionSliders');</script>
</div>