<div class="nav-search">
  <div class="nav-search__form clearfix">
    <input type="submit" value="" class="nav-search__form__btn">
    <div class="nav-search__form__field">
      <input type="text">
    </div>
  </div>
  <div class="nav-search__result"></div>
</div>
<script id="nav-search-results-template" type="text/stache">
<div class="nav-search__suggest {{#unless suggestion}}no-title{{/unless}}">
    <a href="{{resultLinks.all}}" class="nav-search__more all">See All</a>
    {{#if suggestion}}
    <div class="nav-search__suggest__title">
        DID YOU MEAN:<a href="javascript:void(0);" class="nav-search__suggest__text" data-words="{{suggestion}}"> {{suggestion}}</a>?
    </div>
    {{/if}}
</div>
{{#if results.all.length}}
<a href="{{resultLinks.all}}" class="nav-search__category-title clearfix" data-type="all">
    <span class="nav-search__category-title__name">All</span> <span class="nav-search__more">All Results</span>
</a>
    <div class="nav-search__category-result">
        {{#each results.all}}
        <a href="{{uri}}" class="nav-search__category-result__item" {{protected}}>
            <div class="nav-search__category-result__item__title">{{title}}</div>
        </a>
        {{/each}}
    </div>
{{/if}}
{{#if results.news.length}}
<a href="{{resultLinks.news}}" class="nav-search__category-title clearfix" data-type="news">
    <span class="nav-search__category-title__name">News</span> <span class="nav-search__more">All Results</span>
</a>
    <div class="nav-search__category-result">
        {{#each results.news}}
        <a href="{{uri}}" class="nav-search__category-result__item" {{protected}}>
            <div class="nav-search__category-result__item__title">{{title}}</div>
        </a>
        {{/each}}
    </div>
{{/if}}
{{#if results.photos.length}}
<a href="{{resultLinks.photos}}" class="nav-search__category-title clearfix" data-type="photos">
    <span class="nav-search__category-title__name">Photos</span> <span class="nav-search__more">All Results</span>
</a>
    <div class="nav-search__category-result_media clearfix">
        {{#each results.photos}}
        <a href="{{uri}}" class="nav-search__category-result_media__item" {{protected}}>
            <img data-src="{{imageUrl}}" src="" alt="" data-crop="fill"/>
        </a>
        {{/each}}
    </div>
{{/if}}
{{#if results.videos.length}}
    <a href="{{resultLinks.videos}}" class="nav-search__category-title clearfix" data-type="videos">
        <span class="nav-search__category-title__name">Videos</span> <span class="nav-search__more">All Results</span>
    </a>
    <div class="nav-search__category-result_media clearfix">
        {{#each results.videos}}
            <a href="{{uri}}" class="nav-search__category-result_media__item" {{protected}}>
                <img data-src="{{imageUrl}}" src="" alt="" data-crop="fill"/>
            </a>
        {{/each}}
    </div>
{{/if}}
{{#if results.rules.length}}
    <a href="{{resultLinks.rules}}" class="nav-search__category-title clearfix" data-type="rules">
        <span class="nav-search__category-title__name">Rules of Golf</span> <span class="nav-search__more">All Results</span>
    </a>
    <div class="nav-search__category-result">
        {{#each results.rules}}
            <a href="{{uri}}" class="nav-search__category-result__item" {{protected}}>
                <div class="nav-search__category-result__item__title">{{title}}</div>
            </a>
        {{/each}}
    </div>
{{/if}}
<a href="{{resultLinks.all}}" class="nav-search__all-results clearfix">
    <span class="nav-search__more">See All Results</span>
</a>
</script>