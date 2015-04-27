<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.clubhouse.ClubhouseArticleHeader" var="articleHeader"/>
<c:set var="lockClass" value=""/>
<c:if test="${articleHeader.protectedPath}">
  <c:set var="lockClass" value="unlocked"/>
</c:if>

<h1 class="title title_gmod1">
    <c:choose>
    <c:when test="${articleHeader.protectedPath}">
       <div class="title__above">
                  <div class="title__above__inner">
                      <div class="title__above__inner__text ${lockClass}">
                            Member Exclusive
                      </div>
                  </div>
              </div>
    </c:when>
    <c:otherwise>
    <c:if test="${not empty articleHeader.headline}">
        <div class="title__above">
           <div class="title__above__inner">
               <div class="title__above__inner__text ${lockClass}">
                  ${articleHeader.headline}
               </div>
           </div>
       </div>
    </c:if>
    </c:otherwise>
    </c:choose>
    ${articleHeader.title}
    <span class="title__under">
        <c:if test="${not empty articleHeader.date.time}">
            <fmt:formatDate pattern="MMMM dd, yyyy" value="${articleHeader.date.time}" />
        </c:if>
        <c:if test="${not empty articleHeader.location}"> |  ${articleHeader.location}</c:if>
         <c:if test="${not empty articleHeader.author}">
            <span class="title__under__by">
                By ${articleHeader.author}
            </span>
         </c:if>
    </span>
</h1>