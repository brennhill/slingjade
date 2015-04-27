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
<script type="text/stache" id="startingTimesMatch">
                    <table class="leaderboard-table">
                    	<thead>
                    		<tr>
                    			<th class="col-tee"><a href="#" data-type="number" data-attr="startingtee" class="sort-table sort-asc">Tee</a></th>
                    			<th class="col-time"><a href="#" data-type="time" data-attr="teetime" class="sort-table">Time</a></th>
                    			<th colspan="3">Players</th>
                    		</tr>
                    		{{#if tableLegend.length}}
                    			<tr class="lb-footnotes">
                    				<th colspan="15">
                    					{{#each tableLegend}}<span>{{.}}</span>{{/each}}
                    				</th>
                    			</tr>
                    		{{/if}}
                    	</thead>
                    	<tbody>
                    		{{#each matches}}
                    			<tr data-teetime="{{teetime}}" data-startingtee="{{startingtee}}" class="starting-times-row sortable-row" search-data="{{renderSearchData .}}">
                    				<td class="col-tee">{{startingtee}}</td>
                    				<td class="col-time">{{teetime}}</td>
                    				<td class="col-player cell-big">
                    					{{#if isFourballChampionship}}
                    						{{team.0.player.teamName}}
                    					{{else}}
                    						<span class="{{getFlag .}}"></span>
                    						{{team.0.player.displayName}}
                    					{{/if}}
                    				</td>
                    				<td class="col-versus cell-big">vs</td>
                    				<td class="col-player cell-big">
                    					{{#if isFourballChampionship}}
                    						{{team.1.player.teamName}}
                    					{{else}}
                    						<span class="{{getFlag .}}"></span>
                    						{{team.1.player.displayName}}
                    					{{/if}}
                    				</td>
                    				{{#if isFourballChampionship}}
                    					<td class="col-player cell-small">
                    						{{{team.0.player.shortTeamName}}}
                    					</td>
                    					<td class="col-versus cell-small">vs</td>
                    					<td class="col-player cell-small">
                    						{{{team.1.player.shortTeamName}}}
                    					</td>
                    				{{else}}
                    					<td colspan="3" class="col-full-info cell-small">
                    						<table>
                    							<tr>
                    								<td class="col-flag">
                    									<span class="flag {{getFlag .}}">
                    								</td>
                    								<td class="col-match">
                    									<span class="name">{{team.0.player.teamName}}</span>
                    									&nbsp;vs&nbsp;
                    									<span class="name">{{team.1.player.teamName}}</span>
                    								</td>
                    								<td class="col-flag">
                    									<span class="flag {{getFlag .}}">
                    								</td>
                    							</tr>
                    						</table>
                    					</td>
                    				{{/if}}
                    			</tr>
                    		{{/each}}
                    	</tbody>
                    </table>
                  </script>
<script type="text/stache" id="startingTimesStroke">
                    <table class="leaderboard-table">
                    	<thead>
                    		<tr>
                    			<th class="col-tee"><a href="#" data-type="text" data-attr="startingtee" class="sort-table">Tee</a></th>
                    			<th class="col-time"><a href="#" data-type="time" data-attr="teetime" class="sort-table sort-asc">Time</a></th>
                    			<th colspan="3">Players</th>
                    		</tr>
                    		{{#if tableLegend}}
                    			<tr class="lb-footnotes">
                    				<th colspan="15">
                    					{{#each tableLegend}}<span>{{.}}</span>{{/each}}
                    				</th>
                    			</tr>
                    		{{/if}}
                    	</thead>
                    	<tbody>
                    		<tr class="starting-times-anchor starting-times-row"></tr>
                    		{{#each times}}
                    			<tr data-teetime="{{teetime}}" data-startingtee="{{startingtee}}{{#if coursecode}}-{{coursecode}}{{/if}}" class="starting-times-row sortable-row" search-data="{{renderSearchData .}}">
                    				<td class="col-tee">{{startingtee}}{{#if coursecode}}-{{coursecode}}{{/if}}</td>
                    				<td class="col-time">{{teetime}}</td>
                    				{{#each players}}
                    					<td class="col-player cell-big">
                    						{{#if isFourballChampionship}}
                    							{{teamName}}
                    						{{else}}
                    							<span class="{{getFlag .}}"></span>
                    							{{displayName}}
                    						{{/if}}
                    					</td>
                    				{{/each}}
                    				{{#if isFourballChampionship}}
                    					{{#each players}}
                    						<td class="col-player cell-small">
                    							<span class="name">{{{shortTeamName}}}</span>
                    						</td>
                    					{{/each}}
                    				{{else}}
                    					<td colspan="3" class="col-full-info cell-small">
                    						{{#each players}}
                    							<span class="name">{{shortName}}</span>
                    						{{/each}}
                    					</td>
                    				{{/if}}
                    			</tr>
                    		{{/each}}
                    	</tbody>
                    </table>
                  </script>


