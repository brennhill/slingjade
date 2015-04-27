<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<%@ page import="com.day.cq.rewriter.linkchecker.LinkCheckerSettings" %>
<% pageContext.setAttribute("newLineChar", "\n"); %>
<%
  LinkCheckerSettings s = LinkCheckerSettings.fromRequest(slingRequest);
  s.setIgnoreExternals(true);
  s.setIgnoreInternals(true);
%>

<c:set var="neutralMsg" value="${fn:replace(properties.neutralMsg, newLineChar, '')}"/>

{
    "neutralMessage": "<c:out value="${fn:replace(neutralMsg, '\"', '\\'')}" escapeXml="false"/>",
    "categories": [
        <c:if test="${properties.categories > 0}">
            <c:forEach var="index" begin="0" end="${properties.categories - 1}" step="1" varStatus="loop">
                <c:choose>
                    <c:when test="${loop.first && loop.last}">
                        <c:set var="categoryName" value="${properties.categoryName}" />
                        <c:set var="categoryId" value="${properties.categoryId}" />
                    </c:when>
                    <c:otherwise>
                        <c:set var="categoryName" value="${properties.categoryName[index]}" />
                        <c:set var="categoryId" value="${properties.categoryId[index]}" />
                    </c:otherwise>
                </c:choose>

                <c:if test="${not loop.first}">,</c:if>{
                    "name": "${categoryName}",
                    "index": "${categoryId}",
                    "questions": [
                            <c:choose>
                                <c:when test="${properties.questions > 1}">
                                        <c:set var="first" value="true"/>
                                        <c:forEach var="item" items="${properties.category}" varStatus="qLoop">
                                            <c:if test="${item eq categoryId}">
                                                <c:if test="${first eq 'false'}">,</c:if>
                                                <c:set var="first" value="false"/>
                                                {
                                                    "id": "${properties.questionId[qLoop.index]}",
                                                    "question": "<c:out value="${fn:replace(properties.question[qLoop.index],'\"', '\\'')}"/>",
                                                    <c:set var="answer" value="${fn:replace(properties.answer[qLoop.index], newLineChar, '')}" />
                                                    "answer": "<c:out value="${fn:replace(answer, '\"', '\\'')}" escapeXml="false"/>"
                                                }
                                            </c:if>
                                        </c:forEach>
                                </c:when>
                                <c:when test="${properties.questions == 1}">
                                    <c:if test="${properties.category eq categoryId}">
                                                {
                                                    "id": "${properties.questionId}",

                                                    "question": "<c:out value="${fn:replace(properties.question, '\"', '\\'')}" escapeXml="false"/>",
                                                    <c:set var="answer" value="${fn:replace(properties.answer, newLineChar, '')}" />
                                                    "answer": "<c:out value="${fn:replace(answer, '\"', '\\'')}" escapeXml="false"/>"
                                                }
                                    </c:if>
                                </c:when>
                            </c:choose>
                    ]
                }
            </c:forEach>
        </c:if>
    ]
}