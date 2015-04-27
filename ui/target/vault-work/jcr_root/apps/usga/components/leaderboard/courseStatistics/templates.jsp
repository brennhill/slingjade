<%@ include file="/apps/usga/global.jspx" %>


<script type="text/stache" id="courseStatisticsTabs">
                    <div id="header-box" class="header-box">
                    	<div class="clearfix">
                    		<div class="pull-left">
                    			<ul class="header-box__list hide-small">
                    				{{#each tabControl}}
                    					<li><a href="#" data-index="{{@index}}" class="header-box__list__item lb-tab-link lb-tab-link-{{@index}}">{{name}}</a></li>
                    				{{/each}}
                    			</ul>
                    			<div class="header-box__list-dropdown dropdown-dark show-small">
                    				<select class="dropdown link-select">
                    					{{#each tabControl}}
                    						<option class="tab-option-{{@index}}" value="{{@index}}">{{name}}</option>
                    					{{/each}}
                    				</select>
                    			</div>
                    		</div>
                    	</div>
                    </div>
                    <div id="courseStatisticsContainer">

                    </div>
                  </script>
<script type="text/stache" id="courseStatisticsTable">
                    {{#each courses}}
                    	<div>
                    		<table class="leaderboard-table">
                    			<tbody>
                    				<tr class="cut-line course-name">
                    					<td colspan="11">{{name}}</td>
                    				</tr>
                    			</tbody>
                    		</table>
                    		<table class="leaderboard-table">
                    			<thead>
                    			<tr>
                    				<th class="col-hole"><a data-type="string">Hole</a></th>
                    				<th class="col-yards cell-big"><a data-type="string">Yards</a></th>
                    				<th class="col-par"><a data-type="string">Par</a></th>
                    				<th class="col-average"><a data-type="string">Average</a></th>
                    				<th class="col-rank"><a data-type="string">Rank</a></th>
                    				<th class="col-eagle cell-big"><a data-type="string">Eagles</a></th>
                    				<th class="col-birdies cell-big"><a data-type="string">Birdies</a></th>
                    				<th class="col-pars cell-big"><a data-type="string">Pars</a></th>
                    				<th class="col-bogeys cell-big"><a data-type="string">Bogeys</a></th>
                    				<th class="col-double-bogeys cell-big"><a data-type="string">Double Bogeys</a></th>
                    				<th class="col-others cell-big"><a data-type="string">Others</a></th>
                    			</tr>
                    			</thead>
                    			{{#each holes}}
                    				<tbody>
                    					<tr>
                    						<td class="col-hole">{{no}}</td>
                    						<td class="col-yards cell-big">{{yards}}</td>
                    						<td class="col-par">{{par}}</td>
                    						<td class="col-average">{{stats.avg}}</td>
                    						<td class="col-rank">{{#if stats.rank}}{{stats.rank}}{{else}}&nbsp;{{/if}}</td>
                    						<td class="col-eagle cell-big">{{stats.eagles}}</td>
                    						<td class="col-birdies cell-big">{{stats.birdies}}</td>
                    						<td class="col-pars cell-big">{{stats.pars}}</td>
                    						<td class="col-bogeys cell-big">{{stats.bogeys}}</td>
                    						<td class="col-double-bogeys cell-big">{{stats.doublebogeys}}</td>
                    						<td class="col-others cell-big">{{stats.others}}</td>
                    					</tr>
                    				</tbody>
                    			{{/each}}
                    		</table>
                    	</div>
                    {{/each}}
                  </script>
