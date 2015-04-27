<%@ include file="/apps/usga/global.jspx" %>
<wcmmode:disabled>
    <script>var membership = new usga.ClubhouseMembership('#membership', {
        delay: 10,
        campaignDataUrl: '${resource.path}.data.json'
    });</script>
</wcmmode:disabled>
<wcmmode:disabled not="true">
    <cq:include script="content.jsp"/>
    <link rel="stylesheet" href="/etc/designs/usga/styles/campaigns.min.css"/>
    <script>
        function switchTab(levelKey) {
            jQuery('.member-level__item').removeClass('active');
            jQuery('.member-level__item.level-' + levelKey).addClass('active');
            jQuery('.levels').hide();
            jQuery('.levels.level-' + levelKey).show();
        }
    </script>
    <c:set var="campaign" value="${model.campaign}"/>
    <div id="membership" class="membership">
        <div class="membership__media">
            <div class="membership__media__bg">
                <div class="membership__media__bg__inner"><img src="${campaign.banner.background}"/>
                </div>
                <div class="gradient_blur"></div>
            </div>
        </div>
        <div class="inner inner__tabbable">
            <div id="joinSliderMembership" class="box-main_slider box-main_slider_join-membership">
                <ul class="bxslider main_slider main_slider_join">
                    <c:forEach var="slide" items="${campaign.banner.slides}">
                        <li class="main_slider__item">
                            <div class="main_slider__item__box main_slider__item__box_mod1">
                                <div class="main_slider__item__box__title2"><c:out value="${slide.title}"/></div>
                                <div class="main_slider__item__box__text"><c:out value="${slide.description}"/></div>
                            </div>
                        </li>
                    </c:forEach>
                </ul>
            </div>
            <div class="container">
                <div class="member-level">
                    <div class="member-level__title"><c:out value="${campaign.levelsTitle}"/></div>
                    <div class="member-level__envelope member-level__envelope_c${fn:length(campaign.selectedLevels)} visible-large hidden-medium hidden-small">
                        <c:forEach var="level" items="${campaign.selectedLevels}" varStatus="status">
                            <div class="member-level__item level-${level}${status.first ? ' active' : ''}"
                                 onclick="switchTab('${level}')">
                                <cq:include path="level-${level}"
                                            resourceType="usga/components/campaigns/levels/${campaign.type}"/>
                                <div class="button button_color1"><c:out value="${campaign.button}"/></div>
                            </div>
                        </c:forEach>

                    </div>
                </div>
                <!-- title-->
                <c:forEach var="level" items="${campaign.levels}" varStatus="status">
                    <c:set var="membershipLevel" value="${level.membershipLevel}"/>
                    <c:if test="${not empty membershipLevel.longTitle}">
                        <h1 id="title26" class="title levels level-${level.id}"
                        style="${status.first ? '' : 'display: none'}">${membershipLevel.longTitle}<span
                            class="title__under">${level.description}</span>
                    </h1>
                    </c:if> </c:forEach>
                <!-- end title-->
                <div id="rulesResources" class="resources">
                    <c:forEach var="level" items="${campaign.levels}" varStatus="status">
                        <c:set var="membershipLevel" value="${level.membershipLevel}"/>
                        <ul class="resources__slider levels level-${level.id}"
                            style="${status.first ? '' : 'display: none'}">
                            <li class="resources__slider__element">
                                <div class="resources__slider__element__container resources__slider__element__container_membership">${membershipLevel.privileges}</div>
                            </li>
                            <li class="resources__slider__element">
                                <div class="resources__slider__element__container resources__slider__element__container_membership resources__slider__element__container_mod1">${membershipLevel.benefits}</div>
                            </li>
                            <li class="resources__slider__element">
                                <div class="resources__slider__element__container resources__slider__element__container_membership resources__slider__element__container_img">
                                    <h2>${level.rightColumn.title}</h2>
                                    <div class="resources__slider__element__container__content">
                                        <img src="${level.rightColumn.image}" crop="fit"/>

                                        <div class="resources__slider__element__container__content__discription">${level.rightColumn.footer}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </c:forEach>
                </div>
            </div>
        </div>
        <div class="inner inner-membership">
            <!-- join-membership module-->
            <div class="visible-large hidden-medium hidden-small">
                <div class="join-membership">
                    <c:forEach var="level" items="${campaign.levels}" varStatus="status">
                        <div class="join-membership__item join-membership__item_under levels level-${level.id}"
                             style="${status.first ? '' : 'display: none'}">
                            <div class="dropdown-white">
                                <select class="dropdown">
                                    <option value="individual">Individual Membership</option>
                                    <option value="dual">Dual Membership</option>
                                </select>
                            </div>
                            <div class="join-membership__item__tip">${campaign.footerHint}</div>
                        </div>
                    </c:forEach>
                    <div class="button button_color1">${campaign.button}</div>
                </div>
            </div>
            <!--end join-membership-->
        </div>
    </div>
</wcmmode:disabled>
