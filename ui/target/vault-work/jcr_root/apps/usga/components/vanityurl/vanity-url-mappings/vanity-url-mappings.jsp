<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<%

%>
<script type="text/javascript">
<!--
	function publishVanityUrls() {

		var getResponse = CQ.HTTP.get("${currentPage.path}/jcr:content/vanity-url-mappings.infinity.0.json");

        if (CQ.HTTP.isOk(getResponse)) {
            var getJson = CQ.Util.eval(getResponse);

			var mappingRoot = getJson.mappingRoot;

			if (mappingRoot) {
		    	var response = CQ.HTTP.post("${currentPage.path}/jcr:content/vanity-url-mappings.activate.html", null,
		    				{ "_charset_":"utf-8", "path":mappingRoot});
		        if (!CQ.HTTP.isOk(response)) {
		            CQ.Notification.notifyFromResponse(response);
		        }
		    	if (CQ.HTTP.isOk(response)) {
		        	CQ.Notification.notify("Activate Vanity URLs", "Vanity URLs successfully activated");
		    	}
			} else {
				CQ.Ext.Msg.alert("Activate Vanity URLs", "Site Mapping Root Not Specified!");
			}
        } else {
        	CQ.Ext.Msg.alert("Activate Vanity URLs", "HTTP Error Occured!");
        }
	}
//-->
</script>


<input type="button" value="Activate" onclick="publishVanityUrls();">

<br/>

<div id="hide-parsys">
    <cq:include path="url-mappings" resourceType="foundation/components/parsys" />
</div>