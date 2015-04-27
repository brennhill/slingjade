<%@ include file="/apps/usga/global.jspx" %>

<script type="text/stache" id="leaderBoardMiniLatest">
                          <div class="mini-lb-tab mini-tab">
                          	{{#if isMatch}}
                          		<div class="latest-matchplay">
                          			<div class="latest-matchplay__header">
                          				<div class="latest-matchplay__header__title">Matches</div>
                          				<div class="latest-matchplay__header__subtitle">{{roundName}}</div>
                          			</div>
                          			<div class="latest-matchplay__container">
                          				<div class="latest-matchplay__container__head">Match Status</div>
                          				<div class="latest-matchplay__container__content">
                          					{{#items}}
                          						<div class="latest-matchplay__container__content__item clearfix">
                          							<div class="state">{{getMiniLbStanding}} {{#if getStatus}}({{getStatus}}){{/if}}</div>
                          							<div class="table">
                          								<div class="col team_1 {{setLeaderIndicator this '1'}}">
                          									{{#if isFourballChampionship}}
                          										{{{teamPlayerName team1}}}
                          									{{else}}
                          										{{matchPlayerName playerOne}}
                          									{{/if}}
                          								</div>
                          								<div class="col team_2 {{setLeaderIndicator this '2'}}">
                          									{{#if isFourballChampionship}}
                          										{{{teamPlayerName team2}}}
                          									{{else}}
                          										{{matchPlayerName playerTwo}}
                          									{{/if}}
                          								</div>
                          							</div>
                          						</div>
                          					{{/items}}
                          				</div>
                          				<a href="{{fullLBUrl}}" class="button button_color1">FULL SCORING</a>
                          			</div>
                          		</div>
                          	{{/if}}
                          	{{#if isStroke}}
                          		<div class="latest-leaderboard">
                          			<div class="latest-leaderboard__header">
                          				<div class="latest-leaderboard__header__title">Leader Board</div>
                          				<div class="latest-leaderboard__header__subtitle">{{strokeRoundName}}</div>
                          			</div>
                          			<div class="latest-leaderboard__container">
                          				<div class="latest-leaderboard__container__head clearfix">
                          					<div class="col col_pos">Pos</div>
                          					<div class="col col_player">Player</div>
                          					<div class="col col_tot">tot</div>
                          					<div class="col col_thru">thru</div>
                          				</div>
                          				<div class="latest-leaderboard__container__content">
                          					{{#items}}
                          					<div class="latest-leaderboard__container__content__item clearfix">
                          						<div class="col col_pos">{{position}}</div>
                          						<div class="col col_player">{{#if isFourballChampionship}}{{team}}{{else}}{{shortName}}{{/if}}</div>
                          						<div class="col col_tot {{parColor strokes}} {{parColor totaltopar}}">{{#if strokes}}{{strokes}}{{else}}{{totaltopar}}{{/if}}</div>
                          						<div class="col col_thru">{{#if holesplayed}}{{holesplayed}}{{else}}{{thru}}{{/if}}</div>
                          					</div>
                          					{{/items}}
                          				</div>
                          				<div class="latest-leaderboard__container__footnote">{{teeLegend}}</div>
                          				<a href="{{fullLBUrl}}" class="button button_color1">FULL SCORING</a>
                          			</div>
                          		</div>
                          	{{/if}}
                          </div>
                        </script>