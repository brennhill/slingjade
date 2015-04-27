<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.latest.Latest" var="latest"/>
<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.usga.components.models.latest.CategoriesAndSubCategoriesOfCurrentPage" var="categoriesOfCurrentPage"/>

<cq:include script="templates.jsp"/>


<div id="latest" class="latest-box"></div>

<script>
    var latest = new usga.Latest('#latest', {
        channels: {
            everything: '${latest.everything}',
            news: '${latest.news}',
            videos: '${latest.videos}',
            photos: '${latest.photos}',
            social: '${latest.social}'
        },
        limit: ${not empty latest.limit ? latest.limit : 0},
        adaptItems: ${latest.adaptItems},
        moreLinkUrl: '${latest.moreLinkUrl}',
        category: '${categoriesOfCurrentPage.category}',
        subCategory: '${latest.hideSubCategory ? '' : categoriesOfCurrentPage.subCategory}',
        categories: {
            <c:forEach items="${latest.categories}" var="categoryTag" varStatus="status">
            ${categoryTag}${!status.last ? ", " : ""}
            </c:forEach>
        },
        hideFilters: ${latest.hideAllFilters},
        hubMode: ${latest.hubmode=='true'},
        hubType:'${empty latest.hubtype ? 'long' : latest.hubtype}',
        hideCategoriesFilter: ${latest.hideCategoriesFilter},
        hideChannelsFilter: ${latest.hideChannelsFilter},
        hideShowMoreButton: ${latest.hideShowMoreButton == 'true'},
        defaultChannel: '${empty latest.defaultChannel ? 'everything' : latest.defaultChannel}',
        hubLongModeLimit: 22,
        hubShortModeLimit: 10,
        hubSmallLongModeLimit: 9,
        hubSmallShortModeLimit: 7,
        hubLongModeShowMoreCount: 20,
        hubShortModeShowMoreCount: 8,
        hubSmallLongModeShowMoreCount: 8,
        hubSmallShortModeShowMoreCount: 6,
        editorialFeed:'${latest.nodePath}.data.json',
        facebookPageUrl: 'https://www.facebook.com/USGA',
        twitterPageUrl: 'https://twitter.com/usga'
    });
</script>
