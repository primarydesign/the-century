$(document).ready(function() {

	$('[class^="ns-sect"]').click(function(){
		var $to = $(this).attr('class');
		$to = $to.replace('ns-sect-','');
		$to = parseInt($to) + 1;
		$.fn.fullpage.moveTo($to);
	});

	var Sections = [
		{
			title: 'Penthouse 40',
			index: 0
		},
		{
			title: 'Penthouse 40',
			subs: [
				{
					index: 1
				},
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
				}
			]
		},
		{
			title: 'Floor Plan',
			min: 7,
			max: 8
		},
		{
			title: 'Property Features',
			min: 9,
			max: 15,
			subs: [
				{
					index: 10
				},
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
				}
			]
		},
		{
			title: 'Neighborhood',
			min: 16,
			max: 18,
			subs: [
				{
					index: 16
				},
				{
					index: 17
				},
				{
					index: 18
				}
			]
		},
		{
			title: 'Contact',
			min: 19,
			max: 19
		}
	];

});
