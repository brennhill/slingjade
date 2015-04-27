<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<cq:setContentBundle/>
<%@page import="com.day.cq.wcm.api.components.IncludeOptions"%>
<table>
  <th>
    <td><fmt:message key="question"/></td>
    <td><fmt:message key="active"/></td>
  </th>
  <% IncludeOptions.getOptions(request, true).setDecorationTagName("tbody"); %>
  <cq:include path="rulesQuiz" resourceType="usga/components/administration/rulesQuizAdmin/parsys"/>
</table>