<%@ include file="/apps/usga/global.jspx" %>

<script type="text/stache" id="leaderBoardMiniSummaryBox">
                    <div class="mini-lb-tab mini-tab">
                    	{{#if isMatch}}
                    		<div class="championships__slider__item__content__head">
                    			<p>Match Summary</p>
                    		</div>
                    		<div class="championships__slider__item__content__content">
                    			<div class="matchplay-table">
                    				{{#items}}
                    					<div class="tr">
                    						<div class="td team team_1 {{setLeaderIndicator this '1'}}">
                    							{{#if isFourballChampionship}}
                    								{{{teamPlayerName team1}}}
                    							{{else}}
                    								{{matchPlayerName playerOne}}
                    							{{/if}}
                    						</div>
                    						<div class="td state">
                    							<div class="main">{{getMiniLbStanding}}</div>
                    							<div class="sub">{{getStatus}}</div>
                    						</div>
                    						<div class="td team team_2 {{setLeaderIndicator this '2'}}">
                    							{{#if isFourballChampionship}}
                    								{{{teamPlayerName team2}}}
                    							{{else}}
                    								{{matchPlayerName playerTwo}}
                    							{{/if}}
                    						</div>
                    					</div>
                    				{{/items}}
                    			</div>
                    			<a href="{{fullLBUrl}}" class="button button_color1">Full Scoring</a>
                    		</div>
                    	{{/if}}
                    	{{#if isCup}}
                    		<div class="championships__slider__item__content__head">
                    			<p>Match Summary</p>
                    		</div>
                    		<div class="championships__slider__item__content__content">
                    			<div class="match-play clearfix">
                    				{{#items}}
                    					<div class="match-play__team">
                    						<div class="match-play__team__flags dual">
                    							<img data-src="usga/cutups/flag-2.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=" alt="some discription" data-crop="fit"><img data-src="usga/cutups/flag-3.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=" alt="some discription" data-crop="fit">
                    						</div>
                    						<div class="match-play__team__names">{{teamOneName}}</div>
                    					</div>
                    					<div class="match-play__score">{{teamOnePoints}}-{{teamTwoPoints}}</div>
                    					<div class="match-play__team">
                    						<div class="match-play__team__flags">
                    							<img data-src="usga/cutups/flag-1.png" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=" alt="some discription" data-crop="fit">
                    						</div>
                    						<div class="match-play__team__names">{{teamTwoName}}</div>
                    					</div>
                    				{{/items}}
                    			</div>
                    			<a href="{{fullLBUrl}}" class="button button_color1">All Scores</a>
                    		</div>
                    	{{/if}}
                    	{{#if isStroke}}
                    		<div class="championships__slider__item__content__head">
                    			<div class="stroke-play">
                    				<table>
                    				<thead>
                    					<tr>
                    						<th class="stroke-play__pos">Pos</th>
                    						<th class="stroke-play__players">Players</th>
                    						<th class="stroke-play__total">To Par</th>
                    						<th class="stroke-play__thru">Thru</th>
                    						<th class="stroke-play__today">Today</th>
                    					</tr>
                    				</thead>
                    				</table>
                    			</div>
                    		</div>
                    		<div class="championships__slider__item__content__content">
                    			<div class="stroke-play">
                    				<table>
                    				<tbody>
                    					{{#items}}
                    						<tr>
                    							<td class="stroke-play__pos">{{position}}</td>
                    							<td class="stroke-play__players">
                    								{{#if isFourballChampionship}}
                    									{{team}}
                    								{{else}}
                    									{{shortName}}
                    								{{/if}}
                    							</td>
                    							<td class="stroke-play__total {{parColor strokes}} {{parColor totaltopar}}">
                    								{{#if strokes}}
                    									{{strokes}}
                    								{{else}}
                    									{{totaltopar}}
                    								{{/if}}
                    							</td>
                    							<td class="stroke-play__thru">
                    								{{#if holesplayed}}
                    									{{holesplayed}}
                    								{{else}}
                    									{{thru}}
                    								{{/if}}
                    							</td>
                    							<td class="stroke-play__today">{{today}}</td>
                    						</tr>
                    					{{/if}}
                    				</tbody>
                    				</table>
                    			</div>
                    			<a href="{{fullLBUrl}}" class="button button_color1">View FUll Leaderboard</a>
                    		</div>
                    	{{/if}}
                    </div>
                    <div class="mini-st-tab mini-tab">
                    	<div class="championships__slider__item__content__head">
                    		<div class="starting-times">
                    			<table>
                    			<thead>
                    				<tr>
                    				<th class="starting-times__tee">Tee</th>
                    				<th class="starting-times__time">Time</th>
                    				<th class="starting-times__players">{{#if isMatch}}matches{{else}}PLAYERS{{/if}}</th>
                    				</tr>
                    			</thead>
                    			</table>
                    		</div>
                    		<span class="championships__slider__item__content__head__all">{{timeLegend}}</span>
                    	</div>
                    	<div class="championships__slider__item__content__content">
                    		<div class="starting-times">
                    			<table>
                    			<tbody>
                    				{{#if isStroke}}
                    					{{#times}}
                    						<tr>
                    							<td class="starting-times__tee">{{startingtee}}</td>
                    							<td class="starting-times__time">{{teetime}}</td>
                    							<td class="starting-times__players">
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
                    						<tr>
                    							<td class="starting-times__tee">{{startingtee}}</td>
                    							<td class="starting-times__time">{{teetime}}</td>
                    							<td class="starting-times__players">
                    								{{#if isFourballChampionship}}
                    									{{teamTimesPlayerName team.0.player.name}} -<br/> {{teamTimesPlayerName team.1.player.name}}
                    								{{/if}}
                    							</td>
                    						</tr>
                    					{{/times}}
                    				{{/if}}
                    			</tbody>
                    			</table>
                    		</div>
                    		<a href="{{fullStartingTimesUrl}}" class="button button_color1">All Starting Times</a>
                    	</div>
                    </div>
                  </script>

