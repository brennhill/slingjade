<%@ include file="/apps/usga/global.jspx" %>

<c:set var="moreFrom"><usga:unique-id varName="moreFrom"/></c:set>

<div class="inner">
    <h1 id="title20" class="title">
        ${properties.sectionTitle}
        <span class="title__under">${properties.subTitle}<span class="title__under__by"></span></span>
    </h1>

    <c:set var="banners" value="${widgets:getMultiFieldPanelValues(resource, 'banners')}"/>
    <!-- banner-->
    <div id="banner${moreFrom}" class="simple-list simple-list_mod1 banner">
        <c:forEach var="banner" items="${banners}">
            <usga:link path="${banner['linkUrl']}" target="${banner['newWindow']}"
                       classes="simple-list__item simple-list__item_mod1"
                       data="data-analytics-usgamore=\"${empty banner['analyticsName'] ? 'USGA More Promo' : banner['analyticsName']}\"">
            <usga:data-img src="${banner['linkImg']}" alt="" data-quality='90' classes="simple-list__item__img"/>
            </usga:link>
        </c:forEach>
    </div>
    <!-- end banner-->
    <script>var banner = new usga.BaseCloudinaryModule('#banner${moreFrom}');</script>
</div>