<%@ include file="/apps/usga/global.jspx" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.lists.RecursiveList"  var="rlist"/>
<style type="text/css">
  .pageList h2 {
    color: #000;
    font-size: 30px;
    font-weight: 700;
    font-family: 'Alegreya Sans',sans-serif;
    text-transform: uppercase;
    display: inline-block;
    padding: 0px 10px;
    opacity: 0.9;
    margin:0 20px;
  }
  .pageList ul {
    padding:0 0 0 20px;
  }
  .pageList ul li {
    font-size:30px;
    color:#00365f;
    font-weight:bold;
    font-family: 'Alegreya Sans',sans-serif;
    list-style-type: none;
  }
 .pageList ul li ul li {
    font-size:22px;
    color:#00365f;
    font-weight:bold;
    font-family: 'Alegreya Sans',sans-serif;
    list-style-type: none;
  }
 .pageList ul li ul li ul li{
      font-size:18px;
      padding-bottom:5px;
      color:#000;
      font-weight:normal;
      font-family: 'Alegreya Sans',sans-serif;
      list-style-type: none;
  }
</style>

<c:set var="page" value="${rlist.pageList}" scope="request"/>

<div class="inner">
<h2>${rlist.title}</h2>
<cq:include script="recursive.jsp"/>
</div>
