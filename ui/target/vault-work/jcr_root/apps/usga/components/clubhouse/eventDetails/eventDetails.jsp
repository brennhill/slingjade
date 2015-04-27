<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.clubhouse.eventdetails.ClubhouseEventDetails"
               var="eventDetails"/>

<div id="event" class="event">
    <div class="campaign_content">
        <div class="event__media">
            <div class="event__media__bg">
                <div class="event__media__bg__inner">
                    <usga:data-img src="${eventDetails.bgImage}" alt="${eventDetails.bgImage}" data-crop="fill"/> >
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
                                <div class="main_slider__item__box__title">${eventDetails.pageTitle}</div>
                                <div class="main_slider__item__box__text">${eventDetails.pageDescription}</div>
                            </div>
                        </li>
                    </ul>
                    <div id="slider-menu_join" class="slider-menu">
                        <div class="slider-menu__item">
                            <a href="javascript:void(0)" data-slide-index="0"
                               class="slider-menu__item__link">${eventDetails.pageTitle}</a>
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
<script id="clubhouseEventSingleTemplate" type="text/stache">
    <div class="container__header">Events</div>
    <div class="container__content">
        {{#each events}}
        {{>clubhouseEventListSingleTemplate}}
        {{/each}}
    </div>
</script>
<script id="clubhouseEventListSingleTemplate" type="text/stache">
    <div class="event-item clearfix">
        <div class="event-item__image">
            <img data-src="{{image}}" alt="{{title}}" data-crop="fit">
        </div>
        <div class="event-item__content">
            <div class="title">
                <a href="{{url}}">
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
                                <a data-event-index="{{@index}}" href="javascript:void(0)" class="button button_color1 rsvp-cancel-button">
                                    {{{rsvpCancelButtonText}}}
                                </a>
                            </div>
                        {{/testSubscriptionStatus}}
                    {{/if}}
                {{/if}}
                {{#if askQuestionButton}}
                    {{#if askQuestionButtonText}}
                        <div class="control__item">
                            <a data-event-index="{{@index}}" href="javascript:void(0)" class="button button_color1 ask-question-button">
                                {{{askQuestionButtonText}}}
                            </a>
                        </div>
                    {{/if}}
                {{/if}}
                {{#if customButton}}
                    {{#if customButtonProperties.text}}
                        {{#if customButtonProperties.location}}
                            <div class="control__item">
                                <a data-event-index="{{@index}}" href="{{{customButtonProperties.location}}}" class="button button_color1 custom-button" target="{{{customButtonProperties.target}}}">
                                    {{{customButtonProperties.text}}}
                                </a>
                            </div>
                        {{/if}}
                    {{/if}}
                {{/if}}
            </div>
        </div>
    </div>

</script>
<script>
    var event = new usga.Event('#event');
    var eventList = new usga.ClubhouseEventList('#event .container', {
        template: 'single',
        events: [
            {
                "id": "${eventDetails.clubhouseEventID}",
                "image": "${eventDetails.image}",
                "isMemberExclusive": ${eventDetails.memberExclusive},
                "isFull": ${eventDetails.eventIsFull},
                "title": "${eventDetails.title}",
                "url": "${eventDetails.pagePath}",
                "location": "${eventDetails.location}",
                "startDate": "${eventDetails.feedStartDate}",
                "endDate": "${eventDetails.feedEndDate}",
                "rsvpMessage": "",
                "details": "${eventDetails.details}",
                "guestsMax": ${eventDetails.guestsMax},
                "rsvpButton": ${eventDetails.rsvpButton},
                "rsvpButtonText": "${eventDetails.rsvpButtonText}",
                "rsvpCancelButtonText": "${eventDetails.rsvpCancelButtonText}",
                "askQuestionButton": ${eventDetails.askQuestionButton},
                "askQuestionButtonText": "${eventDetails.askQuestionButtonText}",
                "customButton": ${eventDetails.customButton},
                "customButtonProperties": {
                    "text": "${eventDetails.buttonText}",
                    "location": "${eventDetails.buttonLinkUrl}",
                    "target": "${eventDetails.buttonLinkTarget}"
                }
            }
        ]
    });
</script>

<div class="inner">
    <cq:include path="faq" resourceType="usga/components/clubhouse/faq"/>
</div>