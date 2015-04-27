<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.tvschedule.TvSchedule" var="tvSchedule"/>

<c:set var="rows" value="${widgets:getMultiFieldPanelValues(resource, 'rows')}"/>

<!-- TV Schedule-->
<h1 id="title29" class="title">${not empty tvSchedule.sectionTitle ? tvSchedule.sectionTitle : 'TV Schedule'}</h1>

<div id="schedule" class="tv-schedule">
    <table>
        <thead>
        <tr>
            <th class="cell-date">Event Dates</th>
            <th class="cell-network">NETWORK</th>
            <th class="cell-time">TIME</th>
            <th colspan="2" class="cell-program">PROGRAM</th>
            <th colspan="3" class="cell-mobile">Event Dates</th>
        </tr>
        </thead>
        <tbody>
            <c:forEach items="${tvSchedule.tvScheduleItems}" var="tvScheduleItem" varStatus="status">

                <tr id="schedule" class="${status.index % 2 == 1 ? 'odd' : 'even'}">
                    <td class="cell-date">
                        <wcmmode:edit><c:if test="${empty tvScheduleItem.date}"><div class="date">Date is wrong! Start date must be before end date (for same day).</div></c:if></wcmmode:edit>

                        <div class="date">${tvScheduleItem.date}</div>
                    </td>
                    <td class="cell-network">
                        <usga:data-img src="${tvScheduleItem.icon}" data-crop="fit" />
                    </td>
                    <td class="cell-time">
                        <wcmmode:edit><c:if test="${empty tvScheduleItem.timeRange}"><div class="time">Time range is wrong! Start date must be before end date (for same day).</div></c:if></wcmmode:edit>

                        <div class="time">${tvScheduleItem.timeRange}</div>
                    </td>
                    <td class="cell-program">
                        <div class="mobile-info">
                            <div class="date">${tvScheduleItem.date}</div>
                            <div class="time">${tvScheduleItem.timeRange}</div>
                        </div>

                        <div class="time">${tvScheduleItem.program}</div>
                    </td>
                    <td class="cell-button">
                        <c:if test="${not empty tvScheduleItem.link}">
                            <usga:link path="${tvScheduleItem.link}" classes="title__partner__link" target="${tvScheduleItem.linkTarget}">
                                <div class="find-channel__icon">
                                    <img src="/etc/designs/usga/images/components/tv-schedule/ico-channel.png" alt="">
                                </div>
                                FIND CHANNEL
                            </usga:link>
                        </c:if>
                    </td>
                </tr>

            </c:forEach>
        </tbody>
    </table>
</div>
<script>var tvschedule = new usga.BaseCloudinaryModule('#schedule')</script>
<!-- End TV Schedule-->
