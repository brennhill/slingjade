<%@ include file="/apps/usga/global.jspx" %>

<script type="text/stache" id="leaderBoardMiniLiveEvent">
                          <div class="live-events__module__title">
                          	{{#if sponsors.miniLB}}
                          		<a href="{{sponsors.miniLB.link}}" class="live-events__module__title__partner mini-tab mini-lb-tab">{{sponsors.miniLB.text}}
                          			{{#if sponsors.miniLB.imgUrl}}
                          				<div class="live-events__module__title__partner__logo">
                          					<div class="va">
                          						<img src="{{sponsors.miniLB.imgUrl}}" alt=""/>
                          					</div>
                          				</div>
                          			{{/if}}
                          		</a>
                          	{{/if}}
                          	{{#if sponsors.miniTeeTimes}}
                          		<a href="{{sponsors.miniLB.link}}" class="live-events__module__title__partner mini-tab mini-st-tab">{{sponsors.miniTeeTimes.text}}
                          			{{#if sponsors.miniTeeTimes.imgUrl}}
                          				<div class="live-events__module__title__partner__logo">
                          					<div class="va">
                          						<img src="{{sponsors.miniTeeTimes.imgUrl}}" alt=""/>
                          					</div>
                          				</div>
                          			{{/if}}
                          		</a>
                          	{{/if}}
                          	{{{name}}}
                          </div>
                          <div class="live-events__module__tab-list">
                          	{{#if hasLeaderBoard}}
                          		<div data-target="mini-lb-tab" class="live-events__module__tab-list__item mini-tab-btn mini-lb-tab-btn active">
                          			{{#if isMatch}}
                          				MATCHES
                          			{{/if}}
                          			{{#if isStroke}}
                          				LEADERS
                          			{{/if}}
                          		</div>
                          	{{/if}}
                          	{{#if hasStartingTimes}}
                          		<div data-target="mini-st-tab" class="live-events__module__tab-list__item mini-tab-btn mini-st-tab-btn">STARTING TIMES</div>
                          	{{/if}}
                          </div>
                          <div class="live-events__module__tab mini-lb-tab mini-tab">
                          	{{#if isMatch}}
                          		<table class="live-events__module__tab__table live-events__module__tab__table_matchplay">
                          			<thead class="thead">
                          				<tr>
                          					<td colspan="3">Match Status</td>
                          				</tr>
                          			</thead>
                          			<tbody class="tbody">
                          				{{#items}}
                          					<tr class="tr">
                          						<td class="td team_1 {{setLeaderIndicator this '1'}}">
                          							{{#if isFourballChampionship}}
                          								{{{teamPlayerName team1}}}
                          							{{else}}
                          								{{matchPlayerName playerOne}}
                          							{{/if}}
                          						</td>
                          						<td class="td">{{getMiniLbStanding}}<br>{{getStatus}}</td>
                          						<td class="td team_2 {{setLeaderIndicator this '2'}}">
                          							{{#if isFourballChampionship}}
                          								{{{teamPlayerName team2}}}
                          							{{else}}
                          								{{matchPlayerName playerTwo}}
                          							{{/if}}
                          						</td>
                          					</tr>
                          				{{/items}}
                          			</tbody>
                          		</table>
                          		<a href="{{fullLBUrl}}" class="button button_color1">Full SCORING</a>
                          	{{/if}}
                          	{{#if isStroke}}
                          		<table class="live-events__module__tab__table live-events__module__tab__table_special">
                          			<thead class="thead">
                          				<tr class="tr">
                          					<td class="td">POS</td>
                          					<td class="td">PLAYER</td>
                          					<td class="td">TO PAR</td>
                          					<td class="td">THRU</td>
                          				</tr>
                          			</thead>
                          			<tbody class="tbody">
                          				{{#items}}
                          					<tr class="tr">
                          						<td class="td">{{position}}</td>
                          						<td class="td">{{#if isFourballChampionship}}{{team}}{{else}}{{shortName}}{{/if}}</td>
                          						<td class="td {{parColor strokes}} {{parColor totaltopar}}">{{#if strokes}}{{strokes}}{{else}}{{totaltopar}}{{/if}}</td>
                          						<td class="td">{{#if holesplayed}}{{holesplayed}}{{else}}{{thru}}{{/if}}</td>
                          					</tr>
                          				{{/items}}
                          			</tbody>
                          			<tfoot class="tfoot">
                          				<tr class="tr">
                          					<td colspan="4" class="td">{{teeLegend}}</td>
                          				</tr>
                          			</tfoot>
                          		</table>
                          		<a href="{{fullLBUrl}}" class="button button_color1">Full SCORING</a>
                          	{{/if}}
                          </div>
                          <div class="live-events__module__tab mini-st-tab mini-tab">
                          	<table class="live-events__module__tab__table live-events__module__tab__table_times">
                          		<thead class="thead">
                          			<tr class="tr">
                          				<td class="td">TEE</td>
                          				<td class="td">TIME</td>
                          				<td class="td">{{#if isMatch}}matches{{else}}PLAYERS{{/if}}<span class="abs">{{timeLegend}}</span></td>
                          			</tr>
                          		</thead>
                          		<tbody class="tbody">
                          			{{#if isStroke}}
                          				{{#times}}
                          					<tr class="tr">
                          						<td class="td">{{startingtee}}</td>
                          						<td class="td">{{teetime}}</td>
                          						<td class="td">
                          							{{#each players}}
                          								{{#if isFourballChampionship}}
                          									{{teamTimesPlayerName name}}<br/>
                          								{{else}}
                          									{{shortName}}
                          								{{/if}}
                          							{{/each}}
                          						</td>
                          					</tr>
                          				{{/times}}
                          			{{/if}}
                          			{{#if isMatch}}
                          				{{#times}}
                          					<tr class="tr">
                          						<td class="td">{{startingtee}}</td>
                          						<td class="td">{{teetime}}</td>
                          						{{#if isFourballChampionship}}
                          							<td class="td">{{teamTimesPlayerName team.0.player.name}} -<br/> {{teamTimesPlayerName team.1.player.name}}</td>
                          						{{/if}}
                          					</tr>
                          				{{/times}}
                          			{{/if}}
                          		</tbody>
                          	</table>
                          	<a href="{{fullStartingTimesUrl}}" class="button button_color1">VIEW ALL STARTING TIMES</a>
                          </div>
                        </script>