<%@ include file="/apps/usga/global.jspx" %>

<script type="text/stache" id="latestTemplate">
    <div class="latest-box__inner">
        {{#unless options.hideFilters}}
            <div id="latestFilter" class="latest-filter clearfix">
                {{#if categories}}
                    {{#unless options.hideCategoriesFilter}}
                        <div class="latest-filter__categories dropdown-light">
                            <select class="latest-filter__categories__select" can-value="category">
                                <option value="all">All Categories</option>
                                {{#each categories}}
                                    <option value="{{@key}}">{{.}}</option>
                                {{/each}}
                            </select>
                        </div>
                    {{/unless}}
                {{/if}}
                {{#unless options.hideChannelsFilter}}
                    <ul class="latest-filter__tags{{#unless options.hideCategoriesFilter}} pull-right{{/unless}}">
                        {{#each availableChannels}}
                            <li class="latest-filter__tags__item">
                                <a href="#" data-channel="{{@key}}" class="latest-filter__tags__item__link">{{.}}</a>
                            </li>
                        {{/each}}
                    </ul>
                {{/unless}}
            </div>
        {{/unless}}
        <div class="latest-box__inner__items">
            {{#if isLoading}}
                <div class="latest-box__inner__items__progres">Loading</div>
            {{/if}}
            {{#unless items.length}}
                {{^isLoading}}
                    <div class="latest-box__inner__items__progres">No results</div>
                {{/isLoading}}
            {{/unless}}
            {{#each items}}
                {{#if is_twitter}}
                    {{>latestTwitterCardTemplate}}
                {{else}}
                    {{>latestCardTemplate}}
                {{/if}}
            {{/each}}
        </div>
        {{#if options.moreLinkUrl}}
            <div class="frame__wide">
                <div class="more">
                    <a href="{{options.moreLinkUrl}}" class="more__link">
                        <span>MORE IN </span>{{options.moreLinkText}}<span>&raquo;</span>
                    </a>
                </div>
            </div>
        {{/if}}
        {{#unless options.hideShowMoreButton}}
            <div class="show-more">
                <div class="show-more__button">SHOW MORE</div>
            </div>
        {{/unless}}
    </div>
</script>
<script type="text/stache" id="latestCardTemplate">
    <div class="block__card{{#if render_as_article}} block__card_article{{/if}}{{#if network}} block__card__social block__card_{{network}}{{/if}} {{^media}}block__card-no-img{{/media}} {{#if network}}{{^media}}block__card_{{network}}-no-img{{/media}}{{/if}}">
        <div class="block__card__inner">
            {{#if grad}}
                <span class="block__card2__media-grad"></span>
            {{/if}}
            {{#if media}}
                <a class="block__card__media" href="{{contentUrl}}">
                    {{#if media}}
                        <div class="block__card__media__inner">
                            <img data-src="{{{media}}}" data-crop="fill"{{#if is_social}} data-type="fetch"{{/if}} alt="" />
                        </div>
                        {{#unless is_instagram}}
                            <div class="block__card__media__gradient"></div>
                        {{/unless}}
                        {{#if is_video}}
                            <div class="video">
                                <div class="icon"></div>
                            </div>
                        {{/if}}
                    {{/if}}
                </a>
            {{/if}}
            {{#if above2}}
                {{#unless above_img}}
                    <span class="block__card__title-above">{{{above2}}}</span>
                {{/unless}}
            {{/if}}
            {{#if above}}
                {{#unless above_img}}
                    <span class="block__card__title-above">{{{above}}}</span>
                {{/unless}}
            {{/if}}
            {{#if above_img}}
                {{#if is_social}}
                    <a{{#if networkPageUrl}} href="{{networkPageUrl}}"{{/if}} class="block__card__title-above block__card__title-above-social">
                        <span class="block__card__title-above__img"></span>
                        {{#if above2}}
                            {{above2}}
                        {{/if}}
                    </a>
                {{/if}}
                {{#unless is_social}}
                    <span class="block__card__title-above">
                        <span class="block__card__title-above__img"></span>
                        {{#if above2}}
                            {{above2}}
                        {{/if}}
                    </span>
                {{/unless}}
            {{/if}}
            {{#if title}}
                {{#unless is_twitter}}
                    <a href="{{contentUrl}}" class="block__card__title">{{{title}}}</a>
                {{/unless}}
                {{#if is_twitter}}
                    <span class="block__card__title">{{{title}}}</span>
                {{/if}}
            {{/if}}
            {{#if title_locked}}
                <span class="block__card__title locked">{{{title_locked}}}</span>
            {{/if}}
            {{#if title_unlocked}}
                <span class="block__card__title unlocked">{{{title_unlocked}}}</span>
            {{/if}}
            {{#if text}}
                <span class="block__card__text">{{{text}}}</span>
            {{/if}}
            {{#if created}}
                <span class="block__card__time">{{{created}}}</span>
            {{/if}}
            {{#if follow}}
                {{#if is_twitter}}
                    <div class="block__card__follow">
                        <a class="twitter-share-button" data-url="{{contentUrl}}" data-text="follow" data-count="none" data-hashtags="usga" href="https://twitter.com/share">Tweet</a>
                        <a class="twitter-follow-button" data-show-count="false" data-show-screen-name="false" href="https://twitter.com/usga">Follow</a>
                        <div {{renderTweetButtons}}></div>
                    </div>
                {{/if}}
                {{#if is_facebook}}
                    <div class="block__card__follow">
                        <div {{renderFacebookButtons}} class="fb-like" data-href="{{contentUrl}}" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
                    </div>
                {{/if}}
            {{/if}}
        </div>
    </div>
</script>
<script type="text/stache" id="latestTwitterCardTemplate">
    <div class="block__card{{#if render_as_article}} block__card_article{{/if}} block__card__social block__card_twitter {{^media}}block__card_twitter-no-img{{/media}}">
	    <div class="block__card__inner">
            {{#if above_img}}
                <a{{#if networkPageUrl}} href="{{networkPageUrl}}"{{/if}} class="block__card__title-above block__card__title-above-social">
                    <span class="block__card__title-above__img"></span>
                    {{#if above2}}
                        {{above2}}
                    {{/if}}
                </a>
            {{/if}}
            <a class="block__card__content_url" href="{{contentUrl}}">
                {{#if media}}
                    <div class="block__card__media">
                        {{#if media}}
                            <div class="block__card__media__inner">
                                <img data-src="{{{media}}}" data-crop="fill" data-type="fetch" alt="" />
                            </div>
                            <div class="block__card__media__gradient"></div>
                        {{/if}}
                    </div>
                {{/if}}
                {{#if title}}
                    <span class="block__card__title">{{{title}}}</span>
                {{/if}}
            </a>
            <div class="block__card__follow">
                <a class="twitter-share-button" data-url="{{contentUrl}}" data-text="follow" data-count="none" data-hashtags="usga" href="https://twitter.com/share">Tweet</a>
                <a class="twitter-follow-button" data-show-count="false" data-show-screen-name="false" href="https://twitter.com/usga">Follow</a>
                <div {{renderTweetButtons}}></div>
            </div>
        </div>
    </div>
</script>