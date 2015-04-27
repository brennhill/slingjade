<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<div class="block__test">
    <div class="block__test__title">${properties.testTitle}</div>
    <div class="block__test__text">
        ${properties.testTask}
    </div>
    <form action="" class="block__test__form">
        <c:forEach items="${properties.variant}" var="variant" varStatus="loop">
            <div class="block__test__form__item">
                <input id="test${loop.index}" type="radio" name="test" class="block__test__form__item__input"/>
                <label for="test${loop.index}" class="block__test__form__item__label">${variant}</label>
            </div>
        </c:forEach>

        <input type="submit" value="SUBMIT YOUR ANSWER" class="block__test__form__item__submit button button_color2"/>
    </form>
</div>

