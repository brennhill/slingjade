<%@ include file="/apps/usga/global.jspx" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.championshipItem.ChampionshipItem"
               var="championshipEvent"/>

<c:if test="${championshipEvent.event!=null}">
    <div class="championships__slider__item__header">
        <c:if test="${not empty championshipEvent.event.courseImage}">
            <div class="championships__slider__item__header__image">
                <usga:data-img src="${championshipEvent.event.courseImage}"
                               classes="championships__slider__item__header__stripe"/>
            </div>
        </c:if>

        <div class="championships__slider__item__header__overlay"></div>
        <div class="championships__slider__item__header__inner">
            <c:if test="${not empty championshipEvent.event.logo}">
                <div class="championships__slider__item__header__inner__logo">
                    <usga:data-img src="${championshipEvent.event.logo}" data-radius="max" data-crop="fit"/>
                </div>
            </c:if>

            <div class="championships__slider__item__header__inner__info">
                <div class="championships__slider__item__header__inner__info__name">${championshipEvent.event.name}</div>
                <div class="championships__slider__item__header__inner__info__location">${championshipEvent.event.courseLocation}</div>
                <div class="championships__slider__item__header__inner__info__dates">
                    <c:set var="startDatePattern" value="MMMM d, yyyy "/>
                    <c:set var="endDatePattern" value="MMMM d, yyyy"/>
                    <c:if test="${championshipEvent.event.startDate.year == championshipEvent.event.endDate.year}">
                        <c:set var="startDatePattern" value="MMMM d "/>
                        <c:if test="${championshipEvent.event.startDate.month == championshipEvent.event.endDate.month}">
                            <c:set var="endDatePattern" value="d, yyyy"/>
                        </c:if>
                    </c:if>
                    <fmt:formatDate value="${championshipEvent.event.startDate}" pattern="${startDatePattern}"/>-
                    <fmt:formatDate value="${championshipEvent.event.endDate}" pattern="${endDatePattern}"/>
                </div>
            </div>
        </div>
    </div>

    <c:set var="LEADERBOARD_ID"><usga:unique-id varName="LEADERBOARD_ID"/></c:set>

    <div id="summaryBoxLeaderBoard_${LEADERBOARD_ID}" class="championships__slider__item__content">

        <cq:include script="templates.jsp"/>

        <script>
            var config = {
                module: 'summary',
                type: '${championshipEvent.event.championshipType}',
                miniLBUrl: '${championshipEvent.miniLBUrl}',
                miniTeeTimesUrl: '${championshipEvent.miniTeeTimesUrl}',
                fullLBUrl: '${championshipEvent.lbPagePath}',
                fullStartingTimesUrl: '${championshipEvent.startingTimesPagePath}',
                startDate: ${championshipEvent.event.tickerStartDate != null ? championshipEvent.event.tickerStartDate.time : championshipEvent.event.startDate.time}
            };
            var leaderboard = new usga.LeaderBoardMiniBaseControl('#summaryBoxLeaderBoard_${LEADERBOARD_ID}', config);
        </script>
    </div>
</c:if>