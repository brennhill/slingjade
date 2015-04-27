<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.championshipContainer.ChampionshipContainer"
               var="model"/>

<div id="microsite" class="microsite">
    <c:set var="championshipItem" value="${model.championshipItem}"/>

    <div class="microsite__media">
        <div class="microsite__media__bg">
            <div class="microsite__media__bg__inner">
                <usga:data-img src="${championshipItem.background}" alt=" "/>
            </div>
            <div class="gradient_blur"></div>
        </div>
    </div>
    <div class="inner inner__tabbable">
        <!--
            <ul class="breadcrumbs">
                <li class="breadcrumbs__current"><span>Championships</span></li>
            </ul>-->
        <div class="microsite__header">
            <c:if test="${not empty championshipItem.logo}">
                <usga:data-img src="${championshipItem.logo}" classes="microsite__header__partner" data-radius="max"/>
            </c:if>
            <div class="microsite__header__title">${championshipItem.championshipName}</div>
            <div class="microsite__header__location">${championshipItem.courseName}, ${championshipItem.location}</div>
            <div class="microsite__header__dates">${championshipItem.datesText}</div>

            <c:if test="${model.showUpdateTime}">
            <div class="microsite__header__update"><span class="microsite__header__update__icon"></span>Updates every 30 secs</div>
            </c:if>

        </div>
        <div id="tabControl" class="microsite__container tabbable">
            <div class="tabbable-head tabbable-head_with-partner clearfix">
                <c:if test="${!model.hideSponsor}">
                <span class="tabbable-head__partner">IN PARTNERSHIP WITH
                    <usga:data-img src="${model.sponsorLogo}" alt="" classes="tabbable-head__partner__logo"
                                   data-crop='fit'/>
                </span>
                </c:if>
                <ul class="nav nav-tabs nav-tabs-drop">
                    <c:forEach items="${model.tabNames}" var="tabName" varStatus="status">
                        <c:if test="${not empty tabName}">
                            <li <c:if test="${not empty model.tabIds[status.index]}">id="${model.tabIds[status.index]}" style="display:none"</c:if>
                                class="${model.activeTabIndex == status.index ? 'active' : ''}">
                                <usga:link path="${model.tabDestinations[status.index]}" data="data-toggle=tab">
                                        ${tabName}
                                </usga:link>
                            </li>
                        </c:if>
                    </c:forEach>
                </ul>
            </div>
            <script>var tabControl = new usga.Tabs('#tabControl');</script>
            <div class="tab-content">
                <c:forEach items="${model.tabDestinations}" var="tabDestination" varStatus="status">
                    <c:if test="${not empty model.tabDestinations}">
                        <div id="${tabDestination}" class="tab-pane ${model.activeTabIndex == status.index ? 'active' : ''}">
                            <div class="box-inner">
                                <cq:include path="tabPar_${status.count}" resourceType="foundation/components/parsys"/>
                            </div>
                        </div>
                    </c:if>
                </c:forEach>
            </div>
        </div>
    </div>
</div>
<script>
    var microsite = new usga.Microsite('#microsite');
</script>
