<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" trimDirectiveWhitespaces="true" %>
<%@page import="org.apache.commons.codec.binary.Base64, com.day.cq.commons.Externalizer, com.usga.services.config.ClientlibVersionService, com.usga.services.config.SSOConfigService" %>
<% pageContext.setAttribute("JSONP", true, PageContext.REQUEST_SCOPE); %>
<%
  String resourceType="usga/components/navigation/globalNavigation";
  if(currentPage.getPath().contains("/clubhouse")) {
    resourceType="usga/components/clubhouse/clubHouseNavigation";
  }
%>
<c:set var="html">
  <%-- Set attribute to let components know throughout navigation that this is a JSONP request and to use full URIs if needed --%>
  <cq:include path="headerPar/globalNavigation" resourceType="<%=resourceType %>"/>
</c:set>
<c:set var="footerhtml">
    <cq:include path="footerPar/footercontainer" resourceType="usga/components/footer/footerContainer"/>
</c:set>
<%
  response.setContentType("application/javascript");
%>
<%
  ClientlibVersionService versionConfig = sling.getService(ClientlibVersionService.class);
  String version = "unversioned";
  if(versionConfig!=null){
    version = versionConfig.getVersion();
    pageContext.setAttribute("clientlibVersion", version);
  }

 SSOConfigService ssoConfig = sling.getService(SSOConfigService.class);

 String endpoint = "";
 String  gigyaApiKey = ssoConfig.getGigyaKey();
 pageContext.setAttribute("gigyaKey", gigyaApiKey);
 String html = "";
 String footerHTML="";
 String encodedHTML= "";
 String encodedFooter="";
 try {
   endpoint = ssoConfig.getSsoEndpoint();
   pageContext.setAttribute("endpoint", endpoint);
	 html = (String) pageContext.getAttribute("html");
	 footerHTML = (String) pageContext.getAttribute("footerhtml");
   footerHTML =  footerHTML.replace("\n", "").replace("\r", "");
	 Base64 encoder = new Base64(true);
	 encodedHTML = encoder.encodeBase64String(html.getBytes());
	 encodedFooter = encoder.encodeBase64String(footerHTML.getBytes());
	 pageContext.setAttribute("encodedHTML", encodedHTML);
	 pageContext.setAttribute("encodedFooter", encodedFooter);
	 Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
   pageContext.setAttribute("styles", externalizer.publishLink(resourceResolver, "/")+"etc/designs/usga/js/usga.min.css.js");
   pageContext.setAttribute("js", externalizer.publishLink(resourceResolver, "/")+"etc/designs/usga/js/usga.min.js");
 } catch(Exception e) {
	 log.error("couldn't cast to html.");
 }


%>
if (!window.USGA) {
    window.USGA = {}
}

window.usga = window.usga || {};
window.usga.embed = window.USGA;

(function(USGA, $, window) {

    var doc = window.document;

    var dependencies = [
		[
			{
				id: 'usgaEmbedScript',
				src: '//${endpoint}'
			}
		],
        '${styles}?version=${clientlibVersion}',
        '${js}?version=${clientlibVersion}'
    ];

    var encodedNav ="${encodedHTML}";
    var encodedFooter= "${encodedFooter}";
    var isString = function (value) {
        return (typeof value === 'string' || value instanceof String);
    };

    var decodeBase64 = function(s) {
        var e = {}, i, v = [],
            r = '',
            w = String.fromCharCode;
        var n = [
            [65, 91],
            [97, 123],
            [48, 58],
            [43, 44],
            [47, 48]
        ];

        for (var z in n) {
            for (i = n[z][0]; i < n[z][1]; i++) {
                v.push(w(i));
            }
        }
        for (i = 0; i < 64; i++) {
            e[v[i]] = i;
        }

        for (i = 0; i < s.length; i += 72) {
            var b = 0,
                c, x, l = 0,
                o = s.substring(i, i + 72);
            for (x = 0; x < o.length; x++) {
                c = e[o.charAt(x)];
                b = (b << 6) + c;
                l += 6;
                while (l >= 8) {
                    r += w((b >>> (l -= 8)) & 0xff);
                }
            }
        }
        return r;
    };

    var loadScript = function (src, id) {
        var defer = $.Deferred();
        if (id && doc.getElementById(id)) {
            defer.resolve();
        } else {
			var protocolIndex = src.indexOf('://');
			if (~protocolIndex) {
				src = src.substr(protocolIndex + 1);
			}

            var script = doc.createElement('script');
            if (id) {
                script.id = id;
            }
            script.type = 'text/javascript';
            script.src = src;

            script.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    defer.resolve();
                }
            };
            script.onload = function () {
                defer.resolve();
            };

            var firstScript = doc.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        }
        return defer.promise();
    };

	var loadDependencies = function (dependencies, callback) {
		var dependency = dependencies[0];
		if (!$.isArray(dependency)) {
			dependency = [dependency];
		}
		$.when.apply($, $.map(dependency, function (script) {
			var id, src;
			if (isString(script)) {
				src = script;
			} else {
				src = script.src;
				id = script.id;
			}
			return loadScript(src, id);
		})).done(function () {
			if (dependencies.length > 1) {
				loadDependencies(dependencies.slice(1), callback);
			} else {
				callback();
			}
		});
	};

	var injectCode = function() {
		var usga = window.usga;
		usga.$.cloudinary.config({
            'cloud_name': 'usga'
        });
        usga.Gigya.init({
            gigyaApiKey: '${gigyaKey}'
        });
		usga.Attivio = {
			searchEndpoint: 'http://209.48.25.21:17000/usga/json'
		};

        var navigation = decodeBase64(encodedNav);
        var footer = decodeBase64(encodedFooter);

        var $body = $('body');
        $body.prepend(navigation);
        $body.append(footer);

        loadSocialApis();
    };

    var loadSocialApis = function() {
        // facebook root
        if (!$('#fb-root').length) {
            $('body').prepend('<div id="fb-root"></div>');
        }
        // facebook
        loadScript('//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        // twitter
        loadScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    };

	$.whenAll = function (deferreds) {
		return $.isArray(deferreds) ? $.when.apply($, deferreds) : $.when(deferreds);
	};

	var addedStylesCount = 0;
	var addedStyles = [];

	var checkAddedStylesReady = function (callback) {
		for (var i = addedStyles.length - 1; i >= 0; i--) {
			var styleId = addedStyles[i];
			if (!$('.' + styleId).is(':visible')) {
				addedStyles.splice(i, 1);
			}
		}
		if (addedStyles.length) {
			setTimeout(function () {
				checkAddedStylesReady(callback);
			}, 100);
		} else if (callback) {
			callback();
		}
	};

	USGA.addStyles = function (text) {
		var styleId = 'usga-embed-style-' + addedStylesCount++;
		addedStyles.push(styleId);
		// create element to check if style is applied to
		$('<div class="' + styleId + '"></div>').appendTo('body');
		// cleanup styles text by removing possible trailing zeroes
		var len = text.length;
		var zeroCount = 0;
		while(text.charCodeAt(len - zeroCount - 1) == 0) {
			zeroCount++;
		}
		if (zeroCount) {
			text = text.substr(0, len - zeroCount);
		}
		// create style
		text += '.' + styleId + '{display:none;}';
        $('<style type="text/css">\n' + text + '\n</style>').appendTo('head');
    };

    USGA.addEncodedStyles = function (text) {
        this.addStyles(decodeBase64(text));
    };

    USGA.addNavigation = function () {
		loadDependencies(dependencies, function () {
			checkAddedStylesReady(injectCode);
		});
    }

})(window.USGA, window.jQuery, window);