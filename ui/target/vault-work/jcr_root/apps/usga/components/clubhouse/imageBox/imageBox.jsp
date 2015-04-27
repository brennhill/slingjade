<%@ include file="/apps/usga/global.jspx" %>

<c:set var="CH_IMG_BOX_MODULE_ID"><usga:unique-id varName="CH_IMG_BOX_MODULE_ID"/></c:set>

<h1 id="title15" class="title title_only">
    ${properties.title}
    <span class="title__under"><span class="title__under__by"></span></span>
</h1>

<div id="imagebox_${CH_IMG_BOX_MODULE_ID}" class="image-box underline">
    <div class="clearfix">
        <cq:include script="iterateBoxes.jsp"/>
    </div>
    <c:if test="${(not empty properties.moreLink) && (not empty properties.moreLinkText)}">
    <div class="more">
        <usga:link path="${properties.moreLink}" target="${properties.moreLinkNewWindow}" classes="more__link">
            <span>MORE IN </span>${properties.moreLinkText} <span>&#187;</span>
        </usga:link>
    </div>
    </c:if>
</div>

<script>
    var imagebox = new usga.BaseCloudinaryModule('#imagebox_${CH_IMG_BOX_MODULE_ID}')
</script>