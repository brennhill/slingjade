<%@include file="/libs/foundation/global.jsp" %>

<div class="wrapper">
    <div class="content">
        <div class="wide-block">
            <div class="search">
                <input type="text" name="" placeholder="Find a rule" class="search__input">
                <input type="submit" value="Search" class="search__button button button_color1">
            </div>
        </div>

        <div class="inner">
            <!-- section latest-->
            <!-- title-->
            <cq:include path="usgaTitle" resourceType="usga/components/generalTitle"/>
            <!-- end title-->
            <div id="blockRuleBook" class="rule-book">
                <div class="rule-book__side"></div>
                <div class="rule-book__content">
                    <div class="rule-book__content__filter">
                        <div class="rule-book__content__filter__item active ruleLinkDiv"><a href="javascript:void(0);"
                                                                                            id="ruleLink"
                                                                                            class="rule-book__content__filter__item__link">RULES</a>
                        </div>
                        <div class="rule-book__content__filter__item decisionLinkDiv"><a href="javascript:void(0);"
                                                                                         id="decisionLink"
                                                                                         class="rule-book__content__filter__item__link">DECISIONS</a>
                        </div>
                    </div>
                    <div class="rule-book__content__box">
                        <iframe width="100%" border="0" frameborder="0" name="contentIframe" height="800"
                                class="contentIframe"></iframe>
                    </div>
                    <div class="rule-book__content__nav"><a href="javascript:void(0);"
                                                            class="rule-book__content__nav__item left previousLink">PREVIOUS</a><a
                            href="javascript:void(0);" class="rule-book__content__nav__item right nextLink">NEXT</a>
                    </div>
                </div>
            </div>
            <script type="text/stache" id="ruleBookNavListTemplate">
            <div class="rule-book__side__mob-grab">
	<div class="rule-book__side__mob-grab__item">Rules of Play</div>
</div>
<div {{rendered}}>
    {{#sections}}
        <div class="rule-book__side__item">
            <div class="rule-book__side__item__section">{{title}}</div>
            {{#subsections}}
                {{#unless IsEmptyTitle}}
                <div class="rule-book__side__item__box__title">{{title}}</div>
                {{/unless}}

                {{#rules}}
                    <div class="rule-book__side__item__box">
                        <div class="rule-book__side__item__box__list rule-book__side__item__box__list_title rule{{itemId}}Title"><a href="javascript:void(0);" class="rule-book__side__item__box__list__link" itemId="{{itemId}}">{{text}}</a></div>
                        {{addNavId itemId}}
                        <div class="rule-book__side__item__box__list open sub off rule{{itemId}}Navigation">
                            <a href="javascript:void(0);" class="rule-book__side__item__box__list__link">{{text}}</a>
                            <div class="rule-book__side__item__box__list__block">
                                {{#ruleSubnavigations}}
                                <div class="rule-book__side__item__box__list__block__item">
                                    <div class="numeric">
                                        <a href="{{baseUrl}}rule-{{itemId}}.html{{url}}" target="contentIframe">{{hash}}</a>
                                    </div>
                                    {{title}}
                                </div>
                                {{/ruleSubnavigations}}
                            </div>
                        </div>
                        <div class="rule-book__side__item__box__list open sub off decision{{itemId}}Navigation">
                            <a href="javascript:void(0);" class="rule-book__side__item__box__list__link">{{text}}</a>
                            <div class="rule-book__side__item__box__list__block">
                                {{#decisionSubnavigations}}
                                <div class="rule-book__side__item__box__list__block__item">
                                    <div class="numeric">
                                        <a href="{{baseUrl}}decision-{{itemId}}.html{{url}}" target="contentIframe">{{hash}}</a>
                                    </div>
                                    {{title}}
                                </div>
                                {{/decisionSubnavigations}}
                            </div>
                        </div>

                    </div>
                {{/rules}}
            {{/subsections}}
        </div>
    {{/sections}}
</div>

            </script>
            <script>
                var blockRuleBook = new usga.RuleBook('#blockRuleBook', {
                    feedUrl: '${not empty pageProperties.ruleBookFeed ? pageProperties.ruleBookFeed : '/etc/designs/usga/data/am-stat-rule-decision.json'}',
                    baseUrl: '${not empty pageProperties.rulesLocation ? pageProperties.rulesLocation : '/etc/designs/usga/content/rule-book/am-stat/'}',
                    decisions: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                    urlMatches: {
                        ids: ['14331', '14362'],
                        aliases: ['definitions', 'appendix']
                    }
                });
            </script>
            <cq:include path="contentPar1" resourceType="foundation/components/parsys"/>
        </div>
    </div>
</div>

