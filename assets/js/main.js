$(document).ready(function() {
	$('#fullpage').fullpage({
		autoScrolling: true,
		fitToSection: true,
		fixedElements: '#dynamic-header',
		keyboardScrolling: true,
		loopHorizontal: true,
		scrollOverflow: true,
		slidesNavigation: true,
		verticalCentered: false,
		afterLoad: function(anchorLink, index){
			if (index === 1) {
				slideRotation = setInterval($.fn.fullpage.moveSlideRight, 7000);
			} else {
				clearInterval(slideRotation);
			}
		},
		onLeave: function(index, nextIndex, direction){
			updateHeader(nextIndex);
			updateAccordion(nextIndex);
		},
		afterRender: function(){
			updateCaptionPosition();
			updateSection20FooterPosition();
		},
		afterResize: function(){
			updateCaptionPosition();
			updateSection20FooterPosition();
		}
	});
	$('[class^="open-"]').click(function(){
		var $id = $(this).attr('class').match(/open-([\w\-]+)/)[1];
		activateById($id);
	});
	$('[class^="close-"]').click(function(){
		var $id = $(this).attr('class').match(/close-([\w\-]+)/)[1];
		deactivateById($id);
	});
	$('[class^="ns-sect"]').click(function(){
		var $to = $(this).attr('class');
		$to = $to.replace('ns-sect-','');
		$to = parseInt($to);
		$.fn.fullpage.moveTo($to);
	});
	$('.move-down').click(function(){
		$.fn.fullpage.moveSectionDown();
	});

	/* FUNCTION DECLARATIONS */
	/*************************/

	function activateById(id){
		$('.disclosure-container').removeClass('active');
		$('#'+id).addClass('active');
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
	}
	function deactivateById(id){
		$('#'+id).removeClass('active');
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
	}
	function updateCaptionPosition() {
		$('.banner-container').each(function(){
			var bottom = $(this).height() + 20;
			$(this).siblings('.caption').css('bottom', bottom);
		});
	}
	function updateSection20FooterPosition() {
		var bottom;
		if ($('.disclosure-container').css('max-width') === "600px") {
			bottom = $('#section20 footer').height() + 25;
		} else {
			bottom = 0;
		}
		$('.disclosure-container').css('bottom', bottom);
	}
	function updateHeader(index) {
		$index = index;
		for(var i = 0; i < sections.length; i++){
			if ($index >= sections[i].min && $index <= sections[i].max){
				$('#dynamic-header h2').text(sections[i].title);
			}
		}
	}
	function updateAccordion(index) {
		for(var m = 0; m < sections.length; m++){
			if (index >= sections[m].min && index <= sections[m].max){
				var $mainIndex = sections[m].min;
				$('.main-items > li').removeClass('active');
				$('.ns-sect-'+($mainIndex)).parent().addClass('active');
			}
			if(typeof sections[m].subs != "undefined"){
				for(var s = 0; s < sections[m].subs.length; s++){
					var $subIndex = sections[m].subs[s].index;
					if(index == $subIndex){
						$('.sub-items > li').removeClass('active');
						$('.ns-sect-'+($subIndex)).parent('.sub-items li').addClass('active');
					}
				}
			}
		}
	}
	var slideRotation, penthouse = 'Penthouse ' + $('body').attr('class').match(/penthouse(\d*\w?)/)[1].toUpperCase(),
		sections = [
		{
			title: penthouse,
			min: 1,
			max: 1
		},
		{
			title: penthouse,
			min: 2,
			max: 7,
			subs: [
				{
					index: 2
				},
				{
					index: 3
				},
				{
					index: 4
				},
				{
					index: 5
				},
				{
					index: 6
				},
				{
					index: 7
				}
			]
		},
		{
			title: 'Floor Plan',
			min: 8,
			max: 9
		},
		{
			title: 'Property Features',
			min: 10,
			max: 16,
			subs: [
				{
					index: 11
				},
				{
					index: 12
				},
				{
					index: 13
				},
				{
					index: 14
				},
				{
					index: 15
				},
				{
					index: 16
				}
			]
		},
		{
			title: 'Neighborhood',
			min: 17,
			max: 19,
			subs: [
				{
					index: 17
				},
				{
					index: 18
				},
				{
					index: 19
				}
			]
		},
		{
			title: 'Contact',
			min: 20,
			max: 20
		}
	];
});
