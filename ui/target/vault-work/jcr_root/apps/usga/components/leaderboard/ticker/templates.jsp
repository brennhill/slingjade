<%@ include file="/apps/usga/global.jspx" %>

<script type="text/stache" id="leaderBoardTickerTabs">
      <div class="leader-board__side">
      	<div class="dropdown-white">
      		<select class="ticker-dropdown">
      			{{#each tabs}}
      				<option {{data 'tab'}} value="{{@index}}">{{{name}}}</option>
      			{{/each}}
      		</select>
      	</div>
      </div>
      <div class="leader-board__side leader-board__side_right">
      	<a href="{{buttonLink}}" class="leader-board__side__button button button_color1">
      		<span class="leader-board__side__button__text">{{#if isMobileScreen}}Scoring{{else}}Full Scoring{{/if}}</span>
      	</a>
      </div>
      <div id="tickerContent" class="leader-board__content {{#if suspended}}leader-board__content_alert{{/if}}"></div>
    </script>
<script type="text/stache" id="leaderBoardTickerTables">
      <div class="{{^isCup}}swiper-container{{/isCup}}">
      	<div class="leader-board__content__inner {{^isCup}}swiper-wrapper{{/isCup}}">
      		{{#if suspended}}
      			<div class="leader-board__content__title">Course alert:</div>
      			<div class="leader-board__content__text">
      				{{suspended}}
      			</div>
      		{{else}}
      			{{#if isCup}}
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
      			{{#if isStroke}}
      				{{#each items}}
      					<div class="leader-board__content__item swiper-slide">
      						{{position}}.
      						{{#if isFourballChampionship}}{{team}}{{else}}{{shortName}}{{/if}}
      						<span class="red">{{#if strokes}}{{strokes}}{{else}}{{totaltopar}}{{/if}}</span>
      						<strong>{{#if holesplayed}}{{holesplayed}}{{else}}{{thru}}{{/if}}</strong>
      					</div>
      				{{/each}}
      			{{/if}}
      			{{#if isMatch}}
      				{{#each items}}
      					<div class="leader-board__content__item swiper-slide">
      						{{#if isFourballChampionship}}
      							{{teamPlayerName team1}}
      						{{else}}
      							{{matchPlayerName playerOne}}
      						{{/if}}
      						<span class="leader-board__content__item__center leader-board__content__item__center_{{renderArrow .}}">
      							{{getMiniLbStanding}} {{#if getStatus}}({{getStatus}}){{/if}}
      						</span>
      						{{#if isFourballChampionship}}
      							{{teamPlayerName team2}}
      						{{else}}
      							{{matchPlayerName playerTwo}}
      						{{/if}}
      					</div>
      				{{/each}}
      			{{/if}}
      		{{/if}}
      	</div>
      </div>
    </script>


