$(document).ready(function(){function e(e){$(".disclosure-container").removeClass("active"),$("#"+e).addClass("active"),$.fn.fullpage.setAllowScrolling(!1),$.fn.fullpage.setKeyboardScrolling(!1)}function n(e){$("#"+e).removeClass("active"),$.fn.fullpage.setAllowScrolling(!0),$.fn.fullpage.setKeyboardScrolling(!0)}function i(){$(".banner-container").each(function(){var e=$(this).height()+20;$(this).siblings(".caption").css("bottom",e)})}function t(){var e;e="600px"===$(".disclosure-container").css("max-width")?$("#section20 footer").height()+25:0,$(".disclosure-container").css("bottom",e)}function a(e){$index=e;for(var n=0;n<c.length;n++)$index>=c[n].min&&$index<=c[n].max&&$("#dynamic-header h2").text(c[n].title)}function s(e){$(".main-items > li").removeClass("active"),$(".sub-items > li").removeClass("active");for(var n=0;n<c.length;n++){if(e>=c[n].min&&e<=c[n].max){var i=c[n].min;$(".main-items > li").removeClass("active"),$(".ns-sect-"+i).parent().addClass("active")}if("undefined"!=typeof c[n].subs)for(var t=0;t<c[n].subs.length;t++){var a=c[n].subs[t].index;e==a&&($(".sub-items > li").removeClass("active"),$(".ns-sect-"+a).parent(".sub-items li").addClass("active"))}}}$("#fullpage").fullpage({autoScrolling:!0,fitToSection:!0,fixedElements:"#dynamic-header",keyboardScrolling:!0,loopHorizontal:!0,scrollOverflow:!0,slidesNavigation:!0,verticalCentered:!1,afterLoad:function(e,n){1===n?l=setInterval($.fn.fullpage.moveSlideRight,7e3):clearInterval(l)},onLeave:function(e,n,i){a(n),s(n)},afterRender:function(){i(),t()},afterResize:function(){i(),t()}}),$('[class^="open-"]').click(function(){var n=$(this).attr("class").match(/open-([\w\-]+)/)[1];e(n)}),$('[class^="close-"]').click(function(){var e=$(this).attr("class").match(/close-([\w\-]+)/)[1];n(e)}),$('[class^="ns-sect"]').click(function(){var e=$(this).attr("class");e=e.replace("ns-sect-",""),e=parseInt(e),$.fn.fullpage.moveTo(e)}),$(".move-down").click(function(){$.fn.fullpage.moveSectionDown()});var l,o="Penthouse "+$("body").attr("class").match(/penthouse(\d*\w?)/)[1].toUpperCase(),c=[{title:o,min:1,max:1},{title:o,min:2,max:7,subs:[{index:2},{index:3},{index:4},{index:5},{index:6},{index:7}]},{title:"Floor Plan",min:8,max:9},{title:"Property Features",min:10,max:16,subs:[{index:11},{index:12},{index:13},{index:14},{index:15},{index:16}]},{title:"Neighborhood",min:17,max:19,subs:[{index:17},{index:18},{index:19}]},{title:"Contact",min:20,max:20}]});