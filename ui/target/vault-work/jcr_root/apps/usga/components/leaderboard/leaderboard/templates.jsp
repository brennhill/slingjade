<%@ include file="/apps/usga/global.jspx" %>


<script type="text/stache" id="leaderBoardMainControl">
                    <div id="header-box" class="header-box">
                    	<div class="clearfix">
                    		<div class="pull-left leaderboard-view-item">
                    			<ul class="header-box__list hide-small">
                    				{{#each links}}
                    					{{#if display}}
                    						<li><a href="{{name}}" data-index={{@index}} class="header-box__list__item lb-tab-link">{{altText}}</a></li>
                    					{{/if}}
                    				{{/each}}
                    			</ul>
                    			<ul class="header-box__list hide-small">
                    				{{#each filters}}
                    					<li><a data-tab="{{tab}}" href="#" class="header-box__list__item {{name}}">{{text}}</a></li>
                    				{{/each}}
                    			</ul>
                    			<div class="header-box__list-dropdown dropdown-dark show-small">
                    				{{#if filters}}
                    					<select class="dropdown filter-select">
                    						{{#each filters}}
                    							<option value="{{tab}}">{{text}}</option>
                    						{{/each}}
                    					</select>
                    				{{/if}}
                    				{{#if links}}
                    					<select class="dropdown link-select">
                    						{{#each links}}
                    							{{#if display}}
                    								<option {{#if selected}}selected{{/if}} value="{{@index}}">{{text}}</option>
                    							{{/if}}
                    						{{/each}}
                    					</select>
                    				{{/if}}
                    			</div>
                    		</div>
                    		<div class="pull-right mobile-content">
                    			{{#if bracket}}
                    				{{#if isBracketActive}}
                    					<ul class="header-box__switcher pull-right">
                    						<li>
                    							<a href="#" data-target="leaderboard" class="header-box__switcher__table view-item-switcher active" title="Table View"></a>
                    						</li>
                    						<li>
                    							<a href="#" data-target="brackets" class="header-box__switcher__brackets view-item-switcher" title="Brackets View"></a>
                    						</li>
                    					</ul>
                    				{{/if}}
                    			{{/if}}
                    			<div class="header-box__search pull-right clearfix leaderboard-view-item">
                    				<input type="text" placeholder="Find a {{#if isTeamStrokeLb}}Team{{else}}Player{{/if}}" class="header-box__search__field search-field"/>
                    				<button class="header-box__search__button search-button"></button>
                    			</div>
                    		</div>
                    	</div>
                    </div>
                    <div id="leaderboardContainer" class="leaderboard-view-item">
                    	{{#each tabs}}
                    		<div id="{{name}}" class="leaderboard-tab" style="display: none;"></div>
                    	{{/each}}
                    </div>
                    <div id="leaderboardBracketsContainer" class="brackets-view-item" style="display: none;">

                    </div>
                  </script>
<script type="text/stache" id="leaderBoardPlayer">
                    <tr {{data 'player'}} class="leader-board-player lb-clickable">
                    	<td class="col_fav">
                    		{{#if stateTeam}}
                    			&nbsp;
                    		{{else}}
                    			<div class="favorite {{#selected}}remove{{else}}add{{/if}}"></div>
                    		{{/if}}
                    	</td>
                    	<td class="col_pos">{{#if position}}{{position}}{{else}}&nbsp;{{/if}}</td>
                    	{{#if isIndIntlStrokeLb}}
                    		<td class="col_flag desktop">
                    			<span class="flag {{getFlag .}}"></span>
                    		</td>
                    	{{/if}}
                    	<td class="col_team">
                    		{{#if isMobileScreen}}
                    			{{{shortName}}}
                    		{{else}}
                    			{{displayName}}
                    		{{/if}}
                    	</td>
                    	{{#isTwoRoundsEvent roundData}}
                    		{{^isFourBallIntlStrokeLb}}
                    			<td class="col_team desktop">{{getHomeTown}}</td>
                    		{{/isFourBallIntlStrokeLb}}
                    	{{/isTwoRoundsEvent}}
                    	{{#if isIndStateStrokeLb}}
                    		<td class="col_team desktop">
                    			<span class="flag {{getFlag .}}"></span>{{country}}
                    		</td>
                    	{{/if}}
                    	<td class="col_to-par desktop {{parColor totaltopar}}">{{#if totaltopar}}{{totaltopar}}{{else}}&nbsp;{{/if}}</td>
                    	<td class="col_to-par phone">{{#if stateIndividual}}{{strokes}}{{else}}{{total}}{{/if}}</td>
                    	<td class="col_hole">{{thru}}</td>
                    	<td class="col_today {{parColor today}}">{{today}}</td>
                    	{{#each roundData}}
                    		<td class="col_round {{roundParColor no}} {{#isCurrentRound no}}current{{/isCurrentRound}}">{{getRoundAttr no}}</td>
                    	{{/each}}
                    	{{#if stateIndividual}}
                    		<td class="col_total {{parColor totaltopar}}">{{strokes}}</td>
                    	{{else}}
                    		<td class="col_total {{parColor totaltopar}}">{{total}}</td>
                    	{{/if}}
                    </tr>
                  </script>
<script type="text/stache" id="leaderBoardTeam">
                    <tr class="row_team" {{data 'team'}}>
                    	<td class="col_fav">
                    		<div class="favorite {{#selected}}remove{{else}}add{{/if}}"></div>
                    	</td>
                    	<td class="col_pos">{{pos}}</td>
                    	<td class="col_team"><span class="flag state {{getFlag .}}"></span>{{state}}</td>
                    	<td class="col_to-par desktop">{{topar}}</td>
                    	<td class="col_to-par phone">{{total}}</td>
                    	<td class="col_hole">{{thru}}</td>
                    	<td class="col_today">{{today}}</td>
                    	{{#each roundData}}
                    		<td class="col_round {{#isCurrentRound no}}current{{/isCurrentRound}}">{{getRoundAttr no}}</td>
                    	{{/each}}
                    	<td class="col_total desktop">{{total}}</td>
                    </tr>
                  </script>
<script type="text/stache" id="leaderBoardMatch">
                    <div class="lb-match__container__item__content match-item {{#if isStarted}}lb-clickable{{/if}}" {{data 'match'}}>
                    	<div class="lb-match__container__item__content__team {{setLeaderIndicator this '1'}}">
                    		<div class="row">
                    		{{#if isIndMatchPlayLb}}
                    			<div class="col flags">
                    				<div class="team-flag"><span class="flag {{getFlag players.player.0}}"></span></div>
                    			</div>
                    		{{/if}}
                    		{{#if isTeamMatchPlayLb}}
                    			<div class="col flags">
                    				<div class="team-flag"><span class="flag"><img src="{{teamData.0.flag}}"/></span></div>
                    			</div>
                    		{{/if}}
                    		{{^isTeamMatchPlayLb}}
                    			<div class="col seed">{{team.0.player.seed}}</div>
                    		{{/isTeamMatchPlayLb}}
                    		<div class="col player">
                    			<div class="player__name">
                    				{{#if isMobileScreen}}
                    					{{#if isFourBallMatchPlayLb}}
                    						{{{team.0.player.shortTeamName}}}
                    					{{else}}
                    						{{{players.player.0.shortName}}}
                    					{{/if}}
                    				{{else}}
                    					{{#if isIndMatchPlayLb}}
                    						{{players.player.0.fullName}}
                    					{{/if}}
                    					{{#if isTeamMatchPlayLb}}
                    						{{players.player.0.name}}
                    					{{/if}}
                    					{{#if isFourBallMatchPlayLb}}
                    						{{team.0.player.teamName}}
                    					{{/if}}
                    				{{/if}}
                    			</div>
                    			{{#if isIndMatchPlayLb}}
                    				<div class="player__address">{{players.player.0.residence}}</div>
                    			{{/if}}
                    		</div>
                    		</div>
                    	</div>
                    	<div class="lb-match__container__item__content__score">{{getStanding}}
                    		<div class="date">{{getStatus}}</div>
                    	</div>
                    	<div class="lb-match__container__item__content__team {{setLeaderIndicator this '2'}}">
                    		<div class="row">
                    		<div class="col player">
                    			<div class="player__name">
                    				{{#if isMobileScreen}}
                    					{{#if isFourBallMatchPlayLb}}
                    						{{{team.1.player.shortTeamName}}}
                    					{{else}}
                    						{{{players.player.1.shortName}}}
                    					{{/if}}
                    				{{else}}
                    					{{#if isIndMatchPlayLb}}
                    						{{players.player.1.fullName}}
                    					{{/if}}
                    					{{#if isTeamMatchPlayLb}}
                    						{{players.player.1.name}}
                    					{{/if}}
                    					{{#if isFourBallMatchPlayLb}}
                    						{{team.1.player.teamName}}
                    					{{/if}}
                    				{{/if}}
                    			</div>
                    			{{#if isIndMatchPlayLb}}
                    				<div class="player__address">{{players.player.1.residence}}</div>
                    			{{/if}}
                    		</div>
                    		{{^isTeamMatchPlayLb}}
                    			<div class="col seed">{{team.1.player.seed}}</div>
                    		{{/isTeamMatchPlayLb}}
                    		{{#if isIndMatchPlayLb}}
                    			<div class="col flags">
                    				<div class="team-flag"><span class="flag {{getFlag players.player.1}}"></span></div>
                    			</div>
                    		{{/if}}
                    		{{#if isTeamMatchPlayLb}}
                    			<div class="col flags">
                    				<div class="team-flag"><span class="flag"><img src="{{teamData.1.flag}}"/></span></div>
                    			</div>
                    		{{/if}}
                    		</div>
                    	</div>
                    </div>
                  </script>
<script type="text/stache" id="leaderBoardTeamMatchPlay">
                    <div class="lb-match__head">
                    	<div class="lb-match__head__team">
                    		<div class="lb-match__head__team__flags">
                    			<div class="lb-match__head__team__flags__cont dual">
                    				<img src="{{matchPlayTeamsData.teamOneFlag}}" alt="{{matchPlayTeamsData.teamOneName}}"/>
                    			</div>
                    		</div>
                    		<div class="lb-match__head__team__names">
                    			<div class="lb-match__head__team__names__cont">{{matchPlayTeamsData.teamOneName}}</div>
                    		</div>
                    	</div>
                    	<div class="lb-match__head__score">
                    		<div class="lb-match__head__score__cont">
                    			<div class="lb-match__head__score__cont__team">{{matchPlayTeamsData.teamOnePoints}}</div>
                    			<div class="lb-match__head__score__cont__versus">vs</div>
                    			<div class="lb-match__head__score__cont__team">{{matchPlayTeamsData.teamTwoPoints}}</div>
                    		</div>
                    	</div>
                    	<div class="lb-match__head__team">
                    		<div class="lb-match__head__team__flags">
                    			<div class="lb-match__head__team__flags__cont">
                    				<img src="{{matchPlayTeamsData.teamTwoFlag}}" alt="{{matchPlayTeamsData.teamTwoName}}"/>
                    			</div>
                    		</div>
                    		<div class="lb-match__head__team__names">
                    			<div class="lb-match__head__team__names__cont">{{matchPlayTeamsData.teamTwoName}}</div>
                    		</div>
                    	</div>
                    </div>
                  </script>
<script type="text/stache" id="leaderBoardStateIndividualStroke">
                    {{#if suspended}}
                    	<div class="alert alert_warning">
                    		<span class="alert__title">COURSE ALERT:</span> {{suspended}}
                    	</div>
                    {{/if}}
                    <div class="leaderboard-playoff" id="leaderboardPlayoff" style="display: none;"></div>
                    <table>
                    	<thead>
                    	<tr>
                    		<th class="col_fav">
                    			<div class="favorite inactive"></div>
                    		</th>
                    		<th class="col_pos">
                    			<a href="#" data-type="number-t" data-attr="position" class="sort-table sort-asc">Pos</a>
                    		</th>
                    		{{#if isIndIntlStrokeLb}}
                    			<th class="col_team desktop">
                    				<a href="#" data-type="string" data-attr="country" class="sort-table">Country</a>
                    			</th>
                    		{{/if}}
                    		<th class="col_team">
                    			<a href="#" data-type="string" data-attr="displayName" class="sort-table">Player{{#if isFourBallIntlStrokeLb}}s{{/if}}</a>
                    		</th>
                    		{{#isTwoRoundsEvent roundData}}
                    			{{^isFourBallIntlStrokeLb}}
                    				<th class="col_team desktop">
                    					<a href="#" data-type="string" data-attr="hometown" class="sort-table">Hometown</a>
                    				</th>
                    			{{/isFourBallIntlStrokeLb}}
                    		{{/isTwoRoundsEvent}}
                    		{{#if isIndStateStrokeLb}}
                    			<th class="col_team desktop">
                    				<a data-type="string" data-attr="country" class="sort-table" href="#">Team</a>
                    			</th>
                    		{{/if}}
                    		<th class="col_to-par">
                    			<a href="#" data-type="number-nan" data-attr="totaltopar" class="desktop sort-table">To Par</a>
                    			<a href="#" data-type="number-nan" data-attr="strokes" class="phone sort-table">ToT</a>
                    		</th>
                    		<th class="col_hole">
                    			<a data-type="string" data-attr="thru" class="sort-table" href="#">Thru</a>
                    		</th>
                    		<th class="col_today">
                    			<a data-type="number-nan" data-attr="today" class="sort-table" href="#">Today</a>
                    		</th>
                    		{{#each roundData}}
                    			<th class="col_round {{#isCurrentRound no}}current{{/isCurrentRound}}">
                    				<a data-type="number" data-attr="R{{no}}" href="#" class="desktop sort-table">Round {{no}}</a>
                    				{{#isCurrentRound no}}
                    					<a data-type="number" data-attr="R{{no}}" href="#" class="phone sort-table">R{{no}}</a>
                    				{{/isCurrentRound}}
                    			</th>
                    		{{/each}}
                    		<th class="col_total">
                    			<a data-type="number" data-attr="strokes" class="sort-table" href="#">Total</a>
                    		</th>
                    	</tr>
                    	{{#if tableLegend.length}}
                    		<tr class="lb-footnotes">
                    			<th colspan="15">
                    				{{#each tableLegend}}<span>{{.}}</span>{{/each}}
                    			</th>
                    		</tr>
                    	{{/if}}
                    	</thead>
                    	<tbody id="myLeaderBoard" class="my-leader-board">
                    		<tr>
                    			<td class="col_legend" id="myLeaderBoardTitle" colspan="15" style="display:none">
                    				My Leader Board
                    			</td>
                    		</tr>
                    	</tbody>
                    	<tbody id="fullLeaderBoard" class="full-leader-board">
                    		<tr>
                    			<td class="col_legend" id="fullLeaderBoardTitle" colspan="15">
                    				Full Leader Board
                    			</td>
                    		</tr>
                    	</tbody>
                    </table>
                  </script>
<script type="text/stache" id="leaderBoardStateTeamStroke">
                    {{#if suspended}}
                    	<div class="alert alert_warning">
                    		<span class="alert__title">COURSE ALERT:</span> {{suspended}}
                    	</div>
                    {{/if}}
                    <table>
                    	<thead>
                    	<tr>
                    		<th class="col_fav">
                    			<div class="favorite inactive"></div>
                    		</th>
                    		<th class="col_pos">
                    			<a href="#" data-type="number-t" data-attr="pos" class="sort-table sort-asc">Pos</a>
                    		</th>
                    		<th class="col_team">
                    			<a data-type="string" data-attr="state" class="sort-table" href="#">Team</a>
                    		</th>
                    		<th class="col_to-par">
                    			<a href="#" data-type="number-nan" data-attr="topar" class="desktop sort-table">To Par</a>
                    			<a href="#" data-type="number-nan" data-attr="total" class="phone sort-table">ToT</a>
                    		</th>
                    		<th class="col_hole">
                    			<a data-type="string" data-attr="thru" class="sort-table" href="#">Hole</a>
                    		</th>
                    		<th class="col_today">
                    			<a data-type="number-nan" data-attr="today" class="sort-table" href="#">Today</a>
                    		</th>
                    		{{#each roundData}}
                    			<th class="col_round {{#isCurrentRound no}}current{{/isCurrentRound}}">
                    				<a data-type="number" data-attr="r{{no}}" href="#" class="sort-table desktop">Round {{no}}</a>
                    				{{#isCurrentRound no}}
                    					<a data-type="number" data-attr="R{{no}}" href="#" class="phone sort-table">R{{no}}</a>
                    				{{/isCurrentRound}}
                    			</th>
                    		{{/each}}
                    		<th class="col_total">
                    			<a data-type="number" data-attr="total" class="sort-table" href="#">Total</a>
                    		</th>
                    	</tr>
                    	{{#if tableLegend.length}}
                    		<tr class="lb-footnotes">
                    			<th colspan="15">
                    				{{#each tableLegend}}<span>{{.}}</span>{{/each}}
                    			</th>
                    		</tr>
                    	{{/if}}
                    	</thead>
                    	<tbody id="myLeaderBoard" class="my-leader-board">
                    		<tr>
                    			<td class="col_legend" id="myLeaderBoardTitle" colspan="15" style="display:none">
                    				My Leader Board
                    			</td>
                    		</tr>
                    	</tbody>
                    	<tbody id="fullLeaderBoard" class="full-leader-board">
                    		<tr>
                    			<td class="col_legend" id="fullLeaderBoardTitle" colspan="15">
                    				Full Leader Board
                    			</td>
                    		</tr>
                    	</tbody>
                    </table>
                  </script>
<script type="text/stache" id="leaderBoardDrawerScoreCard">
                    <div class="drawer">
                    	<table class="scoreboard">
                    		<tr>
                    			<td class="scoreboard__profile">
                    				<div class="scoreboard__profile__inner">
                    					{{^isFourBallIntlStrokeLb}}
                    						<div class="scoreboard__profile__photo"><img src="{{photoUrl}}" alt="{{displayName}}"/></div>
                    					{{/isFourBallIntlStrokeLb}}
                    					<div class="scoreboard__profile__player">
                    						{{#if isFourBallIntlStrokeLb}}
                    							{{#splitTeamNames}}
                    								<div class="scoreboard__profile__player__name">{{name}}</div>
                    								<div class="scoreboard__profile__player__address">{{country}}</div>
                    							{{/splitTeamNames}}
                    						{{else}}
                    							<div class="scoreboard__profile__player__name">{{displayName}}</div>
                    							<div class="scoreboard__profile__player__address">{{getCountry}}</div>
                    						{{/if}}
                    					</div>
                    				</div>
                    			</td>
                    			<td class="scoreboard__drawer">
                    				<div class="drawer__header clearfix">
                    					<ul class="drawer__header__list">
                    						{{#each getRounds}}
                    							<li><a href="#" data-tab="item{{no}}" class="item{{no}}-switcher rounds-switcher drawer__header__list__item">Round {{no}}</a></li>
                    						{{/each}}
                    						<li><a href="#" data-tab="all" class="item{{no}}-switcher rounds-switcher drawer__header__list__item">All Rounds</a></li>
                    					</ul>
                    					<div class="clearfix">
                    						<div class="drawer__header__close-btn close-drawer">
                    							<div class="drawer__header__close-btn__text">Close</div>
                    							<div class="drawer__header__close-btn__img"></div>
                    						</div>
                    						<div class="drawer__header__profile">
                    							{{^isFourBallIntlStrokeLb}}
                    								<div class="drawer__header__profile__photo"><img src="{{photoUrl}}" alt="{{displayName}}"/></div>
                    							{{/isFourBallIntlStrokeLb}}
                    							<div class="drawer__header__profile__player">
                    								{{#if isFourBallIntlStrokeLb}}
                    									{{#splitTeamNames}}
                    										<div class="scoreboard__profile__player__name">{{name}}</div>
                    										<div class="scoreboard__profile__player__address">{{country}}</div>
                    									{{/splitTeamNames}}
                    								{{else}}
                    									<div class="scoreboard__profile__player__name">{{displayName}}</div>
                    									<div class="scoreboard__profile__player__address">{{getCountry}}</div>
                    								{{/if}}
                    							</div>
                    						</div>
                    					</div>
                    					<div class="drawer__header__dropdown dropdown-gray">
                    						<select name="" class="drawer__header__dropdown__item rounds-select">
                    							{{#each getRounds}}
                    								<option value="item{{no}}">Round {{no}}</option>
                    							{{/each}}
                    							<option value="all">All Rounds</option>
                    						</select>
                    					</div>
                    				</div>
                    				<div class="drawer__content">
                    					<div class="drawer__content__visible">
                    						<table>
                    							<tr class="holes">
                    								<td>
                    									<div class="full-name">Hole</div>
                    									<div class="short-name">H</div>
                    								</td>
                    							</tr>
                    							<tr class="par">
                    								<td class="text-bold">
                    									<div class="full-name">Par</div>
                    									<div class="short-name">Par</div>
                    								</td>
                    							</tr>
                    							{{#each getRounds}}
                    								<tr class="tab-round tab-item{{no}}">
                    									<td>
                    										<div class="full-name">Yards</div>
                    										<div class="short-name">Yrd</div>
                    									</td>
                    								</tr>
                    								<tr class="tab-round tab-item{{no}}">
                    									<td>
                    										<div class="full-name">Round {{no}}</div>
                    										<div class="short-name">R{{no}}</div>
                    									</td>
                    								</tr>
                    							{{/each}}
                    						</table>
                    					</div>
                    					<ul class="drawer__content__slider clearfix">
                    						<li>
                    							<table>
                    								<tr class="holes text-uppercase">
                    									{{#each results.outData.holeList}}
                    										<td>{{mList}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="par">
                    									{{#each results.outData.parList}}
                    										<td>{{mList}}</td>
                    									{{/each}}
                    								</tr>
                    								{{#each results.outData.rounds}}
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td>{{yards}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td class="{{strikeColor namedScore holePar strokes}}">{{strokes}}</td>
                    										{{/each}}
                    									</tr>
                    								{{/each}}
                    							</table>
                    						</li>
                    						<li>
                    							<table>
                    								<tr class="holes text-uppercase">
                    									{{#each results.inData.holeList}}
                    										<td>{{mList}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="par">
                    									{{#each results.inData.parList}}
                    										<td>{{mList}}</td>
                    									{{/each}}
                    								</tr>
                    								{{#each results.inData.rounds}}
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td>{{yards}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td class="{{strikeColor namedScore holePar strokes}}">{{strokes}}</td>
                    										{{/each}}
                    									</tr>
                    								{{/each}}
                    							</table>
                    						</li>
                    					</ul>
                    					<div class="drawer__content__visible total">
                    						<table>
                    							<tr class="holes">
                    								<td>TOT</td>
                    							</tr>
                    							<tr class="par">
                    								<td>{{results.totalData.par.mList}}</td>
                    							</tr>
                    							{{#each results.totalData.rounds}}
                    								<tr class="tab-round tab-item{{roundByIndex @index}}">
                    									{{#each .}}
                    										<td>{{yards}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="tab-round tab-item{{roundByIndex @index}}">
                    									{{#each .}}
                    										<td>{{strokes}}</td>
                    									{{/each}}
                    								</tr>
                    							{{/each}}
                    						</table>
                    					</div>
                    				</div>
                    				<div class="drawer__footnote">
                    					<div class="drawer__footnote__item eagle">Eagle or better</div>
                    					<div class="drawer__footnote__item birdie">Birdie</div>
                    					<div class="drawer__footnote__item par">Par</div>
                    					<div class="drawer__footnote__item bogey">Bogey</div>
                    					<div class="drawer__footnote__item double-bogey">Double bogey or worse</div>
                    				</div>
                    			</td>
                    		</tr>
                    	</table>
                    </div>
                  </script>
<script type="text/stache" id="leaderBoardDrawerScoreCardFourball">
                    <div class="drawer">
                    	<table class="scoreboard">
                    		<tr>
                    			<td class="scoreboard__profile">
                    				<div class="scoreboard__profile__inner">
                    					<div class="scoreboard__profile__player">
                    						<div class="scoreboard__profile__player__name">{{players.player.0.fullName}}</div>
                    						<div class="scoreboard__profile__player__address">{{players.player.0.hometown}}</div>
                    						<div class="scoreboard__profile__player__name">{{players.player.1.fullName}}</div>
                    						<div class="scoreboard__profile__player__address">{{players.player.1.hometown}}</div>
                    					</div>
                    				</div>
                    			</td>
                    			<td class="scoreboard__drawer">
                    				<div class="drawer__header clearfix">
                    					<ul class="drawer__header__list">
                    						{{#each getRounds}}
                    							<li><a href="#" data-tab="item{{no}}" class="item{{no}}-switcher rounds-switcher drawer__header__list__item">Round {{no}}</a></li>
                    						{{/each}}
                    						<li><a href="#" data-tab="all" class="item{{no}}-switcher rounds-switcher drawer__header__list__item">All Rounds</a></li>
                    					</ul>
                    					<div class="clearfix">
                    						<div class="drawer__header__close-btn close-drawer">
                    							<div class="drawer__header__close-btn__text">Close</div>
                    							<div class="drawer__header__close-btn__img"></div>
                    						</div>
                    						<div class="drawer__header__profile">
                    							<div class="drawer__header__profile__player">
                    								<div class="scoreboard__profile__player__name">{{players.player.0.fullName}}</div>
                    								<div class="scoreboard__profile__player__address">{{players.player.0.hometown}}</div>
                    								<div class="scoreboard__profile__player__name">{{players.player.1.fullName}}</div>
                    								<div class="scoreboard__profile__player__address">{{players.player.1.hometown}}</div>
                    							</div>
                    						</div>
                    					</div>
                    					<div class="drawer__header__dropdown dropdown-gray">
                    						<select name="" class="drawer__header__dropdown__item rounds-select">
                    							{{#each getRounds}}
                    								<option value="item{{no}}">Round {{no}}</option>
                    							{{/each}}
                    							<option value="all">All Rounds</option>
                    						</select>
                    					</div>
                    				</div>
                    				<div class="drawer__content">
                    					<div class="drawer__content__visible">
                    						<table>
                    							{{#each getRounds}}
                    								<tr class="holes tab-round tab-item{{no}}">
                    									<td>
                    										<div class="full-name">Hole</div>
                    										<div class="short-name">H</div>
                    									</td>
                    								</tr>
                    								<tr class="par tab-round tab-item{{no}}">
                    									<td class="text-bold">
                    										<div class="full-name">Par</div>
                    										<div class="short-name">Par</div>
                    									</td>
                    								</tr>
                    								<tr class="tab-round tab-item{{no}}">
                    									<td>
                    										<div class="full-name">Yards</div>
                    										<div class="short-name">Yrd</div>
                    									</td>
                    								</tr>
                    								<tr class="tab-round tab-item{{no}}">
                    									<td>
                    										<div class="full-name">Round {{no}}</div>
                    										<div class="short-name">R{{no}}</div>
                    									</td>
                    								</tr>
                    							{{/each}}
                    						</table>
                    					</div>
                    					<ul class="drawer__content__slider clearfix">
                    						<li>
                    							<table>
                    								{{#each results.outData.rounds}}
                    									<tr class="holes tab-round tab-item{{roundByIndex @index}} text-uppercase">
                    										{{#each .}}
                    											<td>{{no}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="par tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td>{{holePar}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td>{{yards}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td class="{{strikeColor namedScore holePar strokes}}">{{strokes}}</td>
                    										{{/each}}
                    									</tr>
                    								{{/each}}
                    							</table>
                    						</li>
                    						<li>
                    							<table>
                    								{{#each results.inData.rounds}}
                    									<tr class="holes tab-round tab-item{{roundByIndex @index}} text-uppercase">
                    										{{#each .}}
                    											<td>{{no}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="par tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td>{{holePar}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td>{{yards}}</td>
                    										{{/each}}
                    									</tr>
                    									<tr class="tab-round tab-item{{roundByIndex @index}}">
                    										{{#each .}}
                    											<td class="{{strikeColor namedScore holePar strokes}}">{{strokes}}</td>
                    										{{/each}}
                    									</tr>
                    								{{/each}}
                    							</table>
                    						</li>
                    					</ul>
                    					<div class="drawer__content__visible total">
                    						<table>
                    							{{#each results.totalData.rounds}}
                    								<tr class="holes tab-round tab-item{{roundByIndex @index}}">
                    									<td>TOT</td>
                    								</tr>
                    								<tr class="par tab-round tab-item{{roundByIndex @index}}">
                    									{{#each .}}
                    										<td>{{holePar}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="tab-round tab-item{{roundByIndex @index}}">
                    									{{#each .}}
                    										<td>{{yards}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="tab-round tab-item{{roundByIndex @index}}">
                    									{{#each .}}
                    										<td>{{strokes}}</td>
                    									{{/each}}
                    								</tr>
                    							{{/each}}
                    						</table>
                    					</div>
                    				</div>
                    				<div class="drawer__footnote">
                    					<div class="drawer__footnote__item eagle">Eagle or better</div>
                    					<div class="drawer__footnote__item birdie">Birdie</div>
                    					<div class="drawer__footnote__item par">Par</div>
                    					<div class="drawer__footnote__item bogey">Bogey</div>
                    					<div class="drawer__footnote__item double-bogey">Double bogey or worse</div>
                    				</div>
                    			</td>
                    		</tr>
                    	</table>
                    </div>
                  </script>
<script type="text/stache" id="leaderBoardDrawerMatchPlay">
                    <div class="drawer">
                    	<div class="drawer__header clearfix">
                    		<div class="drawer__header__close-btn">
                    			<div class="drawer__header__close-btn__text close-drawer">Close</div>
                    			<div class="drawer__header__close-btn__img close-drawer"></div>
                    		</div>
                    	</div>
                    	<div class="drawer__content">
                    		<div class="drawer__content__visible">
                    			<table>
                    				<tbody>
                    					<tr class="holes">
                    						<td>Hole</td>
                    					</tr>
                    					<tr class="par">
                    						<td>Par</td>
                    					</tr>
                    					<tr>
                    						<td>Yards</td>
                    					</tr>
                    					<tr>
                    						<td class="info">
                    							<table>
                    								<tbody>
                    									<tr>
                    										{{#if isIndMatchPlayLb}}
                    											<td class="photo"><img src="{{players.player.0.photoUrl}}" alt="{{players.player.0.fullName}}"></td>
                    											<td>
                    												<div class="name">{{players.player.0.fullName}}</div>
                    											</td>
                    										{{/if}}
                    										{{#if isTeamMatchPlayLb}}
                    											<td>
                    												<div class="name">{{players.player.0.name}}</div>
                    											</td>
                    										{{/if}}
                    										{{#if isFourBallMatchPlayLb}}
                    											<td>
                    												<div class="name">{{team.0.player.teamName}}</div>
                    											</td>
                    										{{/if}}
                    									</tr>
                    								</tbody>
                    							</table>
                    						</td>
                    					</tr>
                    					<tr>
                    						<td class="info">
                    							<table>
                    								<tbody>
                    								<tr>
                    									{{#if isIndMatchPlayLb}}
                    										<td class="photo"><img src="{{players.player.1.photoUrl}}" alt="{{players.player.1.fullName}}"></td>
                    										<td>
                    											<div class="name">{{players.player.1.fullName}}</div>
                    										</td>
                    									{{/if}}
                    									{{#if isTeamMatchPlayLb}}
                    										<td>
                    											<div class="name">{{players.player.1.name}}</div>
                    										</td>
                    									{{/if}}
                    									{{#if isFourBallMatchPlayLb}}
                    										<td>
                    											<div class="name">{{team.1.player.teamName}}</div>
                    										</td>
                    									{{/if}}
                    								</tr>
                    								</tbody>
                    							</table>
                    						</td>
                    					</tr>
                    				</tbody>
                    			</table>
                    		</div>
                    		<div class="drawer__content__slider__wrap">
                    			<ul class="drawer__content__slider clearfix">
                    				{{#each results}}
                    					<li>
                    						<table>
                    							<tbody>
                    								<tr class="holes">
                    									{{#each holeNumbers}}
                    										<td>{{.}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="par">
                    									{{#each holes}}
                    										<td>{{par}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr class="par">
                    									{{#each holes}}
                    										<td>{{yards}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr>
                    									{{#each playerOne}}
                    										<td>{{#if .}}{{renderStanding standing offset}}{{/if}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr>
                    									{{#each playerOne}}
                    										<td class="{{renderWinner won}}">{{strokes}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr>
                    									{{#each playerTwo}}
                    										<td class="{{renderWinner won}}">{{strokes}}</td>
                    									{{/each}}
                    								</tr>
                    								<tr>
                    									{{#each playerTwo}}
                    										<td>{{#if .}}{{renderStanding standing offset}}{{/if}}</td>
                    									{{/each}}
                    								</tr>
                    							</tbody>
                    					</table>
                    				</li>
                    				{{/each}}
                    			</ul>
                    		</div>
                    	</div>
                    	<div class="drawer__footnote">
                    		<div class="drawer__footnote__item won">Won the hole</div>
                    	</div>
                    </div>
                  </script>
<script type="text/stache" id="playOffTable">
                    <div class="playoff-header">{{#each legends}}{{.}}{{/each}}</div>
                    <div class="playoff-table clearfix">
                    	<div class="playoff-title">
                    		<table>
                    			<tr>
                    				<td>Hole</td>
                    			</tr>
                    			<tr>
                    				<td>Par</td>
                    			</tr>
                    			<tr>
                    				<td>Yards</td>
                    			</tr>
                    			{{#each playoffPlayers}}
                    				<tr>
                    					<td>
                    						{{#if isFourballChampionship}}
                    							<div class="full-name">{{player1}}<br/>{{player2}}</div>
                    							<div class="short-name">{{renderShortName player1}}<br/>{{renderShortName player2}}</div>
                    						{{else}}
                    							<div class="full-name"></div>
                    							<div class="short-name"></div>
                    						{{/if}}
                    						<span class="state {{getStatus status}}">{{status}}</span>
                    					</td>
                    				</tr>
                    			{{/each}}
                    		</table>
                    	</div>
                    	<div class="playoff-slider-wrap">
                    		<ul class="playoff-slider">
                    			{{#each holesData}}
                    				<li>
                    					<table>
                    						<tr>
                    							{{#each holeNumbers}}<td>{{.}}</td>{{/each}}
                    						</tr>
                    						<tr>
                    							{{#each holePar}}<td>{{.}}</td>{{/each}}
                    						</tr>
                    						<tr>
                    							{{#each holeYards}}<td>{{.}}</td>{{/each}}
                    						</tr>
                    						{{#each playersScores}}
                    							<tr>
                    								{{#each .}}
                    									<td>{{strokes}}</td>
                    								{{/each}}
                    							</tr>
                    						{{/each}}
                    					</table>
                    				</li>
                    			{{/each}}
                    		</ul>
                    	</div>
                    </div>
                  </script>
<script type="text/stache" id="leaderBoardBrackets32">
                    <div class="brackets clearfix">
                    	<div class="brackets__cut-line">Match-play bracket</div>
                    	<div class="brackets__rounds">
                    		{{#each columns}}
                    			<div class="brackets__rounds__item">
                    				<div class="brackets__rounds__item__name">{{name}}</div>
                    				<div class="brackets__rounds__item__date">{{formatDate date}}</div>
                    			</div>
                    		{{/each}}
                    		<div class="brackets__rounds__item">
                    			<div class="brackets__rounds__item__name"><strong>CHAMPION</strong></div>
                    			<div class="brackets__rounds__item__date"></div>
                    		</div>
                    	</div>
                    	<div class="brackets__map">
                    		<div class="clearfix">
                    			<div class="brackets__sections">
                    				{{#each columns}}
                    					<div data-index="{{@index}}" class="brackets__sections__item clearfix round-switcher round-switcher{{@index}}">
                    						<div class="brackets__sections__item__name">{{name}}</div>
                    						<div class="brackets__sections__item__arrow"></div>
                    					</div>
                    				{{/each}}
                    			</div>
                    			<div class="brackets__key brackets__key_32">
                    				<div class="brackets__key__title">Bracket Key</div>
                    				<div class="brackets__key__grid">
                    					{{#each rounds}}
                    						<div class="round of-{{getTeamsLength this}} bracket-key-round bracket-key{{@index}}">
                    							{{#each match}}
                    								<div class="round__item"></div>
                    							{{/each}}
                    						</div>
                    					{{/each}}
                    					<div class="round final">
                    						<div class="round__item"></div>
                    					</div>
                    				</div>
                    			</div>
                    		</div>
                    	</div>
                    	<div class="brackets__pagination">
                    		{{#each columns}}
                    			<div data-index="{{@index}}" class="brackets__pagination__item bracket-pagination-item{{@index}}">
                    				<div class="brackets__pagination__item__dot"></div>
                    			</div>
                    		{{/each}}
                    	</div>
                    	<div class="brackets__container">
                    		{{#each rounds}}
                    			<div class="section s{{getTeamsLength this}}-of-32 bracket-section{{@index}}">
                    				{{#notFirstRound @index}}
                    					<div class="section__inner">
                    						<div class="table">
                    							<div class="table__cell">
                    								{{#each match}}
                    									{{#each team}}
                    										{{#if player.name}}
                    											<div class="team">
                    												<div class="team__main">
                    													<div class="team__main__seeds">{{player.seed}}</div>
                    													<table class="team__main__info">
                    														<tr>
                    															<td class="team__main__info__name">
                    																<p>{{splitNames player.name 0}}</p>
                    															</td>
                    														</tr>
                    														<tr>
                    															<td class="team__main__info__name">
                    																<p>{{splitNames player.name 1}}</p>
                    															</td>
                    														</tr>
                    													</table>
                    												</div>
                    												<div class="team__sub final-score">{{getPreviousRoundStanding player.number roundIndex rounds}}</div>
                    											</div>
                    										{{else}}
                    											<div class="team empty"></div>
                    										{{/if}}
                    									{{/each}}
                    								{{/each}}
                    							</div>
                    						</div>
                    					</div>
                    				{{else}}
                    					{{#each match}}
                    						{{#each team}}
                    							{{#if player.name}}
                    								<div class="team">
                    									<div class="team__main">
                    										<div class="team__main__seeds">{{player.seed}}</div>
                    										<table class="team__main__info">
                    											<tr>
                    												<td class="team__main__info__name">
                    													<p>{{splitNames player.name 0}}</p>
                    												</td>
                    											</tr>
                    											<tr>
                    												<td class="team__main__info__name">
                    													<p>{{splitNames player.name 1}}</p>
                    												</td>
                    											</tr>
                    										</table>
                    									</div>
                    									<div class="team__score">{{player.qscore}}</div>
                    								</div>
                    							{{else}}
                    								<div class="team empty"></div>
                    							{{/if}}
                    						{{/each}}
                    					{{/each}}
                    				{{/notFirstRound}}
                    				<div class="game">
                    					<div class="table">
                    						<div class="table__cell">
                    							{{#each match}}
                    								<div class="game__stats {{renderLeader this 'leaderClass'}}">
                    									{{renderLeader this 'standing'}}&nbsp;{{renderLeader this 'status'}}
                    								</div>
                    							{{/each}}
                    						</div>
                    					</div>
                    				</div>
                    				<div class="lines">
                    					<div class="table">
                    						<div class="table__cell">
                    							{{#each match}}
                    								<div class="line"></div>
                    							{{/each}}
                    						</div>
                    					</div>
                    				</div>
                    			</div>
                    		{{/each}}
                    		<div class="section final bracket-section{{getFinalIndex rounds}}">
                    			<div class="section__inner">
                    				<div class="table">
                    					<div class="table__cell">
                    						{{#if champion}}
                    							<div class="team">
                    								<div class="team__main">
                    									<div class="team__main__seeds">{{champion.seed}}</div>
                    									<table class="team__main__info">
                    										<tr>
                    											<td class="team__main__info__name">
                    												<p>{{splitNames champion.name 0}}</p>
                    											</td>
                    										</tr>
                    										<tr>
                    											<td class="team__main__info__name">
                    												<p>{{splitNames champion.name 1}}</p>
                    											</td>
                    										</tr>
                    									</table>
                    								</div>
                    								<div class="team__sub final-score">{{getPreviousRoundStanding champion.number champion.roundIndex rounds}}</div>
                    							</div>
                    						{{else}}
                    							<div class="team empty"></div>
                    						{{/if}}
                    					</div>
                    				</div>
                    			</div>
                    		</div>
                    	</div>
                    </div>
                  </script>