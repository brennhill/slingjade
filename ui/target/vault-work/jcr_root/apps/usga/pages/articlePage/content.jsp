<%@ include file="/apps/usga/global.jspx" %>

<div class="wrapper">
    <!-- content part-->
    <div class="content">
        <div class="inner">
            <article id="article" class="article">
                <cq:include path="contentPar1" resourceType="foundation/components/parsys"/>

                <div class="article__inner">
                    <cq:include path="contentPar2" resourceType="foundation/components/parsys"/>
                </div>
                <div class="article__inner">
                    <cq:include path="contentPar3" resourceType="foundation/components/parsys"/>
                </div>
            </article>

            <script>var article = new usga.Article('#article');</script>

            <cq:include path="contentPar4" resourceType="foundation/components/parsys"/>
        </div>
    </div>
</div>