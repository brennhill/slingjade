<%@ include file="/apps/usga/global.jspx" %>

<div id="searchRules" class="search-rules">
    <div class="search-rules__envelope">
        <div class="inner underline">
            <div class="search-rules__title">${properties.sectionTitle}</div>
            <div class="search-rules__text">${properties.sectionDescription}</div>

            <div class="row row_mod1 table">
                <div class="table__row">
                    <div class="table__row__cell">
                        <cq:include path="mostViewedVideo" resourceType="/apps/usga/components/contentBoxHeader"/>
                    </div>

                    <div class="table__row__cell space"></div>

                    <div class="table__row__cell quiz-holder">
                        <form action="" method="get" class="search-rules__form">
                            <input type="text" placeholder="Find a rule" class="search-rules__form__input"/>
                            <input type="submit" value="SEARCH" class="search-rules__form__submit button button_color1"/>
                        </form>
                    </div>

                    <div class="table__row__cell space"></div>
                    <div class="table__row__cell">
                        <cq:include path="rulesOfGolf" resourceType="/apps/usga/components/contentBoxHeader"/>
                    </div>
                </div>
            </div>
            <!-- more link-->
            <div class="more">
                <c:if test="${not empty properties.moreLinkDestination && not empty properties.moreLinkLabel}">
                    <usga:link path="${properties.moreLinkDestination}" classes="more__link" target="${properties.newWindow}">
                        ${properties.moreLinkLabel} <span>&raquo;</span>
                    </usga:link>
                </c:if>
            </div>

        </div>
    </div>
</div>

<script type="text/stache" id="quizTemplate">
    <div class="block__test quiz">
        <div class="block__test__title">{{title}}</div>
        <div class="block__test__text">
            {{question}}
        </div>
        <form action="" class="block__test__form">
            {{#each answers}}
                <div class="block__test__form__item">
                    <input id="quizAnswer{{@index}}" type="radio" name="rulesQuiz" class="block__test__form__item__input" {{#if correct}}data-correct="{{correct}}"{{/if}}>
                    <label for="quizAnswer{{@index}}" class="block__test__form__item__label">{{answer}}</label>
                </div>
            {{/each}}
            <input type="button" value="SUBMIT YOUR ANSWER" class="block__test__form__item__submit button button_color2">
        </form>
    </div>
    <div class="block__test result">
        <div class="block__test__title">{{title}}</div>
        <div class="block__test__text">
            {{question}}
        </div>
        <div class="block__test__answer-status correct">Correct</div>
        <div class="block__test__answer-status incorrect">Incorrect</div>
        <div class="block__test__text">{{&answerSummary}}</div>
        <div class="block__test__answer-title"><span>Correct answer</span></div>
        <div class="block__test__text">
            {{#each answers}}
                {{#if correct}}
                    <b>{{answer}}</b>
                {{/if}}
            {{/each}}
        </div>
    </div>

</script>

<script>
    var searchRules = new usga.SearchRules('#searchRules', {
        quizUrl: '/bin/data/feeds/quiz-rules.json'
    });
</script>
