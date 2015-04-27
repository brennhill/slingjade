<%@ include file="/apps/usga/global.jspx" %>

<wcmmode:edit not="true">
    <cq:includeClientLib categories="acs-commons.components.ajax.loading-indicator"/>
</wcmmode:edit>

<!-- Modal module-->
<div id="modalIE9" style="display: none" class="modal modal_dark">
    <div class="modal__body">
        <div class="modal__body__content">
            <p>It appears your browser (Internet Explorer&nbsp;<span class="modal__body__content__version">9</span>) is outdated. For the best website experience, we recommend updating your browser</p>
            <a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" target="_blank" class="button button_color1 modal__body__download">Download Latest Version</a>
            <a class="button button_color1 modal__body__dismiss">Dismiss</a>
        </div>
    </div>
</div>
<script>var modalIE9 = new usga.IE9Modal('#modalIE9');</script>
<!-- end Modal module-->

<script type="text/javascript">_satellite.pageBottom();</script>