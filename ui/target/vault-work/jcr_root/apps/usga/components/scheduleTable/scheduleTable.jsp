<%@ page import="java.util.Calendar" %>
<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.schedule.ScheduleBox" var="scheduleBox"/>

<c:set var="defaultYear" value="${properties.defaultYear}"/>

<c:if test="${empty defaultYear}">
    <c:set var="defaultYear" value="<%=Calendar.getInstance().get(Calendar.YEAR)%>"/>
</c:if>

<div id="scheduleCompetitions" class="schedule-competitions ${isScheduleContainer ? 'without-head' : ''}">
    <div class="schedule-competitions__media">
        <usga:data-img src="${properties.background}" alt="" />
        <div class="gradient_blur"></div>
    </div>
    <div class="schedule-competitions__title">${properties.title}</div>
    <div class="schedule-competitions__under-title">${properties.description}</div>
    <div class="schedule-competitions__table">
        <div id="tabControl" class="tabbable">
            <div class="tabbable-head tabbable-head_with-search clearfix">
                <ul class="nav nav-tabs nav-tabs-drop">
                    <c:forEach var="index" begin="${properties.startYear}" end="${properties.endYear}">
                        <li class="${index eq defaultYear ? 'active' : ''}">
                            <a href="#tab${index}" data-toggle="tab">${index}</a>
                        </li>
                    </c:forEach>
                </ul>
            </div>
            <div class="tab-content">
                <c:forEach var="index" begin="${properties.startYear}" end="${properties.endYear}">
                    <div id="tab${index}" class="tab-pane ${index eq defaultYear ? 'active' : ''} schedule-competitions__table__tab">
                        <div class="thead">
                            <div class="tr">
                                <div class="td first sort">
                                    <div class="va">
                                        <a href="javascript:void(0);" data-sort-field="name" class="sort-link sort-name">
                                            Championship
                                            <span class="sort-arrow"></span>
                                        </a>
                                    </div>
                                </div>
                                <div class="td second sort">
                                    <div class="va">
                                        <a href="javascript:void(0);" data-sort-field="date" class="sort-link sort-asc sort-date">
                                            Dates
                                            <span class="sort-arrow"></span>
                                        </a>
                                    </div>
                                </div>
                                <div class="td third">
                                    <div class="va">Location</div>
                                </div>
                            </div>
                        </div>
                        <div class="tbody block-schedule-competitions__envelope year-${index}" ></div>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>
</div>
<script type="text/stache" id="scheduleCompetitionEventsTemplate">
{{#each items}}
    <div class="tr">
        <div class="td first">
            <div class="va">
                <div class="table-media">
                    <a href="{{eventUrl}}" {{#if openEventUrlInNewWindow}}target='_blank'{{/if}}>
                        {{#if logo}}<cloudinary-image src="{logo}" alt="" crop="fit"/>{{/if}}
                    </a>
                </div>
                <div class="turnir-title">
                    <a href="{{eventUrl}}" {{#if openEventUrlInNewWindow}}target='_blank'{{/if}}>{{name}}</a>
                    <span class="turnir-title__date">{{range}}</span>
                </div>
            </div>
            <a href="javascript:void(0);" class="cell-more">
                <span class="cell-more__item">more</span>
            </a>
            <div class="left-side">{{courseName}} <br> {{courseLocation}}</div>
        </div>
        <div class="td second">
            <div class="va">{{range}}</div>
        </div>
        <div class="td third">
            <div class="left-side"><div class="va">{{courseName}} <br> {{courseLocation}}</div></div>
            <div class="right-side">
                {{#each eventIcons}}
                    <a href="{{url}}" class="side-item {{iconClass}}">{{text}}</a>
                {{/each}}
            </div>
        </div>
    </div>
{{/each}}

</script>



<script>
    var scheduleCompetitions = new usga.ScheduleCompetitions('#scheduleCompetitions', {
        feedUrl: "${ext:relativeLink(pageContext.request, '/bin/data/feeds/usga-events.size_50')}",
        defaultYear: ${defaultYear},
        eventsType: '${scheduleBox.eventsType}',
        feedSuffix: '.json'
    });
</script>

<c:set var="isScheduleContainer" value="false" scope="request"/>


