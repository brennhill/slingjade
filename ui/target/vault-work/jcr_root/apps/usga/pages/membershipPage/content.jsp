<%@ include file="/apps/usga/global.jspx" %>

<div class="wrapper ${pageProperties.isNotOverlap ? '' : 'top-nav-overflow'}">
	<div class="content">
		<!--updated-->
		<script type="text/stache" id="clubhouseMembershipCampaign">
		<div class="membership__media">
			<div class="membership__media__bg">
				<div class="membership__media__bg__inner">
					<cloudinary-image src="{banner.background}" alt=""/>
				</div>
				<div class="gradient_blur">
				</div>
			</div>
		</div>
			<div class="inner inner__tabbable">
				<div id="joinSliderMembership" class="box-main_slider box-main_slider_join-membership swiper-container">
					<div class="slider-wrapper">
						<ul class="main_slider main_slider_join swiper-wrapper">
							{{#each banner.slides}}
							<li class="main_slider__item swiper-slide">
								<div class="main_slider__item__box main_slider__item__box_mod1">
									<div class="main_slider__item__box__title2">{{title}}</div>
									<div class="main_slider__item__box__text">{{description}}</div>
								</div>
							</li>
							{{/each}}
						</ul>
						<div id="slider-menu_join" class="slider-menu">
							{{#unless hidePager}}
								{{#each banner.slides}}
								<div class="slider-menu__item">
									<a data-slide-index="{{@index}}" href="javascript:void(0)" class="slider-menu__item__link">{{title}}</a>
								</div>
								{{/each}}
							{{/unless}}
						</div>
					</div>
				</div>
				<div class="container">
					<div class="member-level">
						<div class="member-level__title">
							{{campaignData.campaign.levelsTitleText}}</div>
						<div class="member-level__envelope member-level__envelope_c{{campaignData.campaign.filteredLevels.length}} visible-large hidden-medium hidden-small">
							{{#each campaignData.campaign.filteredLevels}}
							<div class="member-level__item  {{#if selected}}active{{/if}}" levelId="{{id}}">
								<cloudinary-image alt="" class="member-level__item__image" src="{image}" />
								<div class="member-level__item__title">
									{{membership.shortTitle}}</div>
								<div class="member-level__item__line">
								</div>
								<div class="member-level__item__price">
									&#36;{{price}}
									<div class="member-level__item__price__tip">
										per year</div>
								</div>
								<div class="button button_color1 done_button">
									{{button}}</div>
							</div>
							{{/each}}
						</div>
						<div class="dropdown-white dropdown-white_member-level hidden-large visible-medium visible-small">
							<select class="dropdown level-small">
								{{#each campaignData.campaign.filteredLevels}}
								<option value="{{id}}" {{#if selected}}selected{{/if}}>{{membership.shortTitle}}</option>
								{{/each}}
							</select>
						</div>
					</div>
					<div class="hidden-large visible-medium visible-small">
						<div class="join-membership">
							{{#each campaignData.oneElementArray}}
							<div class="join-membership__item join-membership__item_above">
								<div class="dropdown-white">
									<select class="dropdown categorySmall">
											{{#if campaignData.showIndividualOption}}<option value="Individual">&#36;{{selectedLevel.price}} Individual Membership</option>{{/if}}
											{{#if campaignData.showDualOption}}<option value="Dual">&#36;{{selectedLevel.priceDual}} Dual Members</option>{{/if}}
									</select>
								</div>
								<div class="join-membership__item__tip">{{campaignData.campaign.footerHint}}</div>
							</div>
							{{/each}}

							<div class="button button_color1 done_button">
								{{campaignData.campaign.button}}</div>
						</div>
					</div>
					<!-- title-->
					<h1 id="title26" class="title">
						{{selectedLevel.membership.longTitle}}<span class="title__under">{{selectedLevel.description}}</span>
					</h1>
					<!-- end title-->
					<div id="rulesResources" class="resources">
						<ul class="resources__slider">
							<li class="resources__slider__element">
								<div class="resources__slider__element__container resources__slider__element__container_membership">
									<div class="resources__slider__element__container__title">
										<div class="resources__slider__element__container__title__inner">
											Privileges</div>
									</div>
									{{{selectedLevel.membership.privileges}}}
								</div>
							</li>
							<li class="resources__slider__element">
								<div class="resources__slider__element__container resources__slider__element__container_membership resources__slider__element__container_mod1">
									<div class="resources__slider__element__container__title">
										<div class="resources__slider__element__container__title__inner">
											Benefits</div>
									</div>
									{{{selectedLevel.membership.benefits}}}
								</div>
							</li>
							<li class="resources__slider__element">
								<div class="resources__slider__element__container resources__slider__element__container_membership resources__slider__element__container_img">
									<div class="resources__slider__element__container__title">
										<div class="resources__slider__element__container__title__inner">
											{{selectedLevel.rightColumn.title}}</div>
									</div>
									<div class="resources__slider__element__container__content">
										{{#each campaignData.oneElementArray}}
										<cloudinary-image src="{selectedLevel.rightColumn.image}" crop="fit" alt=""/>
										{{/each}}
										<div class="resources__slider__element__container__content__discription">{{selectedLevel.rightColumn.footer}}</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="inner inner-membership">
				<!-- join-membership module-->
				<div class="visible-large hidden-medium hidden-small">
					<div class="join-membership">
						{{#each campaignData.oneElementArray}}
						<div class="join-membership__item join-membership__item_under">
							<div class="dropdown-white">
								<select class="dropdown categoryLarge">
									{{#if campaignData.showIndividualOption}}<option value="Individual">&#36;{{selectedLevel.price}} Individual Membership</option>{{/if}}
									{{#if campaignData.showDualOption}}<option value="Dual">&#36;{{selectedLevel.priceDual}} Dual Members</option>{{/if}}
								</select>
							</div>
							<div class="join-membership__item__tip">{{campaignData.campaign.footerHint}}</div>
						</div>
						{{/each}}
						<div class="button button_color1 done_button">{{selectedLevel.button}}</div>
					</div>
				</div>
				<!--end join-membership-->
			</div>
        </script>
		<script type="text/stache" id="clubhouseMembershipCampaignExpired">
		<div class="inner inner__tabbable">
			<div class="container">
				<div class="member-level">
					<div class="member-level__title">
						{{expiredMessage}}
					</div>
				</div>
			</div>
		</div>
		</script>
		  <div id="membership" class="membership">
			<div class="campaign_content"></div>
		  </div>
		  <div id="campaignModal" style="display: none" class="modal">
			<div class="modal__body">
			  <div class="modal__inner confirmation">
				<div class="modal__body__header">User Confirmation</div>
				<div class="modal__body__content">
				  <p class="message">Are you John Smith?</p><a class="button button_color1 yes">Yes</a><a class="button button_color1 no">No</a>
				</div>
			  </div>
			  <div class="modal__inner auto-renew">
				<div class="modal__body__close"></div>
				<div class="modal__body__header">Member Alert</div>
				<div class="modal__body__content">
				  <p>You are currently enrolled in our automatic renewal program. Visit <a href="#" class="my_account_link">My Account</a> to manage your settings or <a href="#" class="contact_support_link">contact support</a> with additional questions.</p>
				</div>
			  </div>
			  <div class="modal__inner not-eligible-offer">
				<div class="modal__body__close"></div>
				<div class="modal__body__header">Member Alert</div>
				<div class="modal__body__content">
				  <p>Our apologies but our records show that you are not eligible for the current offer. If you have any questions please call customer service:</p><span> 800-345-4653</span>
				</div>
			  </div>
			  <div class="modal__inner ineligible-for-renewal">
				<div class="modal__body__close"></div>
				<div class="modal__body__header">Member Alert</div>
				<div class="modal__body__content">
				  <p>Good news, your USGA Membership is current. There is no need to renew your membership at this time. Thank you for your continued support of the USGA.</p>
				</div>
			  </div>
			</div>
		  </div>

<div id="loaderModal" style="display: none" class="modal modal_loader">
    <div class="modal__body">
        <div class="modal__body__content">
            <div class="loader">
                <div class="loader__img"></div>
                <div class="loader__text">PLEASE WAIT, LOADING...</div>
            </div>
        </div>
    </div>
</div>
		<cq:include path="teaser" resourceType="usga/components/campaigns/teaser"/>
	</div>
</div>