<%@ include file="/apps/usga/global.jspx" %>

<div class="wrapper">
    <!-- content part-->
    <div class="content">
        <div id="page-404" class="page-404">
            <div class="page-404__bg">
                <div class="page-404__bg__inner">
                    <usga:data-img src="${pageProperties.bgImg}"/>
                </div>
            </div>
            <div class="page-404__content">
                <div class="page-404__content__tr">
                    <div class="page-404__content__td">
                        <div class="page-404__content__icon"></div>
                        <div class="page-404__content__text">
                            ${pageProperties.text}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>var page404 = new usga.BaseCloudinaryModule('#page-404');</script>
    </div>
</div>