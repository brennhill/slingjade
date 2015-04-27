	<%@include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<%@page import="com.day.cq.dam.api.Asset, org.apache.sling.api.resource.Resource,com.usga.components.models.schedule.Event"%>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.schedule.Event" var="event"/>
<c:if test="${not empty event}">
<div>
	<%	
    	String logoPath = "";
		String coursePath = "";
    	Event event = (Event) pageContext.getAttribute("event");
    	Resource eventLogoRes=resourceResolver.getResource(event.getLogo());
		if(eventLogoRes!=null) {
            Asset eventAsset = eventLogoRes.adaptTo(Asset.class);
            logoPath = eventAsset.getMetadataValue("dam:cloudinaryUrl");
        }

		Resource eventCourseRes=resourceResolver.getResource(event.getCourseImage());
		if(eventCourseRes!=null) {
			Asset eventCourseAsset = eventCourseRes.adaptTo(Asset.class);
            coursePath = eventCourseAsset.getMetadataValue("dam:cloudinaryUrl");
    	} 


	%>
    <img src="<%=logoPath%>"/>
    <h1>${event.name}</h1>

    <h3>Start: ${event.startDate}</h3>
    <h3>End: ${event.endDate}</h3>

    <h3>Ticker Start: ${event.tickerStartDate}</h3>
    <h3>Ticker End: ${event.tickerEndDate}</h3>

    <jsp:useBean id="current" class="java.util.Date" />
    <h3>Current Date: ${current}</h3>

    <td>${event.ticketsUrl}</td>
    <td>${event.resultsUrl}</td>
    <td>${event.volunteersUrl}</td>
    <td>${event.hospitalityUrl}</td>
    <td>${event.primaryTags}</td>
    <td>${event.secondaryTags}</td>
    <td>${event.smallBreakpointEventItem.cssClass}</td>
    <td>${event.smallBreakpointEventItem.text}</td>
    <br>
    <h3>Course Name: ${event.courseName}</h3>
    <h3>Course Location: ${event.courseLocation}</h3>
    <h3>Course Image: <img src="<%=coursePath%>"/></h3>
    <h3>Carousel Button Label: ${event.buttonLabel}</h3>
    <h3>Carousel Button Label For Expired Event: ${event.buttonLabelExpired}</h3>
    <h3>Carousel Button Destination: ${event.buttonDestination}</h3>
</div>
</c:if>
<style type="text/css">
  .event img {max-width:400px;}
</style>