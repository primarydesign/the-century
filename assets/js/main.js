$(document).ready(function() {
	//INITIALIZE FULLPAGE
	$('#fullpage').fullpage({
		verticalCentered: false,
		slidesNavigation: true,
		scrollOverflow: true,
		css3: true
	});

	//MENU NAVLINKS
	//Clicking nav and menu links scroll to eponymous section
	//AND remove `active` class from menu overlay.
	$('#menu a, #sidenav li a').click(function(){
		var $to = $(this).attr('class');
		$to = $to.replace('toSect','');
		$to = parseInt($to);
		$.fn.fullpage.moveTo($to);
		$('#menu-overlay').removeClass('active');
	});

	//CONTACT BUTTONS
	//Clicking contact buttons scrolls to contact form.
	$('.contact-btn').click(function(){
		$.fn.fullpage.moveTo(15);
	});

	//BANNER TO TOP
	//Click banner to move to top of page.
	$('#banner img').click(function(){
		$.fn.fullpage.moveTo(1);
	});

	//OVERLAY OPENING & CLOSING
	//Open element with id matching open-<id-name> class pattern.
	$('[class^="open-"]').click(function(){
		var $name =	$(this).attr('class');
		$name = $name.match(/open-([a-zA-Z0-9-]+)/)[1];
		$('#'+$name).addClass('active');
	});
	//Close element with id matching close-<id-name> class pattern.
	$('.overlay .close').click(function(){
		var $name =	$(this).attr('class');
		$name = $name.match(/close-([a-zA-Z0-9-]+)/)[1];
		$('#'+$name).removeClass('active');
	});

	//DISABLE SCROLLING
	//Disables scrolling if overlay active;
	//AND reenables it otherwise;
	function disableScroll() {
		if ($('.overlay.active').length !== 0) {
			$.fn.fullpage.setAllowScrolling(false);
			$.fn.fullpage.setKeyboardScrolling(false);
		} else {
			$.fn.fullpage.setAllowScrolling(true);
			$.fn.fullpage.setKeyboardScrolling(true);
		}
	} setInterval(disableScroll,1);

	//DYNAMIC HEADER TEXT
	//Updates header text given the current section.
	var sections = [
		{
			title: 'Penthouse 901',
			min: 0,
			max: 0
		},{
			title: 'Penthouse 901',
			min: 1,
			max: 3,
			subs: [
				{
					name: 'Terrace',
					index: 1
				},{
					name: 'Great Room',
					index: 2
				},{
					name: 'Kitchen',
					index: 3
				}
			]
		},{
			title: 'Floor Plan',
			min: 4,
			max: 4
		},{
			title: 'Property Features',
			min: 5,
			max: 10,
			subs: [
				{
					name: 'Service',
					index: 6
				},
				{
					name: 'Pool',
					index: 7
				},
				{
					name: 'Fitness',
					index: 8
				},
				{
					name: 'Dining',
					index: 9
				},
				{
					name: 'More',
					index: 10
				}
			]
		},{
			title: 'Neighborhood',
			min: 11,
			max: 13,
			subs: [
				{
					name: 'Santa Monica Beach',
					index: 11
				},
				{
					name: 'Santa Monica Place',
					index: 12
				},
				{
					name: 'Tongva Park',
					index: 13
				}
			]
		},{
			title: 'Contact Us',
			min: 14,
			max: 14
		}
	], $htext = $('#htext');

	function updateHeader() {
		var $view = $('body').attr('class');
		$view = $view.replace(/fp-viewing-/,'').replace(/-slide\d+/,'');
		$view = parseInt($view);

		for(var i = 0; i < sections.length; i++){
			if ($view >= sections[i].min && $view <= sections[i].max){
				$htext.text(sections[i].title);
			}
		}
	} setInterval(updateHeader,1);

	//DYNAMIC ACCORDION
	//Updates accordion links given the current section.
	function updateAccordion(){

		var $view = $('body').attr('class');
		$view = $view.replace(/fp-viewing-/,'').replace(/-slide\d+/,'');
		$view = parseInt($view);

		for(var j = 0; j < sections.length; j++){
			if ($view >= sections[j].min && $view <= sections[j].max){
				var $index = sections[j].min;
				$('#sidenav > ul > li a').removeClass('active');
				$('.toSect'+($index+1)).addClass('active');
			}
			if(typeof sections[j].subs != "undefined"){
				for(var k = 0; k < sections[j].subs.length; k++){
					var $subIndex = sections[j].subs[k].index;
					if($view == $subIndex){
						$('#sidenav li li a').removeClass('active');
						$('.toSect'+($subIndex+1)).addClass('active');
					}
				}
			}
		}
	} setInterval(updateAccordion,1);

	//AUTO-ROTATE SLIDER
	//Rotates through slides at fixed pace.
	function autoRotateSlider() {
		var $view = $('body').attr('class'),
			 $sect = $view.replace(/fp-viewing-/,'').replace(/-slide\d+/,''),
			 $slide = $view.replace(/fp-viewing-\d+-slide/,'');
		if ($sect == 0) {
			$.fn.fullpage.moveSlideRight();
		}
	} setInterval(autoRotateSlider,7000);

	//REGEX DECLARATIONS
	var regex = {
		email: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+$/,
		phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	};

	//VALIDATE EMAIL
	//triggers when user leaves field or provides input;
	//manages `.valid` and `.invalid` on field;
	$('#email').on('keydown keyup blur',function(){
		var $input = $(this).val().trim();
		if ($input.search(regex.email) === -1) {
			$(this).addClass('invalid')
				.removeClass('valid')
		} else if ($input.search(regex.email) === 0) {
			$(this).addClass('valid')
				.removeClass('invalid')
		}
	});

	//VALIDATE PHONE
	//triggers when user leaves field or provides input;
	//manages `.valid` and `.invalid` on field;
	$('#phone').on('keydown keyup blur',function(){
		var $input = $(this).val().trim();
		if ($input.search(regex.phone) === -1) {
			$(this).addClass('invalid')
				.removeClass('valid');
		} else if ($input.search(regex.phone) === 0) {
			$(this).addClass('valid')
				.removeClass('invalid');
		}
	});

	//INITIALIZE EMPTIES
	//checks whether field is empty upon load;
	$('form .required').each(function(){
		var $input = $(this).val().trim();
		if ($input.length === 0) {
			$(this).addClass('empty');
		}
	});
	//CHECK TOUCHED
	$('form .field').on('blur', function(){
		$(this).addClass('touched');
	});

	//VALIDATE REQUIRED
	//triggers when user leaves field or provides input;
	//manages class `.empty` on fields with `.required`;
	$('form .required').on('keydown keyup blur',function(){
		var $input = $(this).val().trim();
		if ($input.length === 0) {
			$(this).addClass('empty')
				.removeClass('valid')
				.removeClass('invalid');
		} else {
			$(this).removeClass('empty');
		}
	});

	//DISABLE SUBMIT BUTTON
	//add `disabled` attribute to submit button by default;
	//removes attribute once no require fields are empty;
	//and when all fields without `.noval` are `.valid`;
	$('.submit').attr('disabled','').addClass('disabled');
	function enableSubmit() {
		var requireds = false, validates = false;
		if ($('form .required').length == $('form .required:not(.empty)').length) {
		 	requireds = true;
		}
		if ($('form input:not(.noval,.submit)').length == $('form input:not(.noval,.submit).valid').length) {
			validates = true;
		}
		if ($('.submit').hasClass('disengage')) {
			$('.submit').attr('disabled','').addClass('disabled');
		} else if (requireds == true & validates == true) {
			$('.submit').removeAttr('disabled').removeClass('disabled');
		} else {
			$('.submit').attr('disabled','').addClass('disabled');
		}
	} setInterval(enableSubmit,1);
});
