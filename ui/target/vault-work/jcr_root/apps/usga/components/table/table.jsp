<%@include file="/apps/usga/global.jspx"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.table.Table" var="table"/>

<wcmmode:edit>
    Edit Table Title: <br>
    <cq:include path="linkTitle" resourceType="foundation/components/text"/>

    ${table.editorialTable}
</wcmmode:edit>

<wcmmode:edit not="true">${table.publicTable}</wcmmode:edit>
