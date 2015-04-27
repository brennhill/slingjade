<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.leaderboard.CourseStatistics" var="courseStatistics"/>

<div id="courseStatistics" class="course-statistics"></div>

<cq:include script="templates.jsp"/>


<script>
    var config = {
        type: '${courseStatistics.type}',
        tabControlUrl: '${courseStatistics.tabControlUrl}',
        lbType: '${courseStatistics.lbType}',
        courseStatsUrls: ['${courseStatistics.courseStatsUrlsString}']
    };
    var courseStatistic = new usga.CourseStatisticsTabControl('#courseStatistics', config);
</script>