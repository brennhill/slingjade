<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<script type="text/stache" id="faqForm">
<div class="faq__content__form">
    <div class="clearfix">
        <div class="faq__content__form__dropdown dropdown-white dropdown-categories">
            <select class="dropdown"></select>
        </div>
        <div class="faq__content__form__dropdown dropdown-white dropdown-questions">
            <select {{#unless questions}}disabled="disabled"{{/unless}} class="dropdown">></select>
        </div>
    </div>
    {{#if selectedQuestion}}
        <div class="faq__content__question">
            <div class="faq__content__question__text">
                <p>{{{selectedQuestion.question}}}</p>
            </div>
            <div class="faq__content__question__answer">
                <p>{{{selectedQuestion.answer}}}</p>
            </div>
        </div>
    {{/if}}
    {{#unless selectedQuestion}}
        {{#if neutralMessage}}
            <div class="faq__content__question">
                {{{neutralMessage}}}
            </div>
        {{/if}}
    {{/unless}}
</div>
</script>

<div id="faq" class="faq">
    <div class="faq__title">
        <div class="faq__title__full">FREQUENTLY ASKED QUESTIONS</div>
        <div class="faq__title__short">FAQ</div>
    </div>
    <div class="faq__content dropdown-white"></div>
</div>

<script>
    var faq = new usga.FAQ('#faq', <cq:include script="faq.categories.jsp"/>);
</script>