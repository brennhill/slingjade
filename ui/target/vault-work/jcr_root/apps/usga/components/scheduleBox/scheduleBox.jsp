<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.schedule.ScheduleBox" var="scheduleBox"/>

<c:choose>
    <c:when test="${not empty scheduleBox.eventsType}">
        <div class="block-schedule" id="blockSchedule">
            <div class="block-schedule__title">
                <usga:data-img src="/etc/designs/usga/pic/logo/usga.png" alt="" classes="block-schedule__title__logo" data-fcrop="fit"/><br/>
                    ${scheduleBox.title}
            <span class="block-schedule__title__year">
                    ${scheduleBox.year}
            </span>
            </div>
            <div class="block-schedule__envelope"></div>
            <usga:link path="${scheduleBox.buttonDestination}" classes="button button_color1"
                       target="${scheduleBox.newWindow ? '_blank' : '_self'}">
                ${scheduleBox.buttonLabel}
            </usga:link>
        </div>

        <script type="text/stache" id="scheduleItemsTemplate">
            {{#each items}}
            <div class="block-schedule__envelope__item" >
                <div class="block-schedule__envelope__item__text" >
                    <a href="{{eventUrl}}" {{#if openEventUrlInNewWindow}}target='_blank'{{/if}}>{{name}}</a> <br> {{range}}
                </div>
                {{#if smallBreakpointEventItem}}
                <a href="{{smallBreakpointEventItem.url}}" class="block-schedule__envelope__item__icon">
                    <span class="block-schedule__envelope__item__icon__img {{iconClass}}"></span>
                        <span>
                            {{smallBreakpointEventItem.text}}
                        </span>
                </a>
                {{/smallBreakpointEventItem}}
            </div>
            {{/each}}
        </script>

        <script>
            var feedUrl = '${ext:relativeLink(pageContext.request, '/bin/data/feeds/usga-events')}' + '.' + moment().add(-1, "weeks").format("YYYY-MM-DD") +
                    '.' + moment().add(6, "months").format("YYYY-MM-DD") + '.' + '${scheduleBox.eventsType}' + '.size_6.compact.json';

            var blockSchedule = new usga.Schedule('#blockSchedule', { feedUrl: feedUrl });
        </script>
    </c:when>
    <c:otherwise>
        <wcmmode:edit not="true">
            <script> jQuery(".twoColumnControl").hide(); </script>
        </wcmmode:edit>
    </c:otherwise>
</c:choose>