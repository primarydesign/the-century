$(document).ready(function() {
	$('#fullpage').fullpage({
		fitToSection: true,
		fixedElements: '#dynamic-header',
		loopHorizontal: true,
		scrollOverflow: true,
		slidesNavigation: true,
		verticalCentered: false,
		afterLoad: function(anchorLink, index){
			updateHeader(index);
			updateAccordion(index);
       }
	});

	$('[class^="ns-sect"]').click(function(){
		var $to = $(this).attr('class');
		$to = $to.replace('ns-sect-','');
		$to = parseInt($to);
		$.fn.fullpage.moveTo($to);
	});

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
	var sections = [
		{
			title: 'Penthouse 40',
			min: 1,
			max: 1
		},
		{
			title: 'Penthouse 40',
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
