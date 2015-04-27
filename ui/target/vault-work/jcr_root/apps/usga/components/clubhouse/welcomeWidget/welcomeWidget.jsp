<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.usga.components.models.welcomewidget.WelcomeWidget" var="welcomeWidget"/>
  <!-- Welcome Widget-->
<script type="text/stache" id="welcomeWidgetForm">
<div class="widget welcome">
  <div class="widget__header">
    <div class="widget__header__welcome">{{title}}</div>
    <div class="widget__header__name">{{subtitle}}</div>
  </div>
  <div class="widget__content">
    <p>{{{body}}}</p>
  </div>
  <div class="widget__controls">
  {{#buttons}}
      {{#if buttonText}}
        {{#if buttonUrl}}
            <a class="button button_color1" href="{{buttonUrl}}">{{buttonText}}</a>
        {{/if}}
        {{#unless buttonUrl}}
            <button class="button button_color1 {{buttonCss}}">{{buttonText}}</button>
        {{/if}}
      {{/if}}
  {{/buttons}}
  </div>
  <div class="widget__connect">
    {{{footer}}}
  </div>
</div>
</script>
<script type="text/stache" id="signInWidgetForm">
<div class="widget signin">
  <div class="widget__header">
    <div class="widget__header__welcome">{{title}}</div>
    <div class="widget__header__name">{{subtitle}}</div>
  </div>
  <div class="widget__content">
    <p>{{body}}</p>
  </div>
  <div class="widget__controls">
  {{#buttons}}
      {{#if buttonText}}
        {{#if buttonUrl}}
            <a class="button button_color1" href="{{buttonUrl}}">{{buttonText}}</a>
        {{/if}}
        {{#unless buttonUrl}}
            <button class="button button_color1 {{buttonCss}}">{{buttonText}}</button>
        {{/if}}
      {{/if}}
  {{/buttons}}
  </div>
  <div class="widget__connect">
    {{{footer}}}
  </div>
</div>
</script>
<div id="welcomeWidget" class="welcome-widget">
  <div class="inner">
    <div class="welcome-widget-content"></div>
  </div>
</div>
<script>var welcomeWidget = new usga.WelcomeWidget('#welcomeWidget', ${welcomeWidget.json});</script>
<!-- end Welcome Widget-->