<%@include file="/libs/foundation/global.jsp" %>

<div class="wrapper">
    <div class="content">
        <div id="search-results" class="search-results">
                  <div class="search-results__form">
                    <div class="inner">
                      <div class="button button_color1">Search</div>
                      <div class="search-results__form__field">
                        <input type="text">
                      </div>
                    </div>
                  </div>
                  <div class="inner"></div>
                </div>
                <script id="search-results-template" type="text/stache"><div class="results{{#unless results}} no-results{{/unless}}{{#if error}} error{{/if}}">
            {{#if typedQuery}}
            <h1 id="title10" class="title title_full">
                Search Results <span class="title__under">{{resultsCount}} results for '{{typedQuery}}'{{#if foundOfType}} in '{{foundOfType}}'{{/if}}.</span>
            </h1>
            {{/if}}
            <div class="results__wrap clearfix">
            {{#unless error}}
                <div class="results__content">
                    {{#if typedQuery}}
                    <div class="results__content__header">
                        <ul class="results__content__header__list hide-small">
                            <li>
                                <a data-type="all" href="javascript:void(0);" class="results__content__header__list__item" data-label="All">All ({{documentsCount}})</a>
                            </li>
                            <li {{#unless facetCounts.news}}class="hidden"{{/unless}}>
                                <a data-type="news" href="javascript:void(0);" class="results__content__header__list__item" data-label="News">News ({{facetCounts.news.count}})</a>
                            </li>
                            <li {{#unless facetCounts.photos}}class="hidden"{{/unless}}>
                                <a data-type="photos" href="javascript:void(0);" class="results__content__header__list__item" data-label="Photos">Photos ({{facetCounts.photos.count}})</a>
                            </li>
                            <li {{#unless facetCounts.videos}}class="hidden"{{/unless}}>
                                <a data-type="videos" href="javascript:void(0);" class="results__content__header__list__item" data-label="Videos">Videos ({{facetCounts.videos.count}})</a>
                            </li>
                        </ul>
                        <div class="results__content__header__dropdown dropdown-dark show-small">
                            <select class="dropdown" can-value="type">
                                <option value="all">All</option>
                                {{#if facetCounts.news}}
                                    <option value="news">News</option>
                                {{/if}}
                                {{#if facetCounts.photos}}
                                    <option value="photos">Photos</option>
                                {{/if}}
                                {{#if facetCounts.videos}}
                                    <option value="videos">Videos</option>
                                {{/if}}
                            </select>
                        </div>
                    </div>
                    {{/if}}
                    {{#if results}}
                    <div class="results__content__list">
                        {{#each results}}
                        <div class="results__content__list__item">
                            <div class="results__content__list__item__title">
                                <a href="{{uri}}" {{protected}}>{{{title}}}</a>
                                <span class="results__content__list__item__body">{{{text}}}</span>
                            </div>
                            <div class="results__content__list__item__meta">
                                {{type}} |<a href="{{uri}}" {{protected}}>{{shortUrl}}</a>
                            </div>
                        </div>
                        {{/each}}
                    </div>
                    {{/if}}
                    {{#if typedQuery}}
                    <paginator></paginator>
                    {{/if}}
                </div>
            {{/unless}}
            </div>
        </div>

        {{#if error}}{{#with error}}
        <div class="search-results__error">
            <div class="icon-ball"></div>
            <div class="search-results__error__text">{{{title}}}<br/>{{{message}}}</div>
        </div>
        {{/with}}{{/if}}

                </script>
                <script id="search-paginator-template" type="text/stache"><div class="results__content__pagination">
            <a href="javascript:void(0);" class="{{#unless paginator.canPrev}}hidden {{/unless}}results__content__pagination__prev results__content__pagination__nav_link" can-click="paginator.prev">PREVIOUS</a>
            {{#if paginator.count}}
                {{#pages}}
                    <a data-page="{{page}}" href="javascript:void(0);" {{activePageLink page}}>{{page}}</a>
                {{/pages}}
            {{/if}}
            <a href="javascript:void(0);" class="{{#unless paginator.canNext}}hidden {{/unless}}results__content__pagination__next results__content__pagination__nav_link" can-click="paginator.next">NEXT</a>
        </div>
</script>

        <script>var searchResults = new usga.SearchResults('#search-results');</script>

    </div>
    <!--content-->
</div>
<!--wrapper-->
