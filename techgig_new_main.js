/***
 * Javascript For All Techgig Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 01 June, 2016
 */

var BaseUrl = base_url;
var base_location = '';
Base_Url = BaseUrl.replace("//", "/"), BaseUrl = -1 != base_location.indexOf("qna") ? base_location.substr(0, base_location.indexOf("qna")) : base_url + "/";
var HeaderHelpText = {};
HeaderHelpText.company = "Search Company..", HeaderHelpText.people = "Search people..", HeaderHelpText.projects = "Search Projects..", HeaderHelpText.jobs = "Search Jobs..", HeaderHelpText.answers = "Search Answers..", HeaderHelpText.webinars = "Search Webinars..", HeaderHelpText.news = "Search Tech News..", HeaderHelpText.courses = "Search Courses..";

var AutoCompleteURLs = {};
AutoCompleteURLs.company = BaseUrl + "ajax_files/autocomplete.php?type=comp_header_search", AutoCompleteURLs.institute = BaseUrl + "ajax_files/autocomplete.php?type=institute", AutoCompleteURLs.people = BaseUrl + "ajax_files/autocomplete.php?type=pp_header_search", AutoCompleteURLs.projects = BaseUrl + "ajax_files/autocomplete.php?type=project_header_search", AutoCompleteURLs.jobs = BaseUrl + "ajax_files/autocomplete.php?type=job_header_search", AutoCompleteURLs.answers = BaseUrl + "ajax_files/autocomplete.php?type=qna_header_search", AutoCompleteURLs.webinars = BaseUrl + "ajax_files/autocomplete.php?type=webinar_header_search", AutoCompleteURLs.news = BaseUrl + "ajax_files/autocomplete.php?type=news_header_search", AutoCompleteURLs.courses = BaseUrl + "ajax_files/autocomplete.php?type=course_header_search" 



Tg_CommonFunction = new function () {
    var $instance = this;
	
	$instance.init = function () {
		
		$.getScript(base_url+"/Themes/Release/javascript/head.core.min.js")
                .done(function () {
					console.log('Headcore loaded');
                })
                .fail(function () {
                    console.log('Headcore not loaded');
                })
		
		$(document).on("click",".open-recommendation-pop", function(){			
			$("#customize-techgig-sm-btn").trigger( "click" );
		});
		
		$("#header .menu-btn").click( function(){
			$("#container-wrap").toggleClass("activeMenu");	
		});	
		
		if($('#sub-links').length==0) {
		  $('#header .main-search-btn').hide();
		}
		
		var menu_licount = $('#main-navigation > ul > li').length;
		$('#main-navigation > ul > li').width(100/menu_licount+'%');
		
		$(window).resize(function(){
			$("#container-wrap").removeClass("activeMenu");
		});
		
		$('#main-navigation ul li.parent').mouseenter(function(){
			$('#main-navigation').addClass("activeDropdown").removeClass("hide-sub-category");
		}).mouseleave(function(){
			$('#main-navigation').removeClass("activeDropdown").addClass("hide-sub-category");
		});
		
		$(document).on("click",".sub-category-list ul li", function(){			
			$('#main-navigation').removeClass("activeDropdown").addClass("hide-sub-category");
		});
		
		$(window).scroll(function() {    

			var windowScroll = $(window).scrollTop();

			if($('.main-banner').length || $('#banner').length || $('#user-info').length) {
				if($(window).width() < 767){
					var topScroll = 0;
				}else{
					var topScroll = $(".main-banner, #banner, #user-info").innerHeight() - 10;
				}
				
			} else {
				if($(window).width() < 767){
					var topScroll = 0;
				}else{
					var topScroll = 88;
				}			
			}
			
			if($('#sub-links').length > 0) {
			   if (windowScroll > topScroll) {
				$('#sub-links, .ecs-srch').addClass('fixed');
				$('#sub-links').parent().addClass('fixed-parent');
				if($(window).width() < 767){
					$('#container-wrap').css('padding-top', 77);
				}else{
					$('#container-wrap').css('padding-top', 150);
				}
			   } else {
				$('#sub-links, .ecs-srch').removeClass('fixed');
				$('#sub-links').parent().removeClass('fixed-parent');
				if($(window).width() < 767){
					$('#container-wrap').css('padding-top', 77);
				}else{
					$('#container-wrap').css('padding-top', 100);
				}
			   }	
		   }
		   else{
			   if (windowScroll > topScroll) {
				$('#sub-links, .ecs-srch').addClass('fixed');
				$('#sub-links').parent().addClass('fixed-parent');
				if($(window).width() < 767){
					$('#container-wrap').css('padding-top', 42);
				}else{
					$('#container-wrap').css('padding-top', 100);
				}
			   } else {
				$('#sub-links, .ecs-srch').removeClass('fixed');
				$('#sub-links').parent().removeClass('fixed-parent');
				if($(window).width() < 767){
					$('#container-wrap').css('padding-top', 42);
				}else{
					$('#container-wrap').css('padding-top', 100);
				}
			   }
		   }
	   });
		
		$("#Subscribe-Email").click( function() {

			var email = $('#subscribe_email').val();

			var url = base_url + '/general_ajax_task.php?action=save_techgig_subsription_block';

			$.post(url, {'email_id':email}, function(data){ 
			data = $.trim(data);
			if(data != 'NVEMAIL') {
			if(isNaN(data)) {
			$('#subscribe-email-form .modal-body').html('<p>Error During Subsription. Please try again.</p>');
			$('#subscribe-email-form').modal('show');
			} else {
			$('#subscribe-email-form .modal-body').html('<p>Thank you for subsribing to TechGig Updates.</p>');
			$('#subscribe-email-form').modal('show');
			}
			} else {
			$('#subscribe-email-form .modal-body').html('<p>Please provide valid email id</p>');
			$('#subscribe-email-form').modal('show');
			}
			setTimeout(function() {
			$('#subscribe-email-form').modal('hide').slow();
			}, 6000);
			});

		});
		
		var notification_url = base_url + '/ajax_files/notification_user_count.php';
		$('ul#logged-in-notification li.challenges:eq(0)').load(notification_url + '?type=challenges', function(e){
		});
		$('ul#logged-in-notification li.news:eq(0)').load(notification_url + '?type=news', function(e){
		});
		$('ul#logged-in-notification li.webinars:eq(0)').load(notification_url + '?type=webinars', function(e){
		});
		
		// Condition for codewizards to remove header 		
		var str = top.location.href;
		if(str.match('codewizards')) { 
			$("#header").hide();
			$("#container-wrap").addClass("clearfix new-wrap");
			$(".links-container").css('top', 0);
		 } 
		 if(str.match('tg3')) { 
			$("#header").hide();
			$("#container-wrap").addClass("clearfix new-wrap");
			$(".links-container").css('top', 0);
		 } 
		  if(str.match('codegladiators')) { 
			$("#header").hide();
			$("#container-wrap").addClass("clearfix new-wrap");
			$(".links-container").css('top', 0);
		 } 
		 
		 $("#feedback").css({"z-index":"1000"});
		 
		 $("#recommended-for-you header").click( function() {
			 $(this).parent().toggleClass('banner-hide');
		});
	
		setTimeout(function(){ $("#recommended-for-you").removeClass('banner-hide'); }, 20000);
		
		$("#Subscribe-Email").click( function() {

			var email = $('#subscribe_email').val();

			var url = base_url + '/general_ajax_task.php?action=save_techgig_subsription_block';
				
				$.post(url, {'email_id':email}, function(data){ 
					data = $.trim(data);
					if(data != 'NVEMAIL') {
						if(isNaN(data)) {
							$('#subscribe-email-form .modal-body').html('<p>Error During Subsription. Please try again.</p>');
							$('#subscribe-email-form').modal('show');
						} else {
							$('#subscribe-email-form .modal-body').html('<p>Thank you for subsribing to TechGig Updates.</p>');
							$('#subscribe-email-form').modal('show');
						}
					} else {
							$('#subscribe-email-form .modal-body').html('<p>Please provide valid email id</p>');
							$('#subscribe-email-form').modal('show');
					}
					setTimeout(function() {
						$('#subscribe-email-form').modal('hide').slow();
						}, 6000);
			});

		});

	}

	$instance.challengesCountdown = function(){
		$.getScript(base_url+"/Themes/Release/javascript/cg2016_jquery.countdown.js")
                .done(function () {
                    $('.countdown .alt-1').countDown({
						css_class: 'countdown-alt-2'
					});
                })
                .fail(function () {
                    console.log('waitme not loaded');
                })
	};
	
	$instance.onePageNav = function(){
		$.getScript(base_url+"/Themes/Release/javascript/onepagenav.js")
			.done(function () {
				$('#main-navigation .sub-category-list ul').onePageNav({ 
					currentClass: 'active',
					scrollOffset: 120,
					scrollThreshold: 0.01,
					changeHash: false,
					filter: ':not(.external)'
				});
				
				if($('#sub-links').length > 0) {
				
					if($(window).width() < 767){
							$('#sub-links ul').onePageNav({ 
							currentClass: 'active',
							scrollOffset: 120,
							scrollThreshold: 0.01,
							changeHash: false,
							filter: ':not(.external)'
						});
						
					}else{
							$('#sub-links ul').onePageNav({ 
								currentClass: 'active',
								scrollOffset: 155,
								scrollThreshold: 0.01,
								changeHash: false,
								filter: ':not(.external)'
							});
					}
					
				}
			})
			.fail(function () {
				console.log('OnePageNav not loaded');
			});
	};
	
	$instance.open_html_modal = function(title, html){
		$('#TechGigbootStrapModal .modal-dialog').removeClass('modal-lg');
		$('#TechGigbootStrapModal .modal-body').html(html);			
		if(title == '') {
			$('#TechGigbootStrapModal .modal-header').hide(); //hiding title header
		} else {
			$('#TechGigbootStrapModal .modal-title').html(title);
		}
		$('#TechGigbootStrapModal').modal('show');
		return false;
	};
	
	$instance.set_slider_list = function (container_id, content_width, display_count) {
		
		$.getScript(base_url+"/Themes/Release/javascript/jquery.carouFredSel-6.0.5-packed.js")
				.done(function () {
					if(typeof content_width === 'undefined') {
			content_width = 270;
		}
		
		if(typeof display_count === 'undefined') {
			display_count = 3;
		}
	
		$('#'+container_id+' ul').carouFredSel({
			responsive: true,
			width: '100%',
			circular: true,
			infinite:false,
			auto : false,
			scroll: 1,
			prev: '#'+container_id+' .previous-btn',
			next: '#'+container_id+' .next-btn',
			items: {
				width: content_width,
				height: 'variable',
				visible: {
					min: 1,
					max: display_count
				}
			}
		});
		
		var sliderHeight = $('#'+container_id+' ul li').height();
		$('#'+container_id+' .caroufredsel_wrapper').height(sliderHeight);
		
		$('#'+container_id+' .previous-btn,#'+container_id+' .next-btn').show();	
				})
				.fail(function () {
					console.log('carouFredSel not loaded');
				});
		
		
	};
	
	$instance.saveResponseNRefreshCookiesForTjPopUP = function(){
		var url = base_url + '/general_ajax_task.php?action=save_tj_popup_response';
		$.post(url, null, function(data){ 
		data = $.trim(data);
		if(data == 'Y') {
			//
		}
		});
		return false;
	};
	
	$instance.loadECourseAutoPopUpLayer = function(course_title){
		//<?php echo $course_title_name; ?>
		$('#thanks_block').hide();
			$('#layer2, #init_form').show();
			$('#source_type').val('call_me');
			$('#interested_course_block').hide();
			$('#lead_content').val(course_title);
			$('#layer_heading').html('Interested in this course? Give us your details. We will call you.');
			layerPop('layer2');
	}
	
	$instance.loadExtraJavascripts = function(){
		$.getScript("http://www.ceoconnect.in/feedback/scripts/feedbackInc.js")
                .done(function () {
					
                })
                .fail(function () {
                    console.log('Js not loaded');
                })
	};
	
	$instance.saveResponseNSetCookieForBanner = function(){
		var url = base_url + '/general_ajax_task.php?action=set_banner_cookie';
		$.post(url, null, function(data){ 
		data = $.trim(data);
		if(data == 'Y') {
			//
		}
		});
		return false;
	};
	
	$instance.saveCodePlayPopUpCookieForDisplay = function(cookieName){
		var url = base_url + '/general_ajax_task.php?action=set_tg_banner_cookie&cookie_name_input='+cookieName;
		$.post(url, null, function(data){ 
		data = $.trim(data);
		if(data == 'Y') {
			//
		}
		});
		return false;
	};
	
	$instance.eCoursePopUpLayer = function(){
		var url = base_url + '/general_ajax_task.php?action=set_ecourse_popup_cookie';
		$.post(url, null, function(data){ 
		data = $.trim(data);
		if(data == 'Y') {
			//
		}
		});
		return false;
	};

	$instance.recommendationScroll = function(){
		$.getScript(base_url+"/Themes/Release/javascript/Custom_Scrollbar.min.js")
			.done(function () {
				$("#customize-techgig .scroll").mCustomScrollbar({
					axis:"yx",
					theme:"3d",
					scrollInertia:550,
					scrollbarPosition:"outside"
				});
			})
			.fail(function () {
				console.log('Scrollbar not loaded');
			})
	};

	$instance.headerAutocomplete = function(){
		$.getScript(base_url+"/Themes/Release/javascript/header_autocomplete.js")
			.done(function () {
				console.log('HeaderAutocomplete loaded');
			})
			.fail(function () {
				console.log('HeaderAutocomplete not loaded');
			})
	};

	$instance.SlidingTestimonials = function(){
		$.getScript(base_url+"/Themes/Release/javascript/jquery.cycle.all.js")
			.done(function () {
				$('#sliding-testimonials .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout:0,
					speed: 500,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null,
					pager: '.controls'
				});	
				
				$("#sliding-testimonials .slides").height($("#sliding-testimonials .slide").height());
			})
			.fail(function () {
				console.log('SlidingTestimonials not loaded');
			})
	};	
	
		$instance.pp_header_search = function(e, t){
			$("#srch_bx_txt").text(t), $("#srch_more_options").hide(), e = e.substr(e.indexOf("_") + 1), document.getElementById("search_type").value = e, "people" != document.getElementById("search_type").value ? $(".header_advanced").hide() : $(".header_advanced").show(), document.header_search.search.value = "", document.header_search.search.focus(), document.header_search.search.click(), Tg_CommonFunction.SetHelpText();
			$("#search-form .search-selector li").removeClass("active");$('#header_'+e).addClass("active");
			var a = document.getElementById("search_type").value;
			return void 0 != AutoCompleteURLs[a] ? (ActiveAutoCompleteAjaxURL = AutoCompleteURLs[a], document.header_search.data_search_url.value = ActiveAutoCompleteAjaxURL) : ActiveAutoCompleteAjaxURL = " ", !1
		};
		
		$instance.pp_header_splash_search = function(e, t){
			$(".srch-cat b").removeClass("active"), $("#" + e).addClass("active"), $("#srch_bx_txt").text(t), $("#srch_more_options").hide(), e = e.substr(e.indexOf("_") + 1), document.getElementById("search_type").value = e, "people" != document.getElementById("search_type").value ? $(".header_advanced").hide() : $(".header_advanced").show(), Tg_CommonFunction.SetHelpText();
			var a = document.getElementById("search_type").value;
			return void 0 != AutoCompleteURLs[a] ? (ActiveAutoCompleteAjaxURL = AutoCompleteURLs[a], document.header_search.data_search_url.value = ActiveAutoCompleteAjaxURL) : ActiveAutoCompleteAjaxURL = " ", !1
		};
		
		$instance.change_specialized_functional_area = function(e, t, a){
			url = base_url + "/ajax/functional_area_change.php?mfa_id=" + e + "&container_width=" + t + "&parent_id=" + a, $("#available_functional_area_box").html('<div class="color">loading ...</div>'), $.get(url, function(e) {
				$("#available_functional_area_box").html(e)
			})
		};
		
		$instance.ClearHelpText = function(){
			var e = document.header_search.search.value,
				t = document.getElementById("search_type").value;
			("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.answers || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) && (document.header_search.search.value = "", document.header_search.search.style.color = "#575757");
			try {
				ActiveAutoCompleteAjaxURL = void 0 != AutoCompleteURLs[t] ? AutoCompleteURLs[t] : ""
			} catch (a) {
				ActiveAutoCompleteAjaxURL = ""
			}
		};
		
		$instance.ClearSplashHelpText = function(){
			var e = document.header_search.search.value,
				t = document.getElementById("search_type").value;
			("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) && (document.header_search.search.value = "", document.header_search.search.style.color = "#575757");
			try {
				ActiveAutoCompleteAjaxURL = void 0 != AutoCompleteURLs[t] ? AutoCompleteURLs[t] : ""
			} catch (a) {
				ActiveAutoCompleteAjaxURL = ""
			}
		};
		
		$instance.StopSubmitonHelpText = function(){
			{
				var e = document.header_search.search.value;
				document.getElementById("search_type").value
			}
			return "" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.answers || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects ? ($instance.Tg_CommonFunction.SetHelpText(), !1) : void 0
		};
		
		$instance.StopSubmitonSplashHelpText = function(){
			{
				var e = document.header_search.search.value;
				document.getElementById("search_type").value
			}
			return "" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects ? ($instance.Tg_CommonFunction.SetHelpText(), !1) : void 0
		};

		$instance.SetHelpText = function(){
			var e = document.header_search.search.value;
			if ("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.answers || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) {
				var t = document.getElementById("search_type").value;
				document.header_search.search.placeholder = HeaderHelpText[t], document.header_search.search.style.color = "#979797"
			}
		};
		
		$instance.SetSplashHelpText = function(){
			var e = document.header_search.search.value;
			if ("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) {
				var t = document.getElementById("search_type").value;
				document.header_search.search.value = HeaderHelpText[t], document.header_search.search.style.color = "#979797"
			}
		};
	
	
	
	//this function is use to load submenu & recommendations under top menu...Sushil 02-Jun-2016 
	$instance.load_submenu = function(menu_key){
		if($('#main-navigation .sub-category-list #submenu-'+menu_key).html() == '') {
			var submenu_url = base_url + '/ajax_files/load_submenu.php?pmenu='+menu_key;
			$('#main-navigation .sub-category-list #submenu-'+menu_key).load(submenu_url);
		}
		if($('#main-navigation .category-list-content #submenu-rcm-content-'+menu_key).html() == '') {	
			$('#main-navigation .category-list-content #submenu-rcm-content-'+menu_key).html('<div class="tg-loader text-center"><img src="'+base_url+'/Themes/Release/images/TG-Loader.gif"></div>');
			
			var recommendations_url = base_url + '/ajax_files/load_recommendations.php?type=menu&content='+menu_key;
			var submenu_rcm_box_count = 4;
			$('#main-navigation .category-list-content #submenu-rcm-content-'+menu_key).load(recommendations_url, function(e){
				Tg_CommonFunction.set_slider_list('submenu-rcm-content-'+menu_key, 350, submenu_rcm_box_count);
				$('#main-navigation .category-list-content h2 small').removeClass('hidden');				
			});
		}
	};
	
	$instance.contestBanner = function(){		
		$.getScript(base_url+"/Themes/Release/javascript/jquery.cycle.all.js")
			.done(function () {
				$('#contest-banner .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout:4000,
					speed: 500,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null,
					after: onAfter, 
					prev:   '#contest-banner a.previous-btn', 
					next:   '#contest-banner a.next-btn'
				});
				
				$("#contest-banner .slide").each(function() {
					var slideSrc = $(this).find('img').attr("src");
					$(this).css("background-image", "url(" + slideSrc + ")");
				});
				
				function onAfter(curr, next, opts, fwd) {
					var index = opts.currSlide;
					$('#contest-banner a.previous-btn')[index == 0 ? 'hide' : 'show']();
					$('#contest-banner a.next-btn')[index == opts.slideCount - 1 ? 'hide' : 'show']();

					//get the height of the current slide
					var $ht = $(this).height();
					//animates the container's height to that of the current slide 
					$(this).parent().animate({ height: $ht });
				}
			})
			.fail(function () {
				console.log('Cycle not loaded');
			});
		
	
	};	

};

/***
 * Javascript For Techgig Landing Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 01 June, 2016
 */

Tg_LandingPage = new function () {
    var $instance = this;
	
	$instance.init = function () {
		
		Tg_LandingPage.homeBannerSlider();
		
		$(window).load( function(){
			$( "#techgig-video" ).append( "<iframe width='100%' height='313' border='0' src='https://www.youtube.com/embed/LngT5bnDiCI?rel=0&wmode=transparent' frameborder='0' allowfullscreen></iframe>" );		
		});
	}

	$instance.homeBannerSlider = function () {
		//Load Home Banner 
		$.getScript(base_url + "/Themes/Release/javascript/jquery.cycle.all.js")
			.done(function () {
				$('#home-banner .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout:5000,
					speed: 1000,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null
				});
				$(".slider1 .slides").height($(".slider1 .slide").height());
			})
			.fail(function () {
				console.log('Home Slider not loaded');
			});
	};
	
};

/***
 * Javascript For Techgig Recommendation Popup
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 20 July, 2016
 */

Tg_RecommendationPopup = new function () {
    var $instance = this;
	
	$instance.init = function () {
		
		$(window).load(function(){

			$.getScript(base_url+"/Themes/Release/javascript/jquery.tokeninput.js")
					.done(function () {
						console.log('tokeninput loaded');
					})
					.fail(function () {
						console.log('tokeninput not loaded');
					});
	
			if($(window).width() > 992){
				$("#customize-techgig .modal-content").load(base_url+"/ajax_files/load_recommendations.php");
				
				$.getScript(base_url+"/Themes/Release/javascript/jquery.cookie.js")
					.done(function () {
						if(typeof $.cookie("tg_ck_rcm_close") === 'undefined') {
							$("#customize-techgig-sm-btn").hide();			
							//load recommendation popup after 10 seconds
							/* setTimeout(function(){
								if (!$('body').hasClass('modal-open')) {
									$("#customize-techgig").modal({backdrop: 'static', keyboard: false, show: true});
									
									setTimeout(function(){
										$('#customize-techgig .chosen-select').chosen();		
										Tg_RecommendationPopup.set_tab_pane_content();
									}, 200);
								}
							}, 10000); */
						} else {
							//$("#customize-techgig-sm-btn").show(); //dont show this button as its now shown under top menus ...Sushil 16-May-2016
						}
					})
					.fail(function () {
						console.log('cookie not loaded');
					});
				
			}
			
			
			$(document).on("click","#customize-techgig-sm-btn", function(){
				$("#customize-techgig-sm-btn").hide();	
				$("#customize-techgig").modal({backdrop: 'static', keyboard: false, show: true});
				setTimeout(function(){
					
					$.getScript(base_url+"/Themes/Release/javascript/chosen_jquery.min.js")
					.done(function () {
						$('#customize-techgig .chosen-select').chosen();
					})
					.fail(function () {
						console.log('chosen not loaded');
					});
					
					Tg_RecommendationPopup.set_tab_pane_content();
				}, 200);
			});
			
			$(document).on("click","#btn-rcm-close, #customize-techgig .close", function(){
				$("#customize-techgig").modal('hide');
				//$("#customize-techgig-sm-btn").show();  //dont show this button as its now shown under top menus ...Sushil 16-May-2016
				var date = new Date();
				date.setTime(date.getTime() + (3600 * 1 * 1000));  // expires after 1 hours
				$.cookie("tg_ck_rcm_close", "1", { expires: date, path:'/' });
			});
			
			$(document).on("click","#customize-techgig .pro-roles-pop", function(){
				//$("#professional-roles").modal('show').show();
				$("#professional-roles").modal({backdrop: false, keyboard: false, show: true}).show();
			});

			//Tg_RecommendationPopup.set_tab_pane_content();	

			$(document).on("click","#btn-rcm-usr-role-done", function(){	
				var user_roles_array = []; 
				var user_skills_array = [];	
				var role_name;
				
				var chkCount1 = $("input[name=chk_roles]:checked").length;
				var chkCount2 = $("input[name=chk_char_roles]:checked").length;
				var chkCount = parseInt(chkCount1) + parseInt(chkCount2);		
				if(chkCount < 1) {
					alert("Select atleast one role");
					return false;
				}	

				//popular array
				$("input[name=chk_roles]:checked").each(function(){
					role_name = $(this).val();
					user_roles_array.push(role_name);
					
					var role_field_id = this.id;		
					var role_id = 	role_field_id.replace("role-", "");
					
					var role_skills = $('#role-skills-'+role_id).val();
					var role_skills_arr = role_skills.split(',');

					$.each(role_skills_arr, function(key, val) {
						if(val != '') {
							user_skills_array.push(val);			
						}
					});		
				});
				
				//alphabetical array
				$("input[name=chk_char_roles]:checked").each(function(){
					role_name = $(this).val();
					
					var role_index = user_roles_array.indexOf(role_name);
					
					if(role_index == -1) {			
						user_roles_array.push(role_name);
						
						var role_field_id = this.id;				
						var role_id = 	role_field_id.replace("char-role-", "");
						
						var role_skills = $('#role-skills-'+role_id).val();
						var role_skills_arr = role_skills.split(',');

						$.each(role_skills_arr, function(key, val) {
							if(val != '') {
								user_skills_array.push(val);			
							}
						});	
					}
				});

				if(user_roles_array.length > 3) {
					//alert("You can select maximum of 3 roles only");
					Tg_CommonFunction.open_html_modal("Role selection","<p class='alert alert-warning'> You can select maximum of 3 roles only  </p>");
					return false;
				}	
				
				$("#user_roles").html(user_roles_array.toString());

				/*
				//removed skills filling from selected roles...Sushil 03-Jun-2016
				//$("#user_skills").tokenInput("clear");
				$.each(user_skills_array, function(key, val) {
					$("#user_skills").tokenInput("remove",{id: val, name: val});
					$("#user_skills").tokenInput("add",{id: val, name: val});	
				});	
				*/
				
				//$("#professional-roles").modal('hide');
				$("#professional-roles").hide();
			});

			$(document).on("click","#btn-rcm-usr-role-cancel", function(){
				//$("#professional-roles").modal('hide');
				$("#professional-roles").hide();
			});	
			
			$(document).on("click","#btn-rcm-usr-save", function(){
				var user_roles = $.trim($("#user_roles").val());
				var user_skills = $.trim($("#user_skills").val());
						
				var rcm_error = '';
				if(user_roles == '') {
					rcm_error = 'empty';
				}
				
				if(user_skills == '') {
					rcm_error = 'empty';
				}
				
				var news_catg = 'none';
				var user_company = 'none';
				var user_name = '';
				var user_email = '';
				
				if(typeof $('#user_news_catg').val() !== 'undefined') {
					var user_news_catg = $('#user_news_catg').chosen().val();

					if(user_news_catg != '' && user_news_catg != null) {
						$.each(user_news_catg, function( key, value ) {
							news_catg += ','+value;
						});
						news_catg = news_catg.substring(1);
					} else {
						news_catg = '';
					}
				}

				if(typeof $('#user_company').val() !== 'undefined') {
					user_company = $.trim($("#user_company").val());
				}
			
				
				if(rcm_error == 'empty') {
					$("#rcm-error-msg").html('Please fill above details').addClass('alert alert-danger');
					return false;
				} else if(rcm_error == 'invalid_email') {
					$("#rcm-error-msg").html('Please enter valid email id').addClass('alert alert-danger');
					document.frm_user_skill.user_email.focus();
					return false;
				} else {
					$("#rcm-error-msg").html('').removeClass('alert alert-danger');
				}
				
				$("#customize-techgig .modal-content .modal-body").html('<div class="loader-area"><div class="inner-loader"><img src="'+THEME_PATH+'/images/techgig_images/customize-loader.gif"></div></div>').show();
				
				//set cookie to load recommendations in future
				var date = new Date();
				date.setTime(date.getTime() + (3600 * 24 * 30 * 1000));  // expires after 30 days
				$.cookie("tg_ck_rcm_user_info", user_email, { expires: date, path:'/' });
				
				$.post(base_url+'/ajax_files/load_recommendations.php',{action: 'save_info',roles: encodeURIComponent(user_roles), skills: encodeURIComponent(user_skills), name: encodeURIComponent(user_name), email: encodeURIComponent(user_email), news_catg: encodeURIComponent(news_catg), company: encodeURIComponent(user_company)}, function(data) {			
					data = $.trim(data);
					//alert(data);
					$("#customize-techgig .modal-content").html(data).show();
					Tg_RecommendationPopup.set_tab_pane_content();
				});
			});
			
			$(document).on("click","#customize-techgig .customize-btn", function(){
				$.post(base_url+'/ajax_files/load_recommendations.php',{action: 'edit_info'}, function(data) {			
					data = $.trim(data);
					$("#customize-techgig .modal-content").html(data);
					$('#customize-techgig .chosen-select').chosen();
					$("#btn-rcm-go-back").show();			
				});
			});
			
			$(document).on("click","#btn-rcm-go-back", function(){
				$("#customize-techgig .modal-content .modal-body").html('<div class="loader-area"><div class="inner-loader"><img src="'+THEME_PATH+'/images/techgig_images/customize-loader.gif"></div></div>').show();
				$("#customize-techgig .modal-content").load(base_url+"/ajax_files/load_recommendations.php", function() {
					Tg_RecommendationPopup.set_tab_pane_content();
				});		
			});
			
			$("#customize-techgig").tooltip({ selector: '[data-toggle=tooltip]' });
		});
		
	}

	
	$instance.set_tab_pane_content = function(){
		$.getScript(base_url+"/Themes/Release/javascript/jquery.carouFredSel-6.0.5-packed.js")
			.done(function () {
				$("#customize-techgig .tab-pane").each( function(){
		$(this).find('.slider ul').carouFredSel({
				responsive: true,
				width: '100%',
				circular: true,
				infinite:false,
				auto : false,
				scroll: 1,
				prev: $(this).find('.previous-btn'),
				next: $(this).find('.next-btn'),
				items: {
					width: 350,
					height: 'variable',
					visible: {
						min: 1,
						max: 3
					}
				}
			});
			
			$(this).find('.slider-full ul').carouFredSel({
				responsive: true,
				width: '100%',
				circular: true,
				infinite:false,
				auto : false,
				scroll: 1,
				prev: $(this).find('.previous-btn'),
				next: $(this).find('.next-btn'),
				items: {
					width: 700,
					height: 'variable',
					visible: {
						min: 1,
						max: 1
					}
				}
			});
			});
			})
			.fail(function () {
				console.log('carouFredSel not loaded');
			})
	};
	
	
	$instance.participateSkillTest = function(previous_season_id, parent_season_id, season_id, utm_tracking){
		var action_file_url = base_url+'/ajax_files/assessment_check_participation.php?previous_season_id='+previous_season_id+'&parent_season_id='+parent_season_id+'&season_id='+season_id;
		$.get(action_file_url, function(data) {
			data = $.trim(data);
			var msg = $.parseJSON(data);
			if(msg.status == 'success') {
				window.location.href = msg.url;
			} else {
				alert(msg.message);
			}
		});
	};
	
};



/***
 * Javascript For News Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Arun George
 * Created  : 10 June, 2016
 */

Tg_NewsPage = new function () {
    var $instance = this;

		$instance.init = function () {
			
			$(".main-banner .slide.single-image").each(function() {
				var slideSrc = $(this).find('img').attr("src");
				$(this).css("background-image", "url(" + slideSrc + ")");
			});	
			
			$('.main-banner .slides').hover(
				function(){
				$(this).cycle('pause');  //Pauses the cycle on hover
			},
				function(){
				$(this).cycle('resume'); // Resumes the cycle when mouse is outside div
			});
			
		
			$(".news-lists .post p .favorite, #recommended-for-you p .favorite").click( function(){
				$(this).addClass("active");
				return false;
			}); 		
	}	
	
	$instance.NewsMainBanner = function(){
		
		$.getScript(base_url+"/Themes/Release/javascript/jquery.cycle.all.js")
			.done(function () {
				$("#news-banner .post").each(function() {
					var bgSrc = $(this).find('.post-image').attr("src");
					$(this).find(".inner-wrap").css("background-image", "url(" + bgSrc + ")");
				});
				
				$('.main-banner .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout:5000,
					speed: 500,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null,
					pager: '.controls'
				});
			})
			.fail(function () {
				console.log('Cycle not loaded');
			});
		
	
	};	
	
	$instance.loadMoreContents = function(ajax_page_url, container_id, content_type, custom_query_string){
		
		custom_query_string = (typeof custom_query_string === "undefined") ? "" : custom_query_string;
	
		var page = $('#page_'+container_id).val();
		$('#anc_more_'+container_id).hide();
		$('#ajax_status_'+container_id).html('<p class="text-center tg-loader"><img src="'+THEME_PATH+'/images/TG-Loader.gif"></p>').show(); 
		
		var action_file_url = base_url+'/ajax_files/'+ajax_page_url+'?page='+page;
		
		if(custom_query_string != "") {
			var action_file_url = action_file_url+'&'+custom_query_string;
		}
		
		$.get(action_file_url, function(data) {
			$('#ajax_status_'+container_id).hide();
			data = $.trim(data);
			if(data == 'no_record') {
				$('#ajax_status_'+container_id).html('No more '+content_type+' to display.').show();
			} else if(data == 'invalid_type') {
				$('#ajax_status_'+container_id).html('Invalid Request.').show();
			} else {
				$('#'+container_id).append(data);
				page++;
				$('#page_'+container_id).val(page);
				$('#anc_more_'+container_id).show();
			}
		});
		
	};
	
};


/***
 * Javascript For Challenges Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 20 July, 2016
 */

Tg_ChallengesPage = new function () {
    var $instance = this;

	$instance.init = function () {
						
	}	
	
	$instance.LoadPreviousContest = function(){
		
		var page = $('#PreviousContestPage').val();
		$('#PreviousViewMore').hide();
		$('#ajax_previous_contest').html('<li><p class="text-center tg-loader"><img src="'+THEME_PATH+'/images/TG-Loader.gif"></p></li>').show(); 
		var action_file_url = base_url+'/ajax_files/codecontestspreviouschallenges.php?page_no='+page;		
		$.ajax({
			type: "POST",
			url: action_file_url,
			data: ({}),
			async: false,
			success: function(data) {
						data = $.trim(data);
						if(data == 'no_record') {
							$('#ajax_previous_contest').html('<li class="text-center">No more contest to display.</li>');
							$('#PreviousViewMore').hide();
						} else {
							$(data).insertBefore('.ajax_previous_contest');
							page++;
							$('#PreviousContestPage').val(page);
							$('#ajax_previous_contest').hide();
							$('#PreviousViewMore').show();
						}	
			}
		});
	
	};	
	
	
	$instance.webcamTypeMcq = function (question_type,question_id,question_token,allow_new_tab,auto_submit_time_limit,out_movement_allowed_number,platform_type) {
		var focusLostCounter = 0; 
		var focusLostFlag = 0;
		var focusLostStartTime='';
		var focusLostEndTime='';
		var timeElapsed = 0;
		var focusOutTimeInterval = 5000;

		
		/* if(auto_submit_time_limit == 0) {
		var timeElapsedLimit = '<?php echo TIME_ELAPSED_LIMIT; ?>';
		} else { */
		var timeElapsedLimit = auto_submit_time_limit;
		//}

		if(timeElapsedLimit > 0) {
		var doAutoSubmitFlag = 'Y';
		}

		
		/* if(out_movement_allowed_number == 0) {
		var movingOutAllowedCounter = 10;
		} else { */
		var movingOutAllowedCounter = out_movement_allowed_number;
		//}


		// main visibility API function 
		// use visibility API to check if current tab is active or not
		var vis = (function(){
		var stateKey, 
		eventKey, 
		keys = {
		hidden: "visibilitychange",
		webkitHidden: "webkitvisibilitychange",
		mozHidden: "mozvisibilitychange",
		msHidden: "msvisibilitychange"
		};
		for (stateKey in keys) {
		if (stateKey in document) {
		eventKey = keys[stateKey];
		break;
		}
		}
		return function(c) {
		if (c) document.addEventListener(eventKey, c);
		return !document[stateKey];
		}
		})();

		// check if browser window has focus		
		var notIE = (document.documentMode === undefined),
		isChromium = window.chrome;

		if (notIE && !isChromium) {

		// check if current tab is active or not
		vis(function(){

		if(vis()) {

		// User has come back on the Page, So reset the Focus Lost Flag
		//focusLostCounter = 0;
		focusLostFlag = 0;

		// But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

		if(timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}
		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		//saveWebcamLog(config.webcam_log[4]);

		// reset the flags
		//timeElapsed = 0;
		} else {
		timeElapsed = 0;
		}
						
		} else {

		focusLostCounter++;
		if(movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
		//alert('OUT OF FOCUS Going Limit Reached..');

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		} else {

		if(allow_new_tab == 'N') {
		alert('You are not allowed to move out of current window during this contest!');
		} else {

		// Activated in Chrome on mouse New tab click AND windows tab Click
		if(focusLostCounter == 1) {
		if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

		// Write Movement in Log File
		//saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);

		}
		} else {
		// Write Movement in Log File
		//saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);
		}

		}
		}	

		}
		});

		} else {

		// checks for IE and Chromium versions
		if (window.addEventListener) {

		// CHROME BLOCK

		// bind focus event
		window.addEventListener("focus", function (event) {

		// User has come back on the Page, So reset the Focus Lost Flag
		//focusLostCounter = 0;
		focusLostFlag = 0;

		// But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

		//alert(timeElapsed);

		if(timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		//saveWebcamLog(config.webcam_log[4]);

		// reset the flags
		//timeElapsed = 0;
		} else {
		timeElapsed = 0;
		}

		}, false);

		// bind blur event
		window.addEventListener("blur", function (event) {

		focusLostCounter++;
		if(movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
		//alert('OUT OF FOCUS Going Limit Reached..');

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		} else {
		if(allow_new_tab == 'N') {
		alert('You are not allowed to move out of current window during this contest!');
		} else {

		// Activated in Chrome on mouse New tab click AND windows tab Click
		if(focusLostCounter == 1) {
		if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

		// Write Movement in Log File
		//saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);

		}
		} else {
		// Write Movement in Log File
		//saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);
		}

		}
		}

		}, false);

		} else {

		// IE BLOCK

		// bind focus event
		window.attachEvent("focus", function (event) {

		// User has come back on the Page, So reset the Focus Lost Flag
		//focusLostCounter = 0;
		focusLostFlag = 0;

		// But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

		if(timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		//saveWebcamLog(config.webcam_log[4]);

		// reset the flags
		//timeElapsed = 0;
		} else {
		timeElapsed = 0;
		}

		});

		// bind focus event
		window.attachEvent("blur", function (event) {

		focusLostCounter++;
		if(movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
		//alert('OUT OF FOCUS Going Limit Reached..');

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		} else {
		if(allow_new_tab == 'N') {
		alert('You are not allowed to move out of current window during this contest!');
		} else {

		// Activated in Chrome on mouse New tab click AND windows tab Click
		if(focusLostCounter == 1) {
		if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

		// Write Movement in Log File
		//saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);

		}
		} else {
		// Write Movement in Log File
		//saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);
		}

		}
		}

		});
		}
		}

		function myTimeoutFunction() {
		timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
		timeElapsed = (timeElapsed / 1000); // time in seconds
		timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
		return timeElapsed;
		}


		function autoSubmitUserContest() {

		if(question_type == 'code') {
		form_post = 1;
		compile_test('submit', 'question_id', 'question_token','tg_testcase', 'platform_type','N');
		} else {
		$('#codejudge_requirement').submit();
		}	

		}				
	}
	
	$instance.webcamNormal = function (question_type,question_id,question_token,allow_new_tab,auto_submit_time_limit,out_movement_allowed_number,platform_type) {
		var focusLostCounter = 0; 
		var focusLostFlag = 0;
		var focusLostStartTime='';
		var focusLostEndTime='';
		var timeElapsed = 0;
		var focusOutTimeInterval = 5000;

		/* if(auto_submit_time_limit == 0) {
		var timeElapsedLimit = '<?php echo TIME_ELAPSED_LIMIT; ?>';
		} else { */
		var timeElapsedLimit = auto_submit_time_limit;
		//}

		if(timeElapsedLimit > 0) {
		var doAutoSubmitFlag = 'Y';
		}

		/* if(out_movement_allowed_number == 0) {
		var movingOutAllowedCounter = 10;
		} else { */
		var movingOutAllowedCounter = out_movement_allowed_number;
		//}


		// main visibility API function 
		// use visibility API to check if current tab is active or not
		var vis = (function(){
		var stateKey, 
		eventKey, 
		keys = {
		hidden: "visibilitychange",
		webkitHidden: "webkitvisibilitychange",
		mozHidden: "mozvisibilitychange",
		msHidden: "msvisibilitychange"
		};
		for (stateKey in keys) {
		if (stateKey in document) {
		eventKey = keys[stateKey];
		break;
		}
		}
		return function(c) {
		if (c) document.addEventListener(eventKey, c);
		return !document[stateKey];
		}
		})();

		// check if browser window has focus		
		var notIE = (document.documentMode === undefined),
		isChromium = window.chrome;

		if (notIE && !isChromium) {

		// check if current tab is active or not
		vis(function(){

		if(vis()) {

		// User has come back on the Page, So reset the Focus Lost Flag
		//focusLostCounter = 0;
		focusLostFlag = 0;

		// But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

		if(timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}
		// Logging in Error Log file will go here
		saveWebcamLog(config.webcam_log[4]);

		// reset the flags
		//timeElapsed = 0;
		} else {
		timeElapsed = 0;
		}
						
		} else {

		var codingEditorFocusFlag = 0;

		var specific_element_id = $( document.activeElement ).attr('id');
		//alert($( document.activeElement ).attr('id'));

		if(specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
		codingEditorFocusFlag = 1;
		} else {
		//alert('Increment Counter..');
		focusLostCounter++;
		}

		if(!codingEditorFocusFlag) {
		if(movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
		//alert('OUT OF FOCUS Going Limit Reached. 1.');

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		} else {

		if(allow_new_tab == 'N') {
		alert('You are not allowed to move out of current window during this contest!');
		//$('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
		//$('#disable_ctrl_key_combination').modal('show');
		} else {

		// Activated in Chrome on mouse New tab click AND windows tab Click
		if(focusLostCounter == 2) {
		if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

		// Write Movement in Log File
		saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);

		}
		} else if(focusLostCounter > 2) {
		// Write Movement in Log File
		saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);
		}

		}
		}

		}	

		}
		});

		} else {
		// checks for IE and Chromium versions
		if (window.addEventListener) {

		// CHROME BLOCK

		// bind focus event
		window.addEventListener("focus", function (event) {

		// User has come back on the Page, So reset the Focus Lost Flag
		//focusLostCounter = 0;
		focusLostFlag = 0;

		// But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

		if(timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// reset the flags
		//timeElapsed = 0;
		} else {
		timeElapsed = 0;
		}

		}, false);

		// bind blur event
		window.addEventListener("blur", function (event) {

		var codingEditorFocusFlag = 0;

		var specific_element_id = $( document.activeElement ).attr('id');
		//alert($( document.activeElement ).attr('id'));

		if(specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
		codingEditorFocusFlag = 1;
		} else {
		//alert('Increment Counter..');
		focusLostCounter++;
		}

		if(!codingEditorFocusFlag) {

		if(movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
		//alert('OUT OF FOCUS Going Limit Reached.');

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		} else {

		if(allow_new_tab == 'N') {
		alert('You are not allowed to move out of current window during this contest!');
		//$('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
		//$('#disable_ctrl_key_combination').modal('show');
		setInterval(function() { window.focus() }, 1000);
		} else {

		// Activated in Chrome on mouse New tab click AND windows tab Click
		if(focusLostCounter == 2) {
		if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

		// Write Movement in Log File
		saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);

		}
		} else if(focusLostCounter > 2) {
		// Write Movement in Log File
		saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);
		}

		}

		}

		}

		}, false);

		} else {

		// IE BLOCK

		// bind focus event
		window.attachEvent("focus", function (event) {

		// User has come back on the Page, So reset the Focus Lost Flag
		//focusLostCounter = 0;
		focusLostFlag = 0;

		// But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

		if(timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// reset the flags
		//timeElapsed = 0;
		} else {
		timeElapsed = 0;
		}

		});

		// bind focus event
		window.attachEvent("blur", function (event) {

		var codingEditorFocusFlag = 0;

		var specific_element_id = $( document.activeElement ).attr('id');
		//alert($( document.activeElement ).attr('id'));

		if(specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
		codingEditorFocusFlag = 1;
		} else {
		//alert('Increment Counter..');
		focusLostCounter++;
		}

		if(!codingEditorFocusFlag) {

		if(movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
		//alert('OUT OF FOCUS Going Limit Reached. 3.');

		if(doAutoSubmitFlag == 'Y') {
		alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

		// Logging in Error Log file will go here
		//alert(config.webcam_log[4]);
		saveWebcamLog(config.webcam_log[4]);

		// Auto Submit Call will go here
		autoSubmitUserContest();

		}

		} else {
		if(allow_new_tab == 'N') {
		alert('You are not allowed to move out of current window during this contest!');
		} else {

		// Activated in Chrome on mouse New tab click AND windows tab Click
		if(focusLostCounter == 2) {
		if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

		// Write Movement in Log File
		saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);

		}
		} else if(focusLostCounter > 2) {
		// Write Movement in Log File
		saveWebcamLog(config.webcam_log[3]);

		// Set focus Lost flag to true
		focusLostFlag = 1;
		focusLostStartTime = new Date().getTime();
		setInterval(myTimeoutFunction, focusOutTimeInterval);
		}
		}

		}

		}

		});
		}
		}

		function myTimeoutFunction() {
		timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
		timeElapsed = (timeElapsed / 1000); // time in seconds
		timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
		return timeElapsed;
		}

		function autoSubmitUserContest() {

		if(question_type == 'code') {
		form_post = 1;
		compile_test('submit', 'question_id', 'question_token','tg_testcase', 'platform_type','N');
		} else {
		$('#codejudge_requirement').submit();
		}	

		}			
	}
	
};
