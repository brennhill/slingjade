<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.page.SocialAdminPage" var="socialAdminPage"/>

<script type="text/stache" id="socialAdminTemplate">
    <!-- Header -->
    <div class="header">
        <div class="container">
            <img src="/etc/designs/usga/socialadmin/img/logo.png" alt=""/>
        </div>
    </div>
    <!-- Header end -->
    <!-- Content -->
    <div class="wrapper">
        <div class="container">
            <div class="holder">
                <div class="module social-module">
                    <div class="col">
                        <div class="col-title">
                            Aggregated Source
                        </div>
                        <div class="col-content col-aggregated">
                            {{#each aggregated}}
                            <div class="element" id="{{_id}}" {{data 'item'}} {{#if isPosted}}style="display: none;"{{/if}}>
                            <div class="element-control">
                                <a href="#" class="item" can-click="onAdd">Add</a>
                            </div>
                            <div class="element-content">
                                <div class="inner">
                                    <div class="title">
                                        <span class="social {{getSocialName}}"></span> {{account}} <span class="date">{{getPublishDate}}</span>
                                    </div>
                                    <div class="clearfix">
                                        {{#if image}}
                                        <div class="image">
                                            <img src="{{image}}" alt=""/>
                                        </div>
                                        {{/if}}
                                        <div class="text">
                                            <p>{{description}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{/each}}
                    </div>
                </div>
                <div class="col">
                    <div class="col-title">
                        Posted Feed
                    </div>
                    <div class="col-content col-posted">
                        {{#each posted}}
                        <div class="element" id="{{_id}}">
                            <div class="element-content">
                                <div class="inner">
                                    <div class="title">
                                        <span class="social {{getSocialName}}"></span> {{account}} <span class="date">{{getPublishDate}}</span>
                                    </div>
                                    <div class="clearfix">
                                        {{#if image}}
                                        <div class="image">
                                            <img src="{{image}}" alt=""/>
                                        </div>
                                        {{/if}}
                                        <div class="text">
                                            <p>{{description}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="element-control">
                                <a href="#" class="item" can-click="onRemove">Remove</a>
                                <a href="#" class="item edit-categories" can-click="onEdit">Edit Categories</a>
                                <div class="popup edit-categories-popup">
                                    <form action="#">
                                        <div class="clearfix">
                                            <div class="popup-col">
                                                <p>Categories</p>
                                                <select multiple size="4" class="categories">
                                                    {{#if ../editableItem.categories}}
                                                    {{#listCategories}}
                                                    <option value="{{key}}" {{#if selected}} selected{{/if}}>{{name}}</option>
                                                    {{/listCategories}}
                                                    {{/if}}
                                                </select>
                                            </div>
                                            <div class="popup-col">
                                                <p>Sub Categories</p>
                                                <select multiple size="4" class="sub-categories">
                                                    {{#if ../editableItem.subCategories}}
                                                    {{#listSubCategories}}
                                                    <option value="{{key}}" {{#if selected}} selected{{/if}}>{{name}}</option>
                                                    {{/listSubCategories}}
                                                    {{/if}}
                                                </select>
                                            </div>
                                        </div>
                                        <input class="popup-button" type="button" value="Save" can-click="onEditUpdate" />
                                        <input class="popup-button" type="reset" value="Cancel" can-click="onEditCancel" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        {{/each}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- Content end -->
    <!-- Shelf -->
    <div class="bottom-shelf">
        <div class="container">
            <input type="submit" class="button" value="Cancel" {{#unless isChanged}}disabled{{/if}} can-click="onCancel" />
            <input type="submit" class="button" value="Save" {{#unless isChanged}}disabled{{/if}} can-click="onSave" />
        </div>
    </div>
    <!-- Shelf end -->
</script>
<script src="/etc/designs/usga/socialadmin/js/social-admin.js"></script>

<c:set var="rootPagePath" value="${not empty pageProperties.rootPage ? usga:getFeedSelectorAdoptedPath(pageProperties.rootPage) : usga:getFeedSelectorAdoptedPath('/content/admin')}"/>

<script>
    var socialAdmin = new usga.SocialAdmin('#social-admin', {
        'methods': {
            'getAggregated': 'GET ${pageProperties.aggregatedFeed}',
            'getPosted': 'GET /bin/data/feeds/content.social.path_${rootPagePath}.ignoreCache_true.json',
            'updatePosted': 'POST /bin/data/feeds/social-content-pages?rootPage=${pageProperties.rootPage}'
        },
        'categories': {
            <c:forEach items="${socialAdminPage.primaryTagsList}" var="primaryTag" varStatus="status">
                ${primaryTag}${!status.last ? ", " : ""}
            </c:forEach>
        },
        'subCategories': {
            <c:forEach items="${socialAdminPage.secondaryTagsList}" var="secondaryTag" varStatus="status">
                ${secondaryTag}${!status.last ? ", " : ""}
            </c:forEach>
        }
    });
</script>