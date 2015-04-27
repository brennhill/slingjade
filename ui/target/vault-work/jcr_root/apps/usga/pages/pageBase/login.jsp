<%@ include file="/apps/usga/global.jspx" %>
<%@ page import="com.usga.services.config.SSOConfigService,com.usga.services.config.ClientlibVersionService" %>
<script>
    ;(function (window) {
        var ssoSrc = '//' + ((window.usga && window.usga.isProd()) ? '' : 'staging.') + 'account.usga.org/js/ua.embed.js';
        document.write('<scr' + 'ipt type="text/javascript" src="' + ssoSrc + '" id="usgaEmbedScript"></scr' + 'ipt>');
    })(window);
</script>

<style>
    #usgaOverlayWindow {
        position: fixed;
        z-index: 1000;
    } 
</style>