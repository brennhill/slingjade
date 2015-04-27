<%@ include file="/apps/usga/global.jspx" %>

<div class="block__most">

    <usga:link path="${properties.contentLink}" target="${properties.newWindow eq 'yes' ? '_blank' : '_self'}" classes="block__most__title">
        ${properties.contentHeader}
    </usga:link>


    <usga:link path="${properties.contentLink}" target="${properties.newWindow eq 'yes' ? '_blank' : '_self'}" classes="block__most__media">
        <usga:data-img src="${properties.contentImg}"/>
    </usga:link>

    <div class="block__most__under">${properties.categoryTag}</div>
    <usga:link path="${properties.contentLink}" target="${properties.newWindow eq 'yes' ? '_blank' : '_self'}" classes="block__most__title2">
        ${properties.contentTitle}
    </usga:link>
    <div class="block__most__text">${properties.contentDescription}</div>
</div>


