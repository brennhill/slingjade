<%@ include file="/apps/usga/global.jspx" %>

<!-- calc-->
<c:choose>
    <c:when test="${empty properties.type || properties.type eq 'main'}">
        <div class="underline hidden-large hidden-medium visible-small"></div>

        <div class="inner">
            <div id="calculator" class="box-calc">
                <usga:link path="${properties.handicapQuestionsLink}" target="${properties.linkTarget}" classes="box-calc__link box-calc__link_mod1">
                    QUESTIONS ?
                </usga:link>
                <usga:data-img src="/etc/designs/usga/pic/logo5.png" alt="" classes="box-calc__img"/>
                <div class="box-calc__general">
                    <div class="box-calc__title">Course Handicap&#0153; Calculator</div>
                    <div class="box-calc__text">${properties.sectionDescription}</div>
                    <div class="box-calc__block__outer"></div>
                    <div class="box-calc__block">
                        <div class="box-calc__block__item">
                            <input type="text" name="index" placeholder="Your Handicap index" class="box-calc__block__item__input"/>
                        </div>
                        <div class="box-calc__block__item">
                            <input type="text" name="rating" placeholder="Slope Rating" class="box-calc__block__item__input"/>
                            <div class="box-calc__block__item__input__link">
                                <usga:link path="${properties.slopeRatingLink}" classes="box-calc__link box-calc__link_mod2" target="_blank">
                                    LOOK UP
                                </usga:link>
                            </div>
                        </div>
                        <div class="box-calc__block__item">
                            <div id="calcButton" class="button button_color1" data-analytics-button="Handicap Calculator">CALCULATE</div>
                        </div>
                    </div>
                </div>
                <div class="box-calc__result">
                    <div class="box-calc__title">Course Handicap Calculator Result</div>
                    <div class="box-calc__text">With a USGA Handicap Index&reg; of&nbsp;<b class="index">15.0</b>&nbsp;and a Slope Rating&reg; of&nbsp;<b class="rating">70,</b></div>
                    <div class="box-calc__text">Your Course Handicap is:&nbsp;<b class="course">9</b></div>
                    <div id="calcAgain" class="button button_color1">ANOTHER CALCULATION</div>
                    <div class="box-calc__result__full-results-link">
                        <usga:link path="${properties.handicapCalculatorPageLink}" classes="box-calc__link" data="data-analytics-button='Handicap Results'">
                            VIEW FULL RESULTS
                        </usga:link>
                    </div>
                </div>
                <div class="box-calc__error">
                    <div class="box-calc__text index empty">
                            ${not empty properties.errorMessageHI ? properties.errorMessageHI : 'Handicap Index is required'}
                    </div>
                    <div class="box-calc__text rating empty">
                            ${not empty properties.errorMessageSR ? properties.errorMessageSR : 'Slope Rating is required'}
                    </div>
                    <div class="box-calc__text index wrong">
                            ${not empty properties.errorMessageHIWR ? properties.errorMessageHIWR : 'Handicap Index Must be in the Range of +9.9 to 40.4 for Ladies or +9.9 to 36.4 for Men'}
                    </div>
                    <div class="box-calc__text rating wrong">
                            ${not empty properties.errorMessageSRWR ? properties.errorMessageSRWR : 'Slope Rating must be 55 to 155'}
                    </div>
                    <div id="closeErrorButton" class="button button_color1">OK</div>
                </div>
            </div>
            <div class="box-redirect">
                <div class="box-redirect-small">
                    <div class="box-redirect-small__envelope">
                        <div class="va">
                            <div class="box-redirect-small__text">Course Handicap Calculator</div>
                            <usga:link path="${properties.handicapCalculatorPageLink}" classes="box-redirect-small__link">
                                Calculate your handicap<span class="raquo">&raquo;</span>
                            </usga:link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>var calculator = new usga.Calculator('#calculator');</script>

    </c:when>
    <c:otherwise>

        <div id="calculator" class="box-calc box-calc_separate">
            <div style="display:none" class="box-calc__another-calc">
                <div class="box-calc__another-calc__content">
                    <div class="box-calc__block__outer">
                        <div class="box-calc__block">
                            <div class="box-calc__block__label">Course Handicap<sup>&#0153;</sup></div>
                            <div class="box-calc__block__item">
                                <label class="box-calc__block__item__label">Your Handicap index</label>
                                <input type="text" placeholder="Your Handicap index" class="box-calc__block__item__input"/>
                                <div class="box-calc__block__item__input__link"></div>
                            </div>
                            <div class="box-calc__block__item">
                                <label class="box-calc__block__item__label">Slope Rating</label>
                                <input type="text" placeholder="Slope Rating" class="box-calc__block__item__input"/>
                                <div class="box-calc__block__item__input__link">
                                    <usga:link path="${properties.slopeRatingLink}" classes="box-calc__link box-calc__link_mod2" target="_blank">
                                        LOOK UP
                                    </usga:link>
                                </div>
                            </div>
                            <div class="box-calc__block__item box-calc__block__item_btn">
                                <div class="button button_color1" data-analytics-button="Handicap Calculator">CALCULATE</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-calc__another-calc__switcher">
                    <div class="box-calc__another-calc__switcher__show">Another Calculation</div>
                    <div class="box-calc__another-calc__switcher__hide">Show less</div>
                </div>
            </div>
            <div class="box-calc__general">
                <div class="box-calc__switcher__show">Another Calculation</div>
                <div class="box-calc__title">Course Handicap<sup>&#0153;</sup> Calculator</div>
                <div class="box-calc__text">${properties.sectionDescription}</div>
                <div class="box-calc__block__outer">
                    <div class="box-calc__block">
                        <div class="box-calc__block__label">Course Handicap<sup>&#0153;</sup></div>
                        <div class="box-calc__block__item">
                            <label class="box-calc__block__item__label">Your Handicap index</label>
                            <input type="text" name="index" placeholder="Your Handicap index" class="box-calc__block__item__input"/>
                            <div class="box-calc__block__item__input__link">
                            </div>
                        </div>
                        <div class="box-calc__block__item">
                            <label class="box-calc__block__item__label">Slope Rating</label>
                            <input type="text" name="rating" placeholder="Slope Rating" class="box-calc__block__item__input"/>
                            <div class="box-calc__block__item__input__link">
                                <usga:link path="${properties.slopeRatingLink}" classes="box-calc__link box-calc__link_mod2" target="_blank">
                                    LOOK UP
                                </usga:link>
                            </div>
                        </div>
                        <div class="box-calc__block__item box-calc__block__item_btn">
                            <div id="calcButton" class="button button_color1" data-analytics-button="Handicap Calculator">CALCULATE</div>
                        </div>
                    </div>
                </div>
                <div class="box-calc__switcher__hide">Show less</div>
            </div>
            <div class="box-calc__result">
                <div class="box-calc__title">Course Handicap<sup>&#0153;</sup> Calculator Result</div>
                <div class="box-calc__text">
                    With a USGA Handicap Index<sup>&reg;&nbsp;</sup>of&nbsp;<b class="index"></b> and a Slope Rating<sup>&reg;&nbsp;</sup>of&nbsp;<b class="rating"></b>,&nbsp;
                </div>
                <div class="box-calc__text">Your Course Handicap is:&nbsp<b class="course">9</b></div>
                <div class="box-calc__result__full-results-link">
                    <div id="fullResults" class="button button_color1" data-analytics-button="Handicap Results">VIEW FULL RESULT</div>
                </div>
                <div class="box-calc__result__full-results-content">
                    <table>
                        <thead>
                        <tr>
                            <th>USGA Handicap Index</th>
                            <th>Play to this Course Handicap</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="box-calc__error">
                <div class="icon-ball"></div>
                <div class="box-calc__text index empty">
                        ${not empty properties.errorMessageHI ? properties.errorMessageHI : 'Handicap Index is required'}
                </div>
                <div class="box-calc__text rating empty">
                    ${not empty properties.errorMessageSR ? properties.errorMessageSR : 'Slope Rating is required'}
                </div>
                <div class="box-calc__text index wrong">
                        ${not empty properties.errorMessageHIWR ? properties.errorMessageHIWR : 'Handicap Index Must be in the Range of +9.9 to 40.4 for Ladies or +9.9 to 36.4 for Men'}
                </div>
                <div class="box-calc__text rating wrong">
                        ${not empty properties.errorMessageSRWR ? properties.errorMessageSRWR : 'Slope Rating must be 55 to 155'}
                </div>
            </div>
        </div>
        <script>var calculator = new usga.Calculator('#calculator', {mobile:true});</script>

    </c:otherwise>
</c:choose>
<!-- end calc-->


