<%@ include file="/apps/usga/global.jspx" %>

<!-- social-->
<div id="blockSocial" class="block__social">

    <c:if test="${empty properties.hideGPlus || !properties.hideGPlus}">
        <usga:link path="${not empty properties.gPlusLink ? properties.gPlusLink : 'https://plus.google.com/u/0/101025757252712922342/'}" classes="block__social__item">
            <usga:data-img src="/etc/designs/usga/pic/icons/social-google-plus.png"/>
        </usga:link>
    </c:if>

    <c:if test="${empty properties.hideTwitter || !properties.hideTwitter}">
        <usga:link path="${not empty properties.twitterLink ? properties.twitterLink : 'https://twitter.com/usga'}" classes="block__social__item">
            <usga:data-img src="/etc/designs/usga/pic/icons/social-twitter.png"/>
        </usga:link>
    </c:if>

    <c:if test="${empty properties.hideFacebook || !properties.hideFacebook}">
        <usga:link path="${not empty properties.facebookLink ? properties.facebookLink : 'https://www.facebook.com/USGA'}" classes="block__social__item">
            <usga:data-img src="/etc/designs/usga/pic/icons/social-facebook.png"/>
        </usga:link>
    </c:if>

    <c:if test="${empty properties.hideInstagram || !properties.hideInstagram}">
        <usga:link path="${not empty properties.instagramLink ? properties.instagramLink : 'http://instagram.com/usga'}" classes="block__social__item">
            <usga:data-img src="/etc/designs/usga/pic/icons/social-instagram.png"/>
        </usga:link>
    </c:if>

</div>

<script>var blockSocial = new usga.BaseCloudinaryModule('#blockSocial');</script>
<!-- end social-->