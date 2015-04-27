<%@ include file="/apps/usga/global.jspx" %>

<a href="javascript:void( 0 );" class="side-social__item social__item" data-analytics-social="Twitter|Share" data-social-name="twitter">
    <usga:data-img src="/etc/designs/usga/pic/icons/social-twitter.png"/>
</a>
<a href="javascript:void( 0 );" class="side-social__item social__item" data-analytics-social="Facebook|Share" data-social-name="facebook">
    <usga:data-img src="/etc/designs/usga/pic/icons/social-facebook.png"/>
</a>
<a href="javascript:void( 0 );" class="side-social__item social__item" data-analytics-social="GooglePlus|Share" data-social-name="google-plus">
    <usga:data-img src="/etc/designs/usga/pic/icons/social-google-plus.png"/>
</a>
<c:if test="${properties.showLinkedIn}">
    <a href="javascript:void( 0 );" class="side-social__item social__item" data-analytics-social="" data-social-name="linkedIn">
        <usga:data-img src="/etc/designs/usga/pic/icons/social-linkedin.png"/>
    </a>
</c:if>


<script>
 var socialShare = new usga.SocialShare('.side-social');
</script>