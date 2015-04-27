	<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.ruleQuiz.RuleQuiz" var="ruleQuiz"/>
<div class="rule-quiz">
    <table>
        <tr>
            <th>index</th><th>Question</th><th>current</th>
        </tr>
        <c:set var="actualIndex" value="${ruleQuiz.actualIndex}" />
        <c:forEach items="${ruleQuiz.quizzes}" var="quiz" varStatus="loop">
            <tr>
                <td>${loop.index+1}</td><td>${quiz['question']}</td><td>${loop.index eq actualIndex ? 'yes' : ''}</td>
            </tr>

        </c:forEach>
    </table>
</div>

<style type="text/css">
    .rule-quiz td, .rule-quiz th {padding-right: 20px;}
</style>