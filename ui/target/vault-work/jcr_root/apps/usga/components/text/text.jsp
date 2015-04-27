<%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Text component

  Draws text.

--%><%
%><%@ include file="/apps/usga/global.jspx" %>
<div class="article__inner <c:if test="${not empty properties.dropcap}">article__inner_first-text</c:if>">
  <cq:text property="text"/>
</div>
