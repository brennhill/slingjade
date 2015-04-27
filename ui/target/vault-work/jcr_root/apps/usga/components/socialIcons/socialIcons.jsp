<%@ include file="/apps/usga/global.jspx" %>

<c:choose>
    <c:when test="${properties.cssClass}">
        <c:set var="cssClass" value="video-details__container__info__social__item"/>
    </c:when>
    <c:otherwise>
        <c:set var="cssClass" value="photo-details__social__item"/>
    </c:otherwise>
</c:choose>

<a href="#" data-social-name="facebook" data-analytics-social="Facebook|Share"
   class="${cssClass} social__item">
    <usga:data-img src="/content/dam/usga/images/social/social-facebook.png" alt=""/>
</a>

<a href="#" data-social-name="twitter" data-analytics-social="Twitter|Share"
   class="${cssClass} social__item">
    <usga:data-img src="/content/dam/usga/images/social/social-twitter.png" alt=""/>
</a>

<a href="#" data-social-name="google-plus" data-analytics-social="GooglePlus|Share"
   class="${cssClass} social__item">
    <usga:data-img src="/content/dam/usga/images/social/social-google-plus.png" alt=""/>
</a>

<c:if test="${properties.showEmail}">
    <a href="#" data-social-name="email" data-analytics-social="Email|Share"
       class="${cssClass} social__item">
        <usga:data-img src="/content/dam/usga/images/social/social-email.png" alt=""/>
    </a>
</c:if>