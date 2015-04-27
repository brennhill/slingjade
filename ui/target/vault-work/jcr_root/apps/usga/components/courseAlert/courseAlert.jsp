<%@ include file="/apps/usga/global.jspx" %>
<%@page session="false" %>

<script type="text/stache" id="leaderBoardTickerStroke">
      <div class="leader-board__content__inner">
      	{{#if suspended}}
      		<div class="leader-board__content__title">Course alert:</div>
      		<div class="leader-board__content__text">
      			{{suspended}}
      		</div>
      	{{else}}
      		{{#each items}}
      			<div class="leader-board__content__item">
      				{{position}}. {{#if useShortNames}}{{shortName}}{{else}}{{name}}{{/if}}
      				<span class="red">{{#if strokes}}{{strokes}}{{else}}{{totaltopar}}{{/if}}</span>
      				<strong>{{#if holesplayed}}{{holesplayed}}{{else}}{{thru}}{{/if}}</strong>
      			</div>
      		{{/each}}
      	{{/if}}
      </div>
</script>
<script type="text/stache" id="leaderBoardTickerMatch">
      <div class="leader-board__content__inner">
      	{{#if suspended}}
      		<div class="leader-board__content__title">Course alert:</div>
      		<div class="leader-board__content__text">
      			{{suspended}}
      		</div>
      	{{else}}
      		{{#each items}}
      			<div class="leader-board__content__item">
      				{{matchPlayerName playerOne}}
      				<span class="leader-board__content__item__center leader-board__content__item__center_{{renderArrow .}}">
      					{{standing}} {{^isCompleted}}(Thru {{thru}}){{/isCompleted}}
      				</span>
      				{{matchPlayerName playerTwo}}
      			</div>
      		{{/each}}
      	{{/if}}
      </div>
</script>
<script type="text/stache" id="leaderBoardTickerCup">
      <div class="leader-board__content__inner">
      	{{#if suspended}}
      		<div class="leader-board__content__title">Course alert:</div>
      		<div class="leader-board__content__text">
      			{{suspended}}
      		</div>
      	{{else}}
      		{{#each items}}
      			<div class="lb-match__head">
      				<div class="lb-match__head__team">
      					<div class="lb-match__head__team__names">
      						<div class="lb-match__head__team__names__cont">{{teamOneName}}</div>
      					</div>
      					<div class="lb-match__head__team__flags">
      						<div class="lb-match__head__team__flags__cont dual">

      						</div>
      					</div>
      				</div>
      				<div class="lb-match__head__score">
      					<div class="lb-match__head__score__cont">
      						{{teamOnePoints}}-{{teamTwoPoints}}
      					</div>
      				</div>
      				<div class="lb-match__head__team">
      					<div class="lb-match__head__team__flags">
      						<div class="lb-match__head__team__flags__cont">

      						</div>
      					</div>
      					<div class="lb-match__head__team__names">
      						<div class="lb-match__head__team__names__cont">{{teamTwoName}}</div>
      					</div>
      				</div>
      			</div>
      		{{/each}}
      	{{/if}}
      </div>
</script>
