<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<cq:setContentBundle/>
<%@page import="com.day.cq.wcm.api.components.IncludeOptions"%>
<table>
  <th>
    <td><fmt:message key="eventLogo"/></td>
    <td><fmt:message key="eventName"/></td>
    <td><fmt:message key="StartDate"/></td>
    <td><fmt:message key="EndDate"/></td>
    <td><fmt:message key="eventTickets"/></td>
    <td><fmt:message key="eventResultsUrl"/></td>
    <td><fmt:message key="eventVolunteerUrl"/></td>
    <td><fmt:message key="eventHospitalityUrl"/></td>
    <td><fmt:message key="primaryTags"/></td>
    <td><fmt:message key="secondaryTags"/><td>
  </th>
  <% IncludeOptions.getOptions(request, true).setDecorationTagName("tbody"); %>
  <cq:include path="events" resourceType="usga/components/administration/eventAdmin/parsys"/>
</table>