<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}"
               adaptTo="com.usga.components.models.clubhouse.eventdetails.ClubhouseEventDetailsList"
               var="eventDetailsList"/>

<div id="event" class="event">
    <div class="campaign_content">
        <div class="event__media">
            <div class="event__media__bg">
                <div class="event__media__bg__inner">
                    <usga:data-img src="${eventDetailsList.bgImage}" alt="${eventDetailsList.bgImage}"
                                   data-crop="fill"/>
                </div>
            </div>
            <div class="gradient_blur"></div>
        </div>
        <div class="inner inner__tabbable">
            <div id="joinSliderMembership" class="box-main_slider box-main_slider_event swiper-container">
                <div class="slider-wrapper">
                    <ul class="main_slider main_slider_join swiper-wrapper">
                        <li class="main_slider__item swiper-slide">
                            <div class="main_slider__item__box main_slider__item__box_mod1">
                                <div class="main_slider__item__box__title">${eventDetailsList.pageTitle}</div>
                                <div class="main_slider__item__box__text">${eventDetailsList.pageDescription}</div>
                            </div>
                        </li>
                    </ul>
                    <div id="slider-menu_join" class="slider-menu">
                        <div class="slider-menu__item">
                            <a href="javascript:void(0)" data-slide-index="0"
                               class="slider-menu__item__link">${eventDetailsList.pageTitle}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container"></div>
        </div>
    </div>
</div>
<div id="profileInformationModal" style="display: none" class="modal modal_big"></div>
<script id="profileInformationModalTemplate" type="text/stache">
    <div class="modal__body">
        <div class="modal__body__close"></div>
        <div class="modal__body__header">Profile Information</div>
        <div class="modal__body__content">
            <p>Please update your profile in order to continue:</p>
            {{#if status}}
            <div class="status">
                {{{status}}}
            </div>
            {{/if}}
            <div class="form">
                <div class="cols-2 clearfix">
                    <div class="col">
                        <p class="hint">First Name</p>
                        <input type="text" name="firstName" can-value="profile.firstName">
                    </div>
                    <div class="col">
                        <p class="hint">Last Name</p>
                        <input type="text" name="lastName" can-value="profile.lastName">
                    </div>
                </div>
                <div class="cols-2 clearfix">
                    <div class="col">
                        <p class="hint">Address 1</p>
                        <input type="text" name="address1" can-value="profile.address1">
                    </div>
                    <div class="col">
                        <p class="hint">Address 2</p>
                        <input type="text" name="address2" can-value="profile.address2">
                    </div>
                </div>
                <div class="cols-2 clearfix">
                    <div class="col">
                        <p class="hint">City</p>
                        <input type="text" name="city" can-value="profile.city">
                    </div>
                    <div class="col">
                        <p class="hint">State/Province</p>
                        <select name="state" can-value="profile.state">
                            {{#each countryStates}}
                            <option value="{{code}}">{{{name}}}</option>
                            {{/each}}
                        </select>
                    </div>
                </div>
                <div class="cols-2 clearfix">
                    <div class="col">
                        <p class="hint">Country</p>
                        <select name="country" can-value="profile.country">
                            <option>US</option>
                            <option>Canada</option>
                        </select>
                    </div>
                    <div class="col">
                        <p class="hint">Zip/Postal Code</p>
                        <input type="text" name="zip" can-value="profile.zip">
                    </div>
                </div>
            </div>
            <a class="button button_color1 update-button">Update</a>
        </div>
    </div>

</script>
<div id="askQuestionModal" style="display: none" class="modal modal_big"></div>
<script id="askQuestionModalTemplate" type="text/stache">
    <div class="modal__body">
        <div class="modal__body__close"></div>
        <div class="modal__body__header">ASK A QUESTION</div>
        <div class="modal__body__content">
            <p class="hint">Enter your question below</p>
            {{#if status}}
            <div class="status">
                {{{status}}}
            </div>
            {{/if}}
            <textarea name="message" cols="30" rows="10"></textarea>
            <a class="button button_color1 ask-button">Submit</a>
        </div>
    </div>

</script>
<div id="protectedContentModal" style="display: none" class="modal">
    <div class="modal__body">
        <div class="modal__body__close"></div>
        <div class="modal__body__header">Exclusive Content</div>
        <div class="modal__body__content sign-in">
            <p>Please sign in or create an account to access the exclusive member content</p><a
                class="button button_color1 sign-in-button">Sign In</a><a class="button button_color1 register-button">Create
            an account</a><a href="/clubhouse/campaigns/members-join.html" class="button button_color1">View Membership
            Benefits</a>
        </div>
        <div class="modal__body__content non-member">
            <p>This content is exclusive to USGA Members. If you are not a USGA Member but would like to learn more
                about how you can support the USGA, click below:</p><a href="/clubhouse/campaigns/members-join.html"
                                                                       class="button button_color1">View Membership
            Benefits</a><a class="button button_color1 connect-button">Verify Your Membership</a>
        </div>
        <div class="modal__body__content expired">
            <p>Your Membership has expired! Renew your Membership today to restore your access to the Member Clubhouse -
                your source for exclusive content, special offers and invitations</p><a
                href="/clubhouse/campaigns/members-renew-offer.html" class="button button_color1">Renew your
            Membership</a>
        </div>
    </div>
</div>
<div id="signInModal" style="display: none;" class="modal">
    <div class="modal__body">
        <div class="modal__body__close"></div>
        <div class="modal__body__header">SIGN IN REQUIRED</div>
        <div class="modal__body__content">
            <p>If you already have an account, please sign in below. Otherwise, register your USGA Account online to
                verify your member information by completing this one time registration process.</p><a
                class="button button_color1 sign-in-button">Sign In</a><a class="button button_color1 register-button">Register</a>
        </div>
    </div>
</div>
<script id="clubhouseEventListTemplate" type="text/stache">
    <div class="container__header">Events</div>
    <div class="container__filter">
        {{#filter}}
        <ul class="container__filter__list hide-small">
            <li><a href="javascript:void(0)" class="container__filter__list__item" data-filter-value="all">Event</a>
            </li>
            <li><a href="javascript:void(0)" class="container__filter__list__item" data-filter-value="my"{{setActiveFilterLink}}>My
                Event</a></li>
        </ul>
        {{/filter}}
        <div class="container__filter__dropdown dropdown-white show-small">
            <select class="dropdown" can-value="filter">
                <option value="all">Event</option>
                <option value="my">My Event</option>
            </select>
        </div>
    </div>
    <div class="container__content container__content_list">
        {{#filter}}
        {{#each events}}
        {{#testAgainstFilter}}
        {{>clubhouseEventListSingleTemplate}}
        {{/testAgainstFilter}}
        {{/each}}
        {{/filter}}
    </div>
    {{#if options.pagination}}
    <div class="container__pagination">
        <paginator></paginator>
    </div>
    {{/if}}
</script>
<script id="clubhouseEventListSingleTemplate" type="text/stache">
    <div class="event-item clearfix">
        <div class="event-item__image">
            <img data-src="{{image}}" alt="{{title}}" data-crop="fit">
        </div>
        <div class="event-item__content">
            <div class="title">
                <a href="{{url}}"{{setProtectedLink}}>
                {{{title}}}
                </a>
            </div>
            <div class="details">
                {{#if isMemberExclusive}}
                <div class="exclusive{{^if hasAccessToExclusiveContent}} locked{{/if}}{{#if hasAccessToExclusiveContent}} unlocked{{/if}}">
                    member exclusive
                </div>
                {{/if}}
                {{#if startDate}}
                <div class="details__item date">
                    {{renderStartDate}}
                    {{#if endDate}}
                    &mdash; {{renderEndDate}}
                    {{/if}}
                </div>
                {{/if}}
                {{#if startDate}}
                <div class="details__item time">&commat; {{renderStartTime}}</div>
                {{/if}}
                {{#if location}}
                <div class="details__item location">{{{location}}}</div>
                {{/if}}
            </div>
            <div class="rsvp-message">{{{rsvpMessage}}}</div>
            <div class="text">
                {{{details}}}
            </div>
            {{#if status}}
            <div class="status{{#if statusType}} {{statusType}}{{/if}}">{{{status}}}</div>
            {{/if}}
            <div class="control clearfix">
                {{#unless isFull}}
                {{#if guestsMax}}
                <div class="control__item"
                {{#hideGuestsDropdown}} style="display: none"{{/hideGuestsDropdown}}>
                <div class="guest-selection dropdown-white">
                    <select class="dropdown chosen-select" can-value="guests">
                        <option value="0">+0 Guests</option>
                        {{#renderGuestOptions}}
                        <option value="{{number}}">{{label}}</option>
                        {{/renderGuestOptions}}
                    </select>
                </div>
            </div>
            {{/if}}
            {{/unless}}
            {{#if rsvpButton}}
            {{#if rsvpButtonText}}
            {{#unless isFull}}
            {{#testSubscriptionStatus 'N'}}
            <div class="control__item">
                <a data-event-index="{{@index}}" href="javascript:void(0)" class="button button_color1 rsvp-button">{{{rsvpButtonText}}}</a>
            </div>
            {{/testSubscriptionStatus}}
            {{/unless}}
            {{/if}}
            {{#if rsvpCancelButtonText}}
            {{#testSubscriptionStatus 'Y'}}
            <div class="control__item">
                <a data-event-index="{{@index}}" href="javascript:void(0)"
                   class="button button_color1 rsvp-cancel-button">{{{rsvpCancelButtonText}}}</a>
            </div>
            {{/testSubscriptionStatus}}
            {{/if}}
            {{/if}}
            {{#if askQuestionButton}}
            {{#if askQuestionButtonText}}
            <div class="control__item">
                <a data-event-index="{{@index}}" href="javascript:void(0)"
                   class="button button_color1 ask-question-button">{{{askQuestionButtonText}}}</a>
            </div>
            {{/if}}
            {{/if}}
            {{#if customButton}}
            {{#if customButtonProperties.text}}
            {{#if customButtonProperties.location}}
            <div class="control__item">
                <a data-event-index="{{@index}}" href="{{{customButtonProperties.location}}}"
                   class="button button_color1 custom-button" target="{{{customButtonProperties.target}}}">{{{customButtonProperties.text}}}</a>
            </div>
            {{/if}}
            {{/if}}
            {{/if}}
        </div>
    </div>
    </div>

</script>
<script id="clubhouseEventListPaginatorTemplate" type="text/stache"><a href="javascript:void(0);"
                                                                       class="{{#unless paginator.canPrev}}hidden {{/unless}}container__pagination__prev container__pagination__direction"
                                                                       can-click="paginator.prev">
    <span>Previous</span>
</a>
    {{#if paginator.count}}
    {{#renderPages}}
    <a data-page="{{page}}" href="javascript:void(0);" {{setActivePage page}}>{{page}}</a>
    {{/renderPages}}
    {{/if}}
    <a href="javascript:void(0);"
       class="{{#unless paginator.canNext}}hidden {{/unless}}container__pagination__next container__pagination__direction"
       can-click="paginator.next">
        <span>Next</span>
    </a>

</script>
<script>
    var event = new usga.Event('#event');
    var eventList = new usga.ClubhouseEventList('#event .container', {
        events: [
            <c:forEach items="${eventDetailsList.clubhouseEventDetailsList}" var="item" varStatus="status">
            {
                "id": "${item.clubhouseEventID}",
                "image": "${item.image}",
                "isMemberExclusive": ${item.memberExclusive},
                "isFull": ${item.eventIsFull},
                "title": "${item.title}",
                "url": "${item.pagePath}",
                "location": "${item.location}",
                "startDate": "${item.feedStartDate}",
                "endDate": "${item.feedEndDate}",
                "rsvpMessage": "",
                "details": "${item.details}",
                "guestsMax": ${item.guestsMax},
                "rsvpButton": ${item.rsvpButton},
                "rsvpButtonText": "${item.rsvpButtonText}",
                "rsvpCancelButtonText": "${item.rsvpCancelButtonText}",
                "askQuestionButton": ${item.askQuestionButton},
                "askQuestionButtonText": "${item.askQuestionButtonText}",
                "customButton": ${item.customButton},
                "customButtonProperties": {
                    "text": "${item.buttonText}",
                    "location": "${item.buttonLinkUrl}",
                    "target": "${item.buttonLinkTarget}"
                },
                "pagination": true
            }${!status.last ? ", " : ""}
            </c:forEach>
        ]
    });
</script>